import k from "./kaplay";


k.loadShader("default", null, defaultShader());
k.loadShader("impetus", null, colorShader("0.5, 0.5, 0.5"));
k.loadShader("aquae", null, colorShader("0.0, 0.0, 1.0"));
k.loadShader("ignis", null, colorShader("1.0, 0.0, 0.0"));

function colorShader(color: string = "1.0, 0.0, 0.0") {
    return `
	uniform float u_time;
	
    vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
        vec4 tcolor = texture2D(tex, uv);
        vec4 colorB = vec4(${color}, tcolor.a);
        return mix(tcolor, colorB, 0.5);
    }
`;
}

function defaultShader(color: string = "1.0, 0.0, 0.0") {
    return `
	uniform float u_time;
	
    vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
        vec4 tcolor = texture2D(tex, uv);
        return tcolor;
    }
`;
}