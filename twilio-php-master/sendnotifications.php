<?php

	require "Services/Twilio.php";

	$AccountSid = "ACe9f441489d6200edcdcb90f30db7a485";
	$AuthToken = "c77cd008031fbd4f40e6f9c39d0bb71b";

	$client = new Services_Twilio($AccountSid, $AuthToken);

	$people = array(
		"+12266003925" => "Yousef",
		"+15146555782" => "Mo",
		"+15195804214" => "Kartthik",
		"+12019531983" => "doug",
	);

	foreach ($people as $number => $name) {

		$sms = $client->account->messages->sendMessage(

			"647-496-3992", 
	
			$number,

			"Hey $name, Air Drone activated. Sending drone to patient."
		);
		
		echo "Sent message to $name";
	}
