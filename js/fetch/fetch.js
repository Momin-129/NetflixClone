let api_key = "f0da4eeabfc41aacee7225b73da8b902";

export async function SearchIndian(no) {
  let movieSearch = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_original_language=hi&page=${no}`
  );
  return movieSearch.json();
}
export async function SearchHollywood(no) {
  let movieSearch = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_original_language=en&page=${no}`
  );
  return movieSearch.json();
}

export async function SearchEngTV(no) {
  let movieSearch = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&with_original_language=en&page=${no}`
  );
  return movieSearch.json();
}

// Movie Section Start
export async function fetchPopular() {
  let popular = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=
${api_key}`);

  return popular.json();
}
//
export async function fetchTopRated() {
  let popular =
    await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=
${api_key}&with_origin_country=IN`);

  return popular.json();
}
export async function fetchActionAdventure() {
  let actionAdventure = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=28|12`
  );

  return actionAdventure.json();
}

export async function fetchTrending() {
  let trending = await fetch(
    ` https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}`
  );
  return trending.json();
}
export async function fetchUpcoming() {
  let upcoming = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}`
  );
  return upcoming.json();
}
export async function fetchBollyWood() {
  let movies = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&with_origin_country=IN&with_original_language=hi`
  );

  return movies.json();
}

export async function fetchAnime() {
  let anime = await fetch(
    ` https://api.themoviedb.org/3/keyword/210024-anime/movies?api_key=${api_key}`
  );
  return anime.json();
}

export async function fetchComedy() {
  let comedy = await fetch(
    ` https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&page=1&with_genres=35`
  );
  return comedy.json();
}
export async function fetchHorror() {
  let horror = await fetch(
    ` https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&page=1&with_genres=27`
  );
  return horror.json();
}

export async function fetchSciFantasy() {
  let fantasy = await fetch(
    ` https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=878|14`
  );
  return fantasy.json();
}

export async function fetchPoster(movie_id) {
  let poster = await fetch(
    ` https://api.themoviedb.org/3/movie/${movie_id}/images?api_key=${api_key}&,null`
  );
  return poster.json();
}

export async function fetchTrailer(movie_id) {
  let poster = await fetch(
    ` https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${api_key}`
  );
  return poster.json();
}

export async function fetchMovieDetails(movie_id) {
  let poster = await fetch(
    ` https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}`
  );
  return poster.json();
}

export async function fetchSimilar(movie_id) {
  let similar = await fetch(
    ` https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${api_key}`
  );
  return similar.json();
}
// Movie Section End

// TV Section Start
export async function fetchPopularTV() {
  let popular = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=
${api_key}&with_original_language=en`);

  return popular.json();
}
export async function fetchTrendingTV() {
  let trending =
    await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=
${api_key}`);

  return trending.json();
}
export async function fetchKdramas() {
  let kdramas = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=
${api_key}&with_origin_country=KR&with_original_language=ko`);

  return kdramas.json();
}

export async function fetchMysteryTV() {
  let mystery = await fetch(
    ` https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&page=1&with_genres=9648`
  );
  return mystery.json();
}

export async function fetchAiringTodayTV() {
  let airingToday = await fetch(
    `https://api.themoviedb.org/3/tv/airing_today?api_key=${api_key}`
  );
  return airingToday.json();
}

export async function fetchIndianTV() {
  let movies = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&with_origin_country=IN`
  );

  return movies.json();
}

export async function fetchAnimeTV() {
  let anime = await fetch(
    ` https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1&with_genres=16&with_keywords=210024|287501`
  );
  return anime.json();
}

export async function fetchPosterTV(tv_id) {
  let poster = await fetch(
    ` https://api.themoviedb.org/3/tv/${tv_id}/images?api_key=${api_key}&,null`
  );
  return poster.json();
}

export async function fetchTrailerTV(tv_id) {
  let poster = await fetch(
    ` https://api.themoviedb.org/3/tv/${tv_id}/videos?api_key=${api_key}`
  );
  return poster.json();
}

export async function fetchShowDetails(tv_id) {
  let poster = await fetch(
    ` https://api.themoviedb.org/3/tv/${tv_id}?api_key=${api_key}`
  );
  return poster.json();
}
export async function fetchSimilarTV(tv_id) {
  let poster = await fetch(
    ` https://api.themoviedb.org/3/tv/${tv_id}/similar?api_key=${api_key}`
  );
  return poster.json();
}
// TV Section End
