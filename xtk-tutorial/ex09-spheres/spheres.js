window.addEventListener("DOMContentLoaded", () => {
  function getPointMeshInstance() {
    const pointMesh = new X.mesh();
    pointMesh.file = 'http://x.babymri.org/?pits.vtk';

    return pointMesh;
  }

  const pointMesh = getPointMeshInstance();
  const renderer = new X.renderer3D();

  const onRenderFn = () => renderer.camera.rotate([1, 0]);

  function onShowtimeFn() {
    function getNewSphereInstance(point) {
      const newSphere = new X.sphere();
      newSphere.center = [point[0], point[1], point[2]];
      newSphere.radius = 0.7;
      newSphere.magicmode = true;
      newSphere.modified();

      return newSphere;
    }

    function getCopySphereInstance(originObj, point) {
      const copySphere = new X.object(originObj);
      copySphere.transform.translateX(point[0] - firstPoint[0]);
      copySphere.transform.translateY(point[1] - firstPoint[1]);
      copySphere.transform.translateZ(point[2] - firstPoint[2]);

      return copySphere;
    }

    pointMesh.visible = false;

    const pointsAmount = pointMesh.points.count;
    const spheres = new X.object();
    const firstPoint = pointMesh.points.get(0);
    const firstSphere = getNewSphereInstance(firstPoint);

    spheres.children.push(firstSphere);
    for (let i = 1; i < pointsAmount; i++) {
      const currentPoint = pointMesh.points.get(i);
      const copySphere = getCopySphereInstance(firstSphere, currentPoint);
      spheres.children.push(copySphere);
    }
    renderer.add(spheres);
  }

  renderer.init();

  renderer.add(pointMesh);
  renderer.onShowtime = onShowtimeFn;
  renderer.onRender = onRenderFn;
  renderer.render();
});
