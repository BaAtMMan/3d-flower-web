import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1 , 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop( animate );
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild( renderer.domElement );

// Lightning Setup 

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xfff3e8, 1.1); //warm and soft color 
light.intensity = 1.1;
light.position.set(4,6,5);
scene.add(light);


const fillLight = new THREE.DirectionalLight(0xffe6f2, 0.6); // removes harsh shadows and adds pink glow
fillLight.position.set(-5,3,-4);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffcce6,0.6); // soft pink (light pink?)
rimLight.position.set(0,5,-5);
scene.add(rimLight);

//background color
renderer.setClearColor(0xf6eef2); // pink tinted grey (slightly warmer)

// Lilly Loading
const loader = new GLTFLoader();

let lily;

loader.load(
  './pink_lilly_small.glb',
  (gltf) => {
    lily = gltf.scene;

    lily.scale.set(1.5,1.5,1.5);
    lily.position.set(0,0,0);
    lily.rotation.y = Math.PI/4;

    scene.add(lily);

    
  },
  
  undefined,
  (error) => {
    console.error(error);
  }
)



//camera position
camera.position.set(0,2,6);
camera.lookAt(0,1,0);

// function to animate the cube..
const clock = new THREE.Clock();
function animate(){
  //lilly rotation
  
  if(lily){
    lily.rotation.y += 0.002;

    const t = clock.getElapsedTime();
    lily.position.y = Math.sin(t*0.8)* 0.05;
    lily.rotation.y += 0.0015;
  }
  renderer.render(scene, camera);
}
