<?php
    require 'Slim/Slim.php';
    \Slim\Slim::registerAutoloader();

    $db = new PDO(
        'mysql:host=localhost;dbname=codyseib_cards', 
        'codyseib_cards',
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

    $app->get('/cards', function () use($db) {
        $stmt = $db->prepare("SELECT * FROM cards");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_OBJ);
        $ret = toJSON($result, true);
        echo $ret;
    });

    $app->post('/cards', function() use($app, $db){
        $url = $app->request->post("url");
        $text = $app->request->post("text");

        $stmt = $db->prepare("INSERT INTO cards (text) VALUES (?)");
        $stmt->bindParam(1, $text, PDO::PARAM_STR);
        $stmt->execute();
        $id = $db->lastInsertId();

        copy($url, __DIR__.'/../images/' . $id . '.jpg');
    });

    $app->run();
?>
