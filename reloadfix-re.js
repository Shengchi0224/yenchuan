function resetWebflow() {
  console.log('Resetting Webflow...');
  
  // Check if Webflow exists
  if (window.Webflow) {
    // Destroy Webflow to reset it
    window.Webflow.destroy();
    
    // Let's ensure Webflow is ready and then initialize it
    const intervalId = setInterval(() => {
      if (window.Webflow.ready) {
        window.Webflow.ready();

        // Initialize interactions
        if (window.Webflow.require('ix2')) {
          window.Webflow.require('ix2').init();
          console.log('Interactions 2.0 (ix2) initialized');
        } else {
          console.log('Interactions 2.0 (ix2) not available');
        }

        clearInterval(intervalId);
      } else {
        console.log('Waiting for Webflow to be ready...');
      }
    }, 100); // Try every 100ms
  } else {
    console.log('Webflow not available');
  }
}

// Function to load Lottie animation
function loadLottieAnimation() {
    // Replace 'your-animation-element-id' with the actual ID of the element containing your Lottie animation
    var animationElement = document.getElementById('lottie-container');

    // Play the Lottie animation using Webflow's API
    if (animationElement) {
        // Replace 'w-lightbox-show' with the class used to trigger the animation in Webflow
        animationElement.classList.add('w-lightbox-show');
    }
}

function reloadGSAP() {
    // Reload GSAP library
    const gsapScript = document.querySelector('script[src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"]');
    const newScript = document.createElement('script');
    newScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js';

    newScript.onload = function() {
        console.log('GSAP library reloaded!');
        // You can perform any additional logic here after the library is reloaded
    };

    if (gsapScript) {
        gsapScript.parentNode.replaceChild(newScript, gsapScript);
    } else {
        // If the existing script tag is not found, append the new script to the document head
        document.head.appendChild(newScript);
    }
}


function animateText() {
  // Animate text elements using GSAP
  const textrev = gsap.timeline();

  textrev.from('.hero_text', 1.8, {
    y: 200,
    ease: 'power4.out',
    delay: 1,
    skewY: 10,
    stagger: {
      amount: 0.4,
    },
  });

  gsap.fromTo(
    '.text',
    {
      y: '100%',
      skewY: 10,
    },
    {
      duration: 2,
      ease: 'power4.out',
      y: '0%',
      stagger: 0.2,
      skewY: 0,
    }
  );
}
function loadReCaptcha() {
  // Check if the reCAPTCHA script is already loaded
  const recaptchaScriptTag = document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]');
  
  if (!recaptchaScriptTag) {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = onReCaptchaScriptLoad; // Set callback for when script is loaded
    document.body.appendChild(script);
  } else {
    // If the script is already present, attempt to re-render the reCAPTCHA
    onReCaptchaScriptLoad();
  }
}

function onReCaptchaScriptLoad() {
  console.log('reCAPTCHA script loaded or already present.');

  // Explicitly render reCAPTCHA for the specific site key
  // This assumes grecaptcha is available and your page has elements prepared for reCAPTCHA
  renderReCaptcha();
}

// Function to populate current date in the hidden input field
function populateCurrentDate() {
  let submissionDateField = document.getElementById("submissionDate");
  if (submissionDateField) {
    let currentDate = new Date();
    let dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][currentDate.getDay()];
    let dateStr = `${currentDate.toLocaleDateString()} (${dayOfWeek})`;
    submissionDateField.value = dateStr;
  } else {
    console.log('submissionDate element not found on this page.');
  }
}

// Function to be called after each Barba.js transition
function handleBarbaTransition() {
  // Populate the submission date if on the contact page
  populateCurrentDate();
}

// Initial call for page load
document.addEventListener("DOMContentLoaded", function() {
  populateCurrentDate();
});


function renderReCaptcha() {
  // Ensure grecaptcha is loaded
  if (typeof grecaptcha !== 'undefined') {
    // Find all reCAPTCHA elements by class
    document.querySelectorAll('.g-recaptcha').forEach(function(element) {
      // Check if the element already has a rendered reCAPTCHA to avoid duplicating it
      if (!element.innerHTML.trim()) {
        // Use the 'data-sitekey' attribute of the element to initialize the reCAPTCHA
        grecaptcha.render(element, {
          'sitekey': element.getAttribute('data-sitekey')
        });
      }
    });
  } else {
    console.log('grecaptcha not defined.');
  }
}


function replayVideos() {
  const videos = document.querySelectorAll("#myVideo, #myVideo-1, #hero-bgvids, #hero-bgvids-1");
  videos.forEach((video) => {
    // Check if the element is an HTML video element with the play method
    if (video instanceof HTMLVideoElement && typeof video.play === "function") {
      video.currentTime = 0; // Reset the current time to the beginning
      video.play(); // Start playing the video
    }
  });
}

