gsap.registerPlugin(ScrollTrigger) 

import anime from "./anime-master/lib/anime.es.js";  // Relative path

document.addEventListener("DOMContentLoaded", () => {
   if (document.documentElement.classList.contains("locked")) {
    document.body.style.overflow = "hidden";
  }  

  function fixLoaderHeight() {
  if (document.documentElement.classList.contains("locked")) {
    document.querySelector(".loader").style.height = window.innerHeight + "px";
  }
}
  
window.addEventListener("resize", fixLoaderHeight);
window.addEventListener("load", fixLoaderHeight);
  const video = document.getElementById("homeVideo");
  const loader = document.querySelector("section.loader");
  const mainContent = document.querySelector(".body-container");
  const doc = document.documentElement;

  // Check if it's the home page
  let isHome = document.body.classList.contains("home");
  let isFirstVisit = !sessionStorage.getItem('visited'); // Check if it's the user's first visit

  // Detect if the page is being refreshed manually
  let navigationType = performance.getEntriesByType("navigation")[0].type;
  let isManualRefresh = navigationType === "reload";
  let siteBaseURL = location.protocol + "//" + location.host;
  let sameReferrer = document.referrer.startsWith(siteBaseURL) && document.referrer !== "";

  console.log("Current site URL:", siteBaseURL);
  console.log("Referrer URL:", document.referrer);
  console.log("Is same referrer?", sameReferrer);

  if (isHome) { // if user is in homepage
      
      //store url of previous page . If document.referrer contains my website base url, it means they came from the same site
      if (isManualRefresh || !sameReferrer) {
        console.log("New visit or external referrer detected.");
        document.documentElement.classList.add("locked");
        window.addEventListener("DOMContentLoaded", () => {
            mainContent.style.display = "none"; // Hide main content initially
            mainContent.style.visibility = "hidden"; // Ensure it's not visible
            mainContent.style.opacity = "0"; // Make sure opacity is 0


            window.scrollTo(0, 0);
            document.body.scrollTo(0, 0);
            video.playsInline = true;
            video.setAttribute("muted", "");
            video.defaultMuted = true;
        });

        video.addEventListener("ended", () => {
            anime({
                targets: video,
                opacity: [1, 0],  // Scale from 100% to 0%
                duration: 250, // Animation duration (1s)
                delay: 0,
                easing: "linear",
                complete: () => {
                    console.log("Animation complete. Unlocking page...");
                    setTimeout(() => {
                      video.style.display = "none"; // Hide the video after the animation finishes
                  }, 60); // Wait for 400ms (same duration as the animation)

                  mainContent.style.display = "block"; 
                  mainContent.style.visibility = "visible"; // Set visibility to visible
                  mainContent.style.opacity = "0"; // Start with opacity 0

                    anime({
                      targets: mainContent,
                      opacity: [0, 1], // Fade in main content
                      duration: 200,
                      easing: "easeInOutQuad",
                      complete: () => {
                          console.log("🎉 Main content fully visible!");
                          doc.classList.remove("locked");
                          if (loader) loader.parentNode.removeChild(loader);
                          window.scrollTo(0, 0);
                          document.body.scrollTo(0, 0);
                      }
                  });      
                }
            });
            console.log("Displaying main content...");
            mainContent.style.display = "block";
        });
    } else {
      console.log("Removing loader immediately...");
      loader?.parentNode?.removeChild(loader);
      // Ensure 'locked' class is removed when navigating back from another page
          console.log("Removing 'locked' class after same-site navigation.");
          doc.classList.remove("locked");
      }  
    }
}
);

/*playground show caption on hover image */

$(window).on("load", function() {
  $(".play-column").hover(
      function() {
          $(this).find(".play-caption").css("opacity", "1");
      }, 
      function() {
          $(this).find(".play-caption").css("opacity", "0");
      }
  );
});

$(window).on("load", function() {
  $(".play-column2").hover(
      function() {
          $(this).find(".play-caption2").css("opacity", "1");
      }, 
      function() {
          $(this).find(".play-caption2").css("opacity", "0");
      }
  );
});


$(window).on("load", function() {
    $(".col-img img, .col-img video").hover(
        function() {
            $(this).closest(".column").find(".caption-2").stop(true, true).fadeTo(100, 1);
        },
        function() {
            $(this).closest(".column").find(".caption-2").stop(true, true).fadeTo(100, 0);
        }
    );
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
