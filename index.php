<?php
	session_name('COOKIE1');
	$newid = session_create_id();
	session_id($newid);
	session_start();
	$_SESSION['login'] = true;
	header('Location: user.php');
?>
