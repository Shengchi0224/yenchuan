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
  tl.fromTo(".loading-screen", {
    opacity: 1,
    borderRadius: '0px',
    backgroundColor: "#522c18",
    y:"-100vh",
  },
  {
    duration: 1,
    ease: "Power2.out",
    y:"0vh",
  });
}

function enterAnimation() {
  const tl = gsap.timeline();
  tl.fromTo(
    ".loading-screen",
    {
     y:"0vh",
    },
    {
      borderRadius: '40px',
      duration: 1,
      y:"-70vh",
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

function enterAnimation1() {
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

barba.use(barbaPrefetch);
barba.init({
  transitions: [
    {
      preventRunning: true,
      name: 'opacity-transition',
      async leave(data) {
        leaveAnimation();
        await delay(1000);
      },
      async after(data) {
        enterAnimation();
      },
      async once(data) {
        enterAnimation();
      }
    },
  ],
});
