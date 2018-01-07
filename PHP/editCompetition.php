<?php
$createURL = $_POST["createURL"];
$delURL = $_POST["delURL"];
$addGames = $_POST["addGames"];

curl_exec(curl_init($delURL));
curl_exec(curl_init($createURL));

for($i = 0; $i < count($addGames); $i++){
    curl_exec(curl_init($addGames[$i]));
}