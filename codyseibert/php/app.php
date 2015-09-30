<?php
    require 'Slim/Slim.php';
    \Slim\Slim::registerAutoloader();

    $db = new PDO(
        'mysql:host=localhost;dbname=' . getenv('db_name'), 
        getenv('db_user'),
        getenv('db_password'));

    $app = new \Slim\Slim();
    require 'helpers.php';
    require 'login.php'; 
    require 'projects.php';
    require 'posts.php';
    require 'about.php';
    $app->run();
?>
