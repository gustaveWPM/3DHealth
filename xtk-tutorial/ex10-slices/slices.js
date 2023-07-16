window.addEventListener("DOMContentLoaded", () => {
  function getVolumeInstance() {
    const volume = new X.volume();
    volume.file = 'http://x.babymri.org/?avf.nrrd';

    return volume;
  }

  function getMeshInstance() {
    const mesh = new X.mesh();
    mesh.file = 'http://x.babymri.org/?avf.vtk';
    mesh.color = [0.7, 0.25, 0.25];
    mesh.opacity = 0.7;
    mesh.visible = false;

    return mesh;
  }

  function getInitializedRendererInstance() {
    const renderer = new X.renderer3D();
    renderer.bgColor = [.62, .62, 1];
    renderer.init();

    return renderer;
  }

  function appendVolumeGUI(gui, volume) {
    const volumegui = gui.addFolder('Volume');
    volumegui.add(volume, 'volumeRendering');
    volumegui.addColor(volume, 'minColor');
    volumegui.addColor(volume, 'maxColor');
    volumegui.add(volume, 'opacity', 0, 1).listen();
    volumegui.add(volume, 'lowerThreshold', volume.min, volume.max);
    volumegui.add(volume, 'upperThreshold', volume.min, volume.max);
    volumegui.add(volume, 'windowLow', volume.min, volume.max);
    volumegui.add(volume, 'windowHigh', volume.min, volume.max);
    volumegui.add(volume, 'indexX', 0, volume.range[0] - 1);
    volumegui.add(volume, 'indexY', 0, volume.range[1] - 1);
    volumegui.add(volume, 'indexZ', 0, volume.range[2] - 1);
    volumegui.open();

    return volumegui;
  }

  function appendMeshGUI(gui) {
    const meshgui = gui.addFolder('Mesh');
    const meshVisibleController = meshgui.add(mesh, 'visible');
    meshgui.addColor(mesh, 'color');
    meshgui.open();

    return meshVisibleController;
  }

  const gui = new dat.GUI();
  const volume = getVolumeInstance();
  const mesh = getMeshInstance();
  const renderer = getInitializedRendererInstance();

  const onShowtimeFn = () => {
    let meshWasLoaded = false;
    appendVolumeGUI(gui, volume);
    const meshVisibleController = appendMeshGUI(gui);
    meshVisibleController.onChange(function () {
      if (!meshWasLoaded) {
        renderer.add(mesh);
        meshWasLoaded = true;
        renderer.onShowtime = () => { };
      }
    });
  }

  renderer.add(volume);
  renderer.onShowtime = () => onShowtimeFn();

  renderer.camera.position = [120, 80, 160];
  renderer.render();
});
