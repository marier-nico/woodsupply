<?php
$serverURL = "http://forac-old.fsg.ulaval.ca/woodSupplyGame2010/Competition.aspx?action=";
$serverAction = "getGameList";
$compName = $_POST["compName"];

$query = $serverURL . $serverAction . "&name=" . $compName;

$curl = curl_init($query);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($curl);
curl_close($curl);


echo json_encode($result);