document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const email = document.getElementById("email");
  const cedula = document.getElementById("cedula");
  const direccion = document.getElementById("direccion");
  const telefono = document.getElementById("telefono");
  const submitButton = document.querySelector(".boton");

  const validationRules = {
    nombre: {
      pattern: /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]{3,}$/,
      message: "El nombre debe contener solo letras y al menos 3 caracteres",
    },
    apellido: {
      pattern: /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]{3,}$/,
      message: "El apellido debe contener solo letras y al menos 3 caracteres",
    },
    email: {
      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      message: "Introduce un correo electrónico válido",
    },
    cedula: {
      pattern: /^\d{10}$/,
      message: "La cédula debe contener 10 dígitos",
    },
    direccion: {
      pattern: /^[a-zA-Z0-9\s,.'-]{3,}$/,
      message: "Introduce una dirección válida",
    },
    telefono: {
      pattern: /^\d{7,10}$/,
      message: "El teléfono debe contener entre 7 y 10 dígitos",
    },
  };

  const validateField = (field, rules) => {
    const errorSpan = document.getElementById(`error${capitalizeFirstLetter(field.id)}`);
    if (!rules.pattern.test(field.value)) {
      errorSpan.textContent = rules.message;
      return false;
    } else {
      errorSpan.textContent = "";
      return true;
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const checkFormValidity = () => {
    return (
      validateField(nombre, validationRules.nombre) &&
      validateField(apellido, validationRules.apellido) &&
      validateField(email, validationRules.email) &&
      validateField(cedula, validationRules.cedula) &&
      validateField(direccion, validationRules.direccion) &&
      validateField(telefono, validationRules.telefono)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formIsValid = true;

    [nombre, apellido, email, cedula, direccion, telefono].forEach((field) => {
      const isValidField = validateField(field, validationRules[field.id]);
      if (!isValidField) {
        formIsValid = false;
      }
    });

    submitButton.style.backgroundColor = formIsValid ? "green" : "red";

    if (formIsValid) {
      const formData = {
        nombre: nombre.value,
        apellido: apellido.value,
        email: email.value,
        cedula: cedula.value,
        direccion: direccion.value,
        telefono: telefono.value,
      };

      axios.post("/path/to/your/api", formData)
        .then((response) => {
          Swal.fire("Registro exitoso", "El usuario ha sido registrado con éxito", "success");
          form.reset();
          submitButton.style.backgroundColor = "red";
        })
        .catch((error) => {
          Swal.fire("Error", "Hubo un error al registrar el usuario", "error");
        });
    } else {
      Swal.fire("Error", "Por favor, corrige los errores en el formulario", "error");
    }
  };

  form.addEventListener("submit", handleSubmit);
});
