
function calcMod(v){
   	var a;
   	a = Math.pow(v[0], 2) + Math.pow(v[1], 2) + Math.pow(v[2], 2);
  	v = Math.sqrt(a);
   	return v.toExponential(10);
};


function calcCampo(p_click, raio){

	console.log("ponto", p_click);
  	var nIteracoes = 1000;
    var Q = 1 * Math.pow(10,-6);
    console.log(Q.toExponential(4));
	var dQ = Q/nIteracoes;
	var teta = 0;
	var dTeta = 2*Math.PI/nIteracoes;
	var E = [0, 0, 0];       
	var dE = [0, 0, 0]; 
	var epsilon = 8.85 * Math.pow(10,-12); // constante de permissividade C^2/N*m^2
	var k = 1 / (4*Math.PI*epsilon);
	// p is a vector of point of dQ
	var p = [0, 0, 0]; 
	// r is vector from ring dq to click point
	var r = [0, 0, 0]; 
	var rUnitario = [0, 0, 0]; 
	var rModulo = [0, 0, 0]; 
	var t = [0, 0, 0]; 

	for (var i = 0; i < nIteracoes; i++) {
		p[0] = 0;
	 	p[1] = (raio*Math.cos(teta)) + raio;
	 	p[2] = raio*Math.sin(teta);

	 	r[0] = p_click[0] - p[0];
	 	r[1] = p_click[1] - p[1];
	 	r[2] = p_click[2] - p[2];

	 	rModulo = calcMod(r); // função sqrsp
	 	rUnitario[0] = r[0]/rModulo;
	 	rUnitario[1] = r[1]/rModulo;
	 	rUnitario[2] = r[2]/rModulo;
	 	
	 	dE[0] = k*(dQ/Math.pow(rModulo,2))*rUnitario[0];
	 	dE[1] = k*(dQ/Math.pow(rModulo,2))*rUnitario[1];
	 	dE[2] = k*(dQ/Math.pow(rModulo,2))*rUnitario[2];
	 	
	 	E[0] = E[0] + dE[0];
	 	E[1] = E[1] + dE[1];
	 	E[2] = E[2] + dE[2];
	 	teta = teta + dTeta;
   	};
   // 	console.log("Fim for");
   // // console.log("Vetor E: ", E);
  	// console.log("Modulo E: ", calcMod(E)); 
   	return E;
};