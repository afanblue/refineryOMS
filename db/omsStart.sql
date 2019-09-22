update analog_input 
   set scan_value = 0.5*(max_value - zero_value)
     , scan_time = current_timestamp
 where tag_id < 1000;

update analog_input 
   set scan_value = 0.95*max_value
     , scan_time = current_timestamp
 where tag_id in (select id from tag where name like 'DCL-C%');

update analog_input 
   set scan_value = 0.2*max_value
     , scan_time = current_timestamp
 where tag_id in (select id from tag where name like 'DCL-G%');
