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
        // Check the namespace of the next page and apply specific logic
        switch (data.next.namespace) {
          case 'contact':
            enterAnimation2(); // Use the animation for the contact page
            renderReCaptcha(); // Render reCAPTCHA specifically for the contact page
            break;
          case 'full':
            enterAnimation1(); // Use the animation intended for 'full' namespace
            break;
          case 'small':
            enterAnimation2(); // Use the animation intended for 'small' namespace
            break;
          default:
            enterAnimation(); // Default animation for any other pages
            break;
        }
      },
      async once(data) {
        // Handle the initial load with similar logic
        if (data.next.namespace === 'contact') {
          enterAnimation2();
          renderReCaptcha();
        } else if (data.next.namespace === 'full') {
          enterAnimation1();
        } else if (data.next.namespace === 'small') {
          enterAnimation2();
        } else {
          enterAnimation();
        }
      },
    },
  ],
});

function renderReCaptcha() {
  // Ensure reCAPTCHA is rendered only for the contact page
  if (document.querySelector('.g-recaptcha')) {
    window.grecaptcha?.render('g-recaptcha', {
      'sitekey': '6Lf2_fknAAAAAKHiN9BDQzp5RE-6oJzDWtKbu3co'
    });
  }
}
