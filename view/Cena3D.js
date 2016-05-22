// Classe Cena 
var Cena3D = function(div) {

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var cena = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(45, $("#WebGL").width() / $("#WebGL").height(), 0.1, 1000);
    // position and point the camera to the center of the scene
    var teta = 0;
    var zoom = 50;
    camera.position.x = zoom;
    camera.position.y = 10;
    camera.position.z = 0;
    camera.rotation.x = 90;
    camera.lookAt(cena.position);

        
    // create a render and set the size
    var renderer = createRender(div);  

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(40, 60, 0);
    spotLight.castShadow = true;
    cena.add(spotLight);

    // show axes in the screen
    var axes = new THREE.AxisHelper(70);
    cena.add(axes);

    var objetos = [], plane;
    var pontos = [];
    var vetores = [];
    var controls;

    plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 2000, 2000, 8, 8 ),
        new THREE.MeshBasicMaterial( { visible: false } )
    );
    cena.add(plane);

    // var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2(),
    offset = new THREE.Vector3(),
    INTERSECTED, SELECTED;

    // ???
    var projector = new THREE.Projector();

    renderScene();

    renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
    renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
    renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );

    function onDocumentMouseMove( event ) {
        event.preventDefault();
		mouse.x = ( (event.clientX - event.target.getBoundingClientRect().left) / event.currentTarget.width ) * 2 - 1;
		mouse.y = - ( (event.clientY - event.target.getBoundingClientRect().top) / event.currentTarget.height ) * 2 + 1;
        raycaster.setFromCamera( mouse, camera );

        if ( SELECTED ) {
            var intersects = raycaster.intersectObject( plane );
            if ( intersects.length > 0 ) {
            SELECTED.position.copy( intersects[ 0 ].point.sub( offset ) );
            }
        return;
        }
        var ob = objetos.concat(pontos);
        var intersects = raycaster.intersectObjects( ob );
            if ( intersects.length > 0 ) {
                if ( INTERSECTED != intersects[ 0 ].object ) {
                    if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
                        INTERSECTED = intersects[ 0 ].object;
                        INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                        plane.position.copy( INTERSECTED.position );
                        plane.lookAt( camera.position );
                    }
                } else {
                    if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
                    INTERSECTED = null;
                }
    }

    function onDocumentMouseDown(event) {

        console.log("function onDocumentMouseDown");
        console.log(mouse.x, mouse.y);

        raycaster.setFromCamera( mouse, camera );
        var ob = objetos.concat(pontos);
        var intersects = raycaster.intersectObjects( ob );

        if (intersects.length > 0) {
            // console.log(intersects[0]);
            // intersects[0].object.material.transparent = true;
            // intersects[0].object.material.opacity = 0.1;
            SELECTED = intersects[0].object;
            // removeObjeto(SELECTED);
            var intersects = raycaster.intersectObject( plane );
            if ( intersects.length > 0 ) {
                 offset.copy( intersects[ 0 ].point ).sub(plane.position);
            }
        }
    }

    function onDocumentMouseUp( event ) {
        event.preventDefault();
        if ( INTERSECTED ) {
            plane.position.copy( INTERSECTED.position );
            SELECTED = null;
        }
    }

    function removeObjeto(obj){
        cena.remove(obj);
        // objetos.pop(obj);
        // controlador.objeto.removerObjetoModel("anel", parseInt(carga));
        alert("Cena3D: remover obj model");
    }

    function renderScene() {
        // stats.update();
        // render using requestAnimationFrame
        renderer.render(cena, camera);
        requestAnimationFrame(renderScene);
    }

    // classe render
    function createRender(div){
        console.log("renderizar : "+div);
        var renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize($("#"+div).width(), $("#"+div).height()); 
        renderer.setClearColor(new THREE.Color(0xc0cfbc));
        renderer.domElement.style.border ="solid blue 2px"; 
        // adiciona a saida do render para um elemento html
        document.getElementById(div).appendChild(renderer.domElement);
        return renderer;
    }

        // keyboards events
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37) {
            teta += 0.1;
            camera.position.z = zoom * Math.sin(teta);
            camera.position.x = zoom * Math.cos(teta);
            camera.lookAt(cena.position);
        }else if(event.keyCode == 39) {
            teta -= 0.1;
            camera.position.z = zoom * Math.sin(teta);
            camera.position.x = zoom * Math.cos(teta);
            camera.lookAt(cena.position);
        }

        if(event.keyCode == 38) {
            zoom -= 2;
        }
        if(event.keyCode == 40) {
            zoom += 2;
        }        

     });

    this.getObjeto = function(){
        alert("TODO: getObjeto");
    }

    this.resize = function(div){
        // alert("renderizar");
        renderer.setSize($("#"+div).width(), $("#"+div).height());
        renderer.domElement.style.border ="solid black 2px";  
    }

    this.addObjeto = function(obj){
        cena.add(obj);
        objetos.push(obj);
    }

    this.addPonto = function(obj){
        cena.add(obj);
        pontos.push(obj);
    }

    this.addVetor = function(pInicial, Pfim){
        obj = new VetorView(pInicial, Pfim);
        cena.add(obj);
        vetores.push(obj);
    }

	this.selecionaPontos = function(){
        alert("Selecione o ponto inicial e final");
        var pt = 0;
        while(pt < 2){
        	console.log("TODO: Cena3D: seleciona ponto "+pt);
        	pt++;	
        }
    }

    // metodo para listar todos os objetos do Model
    this.listObjView = function(){
        return objetos;
    }

    // metodo para listar todos os pontos inseridos no Model
    this.listPontosView = function(){
        return pontos;
    }

    this.deleteObjeto = function(obj){
        cena.remove(obj);
    }

    this.showObjetos = function(){
        alert(objetos);
    }

    this.showPontos = function(){
        alert(Pontos);
    }

    this.moverObjeto = function(obj, x, y, z){
        obj.position.x = x;
        obj.position.y = y;
        obj.position.z = z;
    }

    this.rotacionarObjeto = function(obj, x, y, z){
        obj.rotation.x = x;
        obj.rotation.y = y;
        obj.rotation.z = z;
    }

    this.rotacionarCamera = function(x, y, z){
        camera.rotation.x = x;
        camera.rotation.y = y;
        camera.rotation.z = z;
    }

}