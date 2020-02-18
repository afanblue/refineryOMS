<?php

require_once "connection.php";

function createFile( $f, $a ) {
	$myfile = fopen($f, "w") or die("Unable to open file $f!");
	foreach( $a as $l ) {
		fwrite($myfile, "$l\n");
	}
	fclose($myfile);
}

function addData( $q, &$a ) {
	global $connection;
	$dl = $connection->query($q);
	if( $dl ) {
		$fields = "";
		$first = true;
		while ($t = $dl->fetch_assoc()) {
			$delim = "";
			$r = "";
			foreach ($t as $key => $value) {
				if( $first ) {
					$fields .= $delim.$key;
				}
				$r .= $delim.$value;
				$delim = ",";
			}
			if( $first ) {
				$a[] = $fields;
				$first = false;
			}
			$a[] = $r;
		}
	}
}

$home = __DIR__;
echo "$home\n";
/* config */
$t = "config";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"Data");
$q = "select item_name, "
   . "CASE "
   . "WHEN item_name = 'EMAIL_FROM'  THEN 'email_from' "
   . "WHEN item_name = 'EMAIL_PWD'  THEN 'email_pwd' "
   . "WHEN item_name = 'EMAIL_USER' THEN 'email_user' "
   . "WHEN item_name = 'SMTP_HOST' THEN 'smtp_host' "
   . "WHEN item_name = 'SMTP_PORT' THEN 'smtp_port' "
   . "WHEN item_name = 'WATCHDOG_EMAIL' then 'wd_email' "
   . "ELSE item_value "
   . "END item_value "
   . "from config";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* watchdog */
$t = "watchdog";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"Data,,,");
$q = "select name, active from watchdog";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* tag_type */
$t = "tag_type";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"Data,,,");
$q = "select code, name, description, js_draw_file, active from tag_type";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* unit_type */
$t = "unit_type";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"Data,,,");
$q = "select name, code from $t";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* unit */
$t = "unit";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"unit_type,id,name,unit_type_id",
		"Data,,,");
$q = "select u.name, u.code, ut.name unit_type_id from unit u "
   . "join unit_type ut on u.unit_type_id = ut.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* unit_conversion */
$t = "unit_conversion";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"unit,id,name,from_id",
		"unit,id,name,to_id",
		"Data,,,");
$q = "select uf.name from_id, ut.name to_id, offset, factor from unit_conversion uc "
   . "join unit uf on uc.from_id = uf.id "
   . "join unit ut on uc.to_id = ut.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* alarm message */
$t = "alarm_message";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"Data");
$q	= "select  abbr, message from alarm_message am ";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* alarm type */
$t = "alarm_type";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"alarm_message,id,abbr,alarm_msg_id",
		"Data,,,");
$q	= "select priority, am.abbr alarm_msg_id, code "
	. "from alarm_type alt, alarm_message am "
	. "where alt.alarm_msg_id = am.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* reference_code */
$t = "reference_code";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"Data");
$q = "select category, name, code, value, description, active from reference_code";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* privilege */
$t = "privilege";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"Data");
$q = "select name from privilege";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* vessel_type */
$t = "vessel_type";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"Data");
$q = "select name,code,quantity from $t";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* webpage */
$t = "page";
echo "Extracting $t \n";
$a = array( "Table,$t",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"privilege,id,name,exec_priv_id",
		"privilege,id,name,view_priv_id",
		"Data");
$q	= "select p.name, uri, pv.name view_priv_id, pa.name exec_priv_id, p.active "
	. "from page p, privilege pv, privilege pa "
	. "where p.view_priv_id = pv.id and p.exec_priv_id = pa.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* menuAdmin */
$f = "menuAdmin";
$t = "menu";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"page,id,name,page_id",
		"menu_type_vw,id,code,menu_type_id",
		"Data,,,");
$q	= "select rc.code menu_type_id, m.text, m.order_no, m.active "
    . "from menu m join reference_code rc on m.menu_type_id=rc.id "
    . "where m.category_id is null";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$f.csv", $a );

/* menu */
$t = "menu";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"page,id,name,page_id",
		"menu_type_vw,id,code,menu_type_id",
		"horizontal_menu_vw,id,text,category_id",
		"Data,,,");
$q	= "select rc.code menu_type_id, c.text category_id, m.text, m.order_no"
    . ", m.active, p.name page_id "
    . "from menu m left join menu c on m.category_id=c.id "
    . "join reference_code rc on m.menu_type_id=rc.id "
    . "join page p on m.page_id = p.id "
    . "where m.category_id is not null";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* role */
