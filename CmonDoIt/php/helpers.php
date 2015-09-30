<?php 
    /**
        Converts the results from a MySQL data set into
        either an JSON object or an array of JSON objects.
    */
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

    /**
        Used to convert the request body to a php object.
    */
    function requestJsonToObj($app){
        $body = $app->request->getBody();
        $obj = json_decode($body);
        return $obj;
    }
?>
