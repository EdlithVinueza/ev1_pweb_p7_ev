// Variables generales
let cedula;
let nombre;
let apellido;

// Función para enviar mensaje de error
function enviarMensajeDeError(mensaje, tipo) {
    const mensajeDiv = document.getElementById(tipo);
    mensajeDiv.innerText = mensaje;
}

// Función para validar que los campos estén llenos
function validarCampos() {
    if (cedula === '' || nombre === '' || apellido === '') {
        enviarMensajeDeError('Todos los campos son obligatorios', 'form-error');
        return false;
    }
    return true;
}

// Función para obtener el valor de los atributos
function obtenerValorAtributos() {
    cedula = document.getElementById('cedula').value;
    nombre = document.getElementById('nombre').value;
    apellido = document.getElementById('apellido').value;
}

// Función para guardar los atributos
function guardarAtributos() {
    obtenerValorAtributos();
    if (validarCampos()) {
        enviarMensajeDeError('', 'form-error');
        alert('Datos guardados correctamente');
        convertirAJson();
    }
   
}

// Función para convertir a JSON
function convertirAJson() {
    obtenerValorAtributos();
    if (validarCampos()) {
        json = "{\n cedula:'" + cedula + "',\n nombre: '" + nombre + "',\napellido:'" + apellido + "'\n}";
        document.getElementById('json-input').value = json;
        enviarMensajeDeError('', 'form-error');
    }
}

// Función para convertir a formulario
function convertirAFormulario() {
    const jsonInput = document.getElementById('json-input').value;
    try {
        const data = JSON.parse(jsonInput);
        if (!data.cedula || !data.nombre || !data.apellido) {
            enviarMensajeDeError('JSON está vacío o incompleto', 'json-error');
        } else {
            document.getElementById('cedula').value = data.cedula;
            document.getElementById('nombre').value = data.nombre;
            document.getElementById('apellido').value = data.apellido;
            enviarMensajeDeError('', 'json-error');
        }
    } catch (e) {
        enviarMensajeDeError('JSON inválido', 'json-error');
    }
}

// Event listeners
document.getElementById('guardar').addEventListener('click', guardarAtributos);
document.getElementById('json').addEventListener('click', convertirAFormulario);