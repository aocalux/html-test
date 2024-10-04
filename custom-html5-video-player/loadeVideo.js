const urlParams = new URLSearchParams(window.location.search);
src = String(urlParams.get('src'));
poster = String(urlParams.get("poster"));
play = String(urlParams.get("play"));
const source = document.getElementById("video-source");

if (!poster || poster == null || poster == "null" || poster == "") {
    poster = ""; // DEFAULT POSTER
}

if (!src || src == null || src == "null" || src == "") {
    src = ""; // DEFAULT VIDEO SOURCE
}

source.setAttribute("src", src);
source.setAttribute("type", "");
video.setAttribute("poster", poster)

video.load();

if (play == "TRUE") {
    video.play();
}

// http://localhost:5500/custom-html5-video-player/?src=https://custom-html5-video.surge.sh/video.mp4&poster=https://custom-html5-video.surge.sh/poster.jpg
// http://localhost:5500/custom-html5-video-player/?src=[VIDEO-SOURCE]&poster=[POSTER-SOURCE]&play=<TRUE / FALSE>