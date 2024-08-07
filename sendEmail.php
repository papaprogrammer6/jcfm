<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $message = htmlspecialchars($_POST['message']);
    $to = 'association.jc.sousse@gmail.com';
    $subject = 'New Message from Contact Form';
    $headers = 'From: webmaster@example.com' . "\r\n" .
               'Reply-To: webmaster@example.com' . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    if (mail($to, $subject, $message, $headers)) {
        http_response_code(200);
        echo 'Message sent successfully';
    } else {
        http_response_code(500);
        echo 'Message sending failed';
    }
} else {
    http_response_code(400);
    echo 'Invalid request';
}
?>