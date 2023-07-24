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

function reloadFinsweet() {
  // Reload Finsweet attribute sort library
  const cmssortScript = document.querySelector('script[src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmssort@1/cmssort.js"]');
  const newCmssortScript = document.createElement('script');
  newCmssortScript.src = 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmssort@1/cmssort.js';

  if (cmssortScript) {
    cmssortScript.parentNode.replaceChild(newCmssortScript, cmssortScript);
  } else {
    // If the existing script tag is not found, append the new script to the document head
    document.head.appendChild(newCmssortScript);
  }

  // Reload Finsweet attribute filter library
  const cmsfilterScript = document.querySelector('script[src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsfilter@1/cmsfilter.js"]');
  const newCmsfilterScript = document.createElement('script');
  newCmsfilterScript.src = 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsfilter@1/cmsfilter.js';

  if (cmsfilterScript) {
    cmsfilterScript.parentNode.replaceChild(newCmsfilterScript, cmsfilterScript);
  } else {
    // If the existing script tag is not found, append the new script to the document head
    document.head.appendChild(newCmsfilterScript);
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

function animateScrollTrigger() {
  const productTextWrapper = document.querySelector('.products__flavors__text__wrapper');
  const triggerElement = '.slide_panel';

  // Initialize ScrollTrigger for the current page
  gsap.to(productTextWrapper, {
    scrollTrigger: {
      trigger: triggerElement,
      markers: true,
      start: '95% center',
      end: 'bottom center',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const translateY = progress * -15;
        productTextWrapper.style.transform = `translateY(${translateY}rem)`;
      },
    },
  });

  // Add the trigger element to the ScrollTrigger array for cleanup on page transition
  ScrollTrigger.saveStyles(triggerElement);
  ScrollTrigger.saveStyles(productTextWrapper);

  ScrollTrigger.getAll().forEach((t) => t.kill());
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

function reloadJS() {
  resetWebflow();  
  reloadGSAP();
  reloadFinsweet();
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
    animateScrollTrigger();
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
      });   
    }

    // Call the necessary functions when the page is loaded
    function initial() {
        animateText();
        animateScrollTrigger();
        reloadGSAP();
        reloadFinsweet();
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

       if (data.current) {
            // Page transition occurred
            console.log('Page transition occurred');
            reloadJS();
        } else {
            // Initial page load
            console.log('Initial page load');
            initial();
        }
      // Refresh the ScrollTrigger after the page transition
    gsap.delayedCall(0.5, ScrollTrigger.refresh); // Delayed call to ensure the content is fully loaded
    });
