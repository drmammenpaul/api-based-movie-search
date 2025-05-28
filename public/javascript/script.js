const searchBtn = document.getElementById("searchBtn");
const movieInput = document.getElementById("movieInput");
const movieInfoDiv = document.getElementById("movieInfo");

searchBtn.addEventListener("click", searchMovie);

movieInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchMovie();
  }
});

async function searchMovie() {
  const movieTitle = movieInput.value.trim();
  const apiKey = '77689e68';

  if (!movieTitle) {
    movieInfoDiv.innerHTML = '<p>Please enter a movie title.</p>';
    return;
  }

  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      movieInfoDiv.innerHTML = `
        <h2>${data.Title} (${data.Year})</h2>
        <img src="${data.Poster !== "N/A" ? data.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="Movie Poster" />
        <p><strong>Plot:</strong> ${data.Plot}</p>
      `;
    } else {
      movieInfoDiv.innerHTML = `<p>❌ Movie not found. Try another title.</p>`;
    }
    
  } catch (error) {
    console.error('Error fetching movie data:', error);
    movieInfoDiv.innerHTML = `<p>⚠️ Something went wrong. Please try again later.</p>`;
  }
  movieTitle.value = '';
}
