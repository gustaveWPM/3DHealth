window.addEventListener("DOMContentLoaded", () => {
  function getSkullInstance() {
    const skull = new X.mesh();
    skull.file = 'http://x.babymri.org/?skull.vtk';
    skull.magicmode = true;
    skull.opacity = 0.7;

    return skull;
  }

  const skull = getSkullInstance();
  const renderer = new X.renderer3D();
  const onRenderFn = () => skull.transform.rotateZ(1);

  renderer.init();
  renderer.add(skull);
  renderer.camera.position = [0, 400, 0];

  renderer.onRender = onRenderFn;

  renderer.render();
});
