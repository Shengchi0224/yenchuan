function resetWebflow() {
  // Reset Webflow functionality
  let webflowPageId = $('html').attr('data-wf-page');
  const parser = new DOMParser();
  const dom = parser.parseFromString('<!doctype html><body>' + webflowPageId, 'text/html');
  webflowPageId = $(dom).find('body').text();
  $('html').attr('data-wf-page', webflowPageId);
  window.Webflow && window.Webflow.destroy();
  window.Webflow && window.Webflow.ready();
  window.Webflow && window.Webflow.require('ix2').init();
}

function reloadGSAP() {
  // Reload GSAP library
  const gsapScript = document.querySelector('script[src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"]');
  const newScript = document.createElement('script');
  newScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js';

  newScript.onload = function() {
    console.log('GSAP library reloaded!');
    // You can perform any additional logic here after the library is reloaded
  };

  if (gsapScript) {
    gsapScript.parentNode.replaceChild(newScript, gsapScript);
  } else {
    // If the existing script tag is not found, append the new script to the document head
    document.head.appendChild(newScript);
  }
}

function animateElements() {
  // Animate elements using GSAP
  const textrev = gsap.timeline();

  textrev.from('.hero_text', 1.8, {
    y: 200,
    ease: 'power4.out',
    delay: 1,
    skewY: 10,
    stagger: {
      amount: 0.4,
    },
  });

  gsap.fromTo(
    '.text',
    {
      y: '100%',
      skewY: 10,
    },
    {
      duration: 2,
      ease: 'power4.out',
      y: '0%',
      stagger: 0.2,
      skewY: 0,
    }
  );
}

var arr = [];
var can = null;
var ctx = null;
var grid = [];
let drag = 1000;
var settings = {
  "grid size": 5,
  circles: 80,
  delay: 50,
  show: false,
};
var settings_copy = {};

function createGui() {
  var g = new dat.GUI();
  g.add(settings, "grid size", 3, 30).step(1);
  g.add(settings, "circles", 1, 100).step(1);
  g.add(settings, "delay", 1, 1000).step(1);
  g.add(settings, "show");

  initCanvas();
  setup();
  draw();
}

function destroyGui() {
  // Destroy the dat.gui instance
  var guiElement = document.querySelector('.dg');
  if (guiElement) {
    guiElement.remove();
    console.log('Destroying dat.gui instance');
  }
}

function reloadgui() {
  // Reload the dat.gui library and recreate the GUI interface
  destroyGui();
  createGui();
}

class Circle {
  constructor() {
    this.x = 50 + ~~(Math.random() * (can.width - 100));
    this.y = 50 + ~~(Math.random() * (can.height - 100));
    this.radius = 10 + ~~(Math.random() * 20);
    this.target = {
      x: can.width / 2,
      y: can.height / 2,
    };
    this.directions = [1, -1];
    this.vel = {
      x: 3 * Math.random() * this.directions[~~(Math.random() * 2)],
      y: 3 * Math.random() * this.directions[~~(Math.random() * 2)],
    };
  }
  update() {
    this.vel.x = (-this.x + this.target.x) / (drag * (this.radius / 15) / 10);
    this.vel.y = (-this.y + this.target.y) / (drag * (this.radius / 15) / 10);
    this.x += this.vel.x;
    this.y += this.vel.y;
  }
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  }
}

function initCanvas() {
  can = document.getElementById("can");
  ctx = can.getContext("2d");
}

function setup() {
  arr = [];
  grid = [];
  for (var i = arr.length; i < settings.circles; ++i) {
    var circ = new Circle();
    arr.push(circ);
  }
  for (var i = 0; i < can.width; i += settings["grid size"]) {
    grid.push([]);
    for (var j = 0; j < can.height; j += settings["grid size"]) {
      grid[i / settings["grid size"]].push(0.0);
    }
  }
}

function lerp(p1, p2) {
  return {
    x: p2.x + (p1.x - p2.x) * ((1.0 - grid[p2.x / settings["grid size"]][p2.y / settings["grid size"]]) / (grid[p1.x / settings["grid size"]][p1.y / settings["grid size"]] - grid[p2.x / settings["grid size"]][p2.y / settings["grid size"]])),
    y: p2.y + (p1.y - p2.y) * ((1.0 - grid[p2.x / settings["grid size"]][p2.y / settings["grid size"]]) / (grid[p1.x / settings["grid size"]][p1.y / settings["grid size"]] - grid[p2.x / settings["grid size"]][p2.y / settings["grid size"]])),
  };
}

function v_to_b(v1, v2, v3, v4) {
  //variable to binary
  return v4 + (v3 << 1) + (v2 << 2) + (v1 << 3);
}

