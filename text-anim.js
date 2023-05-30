 // Your animation code here
        var texts = ["Enjoynable", "Memorable"];
        var morphTime = 1;
        var cooldownTime = 0.25;
        var textIndex = texts.length - 1;
        var time = new Date();
        var morph = 0;
        var cooldown = cooldownTime;

        var elts = {
          text1: document.getElementById("text1"),
          text2: document.getElementById("text2")
        };

        function doMorph() {
          morph -= cooldown;
          cooldown = 0;

          var fraction = morph / morphTime;

          if (fraction > 1) {
            cooldown = cooldownTime;
            fraction = 1;
          }

          setMorph(fraction);
        }

        function setMorph(fraction) {
     function setMorph(fraction) {
      elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      
      fraction = 1 - fraction;
      elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      
      elts.text1.textContent = texts[textIndex % texts.length];
      elts.text2.textContent = texts[(textIndex + 1) % texts.length];
    }

        function doCooldown() {
          morph = 0;

          elts.text2.style.filter = "";
          elts.text2.style.opacity = "100%";

          elts.text1.style.filter = "";
          elts.text1.style.opacity = "0%";
        }

        function animate() {
          requestAnimationFrame(animate);

          var newTime = new Date();
          var shouldIncrementIndex = cooldown > 0;
          var dt = (newTime - time) / 1500;
          time = newTime;

          cooldown -= dt;

          if (cooldown <= 0) {
            if (shouldIncrementIndex) {
              textIndex++;
            }

            doMorph();
          } else {
            doCooldown();
          }
        }
      if (window.location.pathname === '/') {
        animate();
        }

