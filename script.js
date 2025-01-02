

gsap.registerPlugin(ScrollTrigger) 

//jQuery - $(selector).action() Selector = Html element to be selected / Action - action to be performed  
//$('#homeVideo').on('ended', function(){this.playedThrough = true;});

/* Home Main video play on initial load OR scroll back to section */
var videoHasPlayedOnce = false;
var videoHasReplayedOnce = true;

// Track whether the page is being initialized
var isInitialLoad = true;

$(document).ready(function() {
    // plays video as soon as page is initialized
    var homeVideo = document.getElementById("homeVideo");
    
    homeVideo.currentTime = 0; // Reset to start
    homeVideo.play().then(() => {
            videoHasPlayedOnce = true; // log that video has been played so that it doesn't play again until re-entered
            videoHasReplayedOnce = true; // log that video has been replayed so that it doesn't replay while in first scroll range
            console.log("Video played on initial load");
        }).catch(error => {
            console.error("Initial video play failed: ", error);
        });
    
});


$(window).scroll(function() {
    var scrollPosition = $(window).scrollTop(); // get scroll position 
    var homeVideo = document.getElementById("homeVideo");
   // var imgDefault = document.getElementById("imgDefault");
    console.log(scrollPosition)
 // On first load, skip the replay logic
 if (isInitialLoad) {
    isInitialLoad = false; // Ensure this block runs only once
    return; // Skip the rest of the scroll handler during initialization
        
    }
    

// If the user is scrolling back into the range (0 < 580), and video has been played once but not replayed, and video was paused.
if (scrollPosition >= 0 && scrollPosition < 400 && !videoHasReplayedOnce && videoHasPlayedOnce && homeVideo.paused){
    
        $(homeVideo).css("z-index", "4");
        homeVideo.currentTime = 0; // Reset to the start
        homeVideo.play().then(() => {
            videoHasReplayedOnce = true; // Mark video as replayed
            console.log("Video replayed once");
        }).catch(error => {
            console.error("Video replay failed: ", error);
        });
    
}
else {
    // If scroll position is outside the range (580 or greater) and video hasn't been paused OR it ended, pause the video
    if (scrollPosition >= 400 && (!homeVideo.paused || homeVideo.ended)) { 
        homeVideo.pause();
        console.log("Video paused");
    }

    if (homeVideo.ended){
        homeVideo.pause();
        console.log("video paused because it ended");
        $(homeVideo).css("z-index", "-3");
       // homeVideo.style.z-index = '-1';

    }

    // Reset the flags only when the user leaves the range
    if (scrollPosition >= 400) {
        videoHasReplayedOnce = false;
        console.log("Flags reset: videoHasReplayedOnce (so it's false");
    }
   
}
});


/*genta slideshow manual */

function scrollToSlide(videoId) {
  const videoElement = document.getElementById(videoId);
  if (videoElement) {
    videoElement.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }
}
  
/* 1o1d Home Page Slideshow automatic*/

let autoSlideIndex = 0;
autoCarousel();

function autoCarousel() {
  let i;
  let slideShow = document.getElementsByClassName("slide-1o1d");
  console.log("slideshow elements:", slideShow)
  for (i = 0; i < slideShow.length; i++) {
    slideShow[i].style.display = "none";
  }
  autoSlideIndex++;
  if (autoSlideIndex > slideShow.length) {autoSlideIndex = 1}
  console.log("Current slideIndex:", autoSlideIndex); // Log the index being used
  slideShow[autoSlideIndex-1].style.display = "block";
  setTimeout(autoCarousel, 2000); // Change image every 2 seconds
}

