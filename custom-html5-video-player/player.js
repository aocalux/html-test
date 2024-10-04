const video = document.getElementById("video");
const videoCtrl = document.getElementById("video-ctrl");
const playButton = document.getElementById("play");
const playbackIcons = document.querySelectorAll(".playback-icons use");
const timeElapsed = document.getElementById("time-elapsed");
const duration = document.getElementById("duration");
const progressBar = document.getElementById("progress-bar");
const timeSlider = document.getElementById("timeline-slider");
const timeSliderTooltip = document.getElementById("timeline-slider-tooltip");
const volumeButton = document.getElementById("volume-button");
const volumeIcons = document.querySelectorAll(".volume-button use");
const volumeMute = document.querySelector('use[href="#volume-mute"]');
const volumeLow = document.querySelector('use[href="#volume-low"]');
const volumeHigh = document.querySelector('use[href="#volume-high"]');
const volume = document.getElementById("volume");
const playbackAnimation = document.getElementById("playback-animation");
const fullscreenButton = document.getElementById("fullscreen-button");
const videoContainer = document.getElementById("video-container");
const fullscreenIcons = fullscreenButton.querySelectorAll("use");
const openPopup = document.getElementById("openPopup");

const videoWorks = !!document.createElement("video").canPlayType;
if (videoWorks) {
  video.controls = false;
  videoCtrl.classList.remove("nowshow");
}

function togglePlay() {
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
}

function uPlayButton() {
  playbackIcons.forEach((icon) => icon.classList.toggle("nowshow"));

  if (video.paused) {
    playButton.setAttribute("data-title", "play");
  } else {
    playButton.setAttribute("data-title", "pause");
  }
}

function timeFormat(timeInSeconds) {
  const isoTime = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

  return {
    hours: isoTime.substr(0, 2),
    minutes: isoTime.substr(3, 2),
    seconds: isoTime.substr(6, 2),
  };
}

function initializeVideo() {
  const videoDuration = Math.round(video.duration);
  timeSlider.setAttribute("max", videoDuration);
  progressBar.setAttribute("max", videoDuration);
  const time = timeFormat(videoDuration);
  duration.innerText = `${time.hours}:${time.minutes}:${time.seconds}`;
  duration.setAttribute("datetime", `${time.hours}h ${time.minutes}m ${time.seconds}s`);
}

function uE_Time() {
  const time = timeFormat(Math.round(video.currentTime));
  timeElapsed.innerText = `${time.hours}:${time.minutes}:${time.seconds}`;
  timeElapsed.setAttribute("datetime", `${time.hours}h ${time.minutes}m ${time.seconds}s`);
}

function uProgress() {
  timeSlider.value = Math.floor(video.currentTime);
  progressBar.value = Math.floor(video.currentTime);
}

function uSliderTooltip(event) {
  const skipTo = Math.round(
    (event.offsetX / event.target.clientWidth) *
      parseInt(event.target.getAttribute("max"), 10)
  );
  timeSlider.setAttribute("data-timeline-slider", skipTo);
  const t = timeFormat(skipTo);
  timeSliderTooltip.textContent = `${t.minutes}:${t.seconds}`;
  const rect = video.getBoundingClientRect();
  timeSliderTooltip.style.left = `${event.pageX - rect.left}px`;
}

function skipFor(event) {
  const skipTo = event.target.dataset.timelineSlider
    ? event.target.dataset.timelineSlider
    : event.target.value;
  video.currentTime = skipTo;
  progressBar.value = skipTo;
  timeSlider.value = skipTo;
}

function uVolume() {
  if (video.muted) {
    video.muted = false;
  }

  video.volume = volume.value;
}

function uVolumeIco() {
  volumeIcons.forEach((icon) => {
    icon.classList.add("nowshow");
  });

  volumeButton.setAttribute("data-title", "mute");

  if (video.muted || video.volume === 0) {
    volumeMute.classList.remove("nowshow");
    volumeButton.setAttribute("data-title", "Unmute");
  } else if (video.volume > 0 && video.volume <= 0.5) {
    volumeLow.classList.remove("nowshow");
  } else {
    volumeHigh.classList.remove("nowshow");
  }
}

function toggleMute() {
  video.muted = !video.muted;

  if (video.muted) {
    volume.setAttribute("data-volume", volume.value);
    volume.value = 0;
  } else {
    volume.value = volume.dataset.volume;
  }
}

function fullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else if (document.webkitFullscreenElement) {
    document.webkitExitFullscreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
}

function uFullscreenButton() {
  fullscreenIcons.forEach((icon) => icon.classList.toggle("nowshow"));

  if (document.fullscreenElement) {
    fullscreenButton.setAttribute("data-title", "exit full screen");
  } else {
    fullscreenButton.setAttribute("data-title", "full screen");
  }
}

function hideCtrl() {
  if (video.paused) {
    return;
  }

  videoCtrl.classList.add("hide");
  video.classList.add("hidecursor");
}

function showCtrl() {
  videoCtrl.classList.remove("hide");
  video.classList.remove("hidecursor");
}

function clickCopyright() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else if (document.webkitFullscreenElement) {
    document.webkitExitFullscreen();
  }
}

playButton.addEventListener("click", togglePlay);
video.addEventListener("play", uPlayButton);
video.addEventListener("pause", uPlayButton);
video.addEventListener("loadedmetadata", initializeVideo);
video.addEventListener("timeupdate", uE_Time);
video.addEventListener("timeupdate", uProgress);
video.addEventListener("volumechange", uVolumeIco);
video.addEventListener("click", togglePlay);
video.addEventListener("mousemove", showCtrl);
video.addEventListener("mouseleave", hideCtrl);
videoCtrl.addEventListener("mousemove", showCtrl);
timeSlider.addEventListener("mousemove", uSliderTooltip);
timeSlider.addEventListener("input", skipFor);
volume.addEventListener("input", uVolume);
volumeButton.addEventListener("click", toggleMute);
fullscreenButton.addEventListener("click", fullScreen);
videoContainer.addEventListener("fullscreenchange", uFullscreenButton);

window.setInterval(hideCtrl, 4000);
openPopup.setAttribute("data-title", "Copyright notice");
openPopup.addEventListener("click", clickCopyright);