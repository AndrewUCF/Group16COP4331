<?php
// Return all info
	$inData = getRequestInfo();

	$fname = $inData["First_name"];
	$lname = $inData["Last_name"];
	$Email = $inData["Email"];
	$Pnum = $inData["Phone_number"];
	$ID = $inData["User_ID"];
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
														"Contact_ID" : "' . $row["ID"] . '"}';
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

?>
