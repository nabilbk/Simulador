var BarraLateral = function(cena3D, div) {

	document.getElementById(div).style.border = "solid red 2px";
	document.getElementById(div).style.backgroundColor = "#096ab1";

    this.insereAnel = function(id){
    	if(id == 1){
			var posicao = document.getElementById('posicao').value;
			var posicao2 = posicao.split(",");
		    obj = new AnelView(parseInt(posicao2[0]),parseInt(posicao2[1]),parseInt(posicao2[2]),parseInt(posicao2[3]));
		    tela1.cena3D.addObjeto(obj);
    	}else if(id == 2) {
    		alert("22")
    	}
    	if(obj == null){
    		alert("/BarraLateral.js/ :id do obejto não encontrado:");
    	}
    }

   this.fecharPop = function(){
     document.getElementById('popup').style.display = 'none';
   }

   this.abrirPop = function(){
     document.getElementById('popup').style.display = 'block';
     // setTimeout ("tela1.barraLateral.fecharPop()", 3000);
   }

   document.getElementById("anelBotao").addEventListener("click", function() {
   		var div = document.getElementById('popup');
		   		// 2.2 Posição
		div.style.position = 'absolute';
		div.style.top = '100px';
		div.style.left = '50px';

		var leftDiv = parseInt(div.style.left, 10);
		var topDiv = parseInt(div.style.top, 10);

		// ajustar a localização do popup 
		// TODO: ajustar um offset
		var divPop = document.getElementById('popup');
		document.getElementById('popup').style.left = (leftDiv+80) + 'px';
		document.getElementById('popup').style.top = (topDiv-70) + 'px';

		// divPop.style.left = (leftAtual + 5) + 'px'; // desloca 5px para a direita

		// abrir o a janela popup
    	tela1.barraLateral.abrirPop();

   }, false);

}


function myFunction() {
	// document.getElementById("myForm").submit();
	tela1.barraLateral.fecharPop();	

    tela1.barraLateral.insereAnel(1);
}