function draw() {
  try {
    if (JSON.stringify(settings_copy) != JSON.stringify(settings)) {
      setup();
      settings_copy = Object.assign({}, settings);
    }
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, can.width, can.height);
    for (var i = 0; i < settings.circles; ++i) {
      arr[i].update(i);
      settings.show && arr[i].draw();
    }
    for (var i = 0; i < can.width; i += settings["grid size"]) {
      for (var j = 0; j < can.height; j += settings["grid size"]) {
        var v = 0;
        for (var k = 0; k < settings.circles; ++k) {
          v += (arr[k].radius * arr[k].radius) / (((arr[k].x - i) * (arr[k].x - i)) + ((arr[k].y - j) * (arr[k].y - j)));
        }
        grid[(i / settings["grid size"])][(j / settings["grid size"])] = v;
      }
    }
    var threshold = 1.0;
    for (var i = 0; i < can.width - settings["grid size"]; i += settings["grid size"]) {
      for (var j = 0; j < can.height - settings["grid size"]; j += settings["grid size"]) {
        var a = grid[i / settings["grid size"]][j / settings["grid size"]] >= threshold;
        var b = grid[i / settings["grid size"]][(j + settings["grid size"]) / settings["grid size"]] >= threshold;
        var c = grid[(i + settings["grid size"]) / settings["grid size"]][(j + settings["grid size"]) / settings["grid size"]] >= threshold;
        var d = grid[(i + settings["grid size"]) / settings["grid size"]][j / settings["grid size"]] >= threshold;
        if (a + b + c + d == 0 || a + b + c + d == 4) continue;
        var ap = {
          x: i,
          y: j,
        };
        var bp = {
          x: i,
          y: j + settings["grid size"],
        };
        var cp = {
          x: i + settings["grid size"],
          y: j + settings["grid size"],
        };
        var dp = {
          x: i + settings["grid size"],
          y: j,
        };
        var p1, p2, p3, p4, temp;
        var v = v_to_b(a, b, c, d);
        if (v == 8 || v == 7) {
          temp = lerp(ap, dp);
          p1 = {
            x: temp.x,
            y: temp.y,
          };
          temp = lerp(ap, bp);
          p2 = {
            x: temp.x,
            y: temp.y,
          };
        } else if (v == 4 || v == 11) {
          temp = lerp(bp, ap);
          p1 = {
            x: temp.x,
            y: temp.y,
          };
          temp = lerp(bp, cp);
          p2 = {
            x: temp.x,
            y: temp.y,
          };
        } else if (v == 2 || v == 13) {
          temp = lerp(cp, bp);
          p1 = {
            x: temp.x,
            y: temp.y,
          };
          temp = lerp(cp, dp);
          p2 = {
            x: temp.x,
            y: temp.y,
          };
        } else if (v == 1 || v == 14) {
          temp = lerp(dp, cp);
          p1 = {
            x: temp.x,
            y: temp.y,
          };
          temp = lerp(dp, ap);
          p2 = {
            x: temp.x,
            y: temp.y,
          };
        } else if (v == 12 || v == 3) {
          temp = lerp(ap, dp);
          p1 = {
            x: temp.x,
            y: temp.y,
          };
          temp = lerp(bp, cp);
          p2 = {
            x: temp.x,
            y: temp.y,
          };
        } else if (v == 9 || v == 6) {
          temp = lerp(ap, bp);
          p1 = {
            x: temp.x,
            y: temp.y,
          };
          temp = lerp(dp, cp);
          p2 = {
            x: temp.x,
            y: temp.y,
          };
        }
        if (p1 != undefined && p2 != undefined) {
          ctx.beginPath();
          ctx.strokeStyle = "#D2AD7A";
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
  requestAnimationFrame(draw);
}

function resize() {
  can.width = window.innerWidth;
  can.height = window.innerHeight;
  setup();
}

window.addEventListener("resize", resize);

can.addEventListener("mousemove", function(e) {
  for (var i = 0; i < settings.circles; ++i) {
    function timeout(i) {
      setTimeout(function() {
        if (i < arr.length)
          arr[i].target = {
            x: e.clientX,
            y: e.clientY,
          };
      }, i * settings.delay);
    }
    timeout(i);
  }
});

can.addEventListener("touchmove", function(e) {
  for (var i = 0; i < settings.circles; ++i) {
    function timeout(i) {
      setTimeout(function() {
        if (i < arr.length)
          arr[i].target = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
          };
      }, i * settings.delay);
    }
    timeout(i);
  }
});

function reloadJS() {
  resetWebflow();
  reloadGSAP();
  animateElements();
  // Additional JavaScript code to reload can be added here
}

function initial() {
  animateElements();
  reloadGSAP();
  resetWebflow();
  createGui();
}

window.addEventListener("DOMContentLoaded", initial);

barba.hooks.after((data) => {
  window.scrollTo(0, 0);

  if (data.current) {
    reloadJS();
  } else {
    initial();
  }
});

// Call the necessary functions when the page is loaded
function onPageLoad() {
  resize();
  initial();
}

onPageLoad();
