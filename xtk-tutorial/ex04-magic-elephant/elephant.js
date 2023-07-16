window.addEventListener("DOMContentLoaded", () => {
  function getMagicElephantInstance() {
    const elephant = new X.mesh();
    elephant.file = './models/elephant-body.stl';
    elephant.magicmode = true;
    elephant.caption = 'The magic elephant!';

    return elephant;
  }

  const elephant = getMagicElephantInstance();

  const renderer = new X.renderer3D();
  renderer.init();
  renderer.add(elephant);
  renderer.camera.position = [200, 0, 0];
  renderer.render();
});
