// Oscar Saharoy 2023


export default `

#define t uTime

uniform float uTime;
uniform vec2 uResolution;


mat2 rot( float theta ) {

	return mat2( cos(theta), -sin(theta), sin(theta), cos(theta) );

}


void mainImage( out vec4 fragColor, in vec2 fragCoord ) {

	float resMin = min( uResolution.x, uResolution.y );
	vec2 p = (fragCoord - uResolution*.5 ) / resMin;
	float r = length(p);

	p = p * rot((t+r*50.)*0.2)/(r+.1);
	p = p * rot(-t);

	vec3 light = vec3(
		pow( cos(
			(p.x*10.*sin(r*2.-t*0.3))
			*sin(
				-p.y*p.y+t+vec3(.25,.15,.1)
			)
		), vec3(2.) )
	);

	fragColor = vec4( light, 1 );
}


void main() {

    float minDimension = min( uResolution.x, uResolution.y );
    float aspect = uResolution.x / uResolution.y;
    vec2 centredFragCoord = 2. * gl_FragCoord.xy - uResolution.xy;
    vec2 screenPos = centredFragCoord / minDimension;

    mainImage( gl_FragColor, gl_FragCoord.xy );
}


`;

