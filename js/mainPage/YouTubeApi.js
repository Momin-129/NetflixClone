var player;
export function onYouTubeIframeAPIReady(container, id) {
  console.log(id);
  player = new YT.Player(container, {
    videoId: id,
    playerVars: {
      controls: 0,
      autoplay: 1,
      mute: 1,
      loop: 1,
      rel: 0,
      playlist: id,
    },
  });
}

$(document).on("click", ".volume", function () {
  if (player.isMuted()) {
    $(this).html("volume_up");
    player.unMute();
  } else {
    $(this).html("volume_off");
    player.mute();
  }
});
