<?php 
    function getProject($db, $id) {
        $stmt = $db->prepare("SELECT * FROM projects WHERE id = ?");
        $stmt->bindParam(1, $id, PDO::PARAM_INT);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_OBJ);
        $ret = toJSON($result, false);
        return $ret;
    }

    $app->get('/projects/type/:type', function ($type) use($db) {
        $stmt = $db->prepare("SELECT id, title, img, type FROM projects WHERE type = ? ORDER BY priority DESC");
        $stmt->bindParam(1, $type, PDO::PARAM_STR);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_OBJ);
        $ret = toJSON($result, true);
        echo $ret;
    });

    $app->get('/projects/:id', function ($id) use($db) {
        echo getProject($db, $id);
    });

    $app->post('/projects', function () use($app, $db) {
        if (!validateAdmin($app)) {
            echo "invalid authorization!";
            return;
        }
        
        $body = $app->request->getBody();
        $data = json_decode($body);

        $title = $data->title;
        $img = $data->img;
        $html= $data->html;
        $type= $data->type;

        $stmt = $db->prepare("INSERT INTO projects (title, img, html, type) VALUES (?, ?, ?, ?)");
        $stmt->bindParam(1, $title, PDO::PARAM_STR);
        $stmt->bindParam(2, $img, PDO::PARAM_STR);
        $stmt->bindParam(3, $html, PDO::PARAM_STR);
        $stmt->bindParam(4, $type, PDO::PARAM_STR);
        $stmt->execute();
        
        $id = $db->lastInsertId();
        echo getProject($db, $id);
    });
    
    $app->post('/projects/:id', function ($id) use($app, $db) {
        if (!validateAdmin($app)) {
            echo "invalid authorization!";
            return;
        }
        
        $body = $app->request->getBody();
        $data = json_decode($body);

        $title = $data->title;
        $img = $data->img;
        $html= $data->html;
        $type= $data->type;

        $stmt = $db->prepare("UPDATE projects set title = ?, img = ?, html = ?, type = ? WHERE id = ?");
        $stmt->bindParam(1, $title, PDO::PARAM_STR);
        $stmt->bindParam(2, $img, PDO::PARAM_STR);
        $stmt->bindParam(3, $html, PDO::PARAM_STR);
        $stmt->bindParam(4, $type, PDO::PARAM_STR);
        $stmt->bindParam(5, $id, PDO::PARAM_INT);
        $stmt->execute();

        echo getProject($db, $id);
    });

?>