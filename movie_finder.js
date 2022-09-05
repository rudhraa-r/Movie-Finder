const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=86fa50f1&s=";
const API_URL_SEARCH = "http://www.omdbapi.com/?apikey=86fa50f1&i=";

var search_input = document.getElementById("search-input");
var card = document.getElementsByClassName("movie-cards")[0];

document.getElementsByClassName("search")[0].addEventListener("click", func);
function func(){
    console.log(search_input.value);
    const query = search_input.value;
    if(query){
        getMovies(API_URL+query);
    }
}

async function getMovies(url){
    const resp = await fetch(url)
    const respData = await resp.json();
    console.log(respData);
    show_movies(respData.Search) ;
}

function show_movies(movies){
    card.innerHTML="";
    movies.forEach(async function(movie){
        const movieData = await fetch(API_URL_SEARCH+movie.imdbID);
        const movieDataobj= await movieData.json();
        console.log(movieDataobj);
        movie_display(movieDataobj);
    });
}

function movie_display(imovie){
    const movieELm = document.createElement("div");
    movieELm.classList.add("movie-card");
    movieELm.innerHTML=`
    <div class ="card">
        <img src ="${imovie.Poster}" alt ="Poster" width="300px" height="300px"/>
        <br>
        <div class = "movie-description">
            <span class ="movie-title"><b>Title :</b><span class="value">${imovie.Title}</span></span>
            <span class ="movie-title"><b>imdb Rating :</b><span class="value">${imovie.imdbRating}</span></span>
            <span class ="movie-title"><b>Director :</b><span class="value">${imovie.Director}</span></span>
            <span class ="movie-title"><b>Released :</b><span class="value">${imovie.Released}</span></span>
            <span class ="movie-title"><b>Genre :</b><span class="value">${imovie.Genre}</span></span>
        </div>
    </div>
    `;
    card.appendChild(movieELm);
   
}