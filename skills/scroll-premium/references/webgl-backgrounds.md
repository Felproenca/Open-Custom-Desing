# WebGL Backgrounds Reference

## 1. Three.js Particle Field

The most common premium background — floating particles that respond to scroll and mouse.

### Setup (CDN)
```html
<script src="https://cdn.jsdelivr.net/npm/three@0.185.0/build/three.min.js"></script>
```

### Basic Particle Field
```js
class ParticleField {
  constructor(container, opts = {}) {
    this.container = container;
    this.opts = {
      count: 1500,
      color: 0x6C5CE7,
      size: 0.015,
      speed: 0.2,
      depth: 4,
      mouseInfluence: 0.3,
      ...opts
    };
    this.mouse = { x: 0, y: 0 };
    this.init();
  }

  init() {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      60,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      100
    );
    this.camera.position.z = 3;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Particles
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.opts.count * 3);
    const sizes = new Float32Array(this.opts.count);

    for (let i = 0; i < this.opts.count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * this.opts.depth * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * this.opts.depth * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * this.opts.depth;
      sizes[i] = Math.random() * this.opts.size + 0.005;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      color: this.opts.color,
      size: this.opts.size,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    // Events
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', e => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const time = Date.now() * 0.001;

    this.particles.rotation.y = time * this.opts.speed * 0.1;
    this.particles.rotation.x = Math.sin(time * 0.05) * 0.1;

    // Mouse influence
    this.particles.rotation.y += this.mouse.x * this.opts.mouseInfluence * 0.01;
    this.particles.rotation.x += this.mouse.y * this.opts.mouseInfluence * 0.01;

    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  destroy() {
    this.renderer.dispose();
    this.container.removeChild(this.renderer.domElement);
  }
}
```

### Usage
```html
<div class="webgl-container" style="position:absolute; inset:0; z-index:0;"></div>
```
```js
const bg = new ParticleField(document.querySelector('.webgl-container'), {
  count: 2000,
  color: 0x6C5CE7,
  speed: 0.15,
  mouseInfluence: 0.4
});
```

## 2. Depth Layers

Multiple planes at different z-depths for parallax WebGL.

```js
class DepthLayers {
  constructor(container) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    // Layer 1 — far (slow)
    this.layer1 = this.createPlane(0x1a1a2e, -3, 0.3);
    // Layer 2 — mid
    this.layer2 = this.createPlane(0x16213e, -1, 0.5);
    // Layer 3 — near (fast)
    this.layer3 = this.createPlane(0x0f3460, 1, 0.8);
  }

  createPlane(color, z, opacity) {
    const geo = new THREE.PlaneGeometry(20, 20);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.z = z;
    this.scene.add(mesh);
    return mesh;
  }

  update(scrollProgress) {
    this.layer1.position.y = scrollProgress * 0.5;
    this.layer2.position.y = scrollProgress * 1.2;
    this.layer3.position.y = scrollProgress * 2.5;
    this.renderer.render(this.scene, this.camera);
  }
}
```

## 3. Shader Backgrounds

Custom fragment shaders for unique effects. Keep them simple — one effect per shader.

### Gradient noise shader
```glsl
// Fragment shader
uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float noise = fract(sin(dot(uv * 10.0, vec2(12.9898, 78.233))) * 43758.5453);
  vec3 color = mix(
    vec3(0.024, 0.024, 0.039),  // dark
    vec3(0.424, 0.361, 0.906),  // accent
    noise * 0.3 + uv.y * 0.2
  );
  gl_FragColor = vec4(color, 1.0);
}
```

### Integration with Three.js
```js
const material = new THREE.ShaderMaterial({
  vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: fragmentShaderSource,
  uniforms: {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  }
});

// In render loop
material.uniforms.uTime.value = time;
```

## 4. Performance Rules

- **Max 3 draw calls** per scene
- **Max 5000 particles** for smooth 60fps
- Use `BufferGeometry`, never `Geometry`
- Use `AdditiveBlending` for glow effects
- Set `pixelRatio` to `Math.min(devicePixelRatio, 2)`
- Use `powerPreference: 'high-performance'`
- Reduce particle count by 50% on mobile
- Destroy Three.js instances on page leave
- Never put Three.js inside scroll handlers — animate via `requestAnimationFrame` only
