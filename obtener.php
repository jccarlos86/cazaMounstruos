<?php
    include 'conexion.php';
    $result;
    $jsonArray = array();
    $query = "SELECT puntos, nombre, nivel FROM CazaMounstruos ORDER BY puntos DESC LIMIT 10";

    $sel = $con ->query($query);
    if($sel){
        while($row = mysqli_fetch_array($sel)){
            $punto = $row['puntos'];
            $nombre = $row['nombre'];
            $nivel = $row['nivel'];
            $jsonArray[] = array('Puntos' => $punto, 'Nombre' => $nombre, 'Nivel' => $nivel);
        }
        $result = json_encode($jsonArray);
    }else{
        $result = die("Connection failed: " . mysqli_connect_error());
    }
    echo $result;
    mysqli_close($con);
?>