$f = "roleParent";
$t = "role";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"Data,,,");
$q	= "select r.name, r.active "
	. "from role r where r.parent_id is null";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$f.csv", $a );

/* role */
$t = "role";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"role,id,name,parent_id",
		"Data,,,");
$q	= "select r.name, rp.name parent_id, r.active "
	. "from role r, role rp where r.parent_id = rp.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* role_priv */
$t = "role_priv";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"role,id,name,role_id",
		"privilege,id,name,priv_id",
		"Data,,,");
$q	= "select r.name role_id, p.name priv_id "
	. "from role_priv rp, role r, privilege p "
	. "where rp.role_id = r.id and rp.priv_id = p.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* user */
$t = "user";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"Data,,,");
$q	= "select alias, first_name, middle_name, last_name, email, password, state, status "
	. "from user";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* user_role */
$t = "user_role";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"user,id,alias,user_id",
		"role,id,name,role_id",
		"Data,,,");
$q	= "select u.alias user_id, r.name role_id "
    . "from user_role ur join user u on ur.user_id = u.id "
    . "join role r on ur.role_id = r.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* customer */
$t = "customer";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"Data,,,");
$q	= "select name, active, etherkey from $t ";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* AI tags */
$t = "tag";
echo "Extracting AI $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"Data,,,");
$q	= "select name, description, tag_type_code, misc, c1_lat, c1_long, c2_lat, c2_long, active "
	. "from tag where tag_type_code = 'AI'";
$b = addData( $q, $a );
$a[] = "End";
createFile( "AI-$t.csv", $a );

/* AO tags */
$t = "tag";
echo "Extracting AO $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"Data,,,");
$q	= "select name, description, tag_type_code, misc, c1_lat, c1_long, c2_lat, c2_long, active "
	. "from tag where tag_type_code = 'AO'";
$b = addData( $q, $a );
$a[] = "End";
createFile( "AO-$t.csv", $a );

/* DI tags */
$t = "tag";
echo "Extracting DI $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"Data,,,");
$q	= "select name, description, tag_type_code, misc, c1_lat, c1_long, c2_lat, c2_long, active "
	. "from tag where tag_type_code = 'DI'";
$b = addData( $q, $a );
$a[] = "End";
createFile( "DI-$t.csv", $a );

/* DO tags */
$t = "tag";
echo "Extracting DO $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"Data,,,");
$q	= "select name, description, tag_type_code, misc, c1_lat, c1_long, c2_lat, c2_long, active "
	. "from tag where tag_type_code = 'DO'";
$b = addData( $q, $a );
$a[] = "End";
createFile( "DO-$t.csv", $a );

/* Calc tags */
$t = "tag";
echo "Extracting Calc $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"Data,,,");
$q	= "select name, description, tag_type_code, misc, c1_lat, c1_long, c2_lat, c2_long, active "
	. "from tag where tag_type_code = 'C'";
$b = addData( $q, $a );
$a[] = "End";
createFile( "Calc-$t.csv", $a );

/* CB tags */
$t = "tag";
echo "Extracting CB $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"Data,,,");
$q	= "select name, description, tag_type_code, misc, c1_lat, c1_long, c2_lat, c2_long, active "
	. "from tag where tag_type_code = 'CB'";
$b = addData( $q, $a );
$a[] = "End";
createFile( "CB-$t.csv", $a );

/* Everything else tags */
$t = "tag";
echo "Extracting everything else $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"Data,,,");
$q	= "select name, description, tag_type_code, misc, c1_lat, c1_long, c2_lat, c2_long, active "
	. "from tag where tag_type_code not in ('AI','AO','DI','DO','C','CB')";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* rel-tag_tag */
$t = "rel_tag_tag";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"tag,id,name,parent_tag_id",
		"tag,id,name,child_tag_id",
		"Data,,,");
$q	= "select tp.name parent_tag_id, tc.name child_tag_id, key_id "
	. "from rel_tag_tag rtt, tag tp, tag tc "
	. "where rtt.parent_tag_id=tp.id and rtt.child_tag_id = tc.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* field */
$t = "field";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"tag,id,name,id",
		"Data,,,");
$q	= "select t.name id, road_image, satellite_image "
	. "from field f, tag t where f.id = t.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* hot_spot (link) */
$t = "hot_spot";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"tag,id,name,field_id",
		"Data,,,");
$q	= "select t.name field_id, c1Lat, c1Long, c2Lat, c2Long, page_id, hs.active "
	. "from hot_spot hs, tag t where hs.field_id = t.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* vertex (end points of pipes) */
$t = "vertex";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"tag,id,name,tag_id",
		"Data,,,");
