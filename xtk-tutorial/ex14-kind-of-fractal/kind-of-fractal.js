window.addEventListener("DOMContentLoaded", () => {
  const base = 60;
  const triplets = (base ** 3) * 3;

  const obj = new X.object();
  obj.points = new X.triplets(triplets);
  obj.normals = new X.triplets(triplets);
  obj.colors = new X.triplets(triplets);
  obj.type = 'POINTS';

  const renderer = new X.renderer3D();
  renderer.init();

  for (let x = 0; x < base; x++) {
    for (let y = 0; y < base; y++) {
      for (let z = 0; z < base; z++) {
        obj.points.add(x, y, z);
        obj.normals.add(1, 1, 1);
        obj.colors.add(x, y, z);
      }
    }
  }

  renderer.add(obj);
  renderer.camera.position = [-400, -400, -500];
  renderer.render();
});
