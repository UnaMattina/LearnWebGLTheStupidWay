/**
 * Created by kulbear on 2017-02-28.
 */

function init () {
  {
    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('mainCanvas')
    })
    renderer.setClearColor(0x111111) // darkgray

    // scene
    const scene = new THREE.Scene()

    // camera
    // THREE.OrthographicCamera(left, right, top, bottom, near, far)
    const camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10)

    const axes = new THREE.AxisHelper(20)
    scene.add(axes)

    // The line below will make the cude look wider.
    // Imagine that you were taking a 4 x 3 photo for a 4 x 3 photo frame,
    // but now you only have a 2 x 3 photo, you need to scale it to fit the frame
    // const camera = new THREE.OrthographicCamera(-1, 1, 1.5, -1.5, 1, 10)
    camera.position.set(4, 3, 5)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    scene.add(camera)

    // a cube in the scene
    const cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
      })
    )
    scene.add(cube)

    // render
    renderer.render(scene, camera)
  }

  {
    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('secondCanvas')
    })
    renderer.setClearColor(0x111111) // darkgray

    // scene
    const scene = new THREE.Scene()

    // camera
    // THREE.PerspectiveCamera(fov, aspect, near, far)
    const camera = new THREE.PerspectiveCamera(30, 400 / 300, 1, 10)
    camera.position.set(2, 1, 5)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    scene.add(camera)

    const axes = new THREE.AxisHelper(20)
    scene.add(axes)

    // a cube in the scene
    const cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
      })
    )
    scene.add(cube)

    renderer.render(scene, camera)
  }

  {
    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('thirdCanvas')
    })
    renderer.setClearColor(0x111111) // darkgray

    // scene
    const scene = new THREE.Scene()

    // camera
    // THREE.PerspectiveCamera(fov, aspect, near, far)
    const camera = new THREE.PerspectiveCamera(80, 400 / 300, 1, 10)
    camera.position.set(2, 1, 5)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    scene.add(camera)

    const axes = new THREE.AxisHelper(20)
    scene.add(axes)

    // THREE.CubeGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
    // THREE.PlaneGeometry(width, height, widthSegments, heightSegments)
    // THREE.SphereGeometry(radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength)
    // THREE.CircleGeometry(radius, segments, thetaStart, thetaLength)
    // THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
    // THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)
    const shape = new THREE.Mesh(new THREE.TorusGeometry(3, 1, 4, 8),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
      })
    )
    scene.add(shape)

    renderer.render(scene, camera)
  }
}