$q	= "select t.name tag_id, seq_no, latitude, longitude "
	. "from vertex v, tag t where v.tag_id = t.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* analog input */
$t = "analog_input";
echo "Extracting $t \n";
$a = array( "Table,$t,,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"tag,id,name,tag_id",
		"unit,id,name,unit_id",
		"Data,,,");
$q	= "select t.name tag_id, u.name unit_id, analog_type_code, scan_int, scan_offset"
    . ", zero_value, max_value, hist_type_code, percent, hh, hi, ll, lo "
    . "from analog_input ai join tag t on ai.tag_id = t.id "
    . "join unit u on ai.unit_id = u.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* analog output */
$t = "analog_output";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"tag,id,name,tag_id",
		"Data,,,");
$q	= "select t.name tag_id, zero_value, max_value, hist_type_code "
    . "from analog_output ao join tag t on ao.tag_id = t.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* digital input */
$t = "digital_input";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"tag,id,name,tag_id",
		"Data,,,");
$q	= "select t.name tag_id, scan_int, scan_offset, alarm_code, alarm_state, value_view "
    . "from digital_input di join tag t on di.tag_id = t.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* digital output */
$t = "digital_output";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"tag,id,name,tag_id",
		"Data,,,");
$q	= "select t.name tag_id, value_view "
	. "from digital_output od join tag t on od.tag_id = t.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* calculated */
$t = "calculated";
echo "Extracting $t \n";
$a = array( "Table,$t,,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"tag,id,name,id",
		"tag,id,name,output_tag_id",
		"Data,,,");
$q	= "select tc.name id, c.definition, tx.name output_tag_id "
    . "from calculated c join tag tc on c.id = tc.id "
    . "join tag tx on c.output_tag_id = tx.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* control block */
$t = "control_block";
echo "Extracting $t \n";
$a = array( "Table,$t,,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"tag,id,name,id",
		"tag,id,name,tag_id",
		"Data,,,");
$q	= "select tc.name id, tx.name tag_id "
    . "from control_block cb join tag tc on cb.id = tc.id "
    . "join tag tx on cb.tag_id = tx.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* tank */
$t = "tank";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"tag,id,name,id",
		"Data,,,");
$q	= "select t.name id, api, density, height, diameter, units, content_type_code "
	. "from tank tk join tag t on tk.id = t.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* vessel */
$t = "vessel";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"tag,id,name,id",
		"customer,id,name,customer_id",
		"Data");
$q = "select t.name id, v.name, v.quantity, c.name customer_id "
   . "from vessel v join tag t on v.id=t.id "
   . "join customer c on v.customer_id = c.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* volume (for tank) */
$t = "volume";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"tag,id,name,tank_id",
		"Data,,,");
$q	= "select t.name tank_id, level, volume "
	. "from volume v, tag t where v.tank_id = t.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* transfer */
$t = "transfer";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"tag,id,name,source_id",
        "tag,id,name,destination_id",
        "transfer_status_vw,id,name,status_id",
        "transfer_type_vw,id,name,transfer_type_id",
		"Data,,,");
$q	= "select x.name, tsv.name status_id, ttv.name transfer_type_id, "
        . "ts.name source_id, td.name destination_id, "
        . "exp_start_time, exp_end_time, exp_volume, "
        . "act_start_time, act_end_time, act_volume "
        . "from transfer x join tag ts on x.source_id = ts.id "
        . "join tag td on x.destination_id=td.id "
        . "join transfer_status_vw tsv on x.status_id = tsv.id "
        . "join transfer_type_vw ttv on x.transfer_type_id = ttv.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* raw_data */
$t = "raw_data";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"Data,,,");
$q	= "select x.id from raw_data x";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* plot_group */
$t = "plot_group";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"tag,id,name,id1",
		"tag,id,name,id2",
		"tag,id,name,id3",
		"tag,id,name,id4",
		"Data,,,");
$q	= "select pg.id, pg.name, t1.name id1, t2.name id2, t3.name id3, t4.name id4, pg.active "
      . "from plot_group pg join tag t1 on pg.id1=t1.id "
      . "join tag t2 on pg.id2=t2.id join tag t3 on pg.id3=t3.id join tag t4 on pg.id4=t4.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );

/* sim_IO */
$t = "sim_io";
echo "Extracting $t \n";
$a = array( "Table,$t,,",
		"ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
		"tag,id,name,id",
		"tag,id,name,in_id",
		"Data,,,");
$q	= "select t1.name id, t2.name in_id from sim_io sio "
    . "join tag t1 on sio.id=t1.id join tag t2 on sio.in_id=t2.id";
$b = addData( $q, $a );
$a[] = "End";
createFile( "$t.csv", $a );


?>
