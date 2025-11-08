document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("FormLogin");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita recargar la página
    //tomo nombre
    const email = document.getElementById("email").value;
    // tomo password
    const password = document.getElementById("password").value;
    // tomo horario
    const horaRegistro = new Date().toLocaleString();

    console.log("Formulario log In completo:");
    console.log("email:", email);
    console.log("Contraseña:", password);
    console.log("Hora de registro:", horaRegistro);
  });
});
