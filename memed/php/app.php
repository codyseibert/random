<?php
    require 'Slim/Slim.php';
    \Slim\Slim::registerAutoloader();

    $db = new PDO(
        'mysql:host=localhost;dbname=mem', 
        'root',
        'BigBlueDog');

    $app = new \Slim\Slim();

    function toJSON($results, $isArray){
        $ret = [];
        if ($isArray){
            foreach ($results as $row){
                $ret []= $row;
            }
        }else{
            $ret = $results[0];
        }
        return json_encode($ret);
    }

    $app->get('/mems', function () use($db) {
        $stmt = $db->prepare("SELECT * FROM mems");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_OBJ);
        $ret = toJSON($result, true);
        echo $ret;
    });

    $app->post('/mems', function () use($db) {
        // Get JSON from client
        $body = $app->request()->getBody();
        $json = json_encode($body);

        // Insert it into database
        $stmt = $db->prepare("INSERT INTO mems (name, html, date, image) VALUES (?, ?, NOW(), ?)");
        $stmt->bindValue(1, $json.name);
        $stmt->bindValue(2, $json.html);
        $stmt->bindValue(3, $json.image);
        $stmt->execute();

        // Return the result
        $result = $stmt->fetchAll(PDO::FETCH_OBJ);
        $ret = toJSON($result, true);
        echo $ret;
    });

    $app->post('/tags', function() use($app, $db){
        $url = $app->request->post("url");
        $text = $app->request->post("text");

        $stmt = $db->prepare("INSERT INTO cards (text) VALUES (?)");
        $stmt->bindParam(1, $text, PDO::PARAM_STR);
        $stmt->execute();
        $id = $db->lastInsertId();

        copy($url, '/var/www/html/cards/images/' . $id . '.jpg');
    });

    $app->run();
?>
