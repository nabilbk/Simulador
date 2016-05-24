
function calcMod(v){
   	var a;
   	a = Math.pow(v[0], 2) + Math.pow(v[1], 2) + Math.pow(v[2], 2);
  	v = Math.sqrt(a);
   	return v.toExponential(10);
};

function calcCampoAnel(p_click, p_obj, raio, carga){

  	var nIteracoes = 1000;

    // pegar carga
    var Q = carga * Math.pow(10,-6);
    
    // console.log(Q.toExponential(4));
	var dQ = Q/nIteracoes;

	var teta = 0;
	var dTeta = 2*Math.PI/nIteracoes;
	var E = [0, 0, 0];       
	var dE = [0, 0, 0]; 
	var epsilon = 8.854 * Math.pow(10,-12); // constante de permissividade C^2/N*m^2
	var k = 1 / (4*Math.PI*epsilon);
	// p is a vector of point of dQ
	var p = [0, 0, 0]; 
	// r is vector from ring dq to click point
	var r = [0, 0, 0]; 
	var rUnitario = [0, 0, 0]; 
	var rModulo = [0, 0, 0]; 

	for (var i = 0; i < nIteracoes; i++) {

		p[0] = 0 + p_obj[0];
	 	p[1] = raio*Math.cos(teta) + p_obj[1];
	 	p[2] = raio*Math.sin(teta) + p_obj[2];

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
	// console.log("Modulo E: ", calcMod(E)); 
	E[0] = E[0].toFixed(10);
	E[1] = E[1].toFixed(10);
	E[2] = E[2].toFixed(10);
   	return E;
};


function calcCampoDisco(p_click, p_obj, raio, carga){

	var nIteracoes = 1000;

	// campo eletrico total no disco
	var ED = [0, 0, 0];
	
	// espessura de cada anel
	var dR = raio/nIteracoes;

	// raio do anel que será integrado
	var R = dR/2;

	// carga de cada anel
	var dQ = 0;

	// densidade de carga do disco
	var sig = carga/ (Math.PI* Math.pow(raio,2));

	for (var i = 0; i < nIteracoes; i++){
		dQ = 2*Math.PI*sig*R*dR;
		Ed = calcCampoAnel(p_click,p_obj,R,dQ);
		// console.log(p_click+" , "+p_obj+" , "+R+" , "+dQ);
		// alert(calcCampoAnel(p_click,p_obj,R,dQ));

		ED[0] = ED[0] + parseFloat(Ed[0]);
		ED[1] = ED[1] + parseFloat(Ed[1]);
		ED[2] = ED[2] + parseFloat(Ed[2]);
    	R = R + dR;

	}
   	return ED;
};


function calcCampoLinha(p_click, p_obj, comprimento, carga){
 	
  	var nIteracoes = 1000;

    // Carga
    var Q = carga * Math.pow(10,-6);
   	var dQ = Q/nIteracoes;

	var E = [0, 0, 0];       
	var dE = [0, 0, 0]; 
	var epsilon = 8.854 * Math.pow(10,-12); // constante de permissividade C^2/N*m^2
	var k = 1 / (4*Math.PI*epsilon);

	// p is a vector of point of dQ
	var p = [0, 0, 0]; 
	// r is vector from ring dq to click point

	var r = [0, 0, 0]; 
	var rUnitario = [0, 0, 0]; 
	var rModulo = [0, 0, 0]; 

	var cont = comprimento/nIteracoes;
	var dp = cont/2;

	for (var i = 0; i < nIteracoes; i++) {

		p[0] = 0 + (p_obj[0] - (comprimento/2)) + dp;
	 	p[1] = p_obj[1];
	 	p[2] = p_obj[2];

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
	 	dp = dp + cont;
   	};

	E[0] = E[0].toFixed(10);
	E[1] = E[1].toFixed(10);
	E[2] = E[2].toFixed(10);
   	return E;	
};


// calcTrabalho(p_inicial, p_final, o[j], oModel[j]);
function calcTrabalho(p_inicial, p_final, objView, objModel, pontoModel){

	var p_obj = [0,0,0];
	p_obj[0] = objView.position.x;
	p_obj[1] = objView.position.y;
	p_obj[2] = objView.position.z;

	var nIteracoes = 500;

	var raio = 0;
	raio = objView.raio;
	var carga;
	carga = objModel.carga;

	var p_click = [0,0,0];
	p_click[0] = p_inicial[0];
	p_click[1] = p_inicial[1];
	p_click[2] = p_inicial[2]; 

	var vetorForca = [0,0,0];
	var w = 0;

	var desloca = [0,0,0];
	desloca[0] = p_final[0] - p_inicial[0];
	desloca[1] = p_final[1] - p_inicial[1];
 	desloca[2] = p_final[2] - p_inicial[2];

	var dDesloca = [0,0,0];
	dDesloca[0] = desloca[0] / nIteracoes;
	dDesloca[1] = desloca[1] / nIteracoes;
	dDesloca[2] = desloca[2] / nIteracoes;
    
    if(objView.geometry.type == "TorusGeometry"){
        for(j = 0; j < nIteracoes; j++){
        	vetorForca = calcCampoAnel(p_click, p_obj, raio, carga);
            vetorForca[0] = vetorForca[0] * (pontoModel.carga*Math.pow(10,-6));
            vetorForca[1] = vetorForca[1] * (pontoModel.carga*Math.pow(10,-6));
            vetorForca[2] = vetorForca[2] * (pontoModel.carga*Math.pow(10,-6));
            w = w + (vetorForca[0] * dDesloca[0]) + (vetorForca[1] * dDesloca[1]) +(vetorForca[2] * dDesloca[2]); 
            // atualiza p_click
            p_click[0] = p_click[0] + dDesloca[0];
            p_click[1] = p_click[1] + dDesloca[1];
            p_click[2] = p_click[2] + dDesloca[2]; 
		}
    }
    if(objView.geometry.type == "CircleGeometry"){
        for(j = 0; j < nIteracoes; j++){
        	vetorForca = calcCampoDisco(p_click, p_obj, raio, carga);
            vetorForca[0] = vetorForca[0] * (pontoModel.carga*Math.pow(10,-6));
            vetorForca[1] = vetorForca[1] * (pontoModel.carga*Math.pow(10,-6));
            vetorForca[2] = vetorForca[2] * (pontoModel.carga*Math.pow(10,-6));
            w = w + (vetorForca[0] * dDesloca[0]) + (vetorForca[1] * dDesloca[1]) +(vetorForca[2] * dDesloca[2]); 
            // atualiza p_click
            p_click[0] = p_click[0] + dDesloca[0];
            p_click[1] = p_click[1] + dDesloca[1];
            p_click[2] = p_click[2] + dDesloca[2]; 
    	}	
    }
    if(objView.geometry.type == "CylinderGeometry"){
        for(j = 0; j < nIteracoes; j++){
        	vetorForca = calcCampoLinha(p_click, p_obj, raio, carga);
            vetorForca[0] = vetorForca[0] * (pontoModel.carga*Math.pow(10,-6));
            vetorForca[1] = vetorForca[1] * (pontoModel.carga*Math.pow(10,-6));
            vetorForca[2] = vetorForca[2] * (pontoModel.carga*Math.pow(10,-6));
            w = w + (vetorForca[0] * dDesloca[0]) + (vetorForca[1] * dDesloca[1]) +(vetorForca[2] * dDesloca[2]); 
            // atualiza p_click
            p_click[0] = p_click[0] + dDesloca[0];
            p_click[1] = p_click[1] + dDesloca[1];
            p_click[2] = p_click[2] + dDesloca[2]; 
    	}
    }
    return w;
};



function calcPotencialAnel(p_click, p_obj, raio, carga){

  	var nIteracoes = 1000;

    // pegar carga
    var Q = carga * Math.pow(10,-6);
    
    // console.log(Q.toExponential(4));
	var dQ = Q/nIteracoes;

	var teta = 0;
	var dTeta = 2*Math.PI/nIteracoes;
	var V = 0;       
	var dV = 0; 
	var epsilon = 8.854 * Math.pow(10,-12); // constante de permissividade C^2/N*m^2
	var k = 1 / (4*Math.PI*epsilon);
	// p is a vector of point of dQ
	var p = [0, 0, 0]; 
	// r is vector from ring dq to click point
	var r = [0, 0, 0]; 
	var rModulo = [0, 0, 0]; 

	for (var i = 0; i < nIteracoes; i++) {

		p[0] = 0 + p_obj[0];
	 	p[1] = raio*Math.cos(teta) + p_obj[1];
	 	p[2] = raio*Math.sin(teta) + p_obj[2];

	 	r[0] = p_click[0] - p[0];
	 	r[1] = p_click[1] - p[1];
	 	r[2] = p_click[2] - p[2];

	 	rModulo = calcMod(r); // função sqrsp
	 	
	 	dV = k*(dQ/rModulo);

	 	V = V + dV;
	
	 	teta = teta + dTeta;
   	};
	V = V.toFixed(10);
   	return V;
};


function calcPotencialDisco(p_click, p_obj, raio, carga){

	var nIteracoes = 1000;

	// campo eletrico total no disco
	var VD = 0;
	
	// espessura de cada anel
	var dR = raio/nIteracoes;

	// raio do anel que será integrado
	var R = dR/2;

	// carga de cada anel
	var dQ = 0;

	// densidade de carga do disco
	var sig = carga/ (Math.PI* Math.pow(raio,2));

	for (var i = 0; i < nIteracoes; i++){
		dQ = 2*Math.PI*sig*R*dR;
		dV = calcPotencialAnel(p_click,p_obj,R,dQ);
		// console.log(p_click+" , "+p_obj+" , "+R+" , "+dQ);
		// alert(calcCampoAnel(p_click,p_obj,R,dQ));

		VD = VD + parseFloat(dV);
    	R = R + dR;

	}
   	return VD;
};

function calcPotencialLinha(p_click, p_obj, comprimento, carga){
 	
  	var nIteracoes = 1000;

    // Carga
    var Q = carga * Math.pow(10,-6);
   	var dQ = Q/nIteracoes;

	var V = 0;       
	var dV = 0; 
	var epsilon = 8.854 * Math.pow(10,-12); // constante de permissividade C^2/N*m^2
	var k = 1 / (4*Math.PI*epsilon);

	// p is a vector of point of dQ
	var p = [0, 0, 0]; 
	// r is vector from ring dq to click point

	var r = [0, 0, 0]; 
	var rUnitario = [0, 0, 0]; 
	var rModulo = [0, 0, 0]; 

	var cont = comprimento/nIteracoes;
	var dp = cont/2;

	for (var i = 0; i < nIteracoes; i++) {

		p[0] = 0 + (p_obj[0] - (comprimento/2)) + dp;
	 	p[1] = p_obj[1];
	 	p[2] = p_obj[2];

	 	r[0] = p_click[0] - p[0];
	 	r[1] = p_click[1] - p[1];
	 	r[2] = p_click[2] - p[2];

	 	rModulo = calcMod(r); // função sqrsp
	 	
	 	dV = k*(dQ/rModulo);

	 	V = V + dV;

	 	dp = dp + cont;
   	};

	V = V.toFixed(10);
   	return V;	
};