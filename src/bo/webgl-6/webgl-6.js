function init () {
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(100, 4 / 3, 1, 2000)
  camera.position.set(0, 0, 200)
  scene.add(camera)

  const controls = new THREE.TrackballControls(camera)
  controls.rotateSpeed = 10
  controls.zoomSpeed = 1
  controls.panSpeed = 1
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

  // TODO: Load object
  // model
  const onProgress = (xhr) => {
    if (xhr.lengthComputable) {
      const percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  };

  const onError = function (xhr) { };

  const mtlLoader = new THREE.MTLLoader();
  mtlLoader.setPath('./model/');
  mtlLoader.load('male02.mtl', (materials) => {
    materials.preload();

    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('./model/');
    objLoader.load('male02.obj',(object) => {
      object.y = -95
      scene.add(object)
      render();
    }, onProgress, onError);
  });

  // light
  const ambient = new THREE.AmbientLight(0x444444);
  scene.add(ambient);

  const directionalLight = new THREE.DirectionalLight(0xffeedd);
  directionalLight.position.set(0, 0, 1).normalize();
  scene.add(directionalLight);

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

