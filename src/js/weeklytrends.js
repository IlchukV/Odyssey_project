import axios from "axios";
const KEY = "e1aeaa11db3ac22382c707ccfcac931e";

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
    const randomResults = [];
    while (randomResults.length < 3) { 
        const randomIndex = Math.floor(Math.random() * results.length);
        const randomElement = results[randomIndex];
        if(!randomResults.includes(randomElement)){
        randomResults.push(randomElement);
   }
    }
    weeklyGallery.innerHTML = createListHtml(randomResults);
}

function createListHtml(resultArray) { 
    console.log(resultArray)
    return list = resultArray.reduce((markup, item) => markup + createWeeklyCard(item), "");
}

function createWeeklyCard(card) {
    return `<li class = "weeklytrends_gallery_item">
         <a href = "#">
        <img class = "weeklytrends_gallery_image" src = "https://image.tmdb.org/t/p/w500/${card.poster_path}" alt = ""></img>
        </a>
        </li>`
};


getMovies();