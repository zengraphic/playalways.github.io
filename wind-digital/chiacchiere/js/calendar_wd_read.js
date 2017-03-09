jQuery(document).ready(function($) {
    // ================== CARICAMENTO DATI ===================
    var url = 'https://script.googleusercontent.com/macros/echo?user_content_key=Vl1tOe6HCcc9Z-QRKROK_4_yKkyhX7bs55OR0G5Mv3AuHFmtr1-UgAh10oUmP-p5tDXswrOW6c6vvaZ9-nfKXMrKY-WPJJGIOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa1ZsYSbt7G4nMhEEDL32U4DxjO7V7yvmJPXJTBuCiTGh3rUPjpYM_V0PJJG7TIaKpwiphq7z5M5_x__2Yg-t8t4__Q9xYWJLseODltSRTQGrK2sUIYrbeoJIchWhiPvIYDQJv8DXWa1h6YynRodI14iC1FYEJlGtPA&lib=MbpKbbfePtAVndrs259dhPT7ROjQYJ8yx';
    $.getJSON(url, function(data) {
        $.each(data, function(index, element) {
            console.log(data);
            var timeStamp = data[index][0].Timestamp;
            var type = data[index][0].Type;
            var title = data[index][0].Title;
            var author = data[index][0].Author;
            var description = data[index][0].Description;
            var url = data[index][0].url;
            var note = data[index][0].Note;
            $('.calendar__container')
                .append(
                    '<div>' + timeStamp + '</div>' +
                    '<div>' + type + '</div>' +
                    '<div>' + title + '</div>' +
                    '<div>' + author + '</div>' +
                    '<div>' + description + '</div>' +
                    '<div>' + url + '</div>' +
                    '<div>' + note + '</div>'
                );
        });
    });
    /*https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1yhZTKp_VeR0EaaitSXnax2JMdBusqe3lZf8OQ9YuKmY&sheet=Form Responses 1*/
});
