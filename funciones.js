var data = {
    puntaje:{
        aciertos: 0,
        fallos: 0,
    },
    intervalos:{
        tiempo:{
            minutos: 1,
            segundos: 59
        },
        relojInterval: -1,
        monsterInterval: -1,
    },
    campo: {
        filas: 5,
        columnas: 9
    },
    pantalla:{
        campo:{
            alto: 0,
            ancho: 0
        },
        controles:{
            alto: 0,
            ancho: 0
        }
    },
    monstersName: [
        {
            nombre: "img/svg/001-zombi.svg",
            data: "agregar"
        },
        {
             nombre: "img/svg/002-zombi-1.svg",
             data: "agregar"
        },
        {
          nombre : "img/svg/003-lobo.svg",
          data: "agregar"
        },
        {
          nombre : "img/svg/004-fantasma.svg",
          data: "quitar"
        },
        {
          nombre : "img/svg/005-minotauro.svg",
          data: "agregar"
        },
        {
          nombre : "img/svg/006-monstruo.svg",
          data: "agregar"
        },
        {
          nombre : "img/svg/007-continuar-1.svg",
          data: "quitar"
        },
        {
          nombre : "img/svg/008-hombre-lobo.svg",
          data: "agregar"
        },
        {
          nombre : "img/svg/009-continuar.svg",
          data: "agregar"
        },
        {
          nombre : "img/svg/010-tonto.svg",
          data: "agregar"
        },
        {
          nombre : "img/svg/011-monstruo-1.svg",
          data: "agregar"
        }
    ],
    fondos:[
        "img/cementerio.png",
        "img/cementerio1.png",
        "img/cementerio-samurais.jpg",
        "img/alex-zolotarenko-cemetery-x.jpg"
    ],
    template:{
        list: '<li class="list-group-item d-flex justify-content-between align-items-center #nivel# list-group-item-primary">'+
                '#nombre#<span class="badge badge-secondary badge-pill">#puntos#</span>'+
            '</li>'
    }
}

//--------------------------Funciones
function playGame(play){
    if(!play){
        $("#detener").hide();
        $("#iniciar").show();
    }else if(play){
        $("#detener").show();
        $("#iniciar").hide();
    }
}

function crearCampo(){
    var tbl = "";
    for(var f = 0; f < data.campo.filas; f++){
        tbl += "<tr class='fila-" + (f + 1) + "'>";
        for(var c = 0; c < data.campo.columnas; c++){
            tbl += "<td id='" + (f + 1) + "_" + (c + 1) + "' class=' p-0 columna-" + (c + 1) + "'></td>";
        }
        tbl += "</tr>";
    }
    $("#campo tbody").html(tbl);
    //$("td").width(450);
    //$("td").height(100);
    $("td").width(Math.floor(data.pantalla.campo.ancho / data.campo.columnas) - 2);
    $("td").height(Math.floor((data.pantalla.campo.alto - data.pantalla.controles.alto) / data.campo.filas) - 2);
}

function fondo(){
    var index = Math.round(Math.random() * ((data.fondos.length) - 1) + 1);
    $("body").css({
        "background":"url(" + data.fondos[index - 1] + ")"
    });
}

function ubicarMounstruos(intervalo){
    data.intervalos.monsterInterval = setInterval(() => {
        //$("td").html("");
        $(".monster-touch").slideUp();
        var row = Math.round(Math.random() * (data.campo.filas - 1) + 1);
        var col = Math.round(Math.random() * (data.campo.columnas - 1) + 1);
        var ml = data.monstersName.length - 1;
        var index = Math.round(Math.random() * (ml - 1) + 1);
        var monster = '<img src="' + data.monstersName[index].nombre + 
        '" class="monster-touch" width="100px" data-puntos="'+ data.monstersName[index].data + '">';
        var location = "#" + row + "_" + col;
        //console.log(location);
        $(location).html(monster);
    }, intervalo);
}

function gameLevel(){
    var nivel = $(".nivel:checked").val();
    var timer = 0;
    switch(nivel){
        case "0":
            timer = 2000;
        break;
        case "1":
            timer = 1000;
        break;
        case "2":
            timer = 500;
        break;
        case "3":
            timer = 300;
        break;
    }
    return timer;
}

function reloj(){
    data.intervalos.relojInterval = setInterval(() => {
        data.intervalos.tiempo.segundos--;
        if(data.intervalos.tiempo.segundos == 0){
            data.intervalos.tiempo.minutos--;
             if(data.intervalos.tiempo.minutos < 0){
                 //se acaba el juego
                 data.intervalos.tiempo.minutos = 0;
                 $("#detener").click();
                 //monsters.fadeOut();
                 $("#modalPartida").modal("show");
                 $("#pillAciertos").html(data.puntaje.aciertos);
                 $("#pillErrores").html(data.puntaje.fallos);
             }else{
                data.intervalos.tiempo.segundos = 59;
             }
        }
        var min = data.intervalos.tiempo.minutos < 10 ? "0" + data.intervalos.tiempo.minutos : data.intervalos.tiempo.minutos;
        var seg = data.intervalos.tiempo.segundos < 10 ? "0" + data.intervalos.tiempo.segundos : data.intervalos.tiempo.segundos;
        $("#reloj").html(min + ":" + seg);
     }, 1000);
}

