  var spData = null;

  function doData(json) {
      spData = json.feed.entry;
  }

  function checklink(val) {
      if (val && !val.match(/^.+:\/\/.*/)) {
          return (true);
      } else {
          return (false);
      }
  }

  function drawCell(tr, val) {
      if (checklink(val)) {
          var td = $("<td class='wd_line'/>");
      } else {
          var value = val;
          var td = $("<td class='wd_line link_line'/>");
      }
      tr.append(td);
      td.append(val);
      return td;
  }

  function drawRow(table, rowData) {
      if (rowData == null) return null;
      if (rowData.length == 0) return null;
      var tr = $("<tr class='wd_row'/>");
      table.append(tr);
      for (var c = 0; c < rowData.length; c++) {
          drawCell(tr, rowData[c]);
      }
      return tr;
  }

  function drawTable(parent) {
      var table = $("<table/>");
      parent.append(table);
      return table;
  }

  function readData(parent) {
      var data = spData;
      var table = drawTable(parent);
      var rowData = [];

      for (var r = 0; r < data.length; r++) {
          var cell = data[r]["gs$cell"];
          var val = cell["$t"];
          if (cell.col == 1) {
              drawRow(table, rowData);
              rowData = [];
          }
          rowData.push(val);
      }
      drawRow(table, rowData);
  }

  jQuery(document).ready(function($) {
      readData($("#data"));

      $('.link_line').click(function() {
          linkToGo = $(this).text();
          window.open(linkToGo);
          return false;
      });
  });
  //https://spreadsheets.google.com/feeds/cells/1yhZTKp_VeR0EaaitSXnax2JMdBusqe3lZf8OQ9YuKmY/1/public/values?alt=json-in-script

  //https://spreadsheets.google.com/feeds/cells/1yhZTKp_VeR0EaaitSXnax2JMdBusqe3lZf8OQ9YuKmY/1/public/values?alt=json-in-script&callback=doData
