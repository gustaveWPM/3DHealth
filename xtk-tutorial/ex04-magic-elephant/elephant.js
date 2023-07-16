window.addEventListener("DOMContentLoaded", () => {
  function getMagicElephantInstance() {
    const elephant = new X.mesh();
    elephant.file = './models/elephant-body.stl';
    elephant.magicmode = true;
    elephant.caption = 'The magic elephant!';

    return elephant;
  }

  const renderer = new X.renderer3D();
  const elephant = getMagicElephantInstance();

  renderer.init();
  renderer.add(elephant);
  renderer.render();
});
