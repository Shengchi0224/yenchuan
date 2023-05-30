function leaveAnimation() {
  console.log("leave");
  const tl = gsap.timeline();
  tl.to(".loading-screen", {
    duration: 1,
    height: "100vh",
    ease: "Power2.out",
  });
}

function enterAnimation() {
  const tl = gsap.timeline();
  tl.from(".loading-screen", {
    duration: 1,
    height: "30vh",
    ease: "Power2.out",
    onComplete: function() {
      opacity: 0;
    },
  });
}

barba.init({
  transitions: [
    {
      name: "page-transition",
      leave(data) {
        leaveAnimation();
      },
      enter(data) {
        enterAnimation();
      },
    },
  ],
});
