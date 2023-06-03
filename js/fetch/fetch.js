let api_key = "f0da4eeabfc41aacee7225b73da8b902";


export async function fetchPopular() {
  let trailer = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=
${api_key}`);

  return trailer.json();
}

// To embed a youtube video into website.
// <iframe
//   width="420"
//   height="315"
//   src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"
// ></iframe>;
//
//
// for image
// https://image.tmdb.org/t/p/original/path
//
// for landscape image
//
// https://api.themoviedb.org/3/movie/329865/images?api_key=f0da4eeabfc41aacee7225b73da8b902&language=en-US&include_image_language=en,null
