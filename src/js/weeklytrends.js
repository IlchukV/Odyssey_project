
import axios from "axios";
const KEY = "6669975baff3d190a56a2f384e21121b";

const weeklyGallery = document.querySelector(".weeklytrends_gallery_list");

async function getMovies() {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}`);
        createWeeklyGalery(response.data);
    } catch (error) { 
        console.log(error);
    }
}

function createWeeklyGalery({ results }) {
    console.log(results)
    weeklyGallery.innerHTML = createListHtml(results);
}

function createListHtml(resultArray) { 
    return list = resultArray.reduce((markup, item) => markup + createWeeklyCard(item), "");
}

function createWeeklyCard(card) {
    console.log(card.poster_path)
    return `<li class = "weeklytrends_gallery_item">
         <a href = "#">
        <img width = "280" height = "406" src = "https://image.tmdb.org/t/p/w500/${card.poster_path}" alt = ""></img>
        </a>
        </li>`
};



getMovies();
