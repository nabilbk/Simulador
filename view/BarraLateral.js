var BarraLateral = function(cena3D, div) {

  document.getElementById(div).style.border = "solid red 2px";
  document.getElementById(div).style.backgroundColor = "#096ab1";


// Eventos de click nos botões
  document.getElementById("anelBotao").addEventListener("click", function() {
    createDiv('anel');
    tela1.barraLateral.abrirPop(1);
  }, false);

  document.getElementById("pontoBotao").addEventListener("click", function() {
    createDiv('ponto');
    tela1.barraLateral.abrirPop(2);
  }, false);


  this.abrirPop = function(idPop){
    if(idPop == 1){
      document.getElementById('popup').style.id = 1;
    }else if (idPop == 2) {
      document.getElementById('popup').style.id = 2;
    }else{
      alert("ERRO abrirPop");
    }
    document.getElementById('popup').style.display = 'block';
  }

  this.fecharPop = function(){
    document.getElementById('popup').style.display = 'none';
  }


  this.insereObj = function(id){
    if(id == 1){
    var posicao = document.getElementById('posicao').value;
    var posicao2 = posicao.split(",");
      obj = new AnelView(parseInt(posicao2[0]),parseInt(posicao2[1]),parseInt(posicao2[2]),parseInt(posicao2[3]));
      tela1.cena3D.addObjeto(obj);
    }else if(id == 2) {
      var posicao = document.getElementById('posicao').value;
      var posicao2 = posicao.split(",");
      obj = new PontoView(parseInt(posicao2[0]),parseInt(posicao2[1]),parseInt(posicao2[2]),parseInt(posicao2[3]));
      tela1.cena3D.addObjeto(obj);
    }else{
      alert(" BarraLateral.js/ id do objeto nao encontrado ");
    }
  }
}

// função para criar e ajustar a div do form
function createDiv(nomeDiv) {
  var div = document.getElementById('popup');
  // 2.2 Posição
  div.style.position = 'absolute';
  div.style.top = '100px';
  div.style.left = '50px';
 
  var leftDiv = parseInt(document.getElementById(nomeDiv).style.left, 10);
  var topDiv = parseInt(document.getElementById(nomeDiv).style.top, 10);

  // ajustar a localização do popup 
  // TODO: ajustar um offset
  var divPop = document.getElementById('popup');
  document.getElementById('popup').style.left = (leftDiv+80) + 'px';
  document.getElementById('popup').style.top = (topDiv-70) + 'px';
}

// função generica para fechar o popup e inserir objeto
function myFunction() {
  tela1.barraLateral.fecharPop(); 
  tela1.barraLateral.insereObj(document.getElementById('popup').style.id);
}

