// define a classe texto
var Texto = function(texto,px,py,pz) { 


	options = {'font' : 'helvetiker','weight' : 'normal', 'style' : 'normal','size' : 100,'curveSegments' : 300};


	var shape = new THREE.TextGeometry("Game Over", options );
    var wrapper = new THREE.MeshNormalMaterial();
    var words = new THREE.Mesh(shape, wrapper);
    return words

	// var options = {
	// 	size: 90,
	// 	height: 90,
	// 	weight: 'normal',
	// 	font: 'helvetiker',
	// 	style: 'normal',
	// 	bevelThickness: 2,
	// 	bevelSize: 4,
	// 	bevelSegments: 3,
	// 	bevelEnabled: true,
	// 	curveSegments: 12,
	// 	steps: 1
	// };
	
	// text1 = createMesh(new THREE.TextGeometry("teste", options));

	// // text1.position.z = -100;
	// // text1.position.y = 100;



	// var textShapes = THREE.FontUtils.generateShapes( "oi", options );
	// var text = new THREE.ShapeGeometry( textShapes );
	// var text1 = new THREE.Mesh( text, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) ) ;
	
	// return text1;

}


function createMesh(geom) {

            // assign two materials
//            var meshMaterial = new THREE.MeshLambertMaterial({color: 0xff5555});
//            var meshMaterial = new THREE.MeshNormalMaterial();
    var meshMaterial = new THREE.MeshPhongMaterial({
        specular: 0xffffff,
        color: 0xeeffff,
        shininess: 100,
        metal: true
    });
//            meshMaterial.side=THREE.DoubleSide;
            // create a multimaterial
    var plane = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);

    return plane;
}