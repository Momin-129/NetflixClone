let api_key = "f0da4eeabfc41aacee7225b73da8b902";

export async function fetchPopular() {
  let trailer = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=
${api_key}`);

  return trailer.json();
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
  let anime = await fetch(
    ` https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&page=1&with_genres=35`
  );
  return anime.json();
}
