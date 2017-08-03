<?php
$serverURL = $_POST["url"];
$serverAction = "GetPotentialGames.aspx";

$queryURL = $serverURL . $serverAction;

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $queryURL);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$result = curl_exec($curl);
curl_close($curl);

$result = str_replace("%20", " ", $result);
$teams = json_encode(explode(",", $result));

echo $teams;