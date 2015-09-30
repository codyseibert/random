<?php
	$app->post('/login', function () use ($app, $db) { 
		if (validateAdmin($app)){
			echo "valid";
		} else {
			echo "invalid";
		} 
	}); 
?>