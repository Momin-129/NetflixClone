let api_key = "f0da4eeabfc41aacee7225b73da8b902";

// Movie Section Start
export async function fetchPopular() {
  let popular = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=
${api_key}`);

  return popular.json();
}

export async function fetchTrendin() {
  let trending = await fetch(
    ` https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}&with_origin_country=IN`
  );
  return trending.json();
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

export async function fetchIndianTV() {
  let movies = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&with_origin_country=IN&with_original_language=hi`
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
