var BarraInferior = function(div) {

	document.getElementById(div).style.border = "solid black 2px";
	document.getElementById(div).style.backgroundColor = "#62f464";

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
		controlador.calculaTrabalho();
		// CONTROLLER --> VERIFICA AS DEPENDENCIAS E REALIZA O CALCULO  
   }, false);

   document.getElementById("potencialBotao").addEventListener("click", function() {
		controlador.calculaPotencial();
		// CONTROLLER --> VERIFICA AS DEPENDENCIAS E REALIZA O CALCULO  
   }, false);

}