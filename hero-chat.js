function reloadgui() {
      var can = document.getElementById("can");
      var ctx = can.getContext("2d");

      if (!ctx) {
        console.error("Canvas context not supported.");
        return;
      }

      var arr = [];
      var grid = [];
      let drag = 1000;
      var settings = {
        "grid size": 5,
        circles: 80,
        delay: 50,
        show: false,
      };

      function gui() {
        var g = new dat.GUI();
        g.add(settings, "grid size", 3, 30).step(1);
        g.add(settings, "circles", 1, 100).step(1);
        g.add(settings, "delay", 1, 1000).step(1);
        g.add(settings, "show");
      }

      gui();

      class Circle {
        constructor() {
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

      function setup() {
        arr = [];
        grid = [];
        for (var i = 0; i < settings.circles; ++i) {
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

      function draw() {
        ctx.clearRect(0, 0, can.width, can.height);
        for (var i = 0; i < grid.length; ++i) {
          for (var j = 0; j < grid[i].length; ++j) {
            grid[i][j] = 0.0;
          }
        }
        for (var i = 0; i < arr.length; ++i) {
          arr[i].update();
          arr[i].draw();
          var ix = ~~(arr[i].x / settings["grid size"]);
          var iy = ~~(arr[i].y / settings["grid size"]);
          if (ix < 0 || ix >= grid.length || iy < 0 || iy >= grid[ix].length) {
            continue;
          }
          grid[ix][iy] = 1.0;
          if (settings.show) {
            ctx.beginPath();
            ctx.strokeStyle = "#f00";
            ctx.arc(arr[i].target.x, arr[i].target.y, 5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.strokeStyle = "#00f";
            ctx.arc(arr[i].x, arr[i].y, 5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.strokeStyle = "#0f0";
            var l = lerp({
              x: arr[i].target.x,
              y: arr[i].target.y
            }, {
              x: arr[i].x,
              y: arr[i].y
            });
            ctx.arc(l.x, l.y, 5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }

      function anim() {
        setTimeout(function() {
          draw();
          requestAnimationFrame(anim);
        }, settings.delay);
      }

      setup();
      anim();
    }

    document.addEventListener("DOMContentLoaded", function(event) {
      reloadgui();
    });
