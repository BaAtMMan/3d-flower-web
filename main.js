const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)
camera.position.z = 4

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#webgl'),
  alpha: true,
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

// Lights


scene.add(new THREE.AmbientLight(0xffffff,0.7))
const light = new THREE.PointLight(0xffc0cb,1)
light.position.set(5,5,5)
scene.add(light)

//Load flower model

const loader = new THREE.GLTFLoader()
let flower

loader.load('assets/model/rose.glb',(gltf)=>{
  flower = gltf.scene
  flower.scale.set(1.2,1.2,1.2)
  scene.add(flower)

  gsap.to(flower.rotation,{
  y:Math.PI*2,
  duration: 20,
  repeat: -1,
  ease: "none"
  })
})

function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()

window.addEventListener('resize', () => {
  camera.aspect = window.innerwidth/window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

