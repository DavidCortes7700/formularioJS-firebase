const firebaseConfig = {
    apiKey: "AIzaSyD3Q5iMkUqC8yjpawlGWfIMdmLEag-pLEU",
    authDomain: "datosformulariojs.firebaseapp.com",
    projectId: "datosformulariojs",
    storageBucket: "datosformulariojs.appspot.com",
    messagingSenderId: "903680058044",
    appId: "1:903680058044:web:8adc10a841706d376366b9",
    measurementId: "G-QEG5M8FFH6"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();



document.querySelector('#formulario').addEventListener('submit', (event)=>{
    event.preventDefault();
    //Validar campo nombre
    let entradaNombre = document.querySelector('#name');
    let errorNombre = document.querySelector('#nameError');

    if(entradaNombre.value.trim() === ''){
        errorNombre.textContent='Por favor, introducir tu nombre';
        errorNombre.classList.add('error-message')
    }else{
        errorNombre.textContent = '';
        errorNombre.classList.remove('error-message')
    }

    //Validar correo electronico
    let entradaEmail = document.querySelector('#email');
    let errorEmail = document.querySelector('#emailError');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico
    
    if(!emailPattern.test(entradaEmail.value)){
        errorEmail.textContent='Por favor, introducir un email valido';
        errorEmail.classList.add('error-message')
    }else{
        errorEmail.textContent = '';
        errorEmail.classList.remove('error-message')
    }

    //Validar contraseña
    let entradaContrasena = document.querySelector('#password');
    let errorContrasena = document.querySelector('#passwordError');
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    if (!contrasenaPattern.test(entradaContrasena.value)) {
        errorContrasena.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas y caracteres especiales';
        errorContrasena.classList.add('error-message');
      } else {
        errorContrasena.textContent = '';
        errorContrasena.classList.remove('error-message');
      }

    //Si todos los campos son validos enviar formulario
    if(!errorNombre.textContent && !errorEmail.textContent && !errorContrasena.textContent){
        //backend que reciba información

        //Agregar datos
        db.collection("users").add({
            name: entradaNombre.value,
            email: entradaEmail.value,
            password: password.value
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

        alert('El formulario se ha enviado con exito');
        document.querySelector('#formulario').reset();
    }
})