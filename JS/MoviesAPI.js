//API Key for the movie database
var apikey = "37af78034f737ae890e4ffcb2e0dd466";

//array of all the movie posters and names using their id
var posters = new Array(16);
var names = new Array(16);

for (var i = 0; i < 16; i++) {
  posters[i] = document.getElementById(`movieposter${i}`);
  names[i] = document.getElementById(`moviename${i}`);
}

var data;
function getdata() {
  var myhttp = new XMLHttpRequest();
  myhttp.open(
    "GET",
    `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}`
  );
  myhttp.send();
  myhttp.addEventListener("load", function () {
    if (myhttp.readyState == 4 && myhttp.status == 200) {
      data = JSON.parse(myhttp.response);
      for (var i = 0; i < 16; i++) {
        posters[
          i
        ].src = `https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}`;
        names[i].innerHTML = data.results[i].title;
      }

      console.log(data.results[0].poster_path);
    }
  });
}
getdata();
