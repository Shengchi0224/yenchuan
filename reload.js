function resetWebflow(data) {
  let parser = new DOMParser();
  let dom = parser.parseFromString(data.next.html, "text/html");
  let webflowPageId = $(dom).find("html").attr("data-wf-page");
  $("html").attr("data-wf-page", webflowPageId);
  window.Webflow && window.Webflow.destroy();
  window.Webflow && window.Webflow.ready();
  window.Webflow && window.Webflow.require("ix2").init();
}

function reloadGSAP() {
  var gsapScript = document.querySelector(
    'script[src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"]'
  );
  var newScript = document.createElement("script");
  newScript.src =
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js";

  newScript.onload = function() {
    console.log("GSAP library reloaded!");
    // You can perform any additional logic here after the library is reloaded
  };

  if (gsapScript) {
    gsapScript.parentNode.replaceChild(newScript, gsapScript);
  } else {
    // If the existing script tag is not found, append the new script to the document body
    document.body.appendChild(newScript);
  }
}

function animateElements() {
  const textrev = gsap.timeline();

  textrev.from(".hero_text", 1.8, {
    y: 200,
    ease: "power4.out",
    delay: 1,
    skewY: 10,
    stagger: {
      amount: 0.4,
    },
  });

  gsap.fromTo(
    ".text",
    {
      y: "100%",
      skewY: 10,
    },
    {
      duration: 2,
      ease: "power4.out",
      y: "0%",
      stagger: 0.2,
      skewY: 0,
    }
  );
}

// Call the necessary functions when the page is loaded
function reloadjs() {
  animateElements();
  resetWebflow();
  reloadGSAP();
}
window.addEventListener("DOMContentLoaded", reloadjs);
