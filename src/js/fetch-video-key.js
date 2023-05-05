import axios from 'axios';
import Notiflix from 'notiflix';


const API_KEY = 'e1aeaa11db3ac22382c707ccfcac931e';
const BASE_URL = 'https://api.themoviedb.org/';

export default async function fetchVideoKey(id) {
  const url = `${BASE_URL}/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;
  Notiflix.Loading.circle();
  try {
    const { data } = await axios.get(url);
    const filmKey = data.results[0].key;
    return filmKey;
  } catch (error) {
    console.log('error:', error);
  } finally {
    Notiflix.Loading.remove();
  }
}