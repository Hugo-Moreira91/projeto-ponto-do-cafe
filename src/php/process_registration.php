<?php

    include_once('conection.php');

    $full_name = $_POST['name'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $house_number = $_POST['number'];
    $district = $_POST['district'];
    $city = $_POST['city'];
    $state = $_POST['state'];
    $username = $_POST['username'];
    $password = $_POST['newpassword'];

    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = :email");
    $stmt->execute(['email' => $email]);

    if ($stmt->rowCount() > 0) {
        echo "<script>alert('Este email já está cadastrado!'); window.history.back();</script>";
    } else {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        $result = mysqli_query($conn, "INSERT INTO usuarios(nome,email,endereco,numero,bairro,cidade,estado,nome_usuario,senha) VALUES ('$full_name','$email','$address','$house_number','$district','$city','$state','$username','$hashedPassword')");
    }

?>