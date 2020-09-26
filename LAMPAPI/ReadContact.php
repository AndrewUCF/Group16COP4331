<?php
	// Get info from JSON file
	$inData = getRequestInfo();

	// Makes connection to Database
	$conn = new mysqli("localhost", "fruchtjo_Boa3600", "Dog\$arecool1", "fruchtjo_Project1");

	// Checks if there was error making connection
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		// Send query to see if user exists
		$sql = "SELECT * FROM Contact_Information where ID ='" . $inData["Contact_ID"] . "'";
		$result = $conn->query($sql);

		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$ThisJsonObject = '{"First_name" : "' . $row["First_name"] . '",
													"Last_name" : "' . $row["Last_name"] . '",
													"Email" : "' . $row["Email"] . '",
													"Phone_number" : "' . $row["Phone_number"] . '",
													"Contact_ID" : "' . $row["ID"] . '"}';

			returnWithInfo( $ThisJsonObject );
		}
		else
		{
			returnWithError( "No Records Found" );
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
		$retValue = '{"id":0,"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $ThisJsonObject )
	{
		sendResultInfoAsJson( $ThisJsonObject);
	}

?>
