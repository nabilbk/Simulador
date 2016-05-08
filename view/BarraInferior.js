var BarraInferior = function(div) {
	document.getElementById(div).style.border = "solid black 2px";
	document.getElementById(div).style.backgroundColor = "#62f464";


	// Eventos de click nos botões
   document.getElementById("forcaBotao").addEventListener("click", function() {
   		alert("Força");
   }, false);

   document.getElementById("campoBotao").addEventListener("click", function() {
   		alert("Campo eletrico");
   }, false);
}