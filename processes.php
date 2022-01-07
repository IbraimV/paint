<?php
define('UPLOAD_DIR', 'images/');


$img = rawurldecode($_POST['img']);
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file = UPLOAD_DIR . time() . '.png';
$success = file_put_contents($file, $data);
if($success) {
    $message['response'] = 'success';
    $message['message'] = 'Ваше изображение сохранено';
    $message['image'] = $file;
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($message);
} else {
    $message['response'] = 'false';
    $message['message'] = 'Произошла ошибка при сохранении';
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($message);
}