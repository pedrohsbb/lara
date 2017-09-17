<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

</head>
<body>

<?php

        foreach($product as $p){
            print_r($p);
        }
        echo "///view" .  $_GET['dd'];

?>



</body>
</html>
