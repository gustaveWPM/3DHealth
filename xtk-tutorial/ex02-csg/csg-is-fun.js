window.addEventListener("DOMContentLoaded", () => {
  function getCubeInstance() {
    const cube = new X.cube();
    cube.color = [1, 0, 0];
    cube.caption = 'a cube';

    return cube;
  }

  function getSphereInstance() {
    const sphere = new X.sphere();
    sphere.radius = 13;
    sphere.color = [0, 1, 0];
    sphere.caption = 'a sphere';

    return sphere;
  }

  function getCylinderInstance(props) {
    const cylinder = new X.cylinder();
    Object.assign(cylinder, props);

    return cylinder;
  }

  function getHollowRoundedCubeInstance(cube, sphere, cylinder1, cylinder2, cylinder3) {
    const hollowRoundedCube = cube.intersect(sphere).subtract(cylinder1.union(cylinder2).union(cylinder3));
    hollowRoundedCube.caption = "the three from above bool'ed together!";
    hollowRoundedCube.transform.translateZ(-30);

    return hollowRoundedCube;
  }

  function arrangeShapesInRow(cube, cylinder1, cylinder2, cylinder3) {
    cube.transform.translateX(-30);
    cylinder1.transform.translateX(30);
    cylinder2.transform.translateX(30);
    cylinder3.transform.translateX(30);
  }

  const renderer = new X.renderer3D();
  const cube = getCubeInstance();
  const sphere = getSphereInstance();

  const cylinder1 = getCylinderInstance({ start: [-10, 0, 0], end: [10, 0, 0], color: [0, 0, 1], radius: 7, caption: 'cylinder 1' });
  const cylinder2 = getCylinderInstance({ start: [0, 10, 0], end: [0, -10, 0], color: [0, 0, 1], radius: 7, caption: 'cylinder 2' });
  const cylinder3 = getCylinderInstance({ start: [0, 0, -10], end: [0, 0, 10], color: [0, 0, 1], radius: 7, caption: 'cylinder 3' })

  arrangeShapesInRow(cube, cylinder1, cylinder2, cylinder3);

  renderer.init();
  [cube, sphere, cylinder1, cylinder2, cylinder3].forEach(obj => renderer.add(obj));

  const csgCube = getHollowRoundedCubeInstance(cube, sphere, cylinder1, cylinder2, cylinder3);
  renderer.add(csgCube);
  renderer.render();
});
