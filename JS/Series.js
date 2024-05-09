
var apikey = "8913688ba8c6297c6666f612a9c5409f";


var posters = new Array(16);
var names = new Array(16);

for (var i = 0; i < 16; i++) {
  posters[i] = document.getElementById(`seriesposter${i}`);
  names[i] = document.getElementById(`seriesname${i}`);
}

var data;
function getdata() {
  var myhttp = new XMLHttpRequest();
  myhttp.open(
    "GET",
    `https://api.themoviedb.org/3/trending/tv/week?api_key=${apikey}`
  );
  myhttp.send();
  myhttp.addEventListener("load", function () {
    if (myhttp.readyState == 4 && myhttp.status == 200) {
      data = JSON.parse(myhttp.response);
      for (var i = 0; i < 16; i++) {
        posters[i].src = `https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}`;
        names[i].innerHTML = data.results[i].name;
      }
    }
  });
}
getdata();
