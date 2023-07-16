window.addEventListener("DOMContentLoaded", () => {
  function appendVolumeGUI(gui) {
    const volumegui = gui.addFolder('Volume');
    volumegui.add(volume, 'volumeRendering');
    volumegui.add(volume, 'opacity', 0, 1);
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

  function getInitializedWebGLCtx() {
    let webGLCtx = null;
    try {
      webGLCtx = new X.renderer3D();
      webGLCtx.container = '3d';
      webGLCtx.init();
    } catch (Exception) {
      webGLCtx = null;
    }
    return webGLCtx;
  }

  function getInitialized2DSliceRenderer(orientation, container = `slice${orientation.toUpperCase()}`) {
    const slice = new X.renderer2D();
    slice.container = container;
    slice.orientation = orientation;
    slice.init();

    return slice;
  }

  function getVolumeInstance() {
    const volume = new X.volume();
    volume.file = 'http://x.babymri.org/?vol.nrrd';
    volume.labelmap.file = 'http://x.babymri.org/?seg.nrrd';
    volume.labelmap.colortable.file = 'http://x.babymri.org/?genericanatomy.txt';

    return volume;
  }

  const webGLCtx = getInitializedWebGLCtx();
  const sliceX = getInitialized2DSliceRenderer('X');
  const sliceY = getInitialized2DSliceRenderer('Y');
  const sliceZ = getInitialized2DSliceRenderer('Z');

  const volume = getVolumeInstance();

  sliceX.add(volume);
  sliceX.render();

  sliceX.onShowtime = () => {
    sliceY.add(volume);
    sliceY.render();
    sliceZ.add(volume);
    sliceZ.render();

    if (webGLCtx !== null) {
      webGLCtx.add(volume);
      webGLCtx.render();
    }

    const gui = new dat.GUI();
    appendVolumeGUI(gui);
  };
});
