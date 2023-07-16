window.addEventListener("DOMContentLoaded", () => {
  function getCubeInstance() {
    const cube = new X.cube();

    cube.lengthX = cube.lengthY = cube.lengthZ = 20;
    cube.center = [0, 0, 0];
    // cube.color = [1, 1, 1];
    cube.texture.file = './graphics/texture.png';
    return cube;
  }

  const cube = getCubeInstance();
  const renderer = new X.renderer3D();
  const onRenderFn = () => {
    cube.transform.rotateX(1);
    cube.transform.rotateY(-1);
  }

  renderer.init();
  renderer.add(cube);
  renderer.render();
  renderer.onRender = onRenderFn;
});
