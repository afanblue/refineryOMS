<?php

$fi = fopen($argv[1],'r');
$fo = fopen($argv[2],'w');
while ($line = fgets($fi)) {
  echo($line);
  $sl = substr($line,0,9);
  if( 0 == strcmp($sl,'*********') ) {
    fwrite($fo, '-- ---'.substr($line,-1));
  } elseif( 0 == strcmp($sl,'  notice:') ) {
    fwrite($fo, substr($line,10));
  } elseif( 0 == strcmp($sl,' drop_vw:') ) {
    fwrite($fo, substr($line,10));
  } elseif( 0 == strcmp($sl,'view_ddl:') ) {
    fwrite($fo, substr($line,10));
  } else {
    fwrite($fo, $line);
  }
}
fclose($fi);
fclose($fo);
?>