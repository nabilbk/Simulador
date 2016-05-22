function init() {
	tela1 = new Tela();
	controlador = new Controller();
}
window.onload = init; 

var Controller = function(){
	console.log("instancia Controller");
	this.objeto = new Objetos();

    this.calculaCampo = function(){
        var pI = [0,0,0];
        console.log("calculando campo eletrico");
        // (geometry.type)
        a = tela1.cena3D.listPontosView();
        o = tela1.cena3D.listObjView();
        oModel = controlador.objeto.listObj();
        if(a.length < 1){
            alert("Inserir Ponto");
        }
        if(o.length < 1){
            alert("Inserir Objetos geometricos");
        }
        // percorer vetor de pontos 
        for (i = 0; i < a.length; i++) {
            p_click = [a[i].position.x, a[i].position.y, a[i].position.z]
            var vetor = [];
            // percorer o vetor de objetos
            for(j = 0; j < o.length; j++){
                p_obj = [o[j].position.x, o[j].position.y, o[j].position.z];
                // verificar se objeto tem mudar 
                raio = o[j].raio;
                // soma todos os vetores de campo eletrico gerados pelos objetos
                vetor[0] += vetor[0];
                vetor[1] += vetor[1];
                vetor[2] += vetor[2];
                carga = oModel[j].carga;
                if(o[j].geometry.type == "TorusGeometry"){
                    vetor = calcCampoAnel(p_click, p_obj, raio, carga);
                }
                if(o[j].geometry.type == "CircleGeometry"){
                    vetor = calcCampoDisco(p_click, p_obj, raio, carga);
                }
                if(o[j].geometry.type == "CylinderGeometry"){
                    vetor = calcCampoLinha(p_click, p_obj, raio, carga);
                }
            } 
            pI[0] = p_click[0] + (vetor[0]/250);
            pI[1] = p_click[1] + (vetor[1]/250);
            pI[2] = p_click[2] + (vetor[2]/250);
            tela1.cena3D.addVetor(p_click, pI); 
            console.log("Vetor Campo eletrico: "+vetor);
        }
    }

    this.calculaForca = function(){
        var pI = [0,0,0];

        console.log("calculando campo eletrico");
        // (geometry.type)
        a = tela1.cena3D.listPontosView();
        aModel = controlador.objeto.listPontos();
        o = tela1.cena3D.listObjView();
        oModel = controlador.objeto.listObj();
        if(a.length < 1){
            alert("Inserir Ponto");
        }
        if(o.length < 1){
            alert("Inserir Objetos geometricos");
        }
        // percorer vetor de pontos 
        for (i = 0; i < a.length; i++) {
            p_click = [a[i].position.x, a[i].position.y, a[i].position.z]
            var vetor = [];
            // percorer o vetor de objetos
            for(j = 0; j < o.length; j++){
                p_obj = [o[j].position.x, o[j].position.y, o[j].position.z];
                // verificar se objeto tem mudar 
                raio = o[j].raio;
                // soma todos os vetores de campo eletrico gerados pelos objetos
                vetor[0] += vetor[0];
                vetor[1] += vetor[1];
                vetor[2] += vetor[2];
                carga = oModel[j].carga;
                if(o[j].geometry.type == "TorusGeometry"){
                    vetor = calcCampoAnel(p_click, p_obj, raio, carga);
                    vetor[0] = vetor[0] * (aModel[i].carga*Math.pow(10,-6));
                    vetor[1] = vetor[1] * (aModel[i].carga*Math.pow(10,-6));
                    vetor[2] = vetor[2] * (aModel[i].carga*Math.pow(10,-6));
                }
                if(o[j].geometry.type == "CircleGeometry"){
                    vetor = calcCampoDisco(p_click, p_obj, raio, carga);
                    vetor[0] = vetor[0] * aModel[i].carga*Math.pow(10,-6);
                    vetor[1] = vetor[1] * aModel[i].carga*Math.pow(10,-6);
                    vetor[2] = vetor[2] * aModel[i].carga*Math.pow(10,-6);
                }
                if(o[j].geometry.type == "CylinderGeometry"){
                    vetor = calcCampoLinha(p_click, p_obj, raio, carga);
                    vetor[0] = vetor[0] * aModel[i].carga*Math.pow(10,-6);
                    vetor[1] = vetor[1] * aModel[i].carga*Math.pow(10,-6);
                    vetor[2] = vetor[2] * aModel[i].carga*Math.pow(10,-6);
                }
            } 
            pI[0] = p_click[0] + vetor[0]*500;
            pI[1] = p_click[1] + vetor[1]*500;
            pI[2] = p_click[2] + vetor[2]*500;
            tela1.cena3D.addVetor(p_click, pI); 
            console.log("Vetor Campo eletrico: "+vetor);
        }
    }

    this.calculaTrabalho = function(){

        var trab = 0;
        var p_inicial = [2,0,0];
        var p_final = [6,0,0];

        a = tela1.cena3D.listPontosView();
        aModel = controlador.objeto.listPontos();
        o = tela1.cena3D.listObjView();
        oModel = controlador.objeto.listObj();
        
        if(o.length < 1){
            alert("Inserir objetos geometricos");
        }
        if(a.length < 1){
            alert("Inserir dois pontos");
        }
        if(a.length < 2){
            alert("Inserir mais um ponto");
        }
        // selecionar dois pontos na tela
        pts = tela1.cena3D.selecionaPontos();

        this.j = 0;
        // percorer o vetor de objetos
        for(this.j = 0; this.j < o.length; this.j++){
            // alert(o[this.j].geometry.type); passar ponto inicial
            trab = trab + calcTrabalho(p_inicial, p_final, o[this.j], oModel[this.j], aModel[this.j]);
        }
        console.log("Trabalho: "+trab);
        tela1.cena3D.addVetor(p_inicial, p_final);
    }
}
