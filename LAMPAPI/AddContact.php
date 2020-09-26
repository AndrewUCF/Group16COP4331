<?php
// Return all info
	$inData = getRequestInfo();

	$fname = trim($inData["First_name"]);
	$lname = trim($inData["Last_name"]);
	$Email = trim($inData["Email"]);
	$Pnum = trim($inData["Phone_number"]);
    $ID = $inData["User_ID"];
    
    if ($fname == '' || $lname == '' || $Email == '' || $Pnum == '')
        return returnWithError('All fields are required');
    
    if (!filter_var($Email, FILTER_VALIDATE_EMAIL))
        return returnNonEmailError();
        
    if (!validPhone($Pnum)) {
        return returnNonPhoneError();
    }

	$id = 1;

	$conn = new mysqli("localhost", "fruchtjo_Boa3600", "Dog\$arecool1", "fruchtjo_Project1");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT ID FROM Contact_Information Where First_name='" . $inData["First_name"] . "'
		AND Last_name='" . $inData["Last_name"] . "' AND User_ID='" . $inData["User_ID"] . "'";

		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			returnWithError("Contact already exists");
			$conn->close();
		}
		else
		{
			$sql = "INSERT INTO Contact_Information (First_name, Last_name, Email, Phone_number, User_ID)
			VALUES ('" . $fname . "','" . $lname . "','" . $Email . "','" . $Pnum . "','" . $ID . "')";

			$result = $conn->query($sql);

			if( $result != TRUE )
			{
				returnWithError( $conn->error );
				$conn->close();
			}

			$sql = "SELECT * FROM Contact_Information Where First_name='" . $inData["First_name"] . "'
			AND Last_name='" . $inData["Last_name"] . "' AND User_ID='" . $inData["User_ID"] . "'";

			$result = $conn->query($sql);

			if ($result->num_rows > 0)
			{
				$row = $result->fetch_assoc();

				$ThisJsonObject = '{"First_name" : "' . $row["First_name"] . '",
														"Last_name" : "' . $row["Last_name"] . '",
														"Email" : "' . $row["Email"] . '",
														"Phone_number" : "' . $row["Phone_number"] . '",
														"Contact_ID" : "' . $row["ID"] . '",
														"error": ""
}';
			}

      returnWithInfo($ThisJsonObject);
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

	function returnWithInfo($ThisJsonObject)
	{
		sendResultInfoAsJson($ThisJsonObject);
    }
    
    function returnNameError() {
        $json = '{"error": "first name or last name may not be blank"}';
        sendResultInfoAsJson( $json );
    }

    function returnNonEmailError() {
        $json = '{"error": "Please provide a valid Email"}';
        sendResultInfoAsJson( $json );
    }
    
    function returnNonPhoneError() {
        $json = '{"error": "Please provide a valid Phone number"}';
        sendResultInfoAsJson($json);
    }
    
    function validPhone($phone){
        if(preg_match('/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/', $phone))
            return true;
        return false;
	}

?>