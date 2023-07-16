window.addEventListener("DOMContentLoaded", () => {
  function getVolumeInstance() {
    const volume = new X.volume();
    volume.file = 'http://x.babymri.org/?vol.nrrd';
    volume.labelmap.file = 'http://x.babymri.org/?seg.nrrd';
    volume.labelmap.colortable.file = 'http://x.babymri.org/?genericanatomy.txt';

    return volume;
  }

  function appendVolumeGUI(gui) {
    const volumegui = gui.addFolder('Volume');
    volumegui.add(volume, 'volumeRendering');
    volumegui.add(volume, 'opacity', 0, 1).listen();
    volumegui.add(volume, 'lowerThreshold', volume.min, volume.max);
    volumegui.add(volume, 'upperThreshold', volume.min, volume.max);
    volumegui.add(volume, 'indexX', 0, volume.range[0] - 1);
    volumegui.add(volume, 'indexY', 0, volume.range[1] - 1);
    volumegui.add(volume, 'indexZ', 0, volume.range[2] - 1);
    volumegui.open();

    return volumegui;
  }

  function appendLabelMapGUI(gui) {
    const labelmapgui = gui.addFolder('Label Map');
    labelmapgui.add(volume.labelmap, 'visible');
    labelmapgui.add(volume.labelmap, 'opacity', 0, 1);
    labelmapgui.open();

    return labelmapgui;
  }

  const volume = getVolumeInstance();
  const gui = new dat.GUI();
  const renderer = new X.renderer3D();
  const onShowtimeFn = () => {
    appendVolumeGUI(gui);
    appendLabelMapGUI(gui);
  }

  renderer.init();
  renderer.add(volume);
  renderer.onShowtime = onShowtimeFn;
  renderer.camera.position = [120, 80, 160];
  renderer.render();
});
