-- ---*************************** 1. row ***************************
select 'active_order_vw' as action from dual;
DROP VIEW IF EXISTS active_order_vw;
CREATE VIEW active_order_vw AS select `oms`.`shipment_item`.`shipment_id` AS `shipment_id`,count(0) AS `sc` from `oms`.`shipment_item` where (`oms`.`shipment_item`.`active` <> 'C') group by `oms`.`shipment_item`.`shipment_id`;
-- ---*************************** 2. row ***************************
select 'active_vw' as action from dual;
DROP VIEW IF EXISTS active_vw;
CREATE VIEW active_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'ACTIVE') order by `oms`.`reference_code`.`name`;
-- ---*************************** 3. row ***************************
select 'ad_value_vw' as action from dual;
DROP VIEW IF EXISTS ad_value_vw;
CREATE VIEW ad_value_vw AS select `ai`.`tag_id` AS `tag_id`,round(`ai`.`scan_value`,2) AS `scan_value`,`ai`.`scan_time` AS `scan_time`,`ai`.`max_value` AS `max_value`,`ai`.`zero_value` AS `zero_value`,coalesce(`an`.`color`,`acv`.`norm_color`) AS `alarm_color` from ((`oms`.`analog_input` `ai` left join `oms`.`alarm_info` `an` on((`ai`.`tag_id` = `an`.`tag_id`))) join `oms`.`alarm_color_vw` `acv`) union select `di`.`tag_id` AS `tag_id`,`di`.`scan_value` AS `scan_value`,`di`.`scan_time` AS `scan_time`,1 AS `max_value`,0 AS `zero_value`,`acv`.`norm_color` AS `alarm_color` from (`oms`.`digital_input` `di` join `oms`.`alarm_color_vw` `acv`) union select `ao`.`tag_id` AS `tag_id`,`ao`.`scan_value` AS `scan_value`,`ao`.`scan_time` AS `scan_time`,`ao`.`max_value` AS `max_value`,`ao`.`zero_value` AS `zero_value`,`acv`.`norm_color` AS `alarm_color` from (`oms`.`analog_output` `ao` join `oms`.`alarm_color_vw` `acv`) union select `d`.`tag_id` AS `tag_id`,round(`d`.`scan_value`,2) AS `scan_value`,`d`.`scan_time` AS `scan_time`,1 AS `max_value`,0 AS `zero_value`,`acv`.`norm_color` AS `alarm_color` from (`oms`.`digital_output` `d` join `oms`.`alarm_color_vw` `acv`);
-- ---*************************** 4. row ***************************
select 'alarm_color_list_vw' as action from dual;
DROP VIEW IF EXISTS alarm_color_list_vw;
CREATE VIEW alarm_color_list_vw AS select 1 AS `id`,substr(`oms`.`config`.`item_name`,1,(length(`oms`.`config`.`item_name`) - 5)) AS `item_name`,`oms`.`config`.`item_value` AS `item_value` from `oms`.`config` where (`oms`.`config`.`item_name` like '%COLOR');
-- ---*************************** 5. row ***************************
select 'alarm_color_vw' as action from dual;
DROP VIEW IF EXISTS alarm_color_vw;
CREATE VIEW alarm_color_vw AS select `x`.`id` AS `id`,max((case when (`x`.`item_name` = 'LL') then `x`.`item_value` else NULL end)) AS `ll_color`,max((case when (`x`.`item_name` = 'LO') then `x`.`item_value` else NULL end)) AS `lo_color`,max((case when (`x`.`item_name` = 'NORM') then `x`.`item_value` else NULL end)) AS `norm_color`,max((case when (`x`.`item_name` = 'HI') then `x`.`item_value` else NULL end)) AS `hi_color`,max((case when (`x`.`item_name` = 'HH') then `x`.`item_value` else NULL end)) AS `hh_color` from `oms`.`alarm_color_list_vw` `x` group by `x`.`id`;
-- ---*************************** 6. row ***************************
select 'alarm_info' as action from dual;
DROP VIEW IF EXISTS alarm_info;
CREATE VIEW alarm_info AS select `a`.`id` AS `id`,`a`.`tag_id` AS `tag_id`,`a`.`alm_occurred` AS `alm_occurred`,`a`.`acknowledged` AS `acknowledged`,`a`.`active` AS `active`,ifnull(`a`.`alarm_msg_id`,`at`.`alarm_msg_id`) AS `alarm_msg_id`,`at`.`priority` AS `priority`,`at`.`code` AS `code`,`acl`.`item_value` AS `color`,`ai`.`scan_value` AS `value` from (((`oms`.`alarm` `a` join `oms`.`alarm_type` `at` on((`a`.`alarm_type_id` = `at`.`id`))) join `oms`.`alarm_color_list_vw` `acl` on((`at`.`code` = `acl`.`item_name`))) join `oms`.`analog_input` `ai` on((`a`.`tag_id` = `ai`.`tag_id`))) where (`a`.`active` = 'Y');
-- ---*************************** 7. row ***************************
select 'all_fields' as action from dual;
DROP VIEW IF EXISTS all_fields;
CREATE VIEW all_fields AS select `f`.`id` AS `id`,`t`.`name` AS `name`,`f`.`id` AS `parent_id`,`t`.`name` AS `parent` from (`oms`.`field` `f` join `oms`.`tag` `t`) where ((`f`.`id` = `t`.`id`) and (`t`.`active` = 'Y') and (`t`.`tag_type_code` = 'FLD') and (not(`t`.`id` in (select `oms`.`rel_tag_tag`.`child_tag_id` from `oms`.`rel_tag_tag`)))) union select `t`.`id` AS `id`,`t`.`name` AS `name`,`tp`.`id` AS `pid`,`tp`.`name` AS `pname` from ((`oms`.`rel_tag_tag` `rtt` join `oms`.`tag` `t` on((`rtt`.`child_tag_id` = `t`.`id`))) join `oms`.`tag` `tp` on((`rtt`.`parent_tag_id` = `tp`.`id`))) where ((`t`.`tag_type_code` = 'FLD') and (`tp`.`tag_type_code` = 'FLD'));
-- ---*************************** 8. row ***************************
select 'analog_type_vw' as action from dual;
DROP VIEW IF EXISTS analog_type_vw;
CREATE VIEW analog_type_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'ANALOG-TYPE') order by `oms`.`reference_code`.`name`;
-- ---*************************** 9. row ***************************
select 'calculation_type_vw' as action from dual;
DROP VIEW IF EXISTS calculation_type_vw;
CREATE VIEW calculation_type_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'CALCULATION_TYPE') order by `oms`.`reference_code`.`name`;
-- ---*************************** 10. row ***************************
select 'carrier_vw' as action from dual;
DROP VIEW IF EXISTS carrier_vw;
CREATE VIEW carrier_vw AS select `oms`.`tag_type`.`id` AS `id`,`oms`.`tag_type`.`code` AS `code`,`oms`.`tag_type`.`name` AS `name`,`oms`.`tag_type`.`description` AS `description`,`oms`.`tag_type`.`js_draw_file` AS `js_draw_file`,`oms`.`tag_type`.`active` AS `active` from `oms`.`tag_type` where (`oms`.`tag_type`.`code` in ('TT','S','T'));
-- ---*************************** 11. row ***************************
select 'child_value_vw' as action from dual;
DROP VIEW IF EXISTS child_value_vw;
CREATE VIEW child_value_vw AS select `tp`.`id` AS `parent_id`,`rtt`.`id` AS `rel_tag_id`,`tc`.`id` AS `id`,`tc`.`name` AS `name`,`tc`.`description` AS `description`,`tc`.`tag_type_code` AS `tag_type_code`,`tc`.`active` AS `active`,`tc`.`c1_lat` AS `c1_lat`,`tc`.`c1_long` AS `c1_long`,`tc`.`c2_lat` AS `c2_lat`,`tc`.`c2_long` AS `c2_long`,`tt`.`id` AS `child_tag_id`,`tt`.`name` AS `child_tag_name`,`pv`.`scan_value` AS `child_value`,`pv`.`scan_time` AS `child_time` from (((((`oms`.`tag` `tp` join `oms`.`rel_tag_tag` `rtt` on((`tp`.`id` = `rtt`.`parent_tag_id`))) join `oms`.`tag` `tc` on((`rtt`.`child_tag_id` = `tc`.`id`))) join `oms`.`rel_tag_tag` `rtt1` on((`rtt1`.`parent_tag_id` = `tc`.`id`))) join `oms`.`tag` `tt` on((`rtt1`.`child_tag_id` = `tt`.`id`))) join `oms`.`ad_value_vw` `pv` on((`tt`.`id` = `pv`.`tag_id`))) order by `tp`.`id`,`tc`.`id`;
-- ---*************************** 12. row ***************************
select 'content_type_vw' as action from dual;
DROP VIEW IF EXISTS content_type_vw;
CREATE VIEW content_type_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'CONTENT-TYPE') order by `oms`.`reference_code`.`name`;
-- ---*************************** 13. row ***************************
select 'dynamic_menu_items_vw' as action from dual;
DROP VIEW IF EXISTS dynamic_menu_items_vw;
CREATE VIEW dynamic_menu_items_vw AS select distinct `t`.`name` AS `text`,`t`.`id` AS `order_no`,concat('oms/processunit/',`t`.`id`) AS `uri`,`p`.`name` AS `viewpriv`,`p`.`name` AS `execpriv`,`m`.`text` AS `category`,replace(`t`.`name`,' ','') AS `menuname` from ((`oms`.`tag` `t` join `oms`.`privilege` `p`) join `oms`.`menu` `m`) where ((`t`.`tag_type_code` = 'PU') and (`t`.`active` = 'Y') and (`p`.`name` = 'View Process Units') and (`m`.`text` = 'Process Units')) union select distinct `t`.`name` AS `text`,`t`.`id` AS `order_no`,concat('oms/field/',`t`.`id`) AS `uri`,`p`.`name` AS `viewpriv`,`p`.`name` AS `execpriv`,`m`.`text` AS `category`,replace(`t`.`name`,' ','') AS `menuname` from ((`oms`.`tag` `t` join `oms`.`privilege` `p`) join `oms`.`menu` `m`) where ((`t`.`tag_type_code` = 'FLD') and (`t`.`active` = 'Y') and (`p`.`name` = 'View Fields') and (`m`.`text` = 'Field Displays'));
-- ---*************************** 14. row ***************************
select 'field_tag_deep_vw' as action from dual;
DROP VIEW IF EXISTS field_tag_deep_vw;
CREATE VIEW field_tag_deep_vw AS select `ft`.`field_tag_id` AS `field_tag_id`,`ft`.`child_tag_id` AS `child_tag_id` from (`oms`.`field_tag_vw` `ft` join `oms`.`tag` `t` on((`ft`.`child_tag_id` = `t`.`id`))) where (`t`.`tag_type_code` <> 'FLD') union select `ft1`.`field_tag_id` AS `field_tag_id`,`ft2`.`child_tag_id` AS `child_tag_id` from (((`oms`.`field_tag_vw` `ft1` join `oms`.`field_tag_vw` `ft2` on((`ft1`.`child_tag_id` = `ft2`.`field_tag_id`))) join `oms`.`tag` `t1` on((`ft1`.`child_tag_id` = `t1`.`id`))) join `oms`.`tag` `t2` on((`ft2`.`child_tag_id` = `t2`.`id`))) where (`t1`.`tag_type_code` = 'FLD');
-- ---*************************** 15. row ***************************
select 'field_tag_vw' as action from dual;
DROP VIEW IF EXISTS field_tag_vw;
CREATE VIEW field_tag_vw AS select `rt`.`parent_tag_id` AS `field_tag_id`,`rt`.`child_tag_id` AS `child_tag_id` from (`oms`.`rel_tag_tag` `rt` join `oms`.`tag` `t`) where ((`rt`.`parent_tag_id` = `t`.`id`) and (`t`.`tag_type_code` = 'FLD'));
-- ---*************************** 16. row ***************************
select 'history_type_vw' as action from dual;
DROP VIEW IF EXISTS history_type_vw;
CREATE VIEW history_type_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'HISTORY-TYPE') order by `oms`.`reference_code`.`name`;
-- ---*************************** 17. row ***************************
select 'horizontal_menu_vw' as action from dual;
DROP VIEW IF EXISTS horizontal_menu_vw;
CREATE VIEW horizontal_menu_vw AS select `m`.`id` AS `id`,`m`.`menu_type_id` AS `menu_type_id`,`m`.`category_id` AS `category_id`,`m`.`text` AS `text`,`m`.`page_id` AS `page_id`,`m`.`order_no` AS `order_no`,`m`.`active` AS `active` from (`oms`.`menu` `m` join `oms`.`reference_code` `rc` on((`m`.`menu_type_id` = `rc`.`id`))) where ((`rc`.`category` = 'MENU_TYPE') and (`rc`.`code` = 'HT'));
-- ---*************************** 18. row ***************************
select 'menu_type_vw' as action from dual;
DROP VIEW IF EXISTS menu_type_vw;
CREATE VIEW menu_type_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'MENU_TYPE') order by `oms`.`reference_code`.`name`;
-- ---*************************** 19. row ***************************
select 'off_on_vw' as action from dual;
DROP VIEW IF EXISTS off_on_vw;
CREATE VIEW off_on_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'OFF-ON') order by `oms`.`reference_code`.`name`;
-- ---*************************** 20. row ***************************
select 'on_off_vw' as action from dual;
DROP VIEW IF EXISTS on_off_vw;
CREATE VIEW on_off_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'ON-OFF') order by `oms`.`reference_code`.`name`;
-- ---*************************** 21. row ***************************
select 'order_volume_vw' as action from dual;
DROP VIEW IF EXISTS order_volume_vw;
CREATE VIEW order_volume_vw AS select `oms`.`shipment_item`.`shipment_id` AS `shipment_id`,`oms`.`shipment_item`.`content_cd` AS `content_cd`,`oms`.`shipment_item`.`transfer_id` AS `transfer_id`,sum(`oms`.`shipment_item`.`exp_volume_max`) AS `exp_volume`,sum(`oms`.`shipment_item`.`act_volume`) AS `act_volume` from `oms`.`shipment_item` group by `oms`.`shipment_item`.`shipment_id`,`oms`.`shipment_item`.`content_cd`,`oms`.`shipment_item`.`transfer_id`;
-- ---*************************** 22. row ***************************
select 'pending_order_vw' as action from dual;
DROP VIEW IF EXISTS pending_order_vw;
CREATE VIEW pending_order_vw AS select `oms`.`shipment_item`.`shipment_id` AS `shipment_id`,count(0) AS `sc` from `oms`.`shipment_item` where (`oms`.`shipment_item`.`active` = 'P') group by `oms`.`shipment_item`.`shipment_id`;
-- ---*************************** 23. row ***************************
select 'rtt_vw' as action from dual;
DROP VIEW IF EXISTS rtt_vw;
CREATE VIEW rtt_vw AS select `rtt`.`id` AS `id`,`rtt`.`parent_tag_id` AS `parent_tag_id`,`tp`.`name` AS `parent`,`tp`.`tag_type_code` AS `parent_type`,`rtt`.`child_tag_id` AS `child_tag_id`,`tc`.`name` AS `child`,`tc`.`tag_type_code` AS `child_type`,`rtt`.`code` AS `code` from ((`oms`.`rel_tag_tag` `rtt` join `oms`.`tag` `tp` on((`rtt`.`parent_tag_id` = `tp`.`id`))) join `oms`.`tag` `tc` on((`rtt`.`child_tag_id` = `tc`.`id`))) order by `tp`.`name`;
-- ---*************************** 24. row ***************************
select 'scm_object_vw' as action from dual;
DROP VIEW IF EXISTS scm_object_vw;
CREATE VIEW scm_object_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'SCM_OBJECT') order by `oms`.`reference_code`.`name`;
-- ---*************************** 25. row ***************************
select 'sco_ref_tag_row_vw' as action from dual;
DROP VIEW IF EXISTS sco_ref_tag_row_vw;
CREATE VIEW sco_ref_tag_row_vw AS select `tc`.`id` AS `id`,`rtt1`.`id` AS `gc_rel_tag_id`,`tt`.`id` AS `gc_tag_id`,`tt`.`name` AS `gc_tag_name`,`tt`.`tag_type_code` AS `gc_type_code`,round(`pv`.`scan_value`,2) AS `gc_value`,`pv`.`scan_time` AS `gc_time`,`pv`.`max_value` AS `max_value`,`pv`.`zero_value` AS `zero_value`,`pv`.`alarm_color` AS `alarm_color` from (((`oms`.`tag` `tc` join `oms`.`rel_tag_tag` `rtt1` on((`rtt1`.`parent_tag_id` = `tc`.`id`))) join `oms`.`tag` `tt` on((`rtt1`.`child_tag_id` = `tt`.`id`))) join `oms`.`ad_value_vw` `pv` on((`tt`.`id` = `pv`.`tag_id`))) where (`tc`.`tag_type_code` = 'SCO');
-- ---*************************** 26. row ***************************
select 'sco_ref_tag_vw' as action from dual;
DROP VIEW IF EXISTS sco_ref_tag_vw;
CREATE VIEW sco_ref_tag_vw AS select `srtrv`.`id` AS `id`,max((case when (`srtrv`.`gc_type_code` in ('AI','DI')) then `srtrv`.`gc_rel_tag_id` end)) AS `inp_rel_tag_id`,max((case when (`srtrv`.`gc_type_code` in ('AI','DI')) then `srtrv`.`gc_tag_id` end)) AS `inp_id`,max((case when (`srtrv`.`gc_type_code` in ('AI','DI')) then `srtrv`.`gc_tag_name` end)) AS `inp_tag`,max((case when (`srtrv`.`gc_type_code` in ('AI','DI')) then `srtrv`.`gc_type_code` end)) AS `inp_type`,max((case when (`srtrv`.`gc_type_code` in ('AI','DI')) then `srtrv`.`gc_value` end)) AS `inp_value`,max((case when (`srtrv`.`gc_type_code` in ('AI','DI')) then `srtrv`.`max_value` end)) AS `inp_max`,max((case when (`srtrv`.`gc_type_code` in ('AI','DI')) then `srtrv`.`zero_value` end)) AS `inp_zero`,max((case when (`srtrv`.`gc_type_code` in ('AI','DI')) then `srtrv`.`alarm_color` end)) AS `inp_alm_color`,max((case when (`srtrv`.`gc_type_code` in ('AO','DO')) then `srtrv`.`gc_rel_tag_id` end)) AS `out_rel_tag_id`,max((case when (`srtrv`.`gc_type_code` in ('AO','DO')) then `srtrv`.`gc_tag_id` end)) AS `out_id`,max((case when (`srtrv`.`gc_type_code` in ('AO','DO')) then `srtrv`.`gc_tag_name` end)) AS `out_tag`,max((case when (`srtrv`.`gc_type_code` in ('AO','DO')) then `srtrv`.`gc_type_code` end)) AS `out_type`,max((case when (`srtrv`.`gc_type_code` in ('AO','DO')) then `srtrv`.`gc_value` end)) AS `out_value`,max((case when (`srtrv`.`gc_type_code` in ('AO','DO')) then `srtrv`.`max_value` end)) AS `out_max`,max((case when (`srtrv`.`gc_type_code` in ('AO','DO')) then `srtrv`.`zero_value` end)) AS `out_zero`,max((case when (`srtrv`.`gc_type_code` in ('AO','DO')) then `srtrv`.`alarm_color` end)) AS `out_alm_color` from `oms`.`sco_ref_tag_row_vw` `srtrv` group by `srtrv`.`id`;
-- ---*************************** 27. row ***************************
select 'tank_level_vw' as action from dual;
DROP VIEW IF EXISTS tank_level_vw;
CREATE VIEW tank_level_vw AS select `t`.`id` AS `tank_id`,`ai`.`tag_id` AS `level_id` from ((`oms`.`tank` `t` join `oms`.`rel_tag_tag` `rtt`) join `oms`.`analog_input` `ai`) where ((`t`.`id` = `rtt`.`parent_tag_id`) and (`rtt`.`child_tag_id` = `ai`.`tag_id`) and (`ai`.`analog_type_code` = 'L'));
-- ---*************************** 28. row ***************************
select 'tank_ref_tag_row_vw' as action from dual;
DROP VIEW IF EXISTS tank_ref_tag_row_vw;
CREATE VIEW tank_ref_tag_row_vw AS select `rtt`.`parent_tag_id` AS `id`,`rtt`.`id` AS `rtt_id`,`t`.`id` AS `child_tag_id`,`t`.`name` AS `child`,`ai`.`analog_type_code` AS `analog_type_code`,round(`ai`.`scan_value`,2) AS `value`,concat(convert(format(`ai`.`scan_value`,2) using utf8),' ',`u`.`code`) AS `value_text`,`ai`.`max_value` AS `max_value`,`ai`.`zero_value` AS `zero_value`,coalesce(`an`.`color`,`acv`.`norm_color`) AS `alarm_color` from (((((`oms`.`rel_tag_tag` `rtt` join `oms`.`tag` `t` on((`t`.`id` = `rtt`.`child_tag_id`))) join `oms`.`analog_input` `ai` on((`t`.`id` = `ai`.`tag_id`))) join `oms`.`unit` `u` on((`ai`.`unit_id` = `u`.`id`))) left join `oms`.`alarm_info` `an` on((`ai`.`tag_id` = `an`.`tag_id`))) join `oms`.`alarm_color_vw` `acv`);
-- ---*************************** 29. row ***************************
select 'tank_ref_tag_vw' as action from dual;
DROP VIEW IF EXISTS tank_ref_tag_vw;
CREATE VIEW tank_ref_tag_vw AS select `trtrv`.`id` AS `id`,max((case when (`trtrv`.`analog_type_code` = 'L') then `trtrv`.`child` end)) AS `level_tag`,max((case when (`trtrv`.`analog_type_code` = 'L') then `trtrv`.`child_tag_id` end)) AS `level_tag_id`,max((case when (`trtrv`.`analog_type_code` = 'L') then `trtrv`.`rtt_id` end)) AS `level_rtt_id`,max((case when (`trtrv`.`analog_type_code` = 'L') then `trtrv`.`value` end)) AS `level`,max((case when (`trtrv`.`analog_type_code` = 'L') then `trtrv`.`value_text` end)) AS `level_text`,max((case when (`trtrv`.`analog_type_code` = 'L') then `trtrv`.`max_value` end)) AS `level_max`,max((case when (`trtrv`.`analog_type_code` = 'L') then `trtrv`.`zero_value` end)) AS `level_zero`,max((case when (`trtrv`.`analog_type_code` = 'L') then `trtrv`.`alarm_color` end)) AS `level_alm_color`,max((case when (`trtrv`.`analog_type_code` = 'T') then `trtrv`.`child` end)) AS `temp_tag`,max((case when (`trtrv`.`analog_type_code` = 'T') then `trtrv`.`child_tag_id` end)) AS `temp_tag_id`,max((case when (`trtrv`.`analog_type_code` = 'T') then `trtrv`.`rtt_id` end)) AS `temp_rtt_id`,max((case when (`trtrv`.`analog_type_code` = 'T') then `trtrv`.`value` end)) AS `temp`,max((case when (`trtrv`.`analog_type_code` = 'T') then `trtrv`.`value_text` end)) AS `temp_text`,max((case when (`trtrv`.`analog_type_code` = 'T') then `trtrv`.`max_value` end)) AS `temp_max`,max((case when (`trtrv`.`analog_type_code` = 'T') then `trtrv`.`zero_value` end)) AS `temp_zero`,max((case when (`trtrv`.`analog_type_code` = 'T') then `trtrv`.`alarm_color` end)) AS `temp_alm_color` from `oms`.`tank_ref_tag_row_vw` `trtrv` group by `trtrv`.`id`;
-- ---*************************** 30. row ***************************
select 'tank_tag_vw' as action from dual;
DROP VIEW IF EXISTS tank_tag_vw;
CREATE VIEW tank_tag_vw AS select `rt`.`parent_tag_id` AS `parent_tag_id`,`rt`.`child_tag_id` AS `child_tag_id` from (`oms`.`rel_tag_tag` `rt` join `oms`.`tag` `t`) where ((`rt`.`parent_tag_id` = `t`.`id`) and (`t`.`tag_type_code` = 'TK'));
-- ---*************************** 31. row ***************************
select 'tank_temperature_vw' as action from dual;
DROP VIEW IF EXISTS tank_temperature_vw;
CREATE VIEW tank_temperature_vw AS select `t`.`id` AS `tank_id`,`ai`.`tag_id` AS `temperature_id` from ((`oms`.`tank` `t` join `oms`.`rel_tag_tag` `rtt`) join `oms`.`analog_input` `ai`) where ((`t`.`id` = `rtt`.`parent_tag_id`) and (`rtt`.`child_tag_id` = `ai`.`tag_id`) and (`ai`.`analog_type_code` = 'T'));
-- ---*************************** 32. row ***************************
select 'tf_vw' as action from dual;
DROP VIEW IF EXISTS tf_vw;
CREATE VIEW tf_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'TF') order by `oms`.`reference_code`.`name`;
-- ---*************************** 33. row ***************************
select 'transfer_status_vw' as action from dual;
DROP VIEW IF EXISTS transfer_status_vw;
CREATE VIEW transfer_status_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'TRANSFER_STATUS') order by `oms`.`reference_code`.`name`;
-- ---*************************** 34. row ***************************
select 'transfer_type_vw' as action from dual;
DROP VIEW IF EXISTS transfer_type_vw;
CREATE VIEW transfer_type_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'TRANSFER_TYPE') order by `oms`.`reference_code`.`name`;
-- ---*************************** 35. row ***************************
select 'transfer_vw' as action from dual;
DROP VIEW IF EXISTS transfer_vw;
CREATE VIEW transfer_vw AS select `t`.`id` AS `id`,`t`.`name` AS `name`,`tsv`.`code` AS `status`,`ttv`.`code` AS `type`,`ts`.`name` AS `source`,`td`.`name` AS `destination`,`t`.`exp_start_time` AS `exp_start_time`,`t`.`exp_end_time` AS `exp_end_time`,`t`.`exp_volume` AS `exp_volume`,`t`.`act_start_time` AS `act_start_time`,`t`.`act_end_time` AS `act_end_time`,`t`.`act_volume` AS `act_volume` from ((((`oms`.`transfer` `t` join `oms`.`transfer_status_vw` `tsv` on((`t`.`status_id` = `tsv`.`id`))) join `oms`.`transfer_type_vw` `ttv` on((`t`.`transfer_type_id` = `ttv`.`id`))) join `oms`.`tag` `ts` on((`t`.`source_id` = `ts`.`id`))) join `oms`.`tag` `td` on((`t`.`destination_id` = `td`.`id`)));
-- ---*************************** 36. row ***************************
select 'user_priv' as action from dual;
DROP VIEW IF EXISTS user_priv;
CREATE VIEW user_priv AS select `u`.`alias` AS `user`,`p`.`name` AS `privilege` from ((((`oms`.`user` `u` join `oms`.`role` `r`) join `oms`.`user_role` `ur`) join `oms`.`privilege` `p`) join `oms`.`role_priv` `rp`) where ((`ur`.`user_id` = `u`.`id`) and (`ur`.`role_id` = `r`.`id`) and (`rp`.`role_id` = `r`.`id`) and (`rp`.`priv_id` = `p`.`id`)) union select `u`.`alias` AS `alias`,`p`.`name` AS `privilege` from ((((`oms`.`user` `u` join `oms`.`role` `r`) join `oms`.`user_role` `ur`) join `oms`.`privilege` `p`) join `oms`.`role_priv` `rp`) where ((`ur`.`user_id` = `u`.`id`) and (`rp`.`role_id` = `r`.`id`) and (`rp`.`priv_id` = `p`.`id`) and `r`.`parent_id` in (select `r`.`id` from ((`oms`.`user` `u` join `oms`.`role` `r`) join `oms`.`user_role` `ur`) where ((`ur`.`user_id` = `u`.`id`) and (`ur`.`role_id` = `r`.`id`))));
-- ---*************************** 37. row ***************************
select 'vertical_menu_vw' as action from dual;
DROP VIEW IF EXISTS vertical_menu_vw;
CREATE VIEW vertical_menu_vw AS select `m`.`id` AS `id`,`m`.`menu_type_id` AS `menu_type_id`,`m`.`category_id` AS `category_id`,`m`.`text` AS `text`,`m`.`page_id` AS `page_id`,`m`.`order_no` AS `order_no`,`m`.`active` AS `active` from (`oms`.`menu` `m` join `oms`.`reference_code` `rc` on((`m`.`menu_type_id` = `rc`.`id`))) where ((`rc`.`category` = 'MENU_TYPE') and (`rc`.`code` = 'VT'));