function configSize(){
    data.pantalla.campo.alto = window.innerHeight;
    data.pantalla.campo.ancho = window.innerWidth;
    data.pantalla.controles.alto = $("#gameControls").height();
    data.pantalla.controles.ancho = $("#gameControls").width();
}

function mostrarPuntos(puntos){
    $("#puntos").html("Puntos:  " + puntos);
}

function pegarTopTen(top){
    var lista = '<li class="list-group-item">Mejores puntajes</li>'
    for(var d = 0; d < top.length; d++){
        var nivel = unescape(top[d].Nivel);
        var bgNivel = "";
        switch(nivel){
            case "facil":
                bgNivel = "list-group-item-success";
                break;
            case "normal":
                bgNivel = "list-group-item-primary";
                break;
            case "dificil":
                bgNivel = "list-group-item-warning";
                break;
            case "experto":
                bgNivel = "list-group-item-danger";
                break;       
        }
        var rango = d + 1;
        var nombre = unescape(top[d].Nombre);
        var posicion = "("+ rango.toString() +") " + nombre; 
        lista += data.template.list
        .replace("#puntos#", top[d].Puntos)
        .replace("#nombre#", posicion)
        .replace("#nivel#", bgNivel);
    }
    $("#topten").html(lista);
}

function getTopTen(){
    $.ajax({
        data: {  },
        url: 'obtener.php',
        type: 'post',
        beforeSend: function () {
            console.log("obteniendo top ten de mejores rangos...");
        },
        success: function (response) {
            if(response.startsWith("Connection")){
                console.log("Error: " + response);
            }else if(response != "null"){
                var data = JSON.parse(response);
                console.log(data);
                pegarTopTen(data);
            }
        }
    });
}

function guardar(){
    if($("#nombre").val().length > 0){
        $.ajax({
        data: { 
            nombre: escape($("#nombre").val()),
            puntos: data.puntaje.aciertos,
            nivel: $(".nivel:checked").attr("id")
         },
        url: 'guardar.php',
        type: 'post',
        beforeSend: function () {
            console.log("Guardando puntaje...");
        },
        success: function (response) {
            if(response.startsWith("Connection")){
                console.log("Error: " + response);
            }else if(response == "true"){
                $("#nombre").val("");
                alert("puntaje guardado");
                getTopTen();
                setTimeout(() => {
                    $("#modalPartida").modal("hide");
                }, 500);
            }
        }
    });
    }else{
        alert("Debes escribir un nombre");
    }
}

function diabledControls(disabled){
    if(disabled){
        $("#btnTopTen").attr("disabled", true);
        $(".nivel").attr("disabled", true);
    }else if(!disabled){
        $("#btnTopTen").attr("disabled", false);
        $(".nivel").attr("disabled", false);
    }
}

//--------------------------->triggers
$(document).ready(function(){
    configSize();
    crearCampo();
    playGame(false);
    fondo();
    getTopTen();
});

//iniciar el juego
$("#iniciar").click(function(){
    diabledControls(true);
    //$(".nivel").attr("disabled", true);
    var timer = gameLevel();
    if(data.puntaje.aciertos != 0){
        data.puntaje.aciertos = 0;
        data.puntaje.fallos = 0;
        mostrarPuntos(0);
    }
    playGame(true);
    reloj();
    ubicarMounstruos(timer);
    fondo();
});

//detener el juego
$("#detener").click(function(){
    playGame(false);
    clearInterval(data.intervalos.relojInterval);
    clearInterval(data.intervalos.monsterInterval);
    data.intervalos.tiempo.minutos = 1;
    data.intervalos.tiempo.segundos = 59;
    $("#reloj").html("00:00");
    diabledControls(false);
});

//contador de caceria
$("tbody").on("click",".monster-touch", function(){
    if($("#reloj").html() != "00:00"){
        $(this).removeClass("monster-touch");
        if($(this).data("puntos") == "quitar"){
            $(this).removeData("puntos");
            data.puntaje.aciertos--;
            data.puntaje.fallos++;
            $(this).addClass("animate hinge");
            $(this).on("animationend", function(){
                console.log("quitar mostro quita puntos")
                $(this).remove();
            });
        }else{
            $(this).removeData("puntos");
            data.puntaje.aciertos++;
            $(this).addClass("animate bounceOut");
            $(this).on("animationend", function(){
                console.log("quitar mostro");
                $(this).remove();
            });
        }
        $(this).removeData("puntos");
        mostrarPuntos(data.puntaje.aciertos);
    }
});

$("#guardarPartida").click(function(){
    guardar();
});

$(".prevent-default").click(function(e){
    e.preventDefault();
});

$( window ).resize(function() {
    configSize();
    crearCampo();
});