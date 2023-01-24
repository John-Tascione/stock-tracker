import axios from 'axios';

// Search OMDB using search bar value
export const searchPolygon = async (ticker, date) => {
  
  const search = `https://api.polygon.io/v1/open-close/${ticker}/${date}?adjusted=true&apiKey=I7FExWuvhqmQRUzNi_GN8vCpecCFALIg`
 
  try {
    const response = await axios.get(search);
    console.log(response.data.Search); // Working


    // Define Variables
    var movieSave = movieName.toLowerCase();
    console.log("Movie save name: " + movieSave)
    console.log("Storage Test: ", localStorage.getItem("MovieMate: " + movieSave), movieSave)
    
    // Don't add history button if local storage already exists
    if (!localStorage.getItem("MovieMate: " + movieSave)) {
      // If no local storage, then:
      localStorage.setItem("MovieMate: " + movieSave, movieSave);
      console.log(localStorage.getItem("MovieMate: " + movieSave))  ;
    };

    // Return list of movie objects based on search parameters
    return response.data.Search;

  } catch (err) {
    if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
    };
  };
};

export const getHistory = () => {
  console.log('Get History');
  let keys = Object.keys(localStorage);
  let searchHistory = []

  for (let i = 0; i < keys.length; i++) {
    if (keys[i].substring(0, 11) === 'MovieMate: ') {
      console.log(keys[i])
      console.log(keys[i].substring(11));
      searchHistory.push(keys[i].substring(11));
    };
  };
  return searchHistory;
};

export const removeHistory = () => {
  console.log('Remove History');
  let keys = Object.keys(localStorage);

  for (let i = 0; i < keys.length; i++) {
    if (keys[i].substring(0, 11) === 'MovieMate: ') {
      console.log(keys[i])
      console.log(keys[i].substring(11));
      localStorage.removeItem(keys[i])
    }
  }
}
