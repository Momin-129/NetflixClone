var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("backVideo", {
    videoId: "qEVUtrk8_B4",
    playerVars: {
      controls: 0,
      autoplay: 1,
      mute: 1,
      loop: 1,
      rel: 0,
      playlist: "qEVUtrk8_B4",
    },
  });
}

$("#volume").on("click", function () {
  if (player.isMuted()) {
    $("#volume").html("volume_up");
    player.unMute();
  } else {
    $("#volume").html("volume_off");
    player.mute();
  }
});
