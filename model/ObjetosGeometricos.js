// define a classe ObjetoGeometrico - classe mãe 
var ObjetoGeometricoModel = function(carga) {
	this.carga = carga;
}

// adiciona o método getPx 
ObjetoGeometricoModel.prototype.getCarga = function(){
	return this.px;
}

// ****** Define objetos geometricos herdados de ObjetoGeometrico ****** // 
// define a classe Anel
var AnelModel = function() {
	this.nome = "AnelModel"
	// Chama o método parente
    ObjetoGeometricoModel.call(this,px,py,pz);
    this.raio = raio || 5;
}
// herda de ObjetoGeometrico
AnelModel.prototype = new ObjetoGeometricoModel();
// Todo Anel herda da classe ObjetoGeometrico
AnelModel.prototype = Object.create(ObjetoGeometricoModel.prototype);

// metodos da classe anel
AnelModel.prototype.getRaio = function(){
	alert("metodo anel");
}