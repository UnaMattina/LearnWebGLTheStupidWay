function init () {
  const scene = new THREE.Scene()

  const axes = new THREE.AxisHelper(30)
  scene.add(axes)

  const camera = new THREE.PerspectiveCamera(60, 4 / 3, 1, 1000)
  camera.position.set(16, 6, 12)
  camera.lookAt(new THREE.Vector3(0, -1, -2))
  scene.add(camera)

  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('mainCanvas'),
    antialias: true,
    precision: 'highp' // highp/mediump/lowp
  })
  // I'm just 6
  renderer.setClearColor(0x666666)
  // soft shadow
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  // for tires
  const lambertMaterial = new THREE.MeshLambertMaterial({
    color: 0xFFFFD0
  })

  // for car body
  const phongMaterial = new THREE.MeshPhongMaterial({
    color: 0xF0F0F0
  })

  // for floor
  const floorLambertMaterial = new THREE.MeshLambertMaterial({
    color: 0x9AAD74
  })

  // car body
  const cube = new THREE.Mesh(new THREE.BoxGeometry(12, 3, 5), phongMaterial)
  cube.position.set(2, 0, 0)
  cube.castShadow = true
  cube.receiveShadow = true
  scene.add(cube)

  // plane
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), floorLambertMaterial)
  floor.position.set(0, -4.3, -5)
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  scene.add(floor)

  // wheel
  const wheelPosition = [[6, -2.5, 2.5], [-2, -2.5, 2.5], [6, -2.5, -2.5], [-2, -2.5, -2.5]]

  wheelPosition.forEach((pos) => {
    // THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)
    const tire = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.55, 16, 40), lambertMaterial)
    tire.position.set(...pos)
    // self-shadow
    tire.castShadow = true
    tire.receiveShadow = true
    scene.add(tire)
  })

  const light = new THREE.DirectionalLight(0x606060)
  light.position.set(-5, 8, 5)
  light.castShadow = true
  light.shadow.mapSize.width = 2048
  light.shadow.mapSize.height = 2048

  // important!
  light.shadow.camera.near = -1
  light.shadow.camera.far = 50
  light.shadow.camera.left = -100
  light.shadow.camera.right = 100
  light.shadow.camera.top = 100
  light.shadow.camera.bottom = -100

  light.shadow.darkness = 1

  const ambientLight = new THREE.AmbientLight(0xCCCCCC)
  scene.add(ambientLight)
  scene.add(light)

  // const helper = new THREE.CameraHelper(light.shadow.camera)
  // scene.add(helper)

  renderer.render(scene, camera)
}
