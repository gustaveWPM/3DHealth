window.addEventListener("DOMContentLoaded", () => {
  const defaultType = 'C (mm&#x207b;&sup2;)';
  const curvatureTypes = [defaultType, 'k&#x2081; (mm&#x207b;&sup1;)', 'H (mm&#x207b;&sup1;)'];
  const curvatureFiles = ['lh.smoothwm.C.crv', 'lh.smoothwm.K1.crv', 'lh.smoothwm.H.crv'];

  function getInitializedRendererInstance() {
    const renderer = new X.renderer3D();
    renderer.init();

    return renderer;
  }

  function getMeshInstance() {
    const mesh = new X.mesh();
    mesh.color = [0.5, 0.5, 0.5];
    mesh.file = 'http://x.babymri.org/?lefthemisphere.smoothwm';

    mesh.scalars.file = 'http://x.babymri.org/?lh.smoothwm.C.crv';
    mesh.scalars.minColor = [0, 0, 1];
    mesh.scalars.maxColor = [1, 1, 1];

    return mesh;
  }

  function disposeGUI(gui) {
    if (gui) {
      gui.destroy();
      gui = null;
    }
  }

  function appendMeshGUI(gui) {
    const meshgui = gui.addFolder('Mesh');
    meshgui.addColor(mesh, 'color');
    meshgui.open();

    return meshgui;
  }

  function appendCurvaturesGUI(gui) {
    const curvgui = gui.addFolder('Curvature');
    curvgui.addColor(mesh.scalars, 'minColor');
    curvgui.addColor(mesh.scalars, 'maxColor');
    curvgui.add(mesh.scalars, 'lowerThreshold', mesh.scalars.min, mesh.scalars.max);
    curvgui.add(mesh.scalars, 'upperThreshold', mesh.scalars.min, mesh.scalars.max);
    curvgui.open();

    return curvgui;
  }

  const _loader = {
    Type: defaultType
  };

  let gui = null;
  const mesh = getMeshInstance();
  const renderer = getInitializedRendererInstance();

  renderer.add(mesh);
  renderer.render();

  renderer.onShowtime = () => {
    disposeGUI(gui);
    gui = new dat.GUI();

    appendMeshGUI(gui);

    const curvgui = appendCurvaturesGUI(gui)
    const typeController = curvgui.add(_loader, 'Type', curvatureTypes);

    typeController.onChange((value) => {
      const index = curvatureTypes.indexOf(value);
      const oldMinColor = mesh.scalars.minColor;
      const oldMaxColor = mesh.scalars.maxColor;

      mesh.scalars.file = 'http://x.babymri.org/?' + curvatureFiles[index];
      mesh.modified();

      mesh.scalars.minColor = oldMinColor;
      mesh.scalars.maxColor = oldMaxColor;
    });
  };
});
