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

  document.getElementById("discoBotao").addEventListener("click", function() {
    createDiv('disco');
    tela1.barraLateral.abrirPop(3);
  }, false);

  document.getElementById("linhaBotao").addEventListener("click", function() {
    createDiv('linha');
    tela1.barraLateral.abrirPop(4);
  }, false);


  this.abrirPop = function(idPop){
    if(idPop == 1){
      document.getElementById('popup').style.id = 1;
    }else if (idPop == 2) {
      document.getElementById('popup').style.id = 2;
    }else if (idPop == 3) {
      document.getElementById('popup').style.id = 3;
    }else if (idPop == 4) {
      document.getElementById('popup').style.id = 4;
    }else{
      alert("ERRO abrirPop");
    }
    document.getElementById('popup').style.display = 'block';
  }

  this.fecharPop = function(){
    document.getElementById('popup').style.display = 'none';
  }


  this.insereObj = function(id){
    var posicao = document.getElementById('posicao').value;
    var carga = document.getElementById('carga').value;
    var posicao2 = posicao.split(",");

    if(id == 1){
      obj = new AnelView(parseFloat(posicao2[0]),parseFloat(posicao2[1]),parseFloat(posicao2[2]),parseFloat(posicao2[3]));
      tela1.cena3D.addObjeto(obj);
      controlador.objeto.addObjetoModel("anel", parseFloat(carga));
    }else if(id == 2) {
      var posicao = document.getElementById('posicao').value;
      var posicao2 = posicao.split(",");
      obj = new PontoView(parseFloat(posicao2[0]),parseFloat(posicao2[1]),parseFloat(posicao2[2]),parseFloat(posicao2[3]));
      tela1.cena3D.addPonto(obj);
      controlador.objeto.addObjetoModel("ponto", parseFloat(carga));
    }else if(id == 3) {
      var posicao = document.getElementById('posicao').value;
      var posicao2 = posicao.split(",");
      obj = new DiscoView(parseFloat(posicao2[0]),parseFloat(posicao2[1]),parseFloat(posicao2[2]),parseFloat(posicao2[3]));
      tela1.cena3D.addObjeto(obj);
      controlador.objeto.addObjetoModel("disco", parseFloat(carga));
    }else if(id == 4) {
      var posicao = document.getElementById('posicao').value;
      var posicao2 = posicao.split(",");
      obj = new LinhaView(parseFloat(posicao2[0]),parseFloat(posicao2[1]),parseFloat(posicao2[2]),parseFloat(posicao2[3]));
      tela1.cena3D.addObjeto(obj);
      controlador.objeto.addObjetoModel("linha", parseFloat(carga));
    }
    else{
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
 
  var leftDiv = parseFloat(document.getElementById(nomeDiv).style.left, 10);
  var topDiv = parseFloat(document.getElementById(nomeDiv).style.top, 10);

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

