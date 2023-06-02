let api_key = "f0da4eeabfc41aacee7225b73da8b902";

async function fetchTrailer() {
  let trailer =
    await fetch(`https://api.themoviedb.org/3/movie/567/videos?api_key=
${api_key}`);

  return trailer.json();
}

fetchTrailer().then((data) => console.log(data));

// To embed a youtube video into website.
// <iframe
//   width="420"
//   height="315"
//   src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"
// ></iframe>;
