window.addEventListener("DOMContentLoaded", () => {
  function getFibersInstance() {
    const fibers = new X.fibers();
    fibers.file = 'http://x.babymri.org/?cctracks.trk';

    return fibers;
  }

  function getLeftHemisphereInstance() {
    const left_hemisphere = new X.mesh();
    left_hemisphere.file = 'http://x.babymri.org/?lh.smoothwm';
    left_hemisphere.color = [0.7, 0.2, 0.2];
    left_hemisphere.opacity = 0.6;

    return left_hemisphere;
  }

  function getRightHemisphereInstance() {
    const right_hemisphere = new X.mesh();
    right_hemisphere.file = 'http://x.babymri.org/?rh.smoothwm';
    right_hemisphere.color = [0, 0.7, 0];
    right_hemisphere.opacity = 0.6;

    return right_hemisphere;
  }

  function appendGUI(gui, fibers, left_hemisphere, right_hemisphere) {
    const trackgui = gui.addFolder('Fiber Tracks');
    trackVisibleController = trackgui.add(fibers, 'visible');
    trackgui.open();

    const lhGUI = gui.addFolder('Left Hemisphere');
    lhGUI.add(left_hemisphere, 'visible');
    lhGUI.add(left_hemisphere, 'opacity', 0, 1);
    lhGUI.addColor(left_hemisphere, 'color');
    lhGUI.open();

    const rhGUI = gui.addFolder('Right Hemisphere');
    rhGUI.add(right_hemisphere, 'visible');
    rhGUI.add(right_hemisphere, 'opacity', 0, 1);
    rhGUI.addColor(right_hemisphere, 'color');
    rhGUI.open();
  }

  const fibers = getFibersInstance();
  const left_hemisphere = getLeftHemisphereInstance();
  const right_hemisphere = getRightHemisphereInstance();

  const renderer = new X.renderer3D();
  const onShowtimeFn = () => renderer.resetBoundingBox();

  renderer.init();
  [fibers, left_hemisphere, right_hemisphere].forEach(obj => renderer.add(obj));
  renderer.onShowtime = onShowtimeFn;

  renderer.camera.position = [0, 0, 200];
  renderer.render();

  const gui = new dat.GUI();
  appendGUI(gui, fibers, left_hemisphere, right_hemisphere);
});
