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
      y: "-100vh",
    },
    {
      duration: 1,
      ease: "power2.out",
      y: "0vh",
    }
  );
}

function enterAnimation() {
  gsap.fromTo(
    ".loading-screen",
    {
      y: "0vh",
    },
    {
      borderRadius: "40px",
      duration: 1,
      y: "-70vh",
      ease: "power2.out",
      backgroundColor: "white",
      onComplete: () => {
        gsap.to(".loading-screen", {
          opacity: 0,
        });
      },
    }
  );
}

function enterAnimation1() {
  gsap.fromTo(
    ".loading-screen",
    {
      height: "100vh",
      marginTop: "0vh",
    },
    {
      borderRadius: "40px",
      duration: 1,
      height: "30vh",
      marginTop: "70vh",
      ease: "power2.out",
      backgroundColor: "white",
      onComplete: () => {
        gsap.to(".loading-screen", {
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
  ],
});
