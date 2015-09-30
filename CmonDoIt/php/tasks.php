<?php

    /**
        Fetches a task matching a particular ID from the DB.
    */
    function getTask($db, $id) {
        $stmt = $db->prepare("SELECT * FROM tasks WHERE id = ?");
        $i = 1;
        $stmt->bindParam($i++, $id, PDO::PARAM_INT);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_OBJ);
        $ret = toJSON($result, false);
        return $ret;
    }

    /**
        CREATE a new task.
    */
    $app->post('/tasks', function () use ($app, $db) {
        $task = requestJsonToObj($app);
        
        $stmt = $db->prepare("INSERT INTO tasks (template_id, text, start_time, end_time) VALUES (?, ?, ?, ?)");
        $i = 1;
        $stmt->bindParam($i++, $task->template_id, PDO::PARAM_INT);
        $stmt->bindParam($i++, $task->text, PDO::PARAM_STR);
        $stmt->bindParam($i++, $task->start_time, PDO::PARAM_STR);
        $stmt->bindParam($i++, $task->end_time, PDO::PARAM_STR);
        $stmt->execute();

        $id = $db->lastInsertId();
        $taskJson = getTask($db, $id);
        echo $taskJson;
    });

    /**
        GET all the tasks.
    */
    $app->get('/tasks', function () use($db) {
        $stmt = $db->prepare("SELECT * FROM tasks");
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_OBJ);
        $ret = toJSON($result, true);
        echo $ret;
    });

    /**
        GET a single task by the ID.
    */
    $app->get('/tasks/:id', function ($id) use($db) {
        $taskJson = getTemplate($db, $id);
        echo $taskJson;
    });

    /**
        UPDATE a task
    */
    $app->post('/tasks/:id', function ($id) use($db) {
        $task = requestJsonToObj($app);
        
        $stmt = $db->prepare("UPDATE tasks SET text = ?, start_time = ?, end_time = ? WHERE id = ?");
        $i = 1;
        $stmt->bindParam($i++, $task->text, PDO::PARAM_STR);
        $stmt->bindParam($i++, $task->start_time, PDO::PARAM_STR);
        $stmt->bindParam($i++, $task->end_time, PDO::PARAM_STR);
        $stmt->bindParam($i++, $id, PDO::PARAM_INT);
        $stmt->execute();

        $id = $db->lastInsertId();
        $taskJson = getTemplate($db, $id);
        echo $taskJson;
    });

    /**
        DELETE task 
    */
    $app->delete('/tasks/:id', function ($id) use($db) {
        $stmt = $db->prepare("DELETE FROM tasks WHERE id = ?");
        $i = 1;
        $stmt->bindParam($i++, $id, PDO::PARAM_INT);
        $stmt->execute();
    });
?>
