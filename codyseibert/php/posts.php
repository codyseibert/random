<?php
    function getPost($db, $id){
        $stmt = $db->prepare("SELECT * FROM posts WHERE id = ?");
        $stmt->bindParam(1, $id, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_OBJ);
        $ret = toJSON($result, false);
        echo $ret;
    }

    $app->get('/posts', function () use($db) {
        $stmt = $db->prepare("SELECT * FROM posts ORDER BY date DESC");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_OBJ);
        $ret = toJSON($result, true);
        echo $ret;
    });

    $app->post('/posts', function() use($app, $db){
        if (!validateAdmin($app)) {
            echo "invalid authorization!";
            return;
        }

        $body = $app->request->getBody();
        $data = json_decode($body);
        $title = $data->title;
        $html = $data->html;

        $stmt = $db->prepare("INSERT INTO posts (title, html, date) VALUES (?, ?, NOW())");
        $stmt->bindParam(1, $title, PDO::PARAM_STR);
        $stmt->bindParam(2, $html, PDO::PARAM_STR);
        $stmt->execute();

        echo getPost($db, $db->lastInsertId());
    });

    $app->post('/posts/:id', function($id) use($app, $db){
        if (!validateAdmin($app)) {
            echo "invalid authorization!";
            return;
        }
        
        $body = $app->request->getBody();
        $data = json_decode($body);
        $title= $data->title;
        $html = $data->html;

        $stmt = $db->prepare("UPDATE posts set title = ?, html = ? WHERE id = ?");
        $stmt->bindParam(1, $title, PDO::PARAM_STR);
        $stmt->bindParam(2, $html, PDO::PARAM_STR);
        $stmt->bindParam(3, $id, PDO::PARAM_INT);
        $stmt->execute();
    }); 
?>