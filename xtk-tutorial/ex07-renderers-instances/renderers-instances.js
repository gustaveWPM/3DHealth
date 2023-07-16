window.addEventListener("DOMContentLoaded", () => {
  function getInitializedRendererInstance(containerId, cameraProps) {
    const renderer = new X.renderer3D();

    renderer.container = containerId;
    renderer.init();

    Object.keys(cameraProps).forEach(k => renderer.camera[k] = cameraProps[k]);

    return renderer;
  }

  const mesh = new X.mesh();
  mesh.file = 'http://x.babymri.org/?avf.vtk';

  const renderers = [
    getInitializedRendererInstance('r1', { 'position': [100, 0, 0], 'up': [0, 1, 0] }),
    getInitializedRendererInstance('r2', { 'position': [0, 100, 0], 'up': [1, 0, 0] }),
    getInitializedRendererInstance('r3', { 'position': [0, 0, 100] }),
    getInitializedRendererInstance('r4', { 'position': [-100, 0, 0] }),
    getInitializedRendererInstance('r5', { 'position': [0, -100, 0] }),
    getInitializedRendererInstance('r6', { 'position': [0, 0, -100] }),
    getInitializedRendererInstance('r7', { 'position': [-100, 0, 0], 'up': [0, 1, 0] }),
    getInitializedRendererInstance('r8', { 'position': [0, -100, 0], 'up': [1, 0, 0] }),
    getInitializedRendererInstance('r9', { 'position': [0, 0, -100], 'up': [1, 0, 1] }),
    getInitializedRendererInstance('r10', { 'position': [100, 0, 0], 'up': [1, 1, 1] }),
    getInitializedRendererInstance('r11', { 'position': [100, 0, 0] }),
    getInitializedRendererInstance('r12', { 'position': [0, 0, -100], 'up': [0, 1, 0] })
  ]

  const [mainRenderer, ...otherRenderers] = renderers;

  function onShowtimeFn() {
    otherRenderers.forEach(r => r.add(mesh));
    otherRenderers.forEach(r => r.render());
  }

  mainRenderer.add(mesh);
  mainRenderer.onShowtime = onShowtimeFn;

  mainRenderer.render();
});
