window.addEventListener("DOMContentLoaded", () => {
  function getCubeInstance(x, z) {
    const cube = new X.cube();
    cube.center = [x * 3, 0, z * 3];
    cube.lengthX = cube.lengthY = cube.lengthZ = 2;
    cube.color = [150 % x, 1, 150 % z];

    return cube;
  }

  function appendCubes(renderer) {
    for (let rows = 0; rows < 20; rows++) {
      for (let columns = 0; columns < 50; columns++) {
        const currentCube = getCubeInstance(columns, rows);
        renderer.add(currentCube);
      }
    }
  }

  const renderer = new X.renderer3D();
  const onRenderFn = () => renderer.camera.rotate([1, 0]);

  renderer.init();
  appendCubes(renderer);

  renderer.render();
  renderer.onRender = onRenderFn;
});
