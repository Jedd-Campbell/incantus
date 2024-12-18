import k from "./kaplay";

k.loadShader(
    "aquae",
    null,
    `
	uniform float u_time;
	
    vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
        vec4 tcolor = texture2D(tex, uv);
        vec4 colorB = vec4(0.0, 0.0, 1.0, tcolor.a);
        return mix(tcolor, colorB, 0.5);
    }
`,
);

k.loadShader(
    "ignis",
    null,
    `
	uniform float u_time;
	
    vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
        vec4 tcolor = texture2D(tex, uv);
        vec4 colorB = vec4(1.0, 0.0, 0.0, tcolor.a);
        return mix(tcolor, colorB, 0.5);
    }
`,
);