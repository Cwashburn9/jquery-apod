var apod = {
    //Create a random date
    randomDate: function (start, end) {
        //Randomize the date https://gist.github.com/miguelmota/5b67e03845d840c949c4
        let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        //Format the date
        let d = date.getDate();
        let m = date.getMonth() + 1; //In JS months start at 0
        let y = date.getFullYear();
        //Change the month and day strings so that they match the documented format.
        if (m < 10) {
            m = '0' + m
        }
        if (d < 10) {
            d = '0' + d
        }
        return `${y}-${m}-${d}`;
    },
    //     // Application Constructor
    //     init: function () {
    //         let date = this.randomDate(new Date(1995, 5, 16), new Date());
    //         var url = "https://api.nasa.gov/planetary/apod?api_key=SvjNz04h69O7KEwCtUdgUndqngp1OSjF1zIMeWXz&date=" + date;
    //         $.ajax({
    //             url: url
    //         }).done(function (result) {
    //             $("#apodTitle").text(result.title);
    //             $("#apodImg").attr("src", result.url).attr('alt', result.title);
    //             $("#apodCopyright").text("Copyright: " + result.copyright);
    //             $("#apodDate").text("Date: " + date);
    //             $("#apodDesc").text(result.explanation);
    //             //If the media type is video hide the image elements and display a video.
    //             if (result.media_type === 'video') {
    //                 $("#apodImg").hide();
    //                 $("#apodVideo > iframe").attr("src", result.url).show();
    //             } else {
    //                 $("#apodVideo").hide();
    //                 $("#apodImg").attr("src", result.url).attr('alt', result.title).show();
    //             }
    //         })
    //             /*.done(function (result) {
    //                 console.log(result);*/
    //             fail(function (result) {
    //                 console.log(result);
    //             });
    //     },
    // };
    // apod.init();
    //Injects the results of the API call into the DOM
    buildDOM: function (result) {
        $("#apodTitle").text(result.title);
        if (result.media_type === 'video') {
            $("#apodImage").hide();
            $("#apodVideo > iframe").attr("src", result.url).show();
        } else {
            $("#apodVideo").hide();
            $("#apodImg").attr("src", result.url).attr('alt', result.title).show();
        }
        $("#apodCopyright").text("Copyright: " + result.copyright);
        $("#apodDate").text("Date: " + result.date);
        $("#apodDesc").text(result.explanation);
    },
    //Executes an AJAX call to an API.
    getRequest: function () {
        let _this = this;
        let date = this.randomDate(new Date(1995, 5, 16), new Date());
        let url = "https://api.nasa.gov/planetary/apod?api_key=ArnsAxxLC2WNulGAvSWctZX3bKuCj2NslVk31Jq6&date=" + date;
        $.ajax({
            url: url
        }).done(function (result) {
            _this.buildDOM(result);
        }).fail(function (result) {
            console.log(result);
        });
    },
    // Initialization method.
    init: function () {
        this.getRequest();
    },
}
apod.init();
/* https://learn.jquery.com/using-jquery-core/document-ready/ */
$(function () {
    $('#btnRandApod').on('click', function () {
        apod.getRequest();
    });
});