select x.id, x.exp_start_time, x.exp_end_time, x.delta
     , if(delta=0,0,x1.smin + 60 * x.delta * floor( (d.cmin-x1.smin)/x.delta) ) d1
     , coalesce(if(delta!=0,d.today,d.tmorrow) + UNIX_TIMESTAMP(x.exp_start_time) 
               + if(delta=0,0,60*x.delta*floor( 1+ d.cmin/delta) )
               - d.bot - unix_timestamp(), 300) start_diff
     , date_format(from_unixtime(if(delta!=0,d.today,d.tmorrow) + unix_timestamp(x.exp_start_time) 
               + if(delta=0,0,60*x.delta*floor( 1+((d.cmin-x1.smin)/delta) ))
               - d.bot), '%Y-%m-%d %H:%i:%s') new_start_time
     , date_format(from_unixtime(if(delta!=0,d.today,d.tmorrow) + unix_timestamp(x.exp_end_time) 
               + if(delta=0,0,60*x.delta*floor( 1+(d.cmin-x1.smin)/delta) )
               - d.bot),'%Y-%m-%d %H:%i:%s') new_end_time
  from transfer x  join tag ts on x.source_id = ts.id
       join tag td on x.destination_id=td.id
       join transfer_status_vw tsv on x.status_id = tsv.id
       join transfer_type_vw ttv on x.transfer_type_id = ttv.id
       join (select id, 60*hour(exp_start_time)+minute(exp_start_time) smin
                  , 60*hour(exp_end_time)+minute(exp_end_time) emin
               from transfer ) x1 on x.id = x1.id
       join (select unix_timestamp('1970-01-01 00:00:00') bot
             , unix_timestamp(curdate()) today
             , unix_timestamp(curdate()+1) tmorrow
             , 60*hour(now())+minute(now()) cmin
          from dual ) d
 where x.id in (379,396);
 
 
select x.id, x.exp_start_time, x.exp_end_time, x.delta, current_time()
    , x1.smin, x1.emin
    , d.cmin
    , select x.id, x.exp_start_time, x.exp_end_time, x.delta
     , if(delta=0,0,x1.smin + 60 * x.delta * floor( (d.cmin-x1.smin)/x.delta) ) d1
     , coalesce(if(delta!=0,d.today,d.tmorrow) + UNIX_TIMESTAMP(x.exp_start_time) 
               + if(delta=0,0,60*x.delta*floor( 1+ d.cmin/delta) )
               - d.bot - unix_timestamp(), 300) start_diff
     , date_format(from_unixtime(if(delta!=0,d.today,d.tmorrow) + unix_timestamp(x.exp_start_time) 
--               + if(delta=0,0,60*x.delta*floor( 1+ (d.cmin-x1.smin)/delta)
               - d.bot), '%Y-%m-%d %H:%i:%s') new_start_timex
     , date_format(from_unixtime(if(delta!=0,d.today,d.tmorrow) + unix_timestamp(x.exp_start_time) 
               + if(delta=0,0,60*x.delta*floor( 1+((d.cmin-x1.smin)/delta) ))
               - d.bot), '%Y-%m-%d %H:%i:%s') new_start_time
     , date_format(from_unixtime(if(delta!=0,d.today,d.tmorrow) + unix_timestamp(x.exp_end_time) 
               + if(delta=0,0,60*x.delta*floor( 1+(d.cmin-x1.smin)/delta) )
               - d.bot),'%Y-%m-%d %H:%i:%s') new_end_time
  from transfer x  join tag ts on x.source_id = ts.id
       join tag td on x.destination_id=td.id
       join transfer_status_vw tsv on x.status_id = tsv.id
       join transfer_type_vw ttv on x.transfer_type_id = ttv.id
       join (select id, 60*hour(exp_start_time)+minute(exp_start_time) smin
                  , 60*hour(exp_end_time)+minute(exp_end_time) emin
               from transfer ) x1 on x.id = x1.id
       join (select unix_timestamp('1970-01-01 00:00:00') bot
             , unix_timestamp(curdate()) today
             , unix_timestamp(curdate()+1) tmorrow
             , 60*hour(now())+minute(now()) cmin
          from dual ) d
 where x.id in1 + (d.cmin - smin) /x.delta ft
    , if(delta=0,0,60*x.delta * floor ( 1 + (d.cmin - smin) /x.delta) ) d1
  from transfer x 
       join (select id, 60*hour(exp_start_time)+minute(exp_start_time) smin
                  , 60*hour(exp_end_time)+minute(exp_end_time) emin
               from transfer ) x1 on x.id = x1.id
       join (select unix_timestamp('1970-01-01 00:00:00') bot
             , unix_timestamp(curdate()) today
             , unix_timestamp(curdate()+1) tmorrow
             , 60*hour(now())+minute(now()) cmin
          from dual ) d
 where x.id in (379,396,539);
 
 
select x.id, exp_start_time, hour(exp_start_time), minute(exp_start_time)
     , exp_end_time, hour(exp_end_time), minute(exp_end_time)
  from transfer x
 where x.id in (379,396);

select id, exp_start_time, exp_end_time from transfer;



{"tagId":219
,"tag":{"id":219,"name":"RU1AP-DI","description":"On/Off Unit 1 Asphalt Pump"
       ,"tagTypeCode":"DI","c1Lat":null,"c1Long":-75.625879,"c2Lat":null,"c2Long":-75.62514,"active":"Y"}
,"scanInt":1,"scanOffset":0,"currentScan":0,"histTypeCode":null,"alarmState":null,"alarmCode":null
,"scanValue":null,"scanTime":null,"prevValue":null,"prevScanTime":null,"lastHistValue":null
,"lastHistTime":null,"valueView":"off_on_vw","simValue":null,"simScanTime":null,"updated":null
,"siteLocation":{"id":1,"name":"DeCity","description":null,"tagTypeCode":null,"c1Lat":39.592313
                ,"c1Long":-75.641903,"c2Lat":39.579168,"c2Long":-75.619368,"active":null}
,"histTypes":[{"id":19,"category":"HISTORY-TYPE","name":"Boxcar","code":"B","value":1,"description":"Boxcar algorithm","active":"Y"},
              {"id":20,"category":"HISTORY-TYPE","name":"Linear","code":"L","value":2,"description":"Linear algorithm","active":"Y"},
              {"id":18,"category":"HISTORY-TYPE","name":"None","code":"N","value":0,"description":"No history stored","active":"Y"}]
,"views":["active_vw","alarm_color_list_vw","alarm_color_vw","alarm_info","all_fields"
         ,"analog_type_vw","content_type_vw","dynamic_menu_items_vw","field_tag_deep_vw"
         ,"field_tag_vw","history_type_vw","horizontal_menu_vw","menu_type_vw","off_on_vw"
         ,"on_off_vw","tank_level_vw","tank_ref_tag_row_vw","tank_ref_tag_vw","tank_tag_vw"
         ,"tank_temperature_vw","tf_vw","transfer_status_vw","transfer_type_vw","transfer_vw"
         ,"user_priv","vertical_menu_vw"]}