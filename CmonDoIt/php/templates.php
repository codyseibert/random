<?php

    /**
        Fetches a template matching a particular ID from the DB.
    */
    function getTemplate($db, $id) {
        $stmt = $db->prepare("SELECT * FROM templates WHERE id = ?");
        $i = 1;
        $stmt->bindParam($i++, $id, PDO::PARAM_INT);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_OBJ);
        $ret = toJSON($result, false);
        return $ret;
    }

    /**
        POST a new template.
    */
    $app->post('/templates', function () use ($app, $db) {
        $template = requestJsonToObj($app);
        
        $stmt = $db->prepare("INSERT INTO templates (name) VALUES (?)");
        $i = 1;
        $stmt->bindParam($i++, $template->name, PDO::PARAM_STR);
        $stmt->execute();

        $id = $db->lastInsertId();
        $templateJson = getTemplate($db, $id);
        echo $templateJson;
    });

    /**
        GET all the templates.
    */
    $app->get('/templates', function () use($db) {
        $stmt = $db->prepare("SELECT * FROM templates");
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_OBJ);
        $ret = toJSON($result, true);
        echo $ret;
    });

    /**
        GET a single template by the ID.
    */
    $app->get('/templates/:id', function ($id) use($db) {
        $templateJson = getTemplate($db, $id);
        echo $templateJson;
    });

    /**
        GET all tasks attached to a template by the ID.
    */
    $app->get('/templates/:id/tasks', function ($id) use($db) {
        $stmt = $db->prepare("SELECT * FROM tasks WHERE template_id = ?");
        $i = 1;
        $stmt->bindParam($i++, $id, PDO::PARAM_INT);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_OBJ);
        $ret = toJSON($result, true);
        echo $ret;
    });
    

    /**
        UPDATE a template
    */
    $app->post('/templates/:id', function ($id) use($app, $db) {
        $template = requestJsonToObj($app);
        
        $stmt = $db->prepare("UPDATE templates SET name = ? WHERE id = ?");
        $i = 1;
        $stmt->bindParam($i++, $template->name, PDO::PARAM_STR);
        $stmt->bindParam($i++, $id, PDO::PARAM_INT);
        $stmt->execute();
    });
?>