function toggleModal() {
  const btns = document.querySelectorAll('.tutorial-video_wrap');
  const modals = document.querySelectorAll('.tutorial_wrap');
  const layouts = document.querySelectorAll('.product__flavors__fixed__scroll__layout');
  const closeBtns = document.querySelectorAll('.close_btn');

  if (btns.length === modals.length && btns.length === layouts.length && btns.length === closeBtns.length) {
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function() {
        openModal(i);
      });
      closeBtns[i].addEventListener('click', function() {
        closeModal(i);
      });
    }
  } else {
    console.log('Array lengths are not equal. Check if all elements are present.');
  }

  function openModal(index) {
    if (modals[index] && layouts[index]) {
      modals[index].style.display = 'flex';
      layouts[index].style.zIndex = '999';
    }
  }

  function closeModal(index) {
    if (modals[index] && layouts[index]) {
      modals[index].style.display = 'none';
      layouts[index].style.zIndex = '3';
    }
  }
}

function checkIfScriptsAreLoaded() {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const gsap = window.gsap;
      const Webflow = window.Webflow;

      if (gsap && Webflow) {
        // Both GSAP and Webflow are loaded, we can stop checking
        clearInterval(interval);
        resolve();
      }
    }, 100); // Check every 100 milliseconds
  });
}

function reloadJS() {
  resetWebflow();  
  reloadGSAP();
    // Wait for DOM to be ready
  $(document).ready(function() {
    // Animate elements using GSAP
    animateText();

    // Check if Webflow and Interactions 2.0 are initialized
    if (window.Webflow && window.Webflow.require('ix2').ready) {
      console.log('Interactions 2.0 (ix2) is initialized');
    } else {
      console.log('Interactions 2.0 (ix2) is not initialized');
    }
    replayVideos();
    toggleModal();
    new Splide('.splide', {
            perPage: 4,
            perMove: 1,
            focus: 0,
            type: 'loop',
            gap: '2.66%',
            arrows: 'slider',
            pagination: 'slider',
            speed: 600,
            dragAngleThreshold: 30,
            autoWidth: false,
            rewind: false,
            rewindSpeed: 400,
            waitForTransition: false,
            updateOnMove: true,
            trimSpace: false,
            breakpoints: {
                991: {
                    // Tablet
                    perPage: 2,
                    gap: '3vw',
                },
                767: {
                    // Mobile Landscape
                    perPage: 1,
                    gap: '2.5vw',
                    autoWidth: true, // for cards with differing widths
                },
                479: {
                    // Mobile Portrait
                    perPage: 1,
                    gap: '2.5vw',
                    autoWidth: true, // for cards with differing widths
                },
            },
        }).mount();
      setTimeout(loadLottieAnimation, 3000);
      });   
    }

    // Call the necessary functions when the page is loaded
    function initial() {
        animateText();
        reloadGSAP();
        resetWebflow();
        replayVideos();
        toggleModal();
        new Splide('.splide', {
            perPage: 4,
            perMove: 1,
            focus: 0,
            type: 'loop',
            gap: '2.66%',
            arrows: 'slider',
            pagination: 'slider',
            speed: 600,
            dragAngleThreshold: 30,
            autoWidth: false,
            rewind: false,
            rewindSpeed: 400,
            waitForTransition: false,
            updateOnMove: true,
            trimSpace: false,
            breakpoints: {
                991: {
                    // Tablet
                    perPage: 2,
                    gap: '3vw',
                },
                767: {
                    // Mobile Landscape
                    perPage: 1,
                    gap: '2.5vw',
                    autoWidth: true, // for cards with differing widths
                },
                479: {
                    // Mobile Portrait
                    perPage: 1,
                    gap: '2.5vw',
                    autoWidth: true, // for cards with differing widths
                },
            },
        }).mount();
        setTimeout(loadLottieAnimation, 3000);
    }

    // Call the initial function when the page is loaded
    window.addEventListener("DOMContentLoaded", () => {
       console.log('DOMContentLoaded - Initial function called');
       initial();
    });

// Use the barba.hooks.after event to execute the necessary functions when the transition is completed
barba.hooks.after((data) => {
  console.log('barba.hooks.after - Current:', data.current);
  console.log('barba.hooks.after - Next:', data.next);

  // Perform necessary actions after page transition
  $(window).scrollTop(0);

  if (data.current.container) {
    // Page transition occurred
    console.log('Page transition occurred');

    // Check if all scripts are loaded
    checkIfScriptsAreLoaded().then(() => {
      // Now you can call your functions
      reloadJS();
      loadReCaptcha();
      resetWebflow();

      handleBarbaTransition();
    });
  }
});
