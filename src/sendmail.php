<?php
    $name = $_POST['name'];
	$tel = $_POST['tel'];
    $email = $_POST['email'];
    $message = $_POST['message'];

	$to = "zeberg@bk.ru"; 
	$date = date ("d.m.Y"); 
	$time = date ("h:i");
	$from = $email;
	$subject = "Для б/о Лукоморье сообщение с сайта";

	
	$msg="
    Имя: $name /n
    Телефон: $tel /n
    Почта: $email /n
    Текст: $message"; 	
	mail($to, $subject, $msg, "From: $from ");
