let players = [];
export function onYouTubeIframeAPIReady(index, container, id) {
  let player = new YT.Player(container, {
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
  players[index] = player;
}

$(".secondSection").on("click", ".volume", function () {
  let index = parseInt($(this).parent().attr("id"));
  if (players[index].isMuted()) {
    $(this).html("volume_up");
    players[index].unMute();
  } else {
    $(this).html("volume_off");
    players[index].mute();
  }
});

$(".firstSection").on("click", ".volume", function () {
  let index = parseInt($(this).parent().attr("id"));
  if (players[index].isMuted()) {
    $(this).html("volume_up");
    players[index].unMute();
  } else {
    $(this).html("volume_off");
    players[index].mute();
  }
});

$("#movieShow").on("click", ".volume", function () {
  let index = parseInt($(this).parent().attr("id"));
  if (players[index].isMuted()) {
    $(this).html("volume_up");
    players[index].unMute();
  } else {
    $(this).html("volume_off");
    players[index].mute();
  }
});

$(".myList").on("click", ".volume", function () {
  let index = parseInt($(this).parent().attr("id"));
  if (players[index].isMuted()) {
    $(this).html("volume_up");
    players[index].unMute();
  } else {
    $(this).html("volume_off");
    players[index].mute();
  }
});

let play = true;
$("#movieShow").on("click", ".playBtn", function () {
  let index = parseInt($(this).parent().attr("id"));
  if (play) {
    $(this).html("pause");
    play = false;
    players[index].pauseVideo();
  } else {
    $(this).html("play_arrow");
    play = true;
    players[index].playVideo();
  }
});
