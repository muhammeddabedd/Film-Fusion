const apiKey = "85db7e31e814abdef9ebf38eb878666b";
var mediaType;
var id; 
var type;
const url = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}`;

 const options = {
   method: 'GET',
   headers: {
     accept: 'application/json',
     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NWRiN2UzMWU4MTRhYmRlZjllYmYzOGViODc4NjY2YiIsInN1YiI6IjY2M2U2NDA4MGEzZjM5ZDI3Y2E5OWRmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LStd14XdqqLTUeQR-S_4MjXPKct5RDAot-YTk1_kDx8'
   }
 };

 function fetchData() {
   if (mediaType === "movie") {
     if (type === "trailer") {
       url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`;
     } else {
       console.error("Invalid media trailer");
       return;
     }
     // Assuming you want to fetch credits data for the movie
     url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`;
   } else if (mediaType === "tv") {
   
    ;
   } else {
     console.error("Invalid media type provided");
     return;
   }

   fetch(url, options)
     .then(response => response.json())
     .then(data => {
       // Map the details to HTML elements
       MoviePoster.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
       MovieName.textContent = data.title; // or data.name for TV shows
       MovieDescription.textContent = data.overview;
       DirectorsName.textContent = data.credits.crew.find(crew => crew.job === "Director").name;
       ReleaseDate.textContent = data.release_date; // or data.first_air_date for TV shows
       Rating.textContent = data.vote_average;
      
       // Top Cast - assuming you have multiple actors
       data.credits.cast.slice(0, 3).forEach(actor => {
         const actorElement = document.createElement("div");
         actorElement.classList.add("serv");
         actorElement.innerHTML = `
           <div class="team">
             <img src="https://image.tmdb.org/t/p/w200${actor.profile_path}" alt="${actor.name}" />
           </div>
           <h4>${actor.name}</h4>
         `;
         TopCast.appendChild(actorElement);
       });
     })
     .catch(err => console.error(err));
 }

// Call the fetchData function to start fetching data
 fetchData();
