document.getElementById('new-user-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const form = e.target;
    let error = false;

    const regexPatterns = {
        name: /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*{3,}$/,
        email: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        number: /^[1-9]\d*$/,
        username: /^[A-Za-z0-9_-]{3,}$/,
        password: /^[A-Za-z0-9.!@#$%^&*()_+-=]{5,}$/
    };

    function validateFields(field, regex) {
        return regex.test(field.value);
    }

    if (!validateFields(form.name, regexPatterns.name)) {
        alert("Nome inválido. Use apenas letras e espaços. Mínimo 3 caracteres.");
        error = true;
    } else if (!validateFields(form.email, regexPatterns.email)) {
        alert("Email inválido.");
        error = true;
    } else if (!validateFields(form.address, regexPatterns.name)) {
        alert("Endereço inválido. Mínimo 3 caracteres.");
        error = true;
    } else if (!validateFields(form.number, regexPatterns.number)) {
        alert("Número inválido. Insira apenas números positivos.");
        error = true;
    } else if (!validateFields(form.neighborhood, regexPatterns.name)) {
        alert("Bairro inválido. Mínimo 3 caracteres.");
        error = true;
    } else if (!validateFields(form.city, regexPatterns.name)) {
        alert("Cidade inválida. Mínimo 3 caracteres.");
        error = true;
    } else if (!validateFields(form.username, regexPatterns.username)) {
        alert("Nome de usuário inválido. Espaços não são permitidos. Mínimo 3 caracteres.");
        error = true;
    } else if (!validateFields(form.newpassword, regexPatterns.password)) {
        alert("Senha inválida. Mínimo 5 caracteres.");
        error = true;
    }

    if(error) return;

    const formDatas = {
        name: form.name.value,
        email: form.email.value,
        address: form.address.value,
        number: form.number.value,
        neighborhood: form.neighborhood.value,
        city: form.city.value,
        state: form.state.value,
        username: form.username.value,
        password: form.newpassword.value
      };

    sendDatasToServer(formDatas);
});


function sendDatasToServer(datas) {
    fetch("http://localhost:3000/cadastrar", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datas) 
    })
      .then(response => {
        if (response.ok) {
          return response.json(); 
        } else {
          throw new Error("Erro ao enviar dados para o servidor");
        }
      })
      .then( () => {
        alert("Cadastro realizado com sucesso!"); 
      })
      .catch(error => {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao enviar os dados. Tente novamente.");
      });
  }
  