const form = document.getElementById("new-user-form");

form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const formData = new FormData(form);

    fetch("/php/process_registration.php", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.text())
        .then(() => {
            form.reset(); 
        })
        .catch((error) => {
            console.error("Erro:", error);
        });
});