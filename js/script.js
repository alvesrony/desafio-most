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

    /********************  Lógica de contato ********************/
    $('#form-contato').submit(function(event) {
        event.preventDefault();
    
        var formData = $(this).serialize();
       
        var queryString = formData;

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
        
        console.log(queryStringToJson(queryString));
        $("form")[0].reset();
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


});