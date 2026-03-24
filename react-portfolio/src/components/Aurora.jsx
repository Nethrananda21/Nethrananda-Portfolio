import { useEffect, useRef } from 'react';

export default function Aurora() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const vertSrc = `
      attribute vec2 a_position;
      void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
    `;
    const fragSrc = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      
      vec3 palette(float t) {
        vec3 a = vec3(0.05, 0.02, 0.12);
        vec3 b = vec3(0.15, 0.08, 0.25);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.60, 0.20, 0.80);
        return a + b * cos(6.28318 * (c * t + d));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        uv.y = 1.0 - uv.y;
        
        float n = 0.0;
        n += sin(uv.x * 3.0 + u_time * 0.4) * 0.15;
        n += sin(uv.y * 4.0 + u_time * 0.3) * 0.1;
        n += sin((uv.x + uv.y) * 5.0 + u_time * 0.5) * 0.08;
        n += sin(length(uv - 0.5) * 8.0 - u_time * 0.6) * 0.06;
        
        vec3 col = palette(n + u_time * 0.05);
        
        float vignette = 1.0 - length(uv - 0.5) * 0.8;
        col *= vignette;
        col *= 0.35;
        
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vertSrc));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fragSrc));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const start = Date.now();
    let raf;

    const render = () => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (Date.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
