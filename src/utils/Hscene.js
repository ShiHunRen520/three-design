import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default class Hscene {
  scene = null;
  camera = null;
  renderer = null;
  css3dRenderer = null;
  controls = null;
  #container = null;
  #css3dContainer = null;
  constructor(config) {
    this.#container = config?.container
    this.#css3dContainer = config?.css3dContainer
    // console.log(!this.#css3dContainer, 'lkjsa')
    this.#css3dContainer ? this.#initCSS3DRenderer() : console.error('没有css3d容器')  // css3dContainer不为 null或者undifiend的时候执行
    this.#initThree(config)
    this.#initControls(config.controls)
  }
  #initThree = config => {
    this.scene = new Scene()
    this.#initCamera(config?.cameraConfig)
    this.#initRenderer()
  }
  #initCamera = (cameraConfig = { fov: 45, near: 0.1, far: 3000 }) => {
    const { clientWidth, clientHeight } = this.#container;
    const config = Object.assign({ fov: 45, near: 0.1, far: 3000 }, cameraConfig);
    this.camera = new PerspectiveCamera(config?.fov, clientWidth / clientHeight, config?.near, config?.far);
    this.camera.position.set(0, 10, 50)
    this.camera.lookAt(this.scene.position)
  }
  #initRenderer = () => {
    const { clientWidth, clientHeight } = this.#container
    this.renderer = new WebGLRenderer({ alpha: true, antialias: true })
    this.renderer.setSize(clientWidth, clientHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // this.renderer.setClearColor(0x246b66)
    this.#container.appendChild(this.renderer.domElement)
  }
  #initControls = (controls) => {
    if (controls.open) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableDamping = controls?.enableDamping
      this.controls.enableRotate = controls?.enableRotate
      this.controls.enablePan = controls?.enablePan
      this.controls.enableZoom = controls?.enableZoom
    }
  }
  #initCSS3DRenderer = () => {
    const { clientWidth, clientHeight } = this.#css3dContainer
    this.css3dRenderer = new CSS3DRenderer()
    // console.log(this.css3dRenderer, 'llso')
    this.css3dRenderer.setSize(clientWidth, clientHeight);
    this.css3dRenderer.domElement.style.position = "absolute"
    this.css3dRenderer.domElement.style.top = '0px'
    this.#css3dContainer.appendChild(this.css3dRenderer.domElement)
  }
}