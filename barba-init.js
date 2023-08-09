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
      display:"block",
      opacity: 1,
      borderRadius: "0px",
      backgroundColor: "#522c18",
      y: '100%',
    },
    {
      duration: 1,
      ease: "power2.out",
      y: '0%',
    }
  );
}

function enterAnimation() {
  gsap.fromTo(
    ".loading-screen",
    {
      y: '0%',
    },
    {
      borderRadius: "20px",
      duration: 1.5,
      y: '70%',
      ease: "power2.out",
      backgroundColor: "white",
      onComplete: () => {
        gsap.to(".loading-screen", {
          opacity: 0,
          display:"none",
        });
      },
    }
  );
}

function enterAnimation1() {
  gsap.fromTo(
    ".loading-screen",
    {
      y: '0%',
    },
    {
      duration: 1.5,
      y: '100%',
      ease: "power2.out",
      backgroundColor: "white",
      onComplete: () => {
        gsap.to(".loading-screen", {
          opacity: 0,
          display:"none",
        });
      },
    }
  );
}

function getScreenWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function enterAnimation2() {
  const screenWidth = getScreenWidth();
  let yValue = '30%';

  if (screenWidth < 768) {
    yValue = `+=17rem`;
  }

  gsap.fromTo(
    ".loading-screen",
    {
      y: '0%',
    },
    {
      duration: 1.5,
      y: yValue,
      ease: "power2.out",
      backgroundColor: "white",
      onComplete: () => {
        gsap.to(".loading-screen", {
          opacity: 0,
          display: "none",
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
        await delay(200);
        enterAnimation1();
      },
    },
    {
      preventRunning: true,
      name: "Animationsmall",
      to: {
        namespace: ["small"],
      },
      async leave(data) {
        leaveAnimation();
        await delay(1000);
      },
      async after(data) {
        enterAnimation2();
      },
      async once(data) {
        await delay(200);
        enterAnimation2();
      },
    },
  ],
});
