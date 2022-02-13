import * as FetchLib from '../../modules/fetchlib.js'

export default function compile(gl, url) {

  function compileShader(source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
    console.error(source,'\n');
    throw `Could not compile shader [${type}].\n${gl.getShaderInfoLog(shader)}`;
  }

  function step01(json) {

    function step02(sources) {
      try {
        const vertexShader = compileShader(sources[0], gl.VERTEX_SHADER);
        const fragmentShader = compileShader(sources[1], gl.FRAGMENT_SHADER);
        return step03(vertexShader, fragmentShader);
      } catch(err) {
        console.log("Error - step02 of compiling shaders.\n================================");
        throw err;
      }
    }

    function step03(vertexShader, fragmentShader) {
      const program = gl.createProgram( );
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if(gl.getProgramParameter(program, gl.LINK_STATUS)) return step04(program);
      const err = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      console.log("Error - step03 of compiling shaders.\n================================");
      throw err;
    }

    function step04(program) {
      const attributes = { }, uniforms = { };
      for(const attribute of json.attributes) attributes[attribute] = gl.getAttribLocation(program, attribute);
      for(const uniform of json.uniforms) uniforms[uniform] = gl.getUniformLocation(program, uniform);
      return {program: program, attributes: attributes, uniforms: uniforms}
    }

    return Promise.all([FetchLib.text(json.vertex), FetchLib.text(json.fragment)]).then(step02)
  }

  if(typeof url === "string")
    return FetchLib.json(url).then(step01)
  else
    return Promise.resolve(step01(url));
}
