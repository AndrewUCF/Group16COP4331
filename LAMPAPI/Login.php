<?php
	// Get info from JSON file
	$inData = getRequestInfo();

	// Base info
	$id = 0;
    $password = $inData['password'];

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

        $sql = "SELECT * FROM Users where Email='" . $inData["Email"] . "'";
		$result = $conn->query($sql);
        
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if (password_verify($password, $row['Password'])) {
                $id = $row["User_ID"];
                returnWithInfo($id);
                $conn->close();
                return;
            }
        }
          returnWithError("Credentials do not match any existing account");
          $conn->close();
          return;
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
