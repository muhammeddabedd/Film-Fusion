const apiKey = "587c710c3df4f4747c43471c4788cf12";
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

// Function to fetch data
function fetchData(url, sectionId, cardClass, sliceStart, sliceEnd) {
  fetch(url + apiKey)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const items = data.results.slice(sliceStart, sliceEnd); // Limit to a certain number of items
      const section = document.querySelector(`#${sectionId} .row`);

      items.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("col-1", "card", cardClass); // Add classes to style with CSS
        card.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500/${item.poster_path}" alt="${
          item.title || item.name
        }" />
          <div class="overlay">
            <div class="text">${item.title || item.name}</div>
          </div>
        `;
        section.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Event listener for loading data
window.addEventListener("load", () => {
  fetchData(
    "https://api.themoviedb.org/3/discover/movie?api_key=",
    "movies",
    "movie-card",
    0,
    7
  );
  fetchData(
    "https://api.themoviedb.org/3/discover/tv?api_key=",
    "series",
    "series-card",
    0,
    7
  );
  fetchData(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=",
    "upcoming",
    "upcoming-movie-card",
    0,
    7
  );
  fetchData(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=",
    "recommendations",
    "popular-movie-card",
    8,
    15
  );
});
