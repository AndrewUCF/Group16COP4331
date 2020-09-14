<?php

// ADD Contact Id to JSON
	$inData = getRequestInfo();

	$searchResults = "";
	$searchCount;

	$conn = new mysqli("localhost", "fruchtjo_Boa3600", "Dog\$arecool1", "fruchtjo_Project1");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT * From Contact_Information where (First_name like '" . $inData["search"] . "%' or Last_name like '" . $inData["search"] . "%')  and User_ID=" . $inData["userId"];
		$result = $conn->query($sql);
		$searchCount = $result->num_rows;

		while ($searchCount > 0)
		{
			$row = $result->fetch_assoc();


			$ThisJsonObject = '{"First_name" : "' . $row["First_name"] . '",
													"Last_name" : "' . $row["Last_name"] . '",
													"Email" : "' . $row["Email"] . '",
													"Phone_number" : "' . $row["Phone_number"] . '",
													"Contact_ID" : "' . $row["ID"] . '"}';

			$searchResults .= $ThisJsonObject;

			if( $searchCount != 1 )
			{
				$searchResults .= ",";
			}
			$searchCount--;
		}
	}
	$conn->close();

	returnWithInfo( $searchResults );

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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
