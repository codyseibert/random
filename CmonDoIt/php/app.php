<?php
    // Load Slim
    require 'Slim/Slim.php';
    \Slim\Slim::registerAutoloader();

    // Load in globals used by routes for reading database
    // and parsing data
    require 'db.php';
    require 'helpers.php';

    // Load the Slim routes
    $app = new \Slim\Slim();
    require 'templates.php';
    require 'tasks.php';
    $app->run();
?>
