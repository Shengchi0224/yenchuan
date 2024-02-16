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
      display: "block",
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
          display: "none",
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
{
    preventRunning: true,
    name: "SharedAnimation",
    to: {
        namespace: "contact", // Only applies to "contact" namespace
    },
    async leave(data) { // Mark the leave method as async
        // Your existing leave animation
        leaveAnimation();
        await delay(1000);
    },
    async after(data) {
        // Load reCAPTCHA script dynamically only for "contact" page
        if (data.url.includes('contact')) {
            if (!window.grecaptcha) {
                const siteKey = '6Lf2_fknAAAAAKHiN9BDQzp5RE-6oJzDWtKbu3co'; // Replace 'YOUR_SITE_KEY' with your actual reCAPTCHA site key
                const script = document.createElement('script');
                script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
                script.async = true;
                document.body.appendChild(script);

                await new Promise((resolve) => {
                    window.onRecaptchaApiLoaded = resolve;
                });
            }

            // Initialize reCAPTCHA on form submission
            const form = document.getElementById('email-form-2'); // Replace with your actual form ID
            form.addEventListener('submit', async (event) => {
                event.preventDefault();

                if (!window.grecaptcha) {
                    console.error('reCAPTCHA API not loaded yet');
                    return;
                }

                const token = await grecaptcha.execute();

                // Send form data and reCAPTCHA token to your server-side endpoint
                const response = await fetch('/contact', {
                    method: 'POST',
                    body: JSON.stringify({
                        formData: new FormData(form),
                        token
                    })
                });

                if (response.ok) {
                    // Handle successful submission (e.g., redirect, show confirmation)
                    alert('Form submitted successfully');
                } else {
                    // Handle errors (e.g., display error message)
                    const error = await response.text();
                    console.error('Error submitting form:', error);
                }
            });
        }

        // Shared animation for both "contact" and "small"
        enterAnimation2(); // Or use desired animation function
    }
}
  ],
});
