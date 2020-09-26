<?php

// Search by contact ID and update first and last name. Send back all info
	$inData = getRequestInfo();

	$fname = trim($inData["First_name"]);
	$lname = trim($inData["Last_name"]);
	$Email = trim($inData["Email"]);
	$Pnum = trim($inData["Phone_number"]);
	$Contact_ID = $inData["Contact_ID"];
	$User_ID = $inData["User_ID"];
	$id = 1;
	
	if ($fname == '' || $lname == '' || $Email == '' || $Pnum == '')
        return returnWithError("All fields are required");

    if (!filter_var($Email, FILTER_VALIDATE_EMAIL))
        return returnWithError("Please provide a valid Email");
        
    if (!validPhone($Pnum)) {
        return returnWithError("Please provide a valid Phone number");
    }

	$conn = new mysqli("localhost", "fruchtjo_Boa3600", "Dog\$arecool1", "fruchtjo_Project1");
	if ($conn->connect_error)
	{
		return returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT * FROM Contact_Information Where First_name ='" . $fname . "' AND Last_name ='" . $lname . "' AND User_ID ='" . $User_ID ."'" ;
		$result = $conn->query($sql);
		if($result->num_rows > 0)
		{
		    $row = $result->fetch_assoc();
		    if ($row["ID"] != $Contact_ID) {
		        returnWithError("Contact already exists");
    			$conn->close();
    			return;
		        
		    }
		}

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
	
	function validPhone($phone){
        if(preg_match('/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/', $phone))
            return true;
        return false;
	}

?>
