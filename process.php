<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $text = $_POST['text'];
    $key = $_POST['key'];
    
    if (strlen($text) !== strlen($key)) {
        echo "Error: The key must be the same length as the text.";
        exit();
    }

    $result = '';
    for ($i = 0; $i < strlen($text); $i++) {
        $result .= chr(ord($text[$i]) ^ ord($key[$i]));
    }

    if (isset($_POST['encrypt']) && $_POST['encrypt'] == 'true') {
        echo base64_encode($result);
    } else {
        echo $result;
    }
}
?>
