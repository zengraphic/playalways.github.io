jQuery(document).ready(function($) {
    // ================== CARICAMENTO DATI ===================
    var url = 'risorseJson.json';
    console.log(url);
  $.getJSON(url, function (data) {
    console.log(data);
  });
    /*https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1yhZTKp_VeR0EaaitSXnax2JMdBusqe3lZf8OQ9YuKmY&sheet=Form Responses 1*/
});
