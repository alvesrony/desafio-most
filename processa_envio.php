<?php

$chave_secreta = '6LfRjbgpAAAAANiKZer9CeUkb9E-e5SPV1YGNJAV';
$recaptcha_response = $_POST['g-recaptcha-response'];

$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$chave_secreta&response=$recaptcha_response");
$response_keys = json_decode($response, true);

if (intval($response_keys["success"]) !== 1) {
    // Captcha inválido, exibir mensagem de erro ou tomar outra ação
    echo "Por favor, verifique o reCAPTCHA.";
} else {
    // Captcha válido, processar o formulário
    echo "O formulário foi enviado com sucesso!";
}

?>