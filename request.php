<?php
    require __DIR__ . '/vendor/autoload.php';
    use Orhanerday\OpenAi\OpenAi;
    $open_ai = new OpenAi('Token');
    // get prompt parameter 取得提示參數
    $prompt = $_GET['prompt'];
    // set api data 設定api資料 可輸入路徑後加上?prompt=nice to meet you.查看
    $complete = $open_ai->completion([
        'model' => 'text-davinci-003',
        'prompt' => $prompt,
        'temperature' => 0.7,
        'max_tokens' => 256,
        'top_p' => 1,
        'frequency_penalty' => 0,
        'presence_penalty' => 0,
        'stream' => true     
    ], function($curl_info, $data){
        echo $data;
        echo PHP_EOL;
        ob_flush();
        flush();
        return strlen($data);
    });
    // var_dump($complete);
?>