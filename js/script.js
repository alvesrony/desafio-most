$(document).ready(function() {
    
    $(document).on("click", function(event) {
        if (!$(event.target).closest(".offcanvas.show").length && !$(event.target).is("#icon-button")) {
            $("#icon-button").removeClass("bi-x").addClass("bi-list");
        }
    });
    
    $("#icon-button").click(function() {
        $("#icon-button").toggleClass("bi-x bi-list");
    });

    function toggleClasses() {
        if ($(window).width() >= 575) {
            $("#icon-button").removeClass("bi-x bi-list").addClass("bi-list");
        }
    }
    
    $(document).ready(function() {
        toggleClasses();
    
        $(window).resize(function() {
            toggleClasses();
        });
    });

    $('.more').click(function(){
        var content = $(this).closest('.card-flip').find('.content');
        if (content.css('transform') === 'none') {
          content.css('transform', 'rotateY(180deg)');
        } else {
          content.css('transform', '');
        }
      });



    /********************  Lógica de carregamento da página ********************/
    window.addEventListener('load', function() {
        document.querySelector('.loader').style.display = 'none'; // Esconde o loader
        document.getElementById('main-container').style.display = 'block'; // Mostra a div principal
    });
    
    
    /********************  Lógica de contato ********************/
    $('#form-contato').submit(function(event) {
        event.preventDefault();
    
        // Função para verificar se todos os campos estão preenchidos corretamente
        function validarFormulario() {
            var nome = $('#nome').val();
            var email = $('#email').val();
            var telefone = $('#telefone').val();
            var mensagem = $('#mensagem').val();
            var recaptchaResponse = $('#g-recaptcha-response').val();
    
            if (nome.trim() === '' || email.trim() === '' || telefone.trim() === '' || mensagem.trim() === '' || recaptchaResponse.trim() === '') {
                alert('Por favor, preencha todos os campos do formulário.');
                return false;
            }
    
            return true;
        }
    
        // Verifica se todos os campos estão preenchidos corretamente
        if (!validarFormulario()) {
            return;
        }
    
        // Lógica Captcha
        grecaptcha.ready(function() {
            grecaptcha.execute('6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', { action: 'submit' }).then(function(token) {
                $('#meu-formulario').append('<input type="hidden" name="token" value="' + token + '">');
                $('#meu-formulario').unbind('submit').submit();
            });
        });
    
        var formData = $(this).serialize();
    
        // converter a string em um objeto JSON
        function queryStringToJson(queryString) {
            var pairs = queryString.split('&');
            var result = {};
            pairs.forEach(function(pair) {
                pair = pair.split('=');
                result[pair[0]] = decodeURIComponent(pair[1] || '');
            });
            return JSON.stringify(result, null, 2);
        }
        var json = queryStringToJson(formData);
        console.log(json);
    
        // Limpa o formulário após o envio
        $(this)[0].reset();
    });
    
    // remover caracteres diferentes de números
    $('#telefone').on('input', function() {
        var inputValue = $(this).val();
        var numericValue = inputValue.replace(/\D/g, '');
        $(this).val(numericValue);
    });
    
    // Limitar o número de caracteres nos campos
    $('#nome').attr('maxlength', 100);
    $('#email').attr('maxlength', 100);
    $('#telefone').attr('maxlength', 20);
    $('#mensagem').attr('maxlength', 500);
    


    /********************  Lógica de transcrição de texto ********************/
    $('#testar').click(function() {
        $('#transcript-container').removeClass('d-none');
    });

    $('#button-x').click(function() {
        $('#transcript-container').addClass('d-none');
        $('#transcript').text('');
        recognition.stop();
    });

    const startButton = $('#startButton');
    const transcriptDiv = $('#transcript');
    let recognition;

    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.lang = 'pt-BR';

        recognition.onstart = function() {
            startButton.text('Escutando...');
        };

        recognition.onend = function() {
            startButton.text('Iniciar Reconhecimento');
        };

        recognition.onresult = function(event) {
            const resultIndex = event.resultIndex;
            const transcript = event.results[resultIndex][0].transcript;
            transcriptDiv.text(transcriptDiv.text() + transcript);
        };

        startButton.click(function() {
            if (recognition.running) {
                recognition.stop();
            } else {
                recognition.start();
            }
        });
    } else {
        transcriptDiv.text('Seu navegador não suporta a API de reconhecimento de voz.');
    }


    /********************  Lógica de definição de cookie ********************/
    // Função para definir um cookie
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Função para obter o valor de um cookie
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Verifica se os cookies já foram aceitos anteriormente
    var cookiesAccepted = getCookie('cookies_accepted');
    console.log(cookiesAccepted);
    if (cookiesAccepted === null || cookiesAccepted === "") {
        document.getElementById('cookie-banner').style.display = 'flex';
    } else {
        document.getElementById('cookie-banner').style.display = 'none';
    }

    // Função para aceitar os cookies
    function acceptCookies() {
        setCookie('cookies_accepted', 'true', 365);
        document.getElementById('cookie-banner').style.display = 'none';
    }

    // Função para rejeitar os cookies
    function rejectCookies() {
        setCookie('cookies_accepted', 'false', 365);
        document.getElementById('cookie-banner').style.display = 'none';
    }

    // Adiciona os eventos de clique aos botões
    document.getElementById('accept-cookies').addEventListener('click', acceptCookies);
    document.getElementById('reject-cookies').addEventListener('click', rejectCookies);

    
    /*********************  Botão voltar ao topo ************************/
    $('#top-link').on('click', function(e) {
        e.preventDefault();
    
        // Scroll suave para o topo da página usando jQuery
        $('html, body, #main-container').animate({ scrollTop: 0 }, 'slow');
    });




    /*********************  Carregamento ************************/
    // Lógica de carregamento
    document.addEventListener('DOMContentLoaded', function() {
        if (window.innerWidth > 495) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = '../imagens/background-principal.webp';
            link.as = 'image';
            document.head.appendChild(link);
        } else {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = '../imagens/background-principal-pequena.webp';
            link.as = 'image';
            document.head.appendChild(link);
        }
    });

});

