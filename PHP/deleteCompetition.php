<?php
$delURL = $_POST["delURL"];
curl_exec(curl_init($delURL));