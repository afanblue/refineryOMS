select "Create tank reference tag view" from dual;

-- create a view for all Temperature and Level tags associated with a tank (rows)
select 'ObjectViews: tank_ref_tag_row_vw' action;
drop view if exists tank_ref_tag_row_vw;
create view tank_ref_tag_row_vw(id, child_tag_id, child, type_code, value, value_text ) as
select rtt.parent_tag_id id, t.id child_tag_id, t.name, ai.type_code
     , ai.scan_value AS value, CONCAT(ai.scan_value, ' ', u.code) AS value_text
 from rel_tag_tag rtt join tag t on t.id = rtt.child_tag_id
      join analog_input ai on t.id = ai.tag_id
      join unit u on ai.unit_id = u.id;
               
-- create a view for the temperature and level tags associated with a tank (columns)
-- the ID is the tank ID
select 'ObjectViews: tank_ref_tag_vw' action;
drop view if exists tank_ref_tag_vw;
CREATE VIEW tank_ref_tag_vw AS
    SELECT trtrv.id AS id,
        MAX((CASE
            WHEN (trtrv.type_code = 'L') THEN trtrv.child
        END)) AS level_tag,
        MAX((CASE
            WHEN (trtrv.type_code = 'L') THEN trtrv.child_tag_id
        END)) AS level_tag_id,
        MAX((CASE
            WHEN (trtrv.type_code = 'L') THEN trtrv.value
        END)) AS level,
        MAX((CASE
            WHEN (trtrv.type_code = 'L') THEN trtrv.value_text
        END)) AS level_text,
        MAX((CASE
            WHEN (trtrv.type_code = 'T') THEN trtrv.child
        END)) AS temp_tag,
        MAX((CASE
            WHEN (trtrv.type_code = 'T') THEN trtrv.child_tag_id
        END)) AS temp_tag_id,
        MAX((CASE
            WHEN (trtrv.type_code = 'T') THEN trtrv.value
        END)) AS temp,
        MAX((CASE
            WHEN (trtrv.type_code = 'T') THEN trtrv.value_text
        END)) AS temp_text
    FROM
        oms.tank_ref_tag_row_vw trtrv
    GROUP BY trtrv.id;

-- create a view for transfers which translates the ids to values
select 'ObjectViews: transfer_vw' action;
drop view if exists transfer_vw;
create view transfer_vw( id, name, status, type, source, destination
                       , exp_start_time, exp_end_time, exp_volume
                       , act_start_time, act_end_time, act_volume ) as
select t.id, t.name, tsv.code status, ttv.code type, ts.name source, td.name destination
     , exp_start_time, exp_end_time, exp_volume
     , act_start_time, act_end_time, act_volume
  from transfer t join transfer_status_vw tsv on t.status_id = tsv.id 
  join transfer_type_vw ttv on t.transfer_type_id = ttv.id 
  join tag ts on t.source_id=ts.id 
  join tag td on t.destination_id = td.id;