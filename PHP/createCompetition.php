<?php
$createURL = $_POST["createURL"];
$addGames = $_POST["addGames"];

curl_exec(curl_init($createURL));

for($i = 0; $i < count($addGames); $i++){
    curl_exec(curl_init($addGames[$i]));
}