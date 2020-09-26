<?php

	$inData = getRequestInfo();

	$Email = trim($inData["Email"]);
    $Password = trim($inData["Password"]);
    $confirm = trim($inData["confirm"]);
    
    if ($Password == '')
        return returnEmptyPasswordError();
        
    if ($Password != $confirm)
        return returnWithError('Passwords Do Not Match');

    if (!filter_var($Email, FILTER_VALIDATE_EMAIL))
        return returnNonEmailError();
        

    $Password = password_hash($Password, PASSWORD_BCRYPT);

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
			returnWithError("This email is associated with an existing account");
			$conn->close();
		}

		else
		{
			$sql = "INSERT INTO Users (Email, Password) VALUES ('" . $Email . "','" . $Password . "')";
			$result = $conn->query($sql);
			if( $result != TRUE )
			{
				returnWithError( $conn->error );
				return false;
			}

			$sql = "SELECT User_ID FROM Users where Email='" . $inData["Email"] . "'";
			$result = $conn->query($sql);
			if( $result != TRUE )
			{
				returnWithError( $conn->error );
			}
			$row = $result->fetch_assoc();

			$id = $row["User_ID"];

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
		$retValue = '{"id":"' . $id . '","error":"", "message": "successfully registered account"}';
		sendResultInfoAsJson( $retValue );
    }

    function returnNonEmailError() {
        $json = '{"error": "Please provide a valid email"}';
        sendResultInfoAsJson( $json );
    }

    function returnEmptyPasswordError() {
        $json = '{"error": "Password may not be empty"}';
        sendResultInfoAsJson( $json );
    }

?>
