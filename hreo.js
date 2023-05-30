function reloadgui() {
  var can, ctx, arr, grid, drag, settings, settings_copy, g;

  function Circle() {
    this.x = 50 + ~~(Math.random() * (can.width - 100));
    this.y = 50 + ~~(Math.random() * (can.height - 100));
    this.radius = 10 + ~~(Math.random() * 20);
    this.target = {
      x: can.width / 2,
      y: can.height / 2
    };
    this.directions = [1, -1];
    this.vel = {
      x: 3 * Math.random() * this.directions[~~(Math.random() * 2)],
      y: 3 * Math.random() * this.directions[~~(Math.random() * 2)]
    };
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
      y: p2.y + (p1.y - p2.y) * ((1.0 - grid[p2.x / settings["grid size"]][p2.y / settings["grid size"]]) / (grid[p1.x / settings["grid size"]][p1.y / settings["grid size"]] - grid[p2.x / settings["grid size"]][p2.y / settings["grid size"]]))
    };
  }

  function v_to_b(v1, v2, v3, v4) {
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
          grid[i / settings["grid size"]][j / settings["grid size"]] = v;
        }
      }
    } catch (e) {
      console.log(e);
    }
    g = requestAnimationFrame(draw);
  }

  function resize() {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
  }

  function handleMouseMove(e) {
    var ev = e.touches ? e.touches[0] : e;
    drag = {
      x: ev.pageX,
      y: ev.pageY
    };
  }

  function handleTouchMove(e) {
    e.preventDefault();
    handleMouseMove(e);
  }

  function init() {
    settings = {
      circles: 5,
      "grid size": 50,
      show: true
    };
    settings_copy = Object.assign({}, settings);
    can = document.getElementById("can");
    if (!can) {
      console.error("Canvas element not found.");
      return;
    }
    ctx = can.getContext("2d");
    if (!ctx) {
      console.error("Unable to get 2D context for canvas element.");
      return;
    }
    resize();
    setup();
    window.addEventListener("resize", resize);
    can.addEventListener("mousemove", handleMouseMove);
    can.addEventListener("touchmove", handleTouchMove);
    draw();
  }

  init();
}

window.onload = function() {
  reloadgui();
};
