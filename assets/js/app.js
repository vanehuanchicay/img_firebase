// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBxBzfeZiZ8iPELu3uU5T8Wb7-AoZ-YmMQ",
    authDomain: "emotion-api-7ffc6.firebaseapp.com",
    databaseURL: "https://emotion-api-7ffc6.firebaseio.com",
    projectId: "emotion-api-7ffc6",
    storageBucket: "emotion-api-7ffc6.appspot.com",
    messagingSenderId: "501726786283"

  };
	firebase.initializeApp(config);
	window.onload = inicializar;
	//rescatar url desde firebase
	database = firebase.database();
	var ref = database.ref('faceImg');
	ref.on('value', gotData, errData);

  function gotData(data) {
 	//console.log(data.val());
  	var inforImg = data.val();
  	var keys = Object.keys(inforImg);
  	console.log(keys);
  	for(var i = 0; i< keys.length; i++){
  		var k = keys[i];
  		var name = inforImg[k].name;
  		var urlFire = inforImg[k].url;
  }
  console.log(urlFire);

  }
  function errData(err){
  	console.log('errooooor')
  }

	var fichero;
	var storageRef;
	var faceImgRef;

	function inicializar(){
		fichero = document.getElementById('fichero');
		fichero.addEventListener('change', subirImagenAFirebase, false);

		storageRef = firebase.storage().ref();
		faceImgRef = firebase.database().ref().child('faceImg');

		mostrarImagenesDeFirebase();
	}

	function mostrarImagenesDeFirebase(){
		faceImgRef.on("value", function(snapshot){
			var datos = snapshot.val();
			var result = "";
			for(var key in datos){
				result += '<img width="200" src="' + datos[key].url + '"/>';
			}
			document.getElementById("img-container").innerHTML = result;
		})
	}

	function subirImagenAFirebase(){
		var imagenASubir = fichero.files[0];

		var uploadTask = storageRef.child('faces/' + imagenASubir.name).put(imagenASubir);

// no se si sirva es para saber el progreso de la subida

		uploadTask.on('state_changed', 
			function(snapshot){
			// se va mostrando el progreso de la subido de la imagen
		
		}, function(error) {
		  // Gestionar el error si se produce
			alert('hubo un error');
		}, function() {
		  // Cunado se ha subido exitosamente la imagen
		  
		var downloadURL = uploadTask.snapshot.downloadURL;
		crearNodoEnBDFirebase(imagenASubir.name, downloadURL) 
	});

}

	function crearNodoEnBDFirebase(nombreImagen, downloadURL){
		faceImgRef.push({nombre: nombreImagen, url: downloadURL})
	}



