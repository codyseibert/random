<?php
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

    function validateAdmin($app){
        $auth = $app->request->headers->get('Authorization');
        $b64 = explode(' ', $auth)[1];
        $authString = base64_decode($b64);
        $authArray = explode(':', $authString);
        $username = $authArray[0];
        $password = $authArray[1];
        return $password == getenv('admin_password') 
            && $username == getenv('admin_username');
    }
?>