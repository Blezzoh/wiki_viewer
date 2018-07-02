$(document).ready(function() {
  $("#search-btn").on("click", search);
  $("#search-input").keypress(function(event) {
    if (event.keyCode == 13 || event.which == 13) {
      search();
    }
  });
});
// function that searched wikipedia for the keywork
function searchWiki(keyword) {
  $.ajax({
    url: "//en.wikipedia.org/w/api.php",
    data: {
      action: "query",
      list: "search",
      srsearch: keyword,
      format: "json"
    },
    dataType: "jsonp",
    success: function(data) {
      displaySearch(data);
    },
    error: function(xhr, status, err) {
      console.log(err);
    }
  });
}

function search() {
  // getting the input text
  var text = $("#search-input").val();
  searchWiki(text);
}
// callback function for the ajax call in searchWiki(item)
// parses the returned data from the ajax call to wikipedia and elegantly adds it to the HTML body
function displaySearch(data) {
  var result = data.query.search;
  $(".search-result").html("");
  for (var i = 0; i < result.length; i++) {
    var tmp =
      '<div class="row result" id="result-' +
      (i + 1) +
      '">' +
      '<h5 class="title" id="title' +
      (i + 1) +
      '">' +
      '<a href="https://en.wikipedia.org/wiki/' +
      result[i].title +
      '"> ' +
      result[i].title +
      "</a></h5><br>" +
      '<p class="snippet" id="snippet' +
      (i + 1) +
      '">' +
      result[i].snippet +
      "...</p></div>";
    $(".search-result").html($(".search-result").html() + tmp);
  }
  $(".result").css({
    background: "rgba(244, 244, 244)",
    margin: "15px",
    padding: "15px",
    width: "100%"
  });
}
