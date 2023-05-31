function delay(time) {
  time = time || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, time);
  });
}

function leaveAnimation() {
  console.log("leave");
  const tl = gsap.timeline();
  tl.to(".loading-screen", {
    duration: 1,
    height: "100vh",
    ease: "Power2.out",
    marginTop: "0vh",
  });
}

function enterAnimation() {
  const tl = gsap.timeline();
  tl.fromTo(
    ".loading-screen",
    {
      height: "100vh",
      marginTop: "0vh",
    },
    {
      borderRadius: '40px',
      duration: 1,
      height: "30vh",
      marginTop: "70vh",
      ease: "Power2.out",
      backgroundColor: "white",
      onComplete: () => {
        tl.to(".loading-screen", {
          opacity: 0,
        });
      },
    }
  );
}

barba.init({
  transitions: [
    {
      preventRunning: true,
      name: 'opacity-transition',
      async beforeEnter(data) {
        leaveAnimation();
      },
      async after(data) {
        enterAnimation();
      },
    },
  ],
});
