-- set all analog inputs to halfway between max and zero.  Must be first
update analog_input 
   set scan_value = 0.5*(max_value - zero_value)
     , prev_value = 0.5*(max_value - zero_value)
     , last_hist_value = 0.5*(max_value - zero_value)
     , scan_time = coalesce(scan_time,utc_timestamp())
     , prev_time = coalesce(prev_time,utc_timestamp())
     , last_hist_time = coalesce(last_hist_time,utc_timestamp());

-- set ALL tank levels to 20% of max value
update analog_input 
   set scan_value = 0.2*max_value
     , prev_value = 0.2*max_value
     , last_hist_value = 0.2*max_value
     , scan_time = coalesce(scan_time,utc_timestamp())
     , prev_time = coalesce(prev_time,utc_timestamp())
     , last_hist_time = coalesce(last_hist_time,utc_timestamp())
 where tag_id in (select id from tag where name like '_T__-L');

-- set just the Crude tanks to 95% of max value (must follow ALL to 20%.  Duh. ) 
update analog_input 
   set scan_value = 0.95*max_value
     , prev_value = 0.95*max_value
     , last_hist_value = 0.95*max_value
     , scan_time = coalesce(scan_time,utc_timestamp())
     , prev_time = coalesce(prev_time,utc_timestamp())
     , last_hist_time = coalesce(last_hist_time,utc_timestamp())
 where tag_id in (select id from tag where name like 'CT__-L');


