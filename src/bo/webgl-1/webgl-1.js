function init () {
  const scene = new THREE.Scene()

  const axes = new THREE.AxisHelper(30)
  scene.add(axes)

  const camera = new THREE.PerspectiveCamera(60, 4 / 3, 1, 100)
  const cameraPosition = [25, 6, 6] // also used for the directional light
  camera.position.set(...cameraPosition)
  camera.lookAt(new THREE.Vector3(0, -1, -2))
  scene.add(camera)

  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('mainCanvas'),
    antialias: true,
    precision: "highp" // highp/mediump/lowp
  })
  // I'm just 6
  renderer.setClearColor(0x666666)

  // for tires
  const lambertMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffd0,
  })

  // for car body
  const phongMaterial = new THREE.MeshPhongMaterial({
    color: 0xf0f0f0
  })

  // car body
  const cube = new THREE.Mesh(new THREE.BoxGeometry(12, 3, 5), phongMaterial)
  cube.position.set(4, -1, 0)
  scene.add(cube)

  // wheel
  const wheelPosition = [[8, -2.5, 2.5], [0, -2.5, 2.5], [8, -2.5, -2.5], [0, -2.5, -2.5]]

  wheelPosition.forEach((pos) => {
    // THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)
    let tire = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.5, 16, 40), lambertMaterial)
    tire.position.set(...pos)
    scene.add(tire)
  })

  // add light
  const light = new THREE.DirectionalLight(0x3F3F3F)
  light.position.set(...cameraPosition)
  const ambientLight = new THREE.AmbientLight(0xAAAAAA)
  scene.add(ambientLight)
  scene.add(light)

  renderer.render(scene, camera)
}
