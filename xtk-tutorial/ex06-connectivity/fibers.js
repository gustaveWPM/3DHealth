window.addEventListener("DOMContentLoaded", () => {
  const fibers = new X.fibers();
  fibers.file = 'http://x.babymri.org/?cctracks.trk';
  fibers.caption = 'The Corpus Callosum:<br>connecting the two hemispheres<br>of the human brain.';

  const renderer = new X.renderer3D();
  renderer.init();
  renderer.camera.position = [0, 0, 150];

  renderer.add(fibers);
  renderer.render();
});
