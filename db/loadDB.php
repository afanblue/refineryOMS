<?php

require_once("includes/connection.php");

/**
 * Format of file:
 * 		Row 1: 'Table',TableName
 * 		Row 2: 'ConstraintTable','ConstraintField','ConstraintEquivalent','ColumnConstrained'
 * 		Row 3-n: TableName,FieldName,TableColumnConstrained
 * 		Row n+1: 'Data'
 * 		Row n+2: table-column-names, one per column
 * 		Row n+3-<end>: Values of table to be inserted/updated
 *      Row ??   'End' (sortof optional;  if we reach EOF, we'll end
 *      
 * 1. we look for the row w/"Table" in the first column and extract the 
 *    name of the table into which we are going to add this data
 * 2. Then we look for "ConstraintTable" in the first column.  This is the
 *    indicator that the next rows contain the constraint fields.  These are
 *    what defines the where clause of the insert SQL.  Each constraint row
 *    should generate a where clause like:
 *    ... <column constrained> = (select <constraint field> from <Constraint Table> 
 *                                where <constraint equivalent> = 
 *                                [value contained in data field for <column constrained>])
 *    (where the <...> indicates the field, and the [...] says what it is)
 *    NB: we only match on 'ConstraintTable', the fields after are ignored
 * 3. Before we process a constraint line, we look for "Data" in column 0.  If we
 *    find it, then we're done w/constraints and we can start the data.
 * 4. First we get the column names.
 * 5. And now we get the data.  We build the insert for the data and execute it
 * 6. Of course, we're now looking for 'End' in column 0.  Putting an 'End' allows us
 *    to keep additional content at the end
 * 7. And finally, we're always looking for '--' in the first column, which signifies a 
 *    comment.
 */
$row = 1;
$text = [ "Table", "ConstraintTable", "Data", "x", "End" ];

if (($handle = fopen($argv[1], "r")) !== FALSE) {
	$looking = 0;
	$found = -1;
	$constraints = array();
	$columns = array();
	$columnIndex = array();
	$noRows = 0;
	$noDataRows = 0;
	
	while (($data = fgetcsv($handle)) !== FALSE) {
		$noRows ++;
		$num = count($data);
		if( $data[0] == "--" ) {
			// a comment; just ignore this
		} else if( $data[0] == $text[0] ) {
			// found the first row, extract the table name
			echo "Found table name: $text[0]: $data[1]\n";
			$found = $looking;
			$table = $data[1];
			$looking = 1;
		} else if( $data[0] == $text[1] ) {
			echo "Found constraint header info\n";
			// found the constraint table info header
			$found = $looking;
			$looking = 2;
		} else if( $data[0] == $text[2]) {
			echo "Finished constraints: $text[2]\n";
			// finished up the constraints, found the Data header
			$found = $looking;
			$looking = 3;  // which we'll never find!
		} else if( $data[0] == $text[4] ) {
			echo "found end\n";
			// found end; quit.
			break;
		} else {
			if( $looking == 2 ) {
				// get the constraint
				echo "found a constraint...\n";
				unset($c);
				$c = [ "table" => $data[0], "field" => $data[1], 
						"equiv" => $data[2], "col" => $data[3], "index" => count($constraints)];
				$constraints[$data[3]] = $c;
			} else if( $looking == 3) {
				echo "found data columns\n";
				// var_dump($constraints);
				// get the column names
				for ($i=0; $i < $num; $i++) {
					if( !is_null($data[$i]) && ($data[$i]<>"")) {
						$dataType = GetDataType($table,$data[$i]);
						unset($c);
						$c = [ "columnName" => $data[$i],
						   "datatype" => $dataType,
						   "index" => count($columns)
						];
						$columns[] = $c;
						$columnIndex[$data[$i]] = $i;
					}
				}
				$found = $looking;
				$looking = 4;
			} else if( $looking == 4) {
				// as long as we're looking for "End", we've got data
				$noDataRows++;
				if( count($constraints) == 0 ) {
					$selectFrom = " from dual";
				} else {
					$selectFrom = " from ";
					$delim = "";
					foreach($constraints as $cx ) {
						$index = $columnIndex[$cx["col"]];
						if( !is_null($data[$index]) && ($data[$index] != "")) {
							$selectFrom .= $delim . $cx["table"]." t".$cx["index"];
							$delim = ", ";
						}
					}
					if( $selectFrom == " from " ) {
						$selectFrom .= "dual ";
					}
				}
				$insQuery = "insert into $table (";
				$delim = "";
				for ($i=0; $i < count($columns); $i++) {
//					if there's data add it.  otherwise skip the field
					if( !is_null($data[$i]) && ($data[$i] != "" ) ) {
						$insQuery .= $delim. $columns[$i]["columnName"];
						$delim = ",";
					}
				}
				$insQuery .= ") select";
				$delim = "";
				for( $i=0; $i < count($columns); $i++ ) {
					$colName = $columns[$i]["columnName"];
					$dataValue = $data[$columnIndex[$columns[$i]["columnName"]]];
					if( is_null($dataValue) || ($dataValue=="")) {
//						skip the value
					} else {
						if( ! array_key_exists($colName,$constraints) ) {
							$dataType = $columns[$i]["datatype"];
//							echo "Data $colName ($dataType): $dataValue\n";
							if(   ($columns[$i]["datatype"] == "char") 
							   || ($columns[$i]["datatype"] == "varchar")
							   || ($columns[$i]["datatype"] == "date")
							   || ($columns[$i]["datatype"] == "datetime")
							   || ($columns[$i]["datatype"] == "timestamp")) {
								$insQuery .= "$delim \"$dataValue\"" ;
							} else {
								$insQuery .= "$delim $dataValue";
							}
						} else {
							$insQuery .= $delim." t".$constraints[$colName]["index"].".".$constraints[$colName]["field"];
							$insQuery .= " ".$colName;
						}
					} 
					$delim = ",";
				}
				$insQuery .= $selectFrom;
				$insQuery .= AddWhereClause( $constraints, $columnIndex, $data );
				echo $insQuery;
				$insSet = $connection->query($insQuery);
				if( $insSet ) {
					echo " -- True {$connection->affected_rows} row(s) inserted\n\n";
				} else {
					echo " -- False\n\n";
				}
			}
		}
		
	}
	echo "$noDataRows processed\n";
	fclose($handle);
	
}


function AddWhereClause( $constraints, $columnIndex, $data ) {
	$rtn = "";
	// var_dump($data);
	// var_dump($columnIndex);
	if( count($constraints) > 0 ) {
		$delim = " where ";
		foreach( $constraints as $cx ) {
			$index = $columnIndex[$cx["col"]];
			if( !is_null($data[$index]) && ($data[$index] != "")) {
				$rtn .= $delim."t".$cx["index"].".".$cx["field"]."= (select ".$cx["field"];
				$rtn .= " from ".$cx["table"]." where ".$cx["equiv"]."=";
				if( getDataType($cx["table"],$cx["equiv"])=="char") {
					$rtn .= "\"".$data[$index]."\")";
				} else {
					$rtn .= $data[$index].")";
				}
				$delim = " and ";
			}
		}		
	}
	return $rtn;
}

function GetDataType( $tableName, $colName) {
	global $connection;
	$dataTypeQuery = "select data_type, character_maximum_length from INFORMATION_SCHEMA.COLUMNS"
			. " where column_name = \"$colName\" and table_name = \"$tableName\"";
//	echo $dataTypeQuery."\n";
	$dataTypeSet = $connection->query($dataTypeQuery);
	$dataType = $dataTypeSet->fetch_assoc();
	return $dataType["data_type"];
}

?>
