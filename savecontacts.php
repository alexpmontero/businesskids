<?php

// production
// $file_json = file_get_contents(__DIR__ . '/../../included_files/bk/config.json');

// development
$file_json = file_get_contents(__DIR__ . '/../../../included_files/bk/config.json');

// local
// $file_json = file_get_contents(__DIR__ . '/../../../included_files/bk/config.json');

$json_data = json_decode($file_json, true);
$token = $json_data['token_app'];

// local
// $service_url = 'http://localhost:8000/api/contactos/';

// production
$service_url = 'http://businesskids.joingrowth.com/api/contactos/';


$curl = curl_init($service_url);
$curl_post_data = array(
	"nombre" => $_POST['nombre'],	
	"email" => $_POST['email'],
	"telefono" => $_POST['telefono'],
	"sucursal" => $_POST['sucursal']
);

$data_encode = json_encode($curl_post_data);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $data_encode);
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Authorization: Token '.$token  
));

$curl_response = curl_exec($curl);
curl_close($curl);

print $curl_response

?>