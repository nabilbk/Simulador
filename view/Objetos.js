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


// define a classe Ponto
var PontoView = function(raio,px,py,pz) { 

// radius — sphere radius. Default is 50.
// widthSegments — number of horizontal segments. Minimum value is 3, and the default is 8.
// heightSegments — number of vertical segments. Minimum value is 2, and the default is 6.
// phiStart — specify horizontal starting angle. Default is 0.
// phiLength — specify horizontal sweep angle size. Default is Math.PI * 2.
// thetaStart — specify vertical starting angle. Default is 0.
// thetaLength — specify vertical sweep angle size. Default is Math.PI.


    var sphereGeometry = new THREE.SphereGeometry( 0.3, 8, 8 );
    var sphereMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
    var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );

    sphere.position.x = px;
    sphere.position.y = py;
    sphere.position.z = pz;

    return sphere;
}

// metodos da classe anel
AnelView.prototype.getRaio = function(){
	return this.raio;
}