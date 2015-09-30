<?php
    $app->get('/about', function() use ($db){
        $stmt = $db->prepare("SELECT * FROM about");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_OBJ);
        $ret = toJSON($result, true);
        echo $ret;
    });

    $app->post('/about', function() use ($app, $db){
        if (!validateAdmin($app)) {
            echo "invalid authorization!";
            return;
        }

        $body = $app->request->getBody();
        $data = json_decode($body);
        $html = $data->html;
        $stmt = $db->prepare("UPDATE about SET html = ?");
        $stmt->bindParam(1, $html, PDO::PARAM_STR);
        $stmt->execute();
    });
?>