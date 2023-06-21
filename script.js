const firebaseConfig = {
    apiKey: "AIzaSyAbFrkPzQP1Z4lYmspTuxHu4iycauG-jm8",
    authDomain: "validacion-fromulario.firebaseapp.com",
    projectId: "validacion-fromulario",
    storageBucket: "validacion-fromulario.appspot.com",
    messagingSenderId: "482378761093",
    appId: "1:482378761093:web:94de3352845f404260baec",
    measurementId: "G-E9D13PZ5KX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById('formulario').addEventListener('submit', (event) =>{
    event.preventDefault()

    //validar campo nombre

    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById ('nameError')

    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor introduce tu nombre '
        errorNombre.classList.add('error-message')     
    }else{
        errorNombre.textContent = ''
        errorNombre.classList.add('error-message')     
    }

    //validar correo electronico
    let emailEntrada = document.getElementById('email');
    let emailError = document.getElementById ('emailError');
    let emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if (!emailPattern.test(emailEntrada.value)){
        emailError.textContent = 'Por favor introduce un email valido'
        emailError.classList.add('error-message')     
    }else {
        emailError.textContent = ''
        emailError.classList.add('error-message')     
    }
    //validar la contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contasenaError = document.getElementById ('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/

    if (!contrasenaPattern.test(contrasenaEntrada.value)){
        contasenaError.textContent = 'Por favor introduce una contraseña de minimo 8 caracteres, numerica mayusculas y minusculas maximo 15 carateres y caracter especial';
        contasenaError.classList.add('error-message')
    }else{
        contasenaError.textContent = ''
        contasenaError.classList.add('error-message')
    }

    //si todos los campos son validos enviar el formulario
    if (!errorNombre.textContent && !emailError.textContent && !contasenaError.textContent){
        
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert('El formulario ha sido enviado con éxito', docRef.id)
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert (error);
        });
    }
})
