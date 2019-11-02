<?php

require_once("includes/connection.php");

$refColQuery = "select column_name, data_type, character_maximum_length from INFORMATION_SCHEMA.COLUMNS"
	         . " where table_name = \"reference_code\""
	         . " and column_name not in (\"create_dt\",\"last_modified_dt\")"";
//	echo $dataTypeQuery."\n";
$refColSet = $connection->query($refColQuery);
$columnList = "";
$delim = "";
while($x = $refColSet->fetch_assoc()) {
	$columnList .= $delim.$x["column_name"];
	$delim = ", ";
}
$vwQueryTemplate = "create view vwx(colList) as select colList from reference_code"
		 . " where category = \"catx\" order by name";
$catQuery = "select distinct category from reference_code";
$catSet = $connection->query($catQuery);
while( $cats = $catSet->fetch_assoc()) {
	$category = $cats["category"];
	$vwName = str_replace("-","_", strtolower($category))."_vw";
	$vwQuery = str_replace( "catx", $category
						, str_replace( "colList" , $columnList,
								str_replace("vwx", $vwName ,$vwQueryTemplate)));
	echo $vwQuery."\n";
	$connection->query($vwQuery);
}

?>
