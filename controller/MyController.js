function init() {
	tela1 = new Tela();
	controlador = new Controller();
}
window.onload = init; 

var Controller = function(){
	console.log("instancia Controller");
	this.objeto = new Objetos();

    this.calculaCampo = function(){
        this.pI = [0,0,0];
        this.a = tela1.cena3D.listPontosView();
        this.o = tela1.cena3D.listObjView();
        this.oModel = controlador.objeto.listObj();
        if(this.a.length < 1){
            alert("Inserir Ponto");
        }
        if(this.o.length < 1){
            alert("Inserir Objetos geometricos");
        }
        // percorer vetor de pontos 
        for (this.i = 0; this.i < this.a.length; this.i++) {
            this.p_click = [this.a[this.i].position.x, this.a[this.i].position.y, this.a[this.i].position.z]
            this.vetor = [];
            // percorer o vetor de objetos
            for(this.j = 0; this.j < this.o.length; this.j++){
                this.p_obj = [this.o[this.j].position.x, this.o[this.j].position.y, this.o[this.j].position.z];
                // verificar se objeto tem mudar 
                this.raio = this.o[this.j].raio;
                // soma todos os vetores de campo eletrico gerados pelos objetos
                this.vetor[0] += this.vetor[0];
                this.vetor[1] += this.vetor[1];
                this.vetor[2] += this.vetor[2];
                this.carga = this.oModel[this.j].carga;
                if(this.o[this.j].geometry.type == "TorusGeometry"){
                    this.vetor = calcCampoAnel(this.p_click, this.p_obj, this.raio, this.carga);
                }
                if(this.o[this.j].geometry.type == "CircleGeometry"){
                    this.vetor = calcCampoDisco(this.p_click, this.p_obj, this.raio, this.carga);
                }
                if(this.o[this.j].geometry.type == "CylinderGeometry"){
                    this.vetor = calcCampoLinha(this.p_click, this.p_obj, this.raio, this.carga);
                }
            } 
            this.pI[0] = this.p_click[0] + (this.vetor[0]/250);
            this.pI[1] = this.p_click[1] + (this.vetor[1]/250);
            this.pI[2] = this.p_click[2] + (this.vetor[2]/250);
            tela1.cena3D.addVetor(this.p_click, this.pI, "E");
            console.log("Vetor : "+this.pI);
            console.log("Campo eletrico: "+this.vetor);
        }
    }

    this.calculaForca = function(){
        this.pI = [0,0,0];

        console.log("calculando campo eletrico");
        // (geometry.type)
        this.a = tela1.cena3D.listPontosView();
        this.aModel = controlador.objeto.listPontos();
        this.o = tela1.cena3D.listObjView();
        this.oModel = controlador.objeto.listObj();
        if(this.a.length < 1){
            alert("Inserir Ponto");
        }
        if(this.o.length < 1){
            alert("Inserir Objetos geometricos");
        }
        // percorer vetor de pontos 
        for (this.i = 0; this.i < this.a.length; this.i++) {
            this.p_click = [this.a[this.i].position.x, this.a[this.i].position.y, this.a[this.i].position.z]
            this.vetor = [];
            // percorer o vetor de objetos
            for(this.j = 0; this.j < this.o.length; this.j++){
                this.p_obj = [this.o[this.j].position.x, this.o[this.j].position.y, this.o[this.j].position.z];
                // verificar se objeto tem mudar 
                this.raio = this.o[this.j].raio;
                // soma todos os vetores de campo eletrico gerados pelos objetos
                this.vetor[0] += this.vetor[0];
                this.vetor[1] += this.vetor[1];
                this.vetor[2] += this.vetor[2];
                this.carga = this.oModel[this.j].carga;
                if(this.o[this.j].geometry.type == "TorusGeometry"){
                    this.vetor = calcCampoAnel(this.p_click, this.p_obj, this.raio, this.carga);
                    this.vetor[0] = this.vetor[0] * (this.aModel[this.i].carga*Math.pow(10,-6));
                    this.vetor[1] = this.vetor[1] * (this.aModel[this.i].carga*Math.pow(10,-6));
                    this.vetor[2] = this.vetor[2] * (this.aModel[this.i].carga*Math.pow(10,-6));
                }
                if(this.o[this.j].geometry.type == "CircleGeometry"){
                    this.vetor = calcCampoDisco(this.p_click, this.p_obj, this.raio, this.carga);
                    this.vetor[0] = this.vetor[0] * this.aModel[this.i].carga*Math.pow(10,-6);
                    this.vetor[1] = this.vetor[1] * this.aModel[this.i].carga*Math.pow(10,-6);
                    this.vetor[2] = this.vetor[2] * this.aModel[this.i].carga*Math.pow(10,-6);
                }
                if(this.o[this.j].geometry.type == "CylinderGeometry"){
                    this.vetor = calcCampoLinha(this.p_click, this.p_obj, this.raio, this.carga);
                    this.vetor[0] = this.vetor[0] * this.aModel[this.i].carga*Math.pow(10,-6);
                    this.vetor[1] = this.vetor[1] * this.aModel[this.i].carga*Math.pow(10,-6);
                    this.vetor[2] = this.vetor[2] * this.aModel[this.i].carga*Math.pow(10,-6);
                }
            } 
            this.pI[0] = this.p_click[0] + this.vetor[0]*500;
            this.pI[1] = this.p_click[1] + this.vetor[1]*500;
            this.pI[2] = this.p_click[2] + this.vetor[2]*500;
            tela1.cena3D.addVetor(this.p_click, this.pI, "F"); 
            console.log("Vetor Campo eletrico: "+this.vetor);
        }
    }

    this.calculaTrabalho = function(p_inicial, p_final){

        this.trab = 0;
        this.p_inicial = p_inicial;
        this.p_final = p_final;

        this.a = tela1.cena3D.listPontosView();
        this.aModel = controlador.objeto.listPontos();
        this.o = tela1.cena3D.listObjView();
        this.oModel = controlador.objeto.listObj();
        
        if(this.o.length < 1){
            alert("Inserir objetos geometricos");
        }
        if(this.a.length < 1){
            alert("Inserir dois pontos");
        }
        if(this.a.length < 2){
            alert("Inserir mais um ponto");
        } 
        // selecionar dois pontos na tela
        this.pts = tela1.cena3D.selecionaPontos();

        this.j = 0;
        // percorer o vetor de objetos
        for(this.j = 0; this.j < this.o.length; this.j++){
            // alert(o[this.j].geometry.type); passar ponto inicial
            this.trab = this.trab + calcTrabalho(this.p_inicial, this.p_final, this.o[this.j], this.oModel[this.j], this.aModel[this.j]);
        }
        console.log("Trabalho: "+this.trab);
        tela1.cena3D.addVetor(this.p_inicial, this.p_final, "W");
    }

    this.calculaPotencial = function(){
        this.pI = [0,0,0];
        this.a = tela1.cena3D.listPontosView();
        this.o = tela1.cena3D.listObjView();
        this.oModel = controlador.objeto.listObj();
        if(this.a.length < 1){
            alert("Inserir Ponto");
        }
        if(this.o.length < 1){
            alert("Inserir Objetos geometricos");
        }
        // percorer vetor de pontos 
        for (this.i = 0; this.i < this.a.length; this.i++) {
            this.p_click = [this.a[this.i].position.x, this.a[this.i].position.y, this.a[this.i].position.z]
            this.vetor = [];
            // percorer o vetor de objetos
            for(this.j = 0; this.j < this.o.length; this.j++){
                this.p_obj = [this.o[this.j].position.x, this.o[this.j].position.y, this.o[this.j].position.z];
                // verificar se objeto tem mudar 
                this.raio = this.o[this.j].raio;
                // soma todos os vetores de campo eletrico gerados pelos objetos
                this.vetor[0] += this.vetor[0];
                this.vetor[1] += this.vetor[1];
                this.vetor[2] += this.vetor[2];
                this.carga = this.oModel[this.j].carga;
                if(this.o[this.j].geometry.type == "TorusGeometry"){
                    this.vetor = calcPotencialAnel(this.p_click, this.p_obj, this.raio, this.carga);
                }
                if(this.o[this.j].geometry.type == "CircleGeometry"){
                    this.vetor = calcPotencialDisco(this.p_click, this.p_obj, this.raio, this.carga);
                }
                if(this.o[this.j].geometry.type == "CylinderGeometry"){
                    this.vetor = calcPotencialLinha(this.p_click, this.p_obj, this.raio, this.carga);
                }
            } 
            console.log("Vetor Campo eletrico: "+this.vetor);
        }
    }


    // controlador.mudarCarga(this.i, parseFloat(this.carga) ,"ponto");      
    this.mudarCarga = function(index, carga, tipo){
        controlador.objeto.mudarCarga(index, carga, tipo);
    }

    this.getCarga = function(index, tipo){
        return controlador.objeto.getCarga(index, tipo);           
    }

}
