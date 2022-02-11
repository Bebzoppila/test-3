<?php 
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
        header('Access-Control-Allow-Headers: token, Content-Type');
        header('Access-Control-Max-Age: 1728000');
        header('Content-Length: 0');
        header('Content-Type: text/plain');
        die();
    }

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    $content = trim(file_get_contents("php://input"));
    
    $decoded = json_decode($content, true);
    $regexpPhone = '/^\s?(\+\s?7|8)([- ()]*\d){10}$/';
    if(!preg_match($regexpPhone, $decoded['phone'])){
        die();
    }

    $ret = [
        'result' => 'OK',
    ];
    function createLine($str){
        return "$str \n";
    }   
    $dataKeys = [
        'name' => 'Фио ',
        'totalAmount' => 'Общая сумма долга ',
        'transactions' => 'Крупные сделки за 3 года ',
        'ownership' => 'Есть ли имущество ',
        'variants' => 'Встреча ',
        'phone' => 'Телефон '

    ];
    $resultStr = '';

    foreach ($dataKeys as $key => $value) {
        $resultStr .= createLine($value . $decoded[$key]);
    }

    file_put_contents('people.txt', $resultStr);
    print json_encode($decoded);

?>