function delay(time = 2000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

function leaveAnimation() {
  console.log("leave");
  gsap.fromTo(
    ".loading-screen",
    {
      opacity: 1,
      borderRadius: "0px",
      backgroundColor: "#522c18",
      y: '100%',
    },
    {
      duration: 1,
      ease: "power2.out",
      y: 0,
    }
  );
}

function enterAnimation() {
  gsap.fromTo(
    ".loading-screen",
    {
      y: 0,
    },
    {
      borderRadius: "40px",
      duration: 1.5,
      y: '70%',
      ease: "power2.out",
      backgroundColor: "white",
      onComplete: () => {
        gsap.to(".loading-screen", {
          opacity: 0,
          display:none,
        });
      },
    }
  );
}

function enterAnimation1() {
  gsap.fromTo(
    ".loading-screen",
    {
      y: 0,
    },
    {
      duration: 1.5,
      y: '100%',
      ease: "power2.out",
      backgroundColor: "white",
      onComplete: () => {
        gsap.to(".loading-screen", {
          opacity: 0,
          display:none,
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
      name: "opacity-transition",
      async leave(data) {
        leaveAnimation();
        await delay(1000);
      },
      async after(data) {
        enterAnimation();
      },
      async once(data) {
        enterAnimation();
      },
    },
    {
      preventRunning: true,
      name: "Animationhome",
      to: {
        namespace: ["full"],
      },
      async leave(data) {
        leaveAnimation();
        await delay(1000);
      },
      async after(data) {
        enterAnimation1();
      },
      async once(data) {
        enterAnimation1();
      },
    },
  ],
});
