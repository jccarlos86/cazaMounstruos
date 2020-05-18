<?php
    include 'conexion.php';

    $nombre = $_POST['nombre'];
    $puntos = $_POST['puntos'];
    $nivel = $_POST['nivel'];
    $result;

    $insert = $con -> query("INSERT INTO CazaMounstruos (id, nombre, nivel, puntos)
    values ('', '$nombre', '$nivel', '$puntos')");

    if($insert){
    $result = "true";
    }else{
        $result = die("Connection failed: " . mysqli_connect_error());
    }
    echo $result;
    mysqli_close($con);
?>