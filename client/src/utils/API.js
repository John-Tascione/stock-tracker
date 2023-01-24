import axios from 'axios';

// Make a search to oMDB
export const searchMovie = async (query) => {
  // ---------- Search OMDB for data ---------- //

  // OMDB Key Variables
  const omdbSearch = 'https://www.omdbapi.com/?i=' // Search by imdbId
  const omdbApiKey = '&apikey=c26a6eef'
  const omdbPlot = '&plot=full'

  const searchValue = query // Working
  console.log(searchValue); // Working

  const searchResult = omdbSearch + searchValue + omdbPlot + omdbApiKey;
  console.log(searchResult);

  try {
      const movieDataObject = await axios.get(searchResult);
      console.log(movieDataObject)
      const movieData = movieDataObject.data;
      console.log(movieData) // Working

      // Pull Rotten Tomatoes from movieData.Ratings
      let rtScore = movieData.Ratings[1]
      if (rtScore) {
          rtScore = JSON.stringify(rtScore.Value)
          rtScore = rtScore.substring(1, 4)
      } else {
          rtScore = "N/A"
      }
      // console.log(rtScore.Value) // Working

      // ---------- Search Youtube for trailer ---------- //

      // Youtube Search Variables
      // var youTubeApiKey = 'AIzaSyArL85QacNinNMsTR0SLDijTFsPP8JkT0s' // Steve's Key
      const ytSearch = 'https://youtube.googleapis.com/youtube/v3/search?q='
      const plusTrailer = " movie trailer"
      const ytApiKey = '&key=AIzaSyArL85QacNinNMsTR0SLDijTFsPP8JkT0s'
      const ytPart = '&part=snippet'
      const ytType = '&type=video'
      const ytResults = '&maxResults=1'
      const ytEmbedBase = 'https://www.youtube.com/embed/'
      const title = movieData.Title
      const year = movieData.Year
      // Define youtube search
      var ytSearchResult = ytSearch + title + " " + year + plusTrailer + ytPart + ytType + ytResults + ytApiKey

      // Fetch youtube data
      try {
          const ytResult = await axios.get(ytSearchResult)
          const ytEmbedId = ytResult.data.items[0].id.videoId
          const ytEmbed = ytEmbedBase + ytEmbedId;
  
          // console.log('\n\ndata.items:',ytResult.data.items[0].id.videoId,'\n\n'); // Working

          return {movieData, rtScore, ytEmbed};
      } catch (err) {
          console.log(err)

          if (err.response) {
              console.log(err.response.data);
              console.log(err.response.status);
              console.log(err.response.headers);
              if (err.response.status === 403) {
                const ytEmbed = ''
                return {movieData, rtScore, ytEmbed};
              }
              return
          };
      };

  } catch (err) {
    console.log(err)
      if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          return;
      };
  };
}

// Search OMDB using search bar value
export const searchOMDB = async (movieName) => {
  // OMDB Key Variables
  const omdbSearch = 'https://www.omdbapi.com/?s=' // change t to s if you want a list of similar movie names
  const omdbApiKey = '&apikey=c26a6eef'
  const omdbType = '&type=movie'

  // Set up the search parameters
  const searchValue = movieName
  const searchResult = omdbSearch + searchValue + omdbType + omdbApiKey

  // Start search
  try {
    const response = await axios.get(searchResult);
    console.log(response.data.Search); // Working

    // Add History Button for search history
    // But not if there's no movie data
    if (!response.data.Search) {
      console.log('BLOCKED! BAD REQUEST!')
      return;
    };

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
