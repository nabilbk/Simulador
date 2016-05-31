var BarraInferior = function(div) {

	// document.getElementById(div).style.border = "solid black 2px";
	document.getElementById(div).style.backgroundColor = "#000080";

	// Eventos de click nos botões
   document.getElementById("forcaBotao").addEventListener("click", function() {
   		controlador.calculaForca();
		// CONTROLLER --> VERIFICA AS DEPENDENCIAS E REALIZA O CALCULO  
   }, false);

   document.getElementById("campoBotao").addEventListener("click", function() {
		controlador.calculaCampo();
		// CONTROLLER --> VERIFICA AS DEPENDENCIAS E REALIZA O CALCULO  
   }, false);
   
   document.getElementById("trabalhoBotao").addEventListener("click", function() {
   		limparCombo();
		carregarCombo(); 		
   	    abriPop();
		// CONTROLLER --> VERIFICA AS DEPENDENCIAS E REALIZA O CALCULO  
   }, false);

   document.getElementById("potencialBotao").addEventListener("click", function() {
		controlador.calculaPotencial();
		// CONTROLLER --> VERIFICA AS DEPENDENCIAS E REALIZA O CALCULO  
   }, false);


   this.fecharPop = function(){
   		document.getElementById('comboBox').style.display = 'none';
   }

   this.calculaTrabalhoBotao = function(){

		var comboInicial = document.getElementById("cboPincial");

		var comboFinal = document.getElementById("cboPfinal");

   		posiaoI = comboInicial.options[comboInicial.selectedIndex].value;
   		posiaoF = comboFinal.options[comboFinal.selectedIndex].value;

   		this.pts = tela1.cena3D.listPontosView();

   		pIncial = [this.pts[posiaoI].position.x, this.pts[posiaoI].position.y, this.pts[posiaoI].position.z];
   		pFinal = [this.pts[posiaoF].position.x, this.pts[posiaoF].position.y, this.pts[posiaoF].position.z];
		controlador.calculaTrabalho(pIncial, pFinal);
		fecharpopupInf();

   }

   function abriPop(){
   	    document.getElementById('comboBox').style.display = 'block';
        // var div = document.getElementById('popupCena');
        document.getElementById('comboBox').style.position = 'absolute';
        document.getElementById('comboBox').style.left = '950px';
        document.getElementById('comboBox').style.top = '150px';
   }

   function carregarCombo(){
   		this.pts = tela1.cena3D.listPontosView();

		var comboInicial = document.getElementById("cboPincial");

		var comboFinal = document.getElementById("cboPfinal");

   		for (this.i = 0; this.i < this.pts.length; this.i++) {
   			var opt0 = document.createElement("option");
    		opt0.value = this.i;
    		opt0.text = "P"+this.i;
    		comboInicial.add(opt0, comboInicial.options[0]);
    		// comboFinal.add(opt0, comboFinal.options[0]);
   		};

   		for (this.i = 0; this.i < this.pts.length; this.i++) {
   			alert("forrr");
   			var opt0 = document.createElement("option");
    		opt0.value = this.i;
    		opt0.text = "P"+this.i;
    		// comboInicial.add(opt0, comboInicial.options[0]);
    		comboFinal.add(opt0, comboFinal.options[0]);
   		};
   }

   function limparCombo(){

	var comboInicial = document.getElementById("cboPincial");
	var comboFinal = document.getElementById("cboPfinal");
	
    while (comboInicial.length) {
        comboInicial.remove(0);
    }
    while (comboFinal.length) {
        comboFinal.remove(0);
    }
   }
}

function fecharpopupInf(){
    tela1.barraInferior.fecharPop();     
}
