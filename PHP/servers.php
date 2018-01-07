<?php
$serverURL = "http://forac-old.fsg.ulaval.ca/woodSupplyGame2010/Competition.aspx?action=";
$serverAction = "getServers";

$query = $serverURL . $serverAction;

$curl = curl_init($query);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($curl);
curl_close($curl);

$serversArray = explode(",", $result);
$serversObjects = array();

//Make Associative
for($i = 0; $i < count($serversArray); $i += 2){
    $serversObjects[$serversArray[$i]] = $serversArray[$i + 1];
}

echo json_encode($serversObjects);