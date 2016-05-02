// define a classe Anel
var AnelView = function(raio,px,py,pz) { 
    var torusGeometry = new THREE.TorusGeometry(raio, 0.5, 20, 60, Math.PI*5 ); 
    var torusMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
    var torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.x = px;
    torus.position.y = py;
    torus.position.z = pz;
    // torus.rotation.x = 0;
    torus.rotation.y = Math.PI / 2;
    // torus.rotation.z = 0;
    return torus;
}

// metodos da classe anel
AnelView.prototype.getRaio = function(){
	return this.raio;
}