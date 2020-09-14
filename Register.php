<?php

	$inData = getRequestInfo();

	$Email = $inData["Email"];
  $Password = $inData["Password"];
	$id = 1;

	$conn = new mysqli("localhost", "fruchtjo_Boa3600", "Dog\$arecool1", "fruchtjo_Project1");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT User_ID FROM Users where Email='" . $inData["Email"] . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			returnWithError("This Email is associated with an existing account");
			$conn->close();
		}

		else
		{
			$sql = "INSERT INTO Users (Email, Password) VALUES ('" . $Email . "','" . $Password . "')";
			$result = $conn->query($sql);
			if( $result != TRUE )
			{
				returnWithError( $conn->error );
			}

			returnWithInfo( $id );
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
		$retValue = '{"id":"' . $id . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
