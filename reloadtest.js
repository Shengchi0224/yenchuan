function resetWebflow() {
    // Reset Webflow functionality
    let webflowPageId = $('html').attr('data-wf-page');
    const parser = new DOMParser();
    const dom = parser.parseFromString('<!doctype html><body>' + webflowPageId, 'text/html');
    webflowPageId = $(dom).find('body').text();
    $('html').attr('data-wf-page', webflowPageId);
    window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
    window.Webflow && window.Webflow.require('ix2').init();
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

function animateElements() {
    // Animate elements using GSAP
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
        '.text', {
            y: '100%',
            skewY: 10,
        }, {
            duration: 2,
            ease: 'power4.out',
            y: '0%',
            stagger: 0.2,
            skewY: 0,
        }
    );
}
function reloadvids() {
   const video = document.getElementById("bgvid");
    
    video.addEventListener("ended", function() {
  // Replay the video
  video.currentTime = 0; // Reset the current time to the beginning
  video.play(); // Start playing the video
});
}
function reloadJS() {
    resetWebflow();
    reloadGSAP();
    animateElements();
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
       reloadvids();
    }

    // Call the necessary functions when the page is loaded
    function initial() {
        animateElements();
        reloadGSAP();
        resetWebflow();
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
    });
