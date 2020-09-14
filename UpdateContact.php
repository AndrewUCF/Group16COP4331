<?php

// Search by contact ID and update first and last name. Send back all info
	$inData = getRequestInfo();

	$fname = $inData["First_name"];
	$lname = $inData["Last_name"];
	$Email = $inData["Email"];
	$Pnum = $inData["Phone_number"];
	$Contact_ID = $inData["Contact_ID"];
	$id = 1;

	$conn = new mysqli("localhost", "fruchtjo_Boa3600", "Dog\$arecool1", "fruchtjo_Project1");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "UPDATE Contact_Information SET Email= '" . $Email . "', Phone_number = '" . $Pnum . "', First_name = '" . $fname . "', Last_name = '" . $lname . "'WHERE ID = '" . $Contact_ID ."'";

		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		else
		{
		    $sql = "SELECT * FROM Contact_Information Where ID ='" . $Contact_ID . "'";

			$result = $conn->query($sql);

			if ($result->num_rows > 0)
			{
				$row = $result->fetch_assoc();

				$ThisJsonObject = '{"First_name" : "' . $row["First_name"] . '",
														"Last_name" : "' . $row["Last_name"] . '",
														"Email" : "' . $row["Email"] . '",
														"Phone_number" : "' . $row["Phone_number"] . '",
														"Contact_ID" : "' . $row["ID"] . '"}';
			}
			returnWithInfo( $ThisJsonObject );
		}
		$conn->close();
	}


	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $ThisJsonObject )
	{
		sendResultInfoAsJson( $ThisJsonObject );
	}

?>
