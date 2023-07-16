window.addEventListener("DOMContentLoaded", () => {
  function getCubeInstance() {
    const cube = new X.cube();

    cube.lengthX = cube.lengthY = cube.lengthZ = 20;
    cube.center = [0, 0, 0];
    cube.color = [1, 1, 1];
    return cube;
  }

  const cube = getCubeInstance();
  const renderer = new X.renderer3D();

  renderer.init();
  renderer.add(cube);
  renderer.render();
});
