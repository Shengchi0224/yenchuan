// custom.js
function resetWebflow() {
  // Reset Webflow functionality
  let webflowPageId = $('html').attr('data-wf-page');
  const parser = new DOMParser();
  const dom = parser.parseFromString('<!doctype html><body>' + webflowPageId, 'text/html');
  webflowPageId = $(dom).find('body').text();
  $('html').attr('data-wf-page', webflowPageId);
  console.log('Document reloaded');
  
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

let gui = null;

function createGui() {
  if (!gui) {
    gui = new dat.GUI();
    reloadgui();
  }
}

function destroyGui() {
  // Destroy the dat.gui instance
  console.log('Destroying GUI');
  if (gui) {
    gui.destroy();
    gui = null;
    console.log('GUI destroyed');
  }
}

function reloadJS() {
    resetWebflow();
    reloadGSAP();
    animateElements();
    if (window.location.pathname !== '/') {
    destroyGui();
    } else {
     createGui();
    }
}

// Call the necessary functions when the page is loaded
function initial() {
    resetWebflow();
    reloadGSAP();
    animateElements();
    if (window.location.pathname !== '/') {
    destroyGui();
    } else {
    createGui();
    }
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
