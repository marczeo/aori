/*Variables*/
var aspect_ratio = 0.56;
var title_aspect_ratio = 0.2;
var $hero_video = $(".hero");
var $window = $(window);
var $servicios_flag = 0;
var seccion_aspect_ratio = .43;
var anchor, elem;
/*
  Cosas a cargar cuando la pagina esta lista
  para elementos que no se necesitan cargar antes de llamar la función.
  */
  $(document).ready(function() {
    $hero_video.height($hero_video.width() * aspect_ratio);
    $(".vertical").height(($(".clientes_img img").height())*0.90);
    $(function() {
        $("#navbar").load("navbar.html");
    });
    loadPage();
    /*
     **SERVICIOS**
     */
     /*Click dentro de franquicia que tiene un infografico*/
     $('#Franquicia .modelos').click(function() {
        if ($('.infographic').is(':visible')) {
            $('.infographic').hide();
        } else {
            $('.infographic').show();
        }
    });

     var widthTmp = 0;
     $('.subtema_leer').click(function() {
        parent = $(this).parent();
        if ($(this).siblings('.servicio_desc').is(':visible')) {
            $('.modelos').show();
            $('.modelos button').html('Leer Más');
            $(this).siblings('.servicio_desc').slideUp('slow');
            $('html, body').animate({
                scrollTop: elem.offset().top-130
            }, 'slow');
        } else {

         widthTmp = $(this).width();
         $('.modelos').not(parent).hide();
         $('.modelos button').html('Leer Menos');
         elem = $(this).parent();
         $('html, body').animate({
            scrollTop: elem.offset().top-130
        }, 'fast');
         $(this).siblings('.servicio_desc').slideDown('slow');
     }
 });
    /*
    |-----------------------
    |Seccion Banner
    |-----------------------
    */
    if ($(window).width() > 769) {
        $('.seccion_img').height($(".seccion_img").width() * seccion_aspect_ratio);
    }
});

/*
  Cosas a cargar cuando la pagina hacer Load
  para elementos que necesitan cargar antes de llamar eventos o funciones.
  */
  window.onload = function() {
    $page_elements = $('.subtemas').children("div");
    $page_elements.each(function() {
        $("#" + $(this).attr('class') + "_" + $(this).attr('id')).load($(this).parent().attr('name') + ".html " + "." + $(this).attr('id'));
    });
    $animation_elements = $("*[class^='prueba']");
    $window.on('scroll', check_if_in_view);
    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');
    $('.direccion').click(function() {
        if ($(this).attr("name") == "headquarters") {
            map.setZoom(16);
            map.setCenter(new google.maps.LatLng(20.7018007, -103.3808581));
        }
        if ($(this).attr("name") == "comerciales") {

            map.setZoom(16);
            map.setCenter(new google.maps.LatLng(20.6814282, -103.3821035));
        }
        if ($(this).attr("name") == "zacatecas") {
            //alert($(this).attr("name"));
            map.setZoom(8);
            map.setCenter(new google.maps.LatLng(23.095497, -103.6113519));
        }
    });
    
};

$(window).resize(function() {
    $hero_video.height($hero_video.width() * aspect_ratio);
    $(".vertical").height(($(".clientes_img img").height())*0.90);
    // if ($(this).width() < 1150) {
    //     $(".title-container").height($(".title-container").width() * title_aspect_ratio);
    // } else {
    //     $(".title-container").height(227);
    // }

    /*
    |-----------------------
    |Seccion Banner
    |-----------------------
    */
    if ($(window).width() > 769) {
      $('.seccion_img').height($(".seccion_img").width() * seccion_aspect_ratio);
  }else{
      $('.seccion_img').height("auto");
  }
});

function loadPage() {
    var url = window.location.href;
    var hayAncla = url.indexOf("#");
    if (hayAncla != -1) {
        var hash = url.substring(url.indexOf("#") + 1);
        window.location.hash = hash;
    }
}

 /*function slide_Servicios(servicio) {
     if ($('#' + servicio).is(':visible')) {
         $("#" + servicio).slideUp("fast");
     } else {
         $(".servicio_desc").not(servicio).slideUp("fast");
         $("#" + servicio).slideToggle("fast");
     }
 }*/

 function slide_Subservicios(servicio,anchor,boton) {
    $flag = 0;
    if ($('#' + servicio).is(':visible')) {
        $("#" + servicio).slideUp("fast");
        $(".banner_servicio").removeClass("imagen_animacion");
        $(boton).children().html('Leer Más')
    } else {
        $(".banner_servicio").addClass("imagen_animacion");
        $(boton).children().html('Cerrar')
        slide_Check();
        $(".subtemas").not(servicio).slideUp("fast", function() {
            $flag++;
        });
        $flag++;    
        while($flag < 9)
        {

        }
        $("#" + servicio).slideDown(800, function() {
            $("html, body").animate({ scrollTop: $("a[name='"+ anchor +"']").offset().top-90 }, 500);
        });
        
    }
}

function slide_Check() {
    //sleep(1100);
    $('.servicio_desc').each(function() {
        $(this).hide();
        $('.modelos').show();
    });
}

function valores_show(contenedor,element)
{
    $(element).children(".fa").toggleClass("fa-angle-double-up");
    $(element).children(".fa").toggleClass("fa-angle-double-down");
    $("."+ contenedor).parent().slideToggle();
    if(contenedor == "ubicacion")
        init_map();   
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
  }
}
}