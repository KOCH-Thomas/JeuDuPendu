<?php

try{
    $connexion = new PDO(
        'mysql:host=localhost:3306;dbname=pendu', 'root', 'root'
    );

    $connexion->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

}


catch(Exception $e){
    echo $e->getMessage();
}