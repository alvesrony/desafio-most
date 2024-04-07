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

});