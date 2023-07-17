window.addEventListener("DOMContentLoaded", () => {
  const _config = {
    "3d": false,
    dim_x: 30,
    dim_y: 20,
    dim_z: 20,
    spacing: 2,
    type: "LINES",
    size: 3,
    color: "SOLID",
    refresh: update
  };

  const obj = new X.object();
  const renderer = new X.renderer3D();
  renderer.init();
  renderer.add(obj);
  renderer.camera.position = [0, 0, 30];
  renderer.render();

  function update() {
    function prepareObj(obj, conf) {
      const { size } = conf;
      const dims = conf.dim_x * conf.dim_y * conf.dim_z;

      obj.points = new X.triplets(6 * dims);
      obj.normals = new X.triplets(6 * dims);
      if (conf.color != "SOLID") {
        obj.colors = new X.triplets(6 * dims);
      } else {
        obj.colors = null;
      }

      obj.type = conf.type;
      obj.linewidth = size;
      obj.pointsize = size;
    }

    function drawObj(obj, conf) {
      const p = [[-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]];
      const { spacing } = conf;
      const h_x = conf.dim_x / 2;
      const h_y = conf.dim_y / 2;
      let h_z = conf.dim_z / 2;

      if (!conf["3d"]) {
        h_z = 0.5;
      }

      for (let i = -h_x; i < h_x; ++i) {
        for (let j = -h_y; j < h_y; ++j) {
          for (let k = -h_z; k < h_z; ++k) {
            const p2 = p[Math.floor(Math.random() * p.length)];
            const [x, x2] = [p2[0] + i * spacing, -p2[0] + i * spacing];
            const [y, y2] = [p2[1] + j * spacing, -p2[1] + j * spacing];
            let [z, z2] = [p2[2] + k * spacing, -p2[2] + k * spacing];

            if (!conf["3d"]) {
              z = z2 = 0;
            }

            obj.points.add(x, y, z);
            obj.points.add(x2, y2, z2);

            obj.normals.add(0, 0, 0);
            obj.normals.add(0, 0, 0);

            if (conf.color == "QUADRANT") {
              obj.colors.add(x, y, z);
              obj.colors.add(x2, y2, z2);
            } else if (conf.color == "SEGMENT") {
              obj.colors.add(p2[0], p2[1], p2[2]);
              obj.colors.add(-p2[0], -p2[1], -p2[2]);
            }
          }
        }
      }
    }

    prepareObj(obj, _config);
    drawObj(obj, _config);
    obj.modified();
  }

  function gui() {
    function appendGUIHooks(gui) {
      for (c in gui.__controllers) {
        gui.__controllers[c].onFinishChange(update);
      }
    }

    const gui = new dat.GUI();
    gui.add(_config, "3d");
    gui.add(_config, "dim_x", 1, 100);
    gui.add(_config, "dim_y", 1, 100);
    gui.add(_config, "dim_z", 1, 100);
    gui.add(_config, "spacing", 1, 10);
    gui.add(_config, "size", 1, 10);
    gui.add(_config, "color", ["SOLID", "SEGMENT", "QUADRANT"]);
    gui.add(_config, "type", ["LINES", "POINTS", "TRIANGLES"]);
    gui.add(_config, "refresh");

    appendGUIHooks(gui);
  }

  update();
  gui();
});
