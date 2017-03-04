function init () {
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(60, 3 / 2, 1, 1000)
  camera.position.set(0, 0, 30)
  camera.lookAt(new THREE.Vector3(0, 0, 0))
  scene.add(camera)

  const controls = new THREE.TrackballControls(camera)
  controls.rotateSpeed = 4.0
  controls.zoomSpeed = 1.2
  controls.panSpeed = 0.8
  controls.noZoom = false
  controls.noPan = false
  controls.staticMoving = true
  controls.dynamicDampingFactor = 0.3
  controls.keys = [65, 83, 68]
  controls.addEventListener('change', render)

  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('mainCanvas'),
    antialias: true,
    precision: 'lowp' // highp/mediump/lowp
  })
  // I'm just 6
  renderer.setClearColor(0x666666)
  // soft shadow
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  // car body and its material
  let textures = []
  for (let i = 1; i < 7; i++) {
    textures.push(new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('./images/car.png',
        {}, () => {
          renderer.render(scene, camera)
        }),
      overdraw: true
    }))
  }

  const cube = new THREE.Mesh(new THREE.BoxGeometry(12, 2, 5), new THREE.MultiMaterial(textures))
  cube.position.set(2, -0.5, 0)
  cube.castShadow = true
  cube.receiveShadow = true
  scene.add(cube)

  const top = new THREE.Mesh(new THREE.BoxGeometry(6, 1, 2.5), new THREE.MultiMaterial(textures))
  top.position.set(2, 1, 0)
  top.castShadow = true
  top.receiveShadow = true
  scene.add(top)

  // floor and its material
  const floorTexture = THREE.ImageUtils.loadTexture('./images/wood_floor.jpeg', {}, function () {
    renderer.render(scene, camera)
  })
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping
  floorTexture.repeat.set(5, 8)

  const floorMaterial = new THREE.MeshLambertMaterial({
    map: floorTexture
  })

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), floorMaterial)
  floor.position.set(0, -4.3, -5)
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  scene.add(floor)

  new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('./images/car.png',
      {}, () => {
        renderer.render(scene, camera)
      }),
    overdraw: true
  })

  // tire and its material
  const tireTexture = THREE.ImageUtils.loadTexture('./images/tire.jpeg', {}, function () {
    renderer.render(scene, camera)
  })
  tireTexture.wrapS = tireTexture.wrapT = THREE.RepeatWrapping
  tireTexture.repeat.set(20, 14)

  const tireMaterial = new THREE.MeshLambertMaterial({
    map: tireTexture
  })

  const wheelPosition = [
    [6, -2.5, 2.5],
    [-2, -2.5, 2.5],
    [6, -2.5, -2.5],
    [-2, -2.5, -2.5]
  ]
  wheelPosition.forEach((pos) => {
    // THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)
    const tire = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.55, 16, 40), tireMaterial)
    tire.position.set(...pos
    )
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

  function animate () {
    requestAnimationFrame(animate)
    controls.update()
  }

  function render () {
    renderer.render(scene, camera)
  }

  render()
  animate()
}

