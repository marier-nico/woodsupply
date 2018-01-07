<?php

$games = $_POST["games"];
$serverAction = "GetGameInfo.aspx?gameName=";

$gameData = [];
for($i = 0; $i < count($games); $i++ ){
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, ($games[$i]["ServerURL"] . $serverAction . $games[$i]["GameName"]));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    $json = curl_exec($curl);
    curl_close($curl);

    $result = json_decode($json, true);
    $gameData[$games[$i]["GameName"]] = $result;
}

echo json_encode($gameData);


