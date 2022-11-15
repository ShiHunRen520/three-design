import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { Vector2 } from 'three';
export const usePostProcessing = (params) => {
  console.log(params, 'ksklsk')
  const composer = new EffectComposer(params.T.renderer);
  const renderPass = new RenderPass(params.T.scene, params.T.camera);
  composer.addPass(renderPass);
  const outlinePass = new OutlinePass(new Vector2(params.container.offsetWidth, params.container.offsetHeight), params.T.scene, params.T.camera);
  outlinePass.renderToScreen = true;
  outlinePass.edgeStrength = 3 //粗
  outlinePass.edgeGlow = 2 //发光
  outlinePass.edgeThickness = 2 //光晕粗
  outlinePass.pulsePeriod = 1 //闪烁
  outlinePass.usePatternTexture = false //是否使用贴图
  outlinePass.visibleEdgeColor.set(params.visibleEdgeColor); // 设置显示的颜色
  outlinePass.hiddenEdgeColor.set(params.hiddenEdgeColor); // 设置隐藏的颜色
  composer.addPass(outlinePass);
  // effectFXAA = new ShaderPass(FXAAShader);
  //effectFXAA.uniforms['resolution'].value.set(1 / scene.value.innerWidth, 1 / scene.value.innerHeight);
  //composer.addPass(effectFXAA);
  return { composer, outlinePass }
}