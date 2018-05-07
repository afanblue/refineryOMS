update analog_input 
   set scan_value = 0.5*(max_value - zero_value)
     , scan_time = current_timestamp
 where tag_id < 1000;
