import {CHECKBOXES} from "../constants";
import {fetchStarted, toggleFetch} from "./actions"
export const getMoviesState = store => store.movieList;

export const getMovieList = store =>
    getMoviesState(store) ? getMoviesState(store).allIds : [];
  
export const getMovieById = (store, id) =>
    getMoviesState(store) ? { ...getMoviesState(store).byIds[id], id } : {};

/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
export const getMovies = store =>
  getMovieList(store).map(id => getMovieById(store, id));

export const getMoviesByCheckbox = (store, genreList) => {
    const allMovies = getMovies(store);
    const copyMovies = Object.assign([], allMovies);
    const targetMovies = [];
    for(let i=0; i < CHECKBOXES.GENRES.length; i++){
      if(genreList[i].isChecked){
        for(let j=0; j<allMovies.length;j++){
          if(allMovies[j].genre.includes(genreList[i].value)){
            targetMovies.push(copyMovies[j])
          }
        }
      }
    }
  let finalMovies = targetMovies.filter((item, index) => targetMovies.indexOf(item) === index)
  return finalMovies
};

export const getMoviesByRating = (store) => {
  const allMovies = getMovies(store);
  allMovies.sort((a, b) => b.rating -a.rating);
  return allMovies;
};