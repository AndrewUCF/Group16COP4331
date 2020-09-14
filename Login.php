<?php
	// Get info from JSON file
	$inData = getRequestInfo();

	// Base info
	$id = 0;

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
		$sql = "SELECT User_ID FROM Users where Email='" . $inData["Email"] . "' and Password='" . $inData["password"] . "'";
		$result = $conn->query($sql);
		//
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$id = $row["User_ID"];

			returnWithInfo( $id );
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

	function returnWithInfo( $id )
	{
		$retValue = '{"id":"' . $id . '","error" : ""}';
		sendResultInfoAsJson( $retValue );
	}

?>
