-- ---
select 'active_vw' as action from dual;
DROP VIEW IF EXISTS active_vw;
CREATE VIEW active_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active`,`oms`.`reference_code`.`create_dt` AS `create_dt`,`oms`.`reference_code`.`last_modified_dt` AS `last_modified_dt` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'ACTIVE');
-- ---
select 'alarm_color_list_vw' as action from dual;
DROP VIEW IF EXISTS alarm_color_list_vw;
CREATE VIEW alarm_color_list_vw AS select 1 AS `id`,substr(`oms`.`config`.`item_name`,1,(length(`oms`.`config`.`item_name`) - 5)) AS `item_name`,`oms`.`config`.`item_value` AS `item_value` from `oms`.`config` where (`oms`.`config`.`item_name` like '%COLOR');
-- ---
select 'alarm_color_vw' as action from dual;
DROP VIEW IF EXISTS alarm_color_vw;
CREATE VIEW alarm_color_vw AS select `x`.`id` AS `id`,max((case when (`x`.`item_name` = 'LL') then `x`.`item_value` else NULL end)) AS `ll_color`,max((case when (`x`.`item_name` = 'LO') then `x`.`item_value` else NULL end)) AS `lo_color`,max((case when (`x`.`item_name` = 'NORM') then `x`.`item_value` else NULL end)) AS `norm_color`,max((case when (`x`.`item_name` = 'HI') then `x`.`item_value` else NULL end)) AS `hi_color`,max((case when (`x`.`item_name` = 'HH') then `x`.`item_value` else NULL end)) AS `hh_color` from `oms`.`alarm_color_list_vw` `x` group by `x`.`id`;
-- ---
select 'alarm_info' as action from dual;
DROP VIEW IF EXISTS alarm_info;
CREATE VIEW alarm_info AS select `a`.`id` AS `id`,`a`.`tag_id` AS `tag_id`,`a`.`alm_occurred` AS `alm_occurred`,`a`.`acknowledged` AS `acknowledged`,`a`.`active` AS `active`,ifnull(`a`.`alarm_msg_id`,`at`.`alarm_msg_id`) AS `alarm_msg_id`,`at`.`priority` AS `priority`,`at`.`code` AS `code`,`acl`.`item_value` AS `color`,`ai`.`scan_value` AS `value` from (((`oms`.`alarm` `a` join `oms`.`alarm_type` `at` on((`a`.`alarm_type_id` = `at`.`id`))) join `oms`.`alarm_color_list_vw` `acl` on((`at`.`code` = `acl`.`item_name`))) join `oms`.`analog_input` `ai` on((`a`.`tag_id` = `ai`.`tag_id`))) where (`a`.`active` = 'Y');
-- ---
select 'all_fields' as action from dual;
DROP VIEW IF EXISTS all_fields;
CREATE VIEW all_fields AS select `f`.`id` AS `id`,`t`.`name` AS `name`,`f`.`id` AS `parent_id`,`t`.`name` AS `parent` from `oms`.`field` `f` join `oms`.`tag` `t` where ((`f`.`id` = `t`.`id`) and (`t`.`active` = 'Y') and (`t`.`tag_type_code` = 'FLD') and (not(`t`.`id` in (select `oms`.`rel_tag_tag`.`child_tag_id` from `oms`.`rel_tag_tag`)))) union select `t`.`id` AS `id`,`t`.`name` AS `name`,`tp`.`id` AS `pid`,`tp`.`name` AS `pname` from ((`oms`.`rel_tag_tag` `rtt` join `oms`.`tag` `t` on((`rtt`.`child_tag_id` = `t`.`id`))) join `oms`.`tag` `tp` on((`rtt`.`parent_tag_id` = `tp`.`id`))) where ((`t`.`tag_type_code` = 'FLD') and (`tp`.`tag_type_code` = 'FLD'));
-- ---
select 'analog_type_vw' as action from dual;
DROP VIEW IF EXISTS analog_type_vw;
CREATE VIEW analog_type_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active`,`oms`.`reference_code`.`create_dt` AS `create_dt`,`oms`.`reference_code`.`last_modified_dt` AS `last_modified_dt` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'ANALOG-TYPE');
-- ---
select 'content_type_vw' as action from dual;
DROP VIEW IF EXISTS content_type_vw;
CREATE VIEW content_type_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active`,`oms`.`reference_code`.`create_dt` AS `create_dt`,`oms`.`reference_code`.`last_modified_dt` AS `last_modified_dt` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'CONTENT-TYPE');
-- ---
select 'dynamic_menu_items_vw' as action from dual;
DROP VIEW IF EXISTS dynamic_menu_items_vw;
CREATE VIEW dynamic_menu_items_vw AS select distinct `t`.`name` AS `text`,`t`.`id` AS `order_no`,concat('oms/processunit/',`t`.`id`) AS `uri`,`p`.`name` AS `viewpriv`,`p`.`name` AS `execpriv`,`m`.`text` AS `category`,replace(`t`.`name`,' ','') AS `menuname` from `oms`.`tag` `t` join `oms`.`privilege` `p` join `oms`.`menu` `m` where ((`t`.`tag_type_code` = 'PU') and (`t`.`active` = 'Y') and (`p`.`name` = 'View Process Units') and (`m`.`text` = 'Process Units')) union select distinct `t`.`name` AS `text`,`t`.`id` AS `order_no`,concat('oms/field/',`t`.`id`) AS `uri`,`p`.`name` AS `viewpriv`,`p`.`name` AS `execpriv`,`m`.`text` AS `category`,replace(`t`.`name`,' ','') AS `menuname` from `oms`.`tag` `t` join `oms`.`privilege` `p` join `oms`.`menu` `m` where ((`t`.`tag_type_code` = 'FLD') and (`t`.`active` = 'Y') and (`p`.`name` = 'View Fields') and (`m`.`text` = 'Field Displays'));
-- ---
select 'field_tag_deep_vw' as action from dual;
DROP VIEW IF EXISTS field_tag_deep_vw;
CREATE VIEW field_tag_deep_vw AS select `ft`.`field_tag_id` AS `field_tag_id`,`ft`.`child_tag_id` AS `child_tag_id` from (`oms`.`field_tag_vw` `ft` join `oms`.`tag` `t` on((`ft`.`child_tag_id` = `t`.`id`))) where (`t`.`tag_type_code` <> 'FLD') union select `ft1`.`field_tag_id` AS `field_tag_id`,`ft2`.`child_tag_id` AS `child_tag_id` from (((`oms`.`field_tag_vw` `ft1` join `oms`.`field_tag_vw` `ft2` on((`ft1`.`child_tag_id` = `ft2`.`field_tag_id`))) join `oms`.`tag` `t1` on((`ft1`.`child_tag_id` = `t1`.`id`))) join `oms`.`tag` `t2` on((`ft2`.`child_tag_id` = `t2`.`id`))) where (`t1`.`tag_type_code` = 'FLD');
-- ---
select 'field_tag_vw' as action from dual;
DROP VIEW IF EXISTS field_tag_vw;
CREATE VIEW field_tag_vw AS select `rt`.`parent_tag_id` AS `field_tag_id`,`rt`.`child_tag_id` AS `child_tag_id` from `oms`.`rel_tag_tag` `rt` join `oms`.`tag` `t` where ((`rt`.`parent_tag_id` = `t`.`id`) and (`t`.`tag_type_code` = 'FLD'));
-- ---
select 'history_type_vw' as action from dual;
DROP VIEW IF EXISTS history_type_vw;
CREATE VIEW history_type_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active`,`oms`.`reference_code`.`create_dt` AS `create_dt`,`oms`.`reference_code`.`last_modified_dt` AS `last_modified_dt` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'HISTORY-TYPE');
-- ---
select 'horizontal_menu_vw' as action from dual;
DROP VIEW IF EXISTS horizontal_menu_vw;
CREATE VIEW horizontal_menu_vw AS select `m`.`id` AS `id`,`m`.`menu_type_id` AS `menu_type_id`,`m`.`category_id` AS `category_id`,`m`.`text` AS `text`,`m`.`page_id` AS `page_id`,`m`.`order_no` AS `order_no`,`m`.`active` AS `active` from (`oms`.`menu` `m` join `oms`.`reference_code` `rc` on((`m`.`menu_type_id` = `rc`.`id`))) where ((`rc`.`category` = 'MENU_TYPE') and (`rc`.`code` = 'HT'));
-- ---
select 'menu_type_vw' as action from dual;
DROP VIEW IF EXISTS menu_type_vw;
CREATE VIEW menu_type_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active`,`oms`.`reference_code`.`create_dt` AS `create_dt`,`oms`.`reference_code`.`last_modified_dt` AS `last_modified_dt` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'MENU_TYPE');
-- ---
select 'off_on_vw' as action from dual;
DROP VIEW IF EXISTS off_on_vw;
CREATE VIEW off_on_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active`,`oms`.`reference_code`.`create_dt` AS `create_dt`,`oms`.`reference_code`.`last_modified_dt` AS `last_modified_dt` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'OFF-ON');
-- ---
select 'on_off_vw' as action from dual;
DROP VIEW IF EXISTS on_off_vw;
CREATE VIEW on_off_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active`,`oms`.`reference_code`.`create_dt` AS `create_dt`,`oms`.`reference_code`.`last_modified_dt` AS `last_modified_dt` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'ON-OFF');
-- ---
select 'tank_level_vw' as action from dual;
DROP VIEW IF EXISTS tank_level_vw;
CREATE VIEW tank_level_vw AS select `t`.`id` AS `tank_id`,`ai`.`tag_id` AS `level_id` from `oms`.`tank` `t` join `oms`.`rel_tag_tag` `rtt` join `oms`.`analog_input` `ai` where ((`t`.`id` = `rtt`.`parent_tag_id`) and (`rtt`.`child_tag_id` = `ai`.`tag_id`) and (`ai`.`type_code` = 'L'));
-- ---
select 'tank_ref_tag_row_vw' as action from dual;
DROP VIEW IF EXISTS tank_ref_tag_row_vw;
CREATE VIEW tank_ref_tag_row_vw AS select `rtt`.`parent_tag_id` AS `id`,`t`.`id` AS `child_tag_id`,`t`.`name` AS `child`,`ai`.`type_code` AS `type_code`,`ai`.`scan_value` AS `value`,concat(format(`ai`.`scan_value`,2),' ',`u`.`code`) AS `value_text` from (((`oms`.`rel_tag_tag` `rtt` join `oms`.`tag` `t` on((`t`.`id` = `rtt`.`child_tag_id`))) join `oms`.`analog_input` `ai` on((`t`.`id` = `ai`.`tag_id`))) join `oms`.`unit` `u` on((`ai`.`unit_id` = `u`.`id`)));
-- ---
select 'tank_ref_tag_vw' as action from dual;
DROP VIEW IF EXISTS tank_ref_tag_vw;
CREATE VIEW tank_ref_tag_vw AS select `trtrv`.`id` AS `id`,max((case when (`trtrv`.`type_code` = 'L') then `trtrv`.`child` end)) AS `level_tag`,max((case when (`trtrv`.`type_code` = 'L') then `trtrv`.`child_tag_id` end)) AS `level_tag_id`,max((case when (`trtrv`.`type_code` = 'L') then `trtrv`.`value` end)) AS `level`,max((case when (`trtrv`.`type_code` = 'L') then `trtrv`.`value_text` end)) AS `level_text`,max((case when (`trtrv`.`type_code` = 'T') then `trtrv`.`child` end)) AS `temp_tag`,max((case when (`trtrv`.`type_code` = 'T') then `trtrv`.`child_tag_id` end)) AS `temp_tag_id`,max((case when (`trtrv`.`type_code` = 'T') then `trtrv`.`value` end)) AS `temp`,max((case when (`trtrv`.`type_code` = 'T') then `trtrv`.`value_text` end)) AS `temp_text` from `oms`.`tank_ref_tag_row_vw` `trtrv` group by `trtrv`.`id`;
-- ---
select 'tank_tag_vw' as action from dual;
DROP VIEW IF EXISTS tank_tag_vw;
CREATE VIEW tank_tag_vw AS select `rt`.`parent_tag_id` AS `parent_tag_id`,`rt`.`child_tag_id` AS `child_tag_id` from `oms`.`rel_tag_tag` `rt` join `oms`.`tag` `t` where ((`rt`.`parent_tag_id` = `t`.`id`) and (`t`.`tag_type_code` = 'TK'));
-- ---
select 'tank_temperature_vw' as action from dual;
DROP VIEW IF EXISTS tank_temperature_vw;
CREATE VIEW tank_temperature_vw AS select `t`.`id` AS `tank_id`,`ai`.`tag_id` AS `temperature_id` from `oms`.`tank` `t` join `oms`.`rel_tag_tag` `rtt` join `oms`.`analog_input` `ai` where ((`t`.`id` = `rtt`.`parent_tag_id`) and (`rtt`.`child_tag_id` = `ai`.`tag_id`) and (`ai`.`type_code` = 'T'));
-- ---
select 'tf_vw' as action from dual;
DROP VIEW IF EXISTS tf_vw;
CREATE VIEW tf_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active`,`oms`.`reference_code`.`create_dt` AS `create_dt`,`oms`.`reference_code`.`last_modified_dt` AS `last_modified_dt` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'TF');
-- ---
select 'transfer_status_vw' as action from dual;
DROP VIEW IF EXISTS transfer_status_vw;
CREATE VIEW transfer_status_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active`,`oms`.`reference_code`.`create_dt` AS `create_dt`,`oms`.`reference_code`.`last_modified_dt` AS `last_modified_dt` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'TRANSFER_STATUS');
-- ---
select 'transfer_type_vw' as action from dual;
DROP VIEW IF EXISTS transfer_type_vw;
CREATE VIEW transfer_type_vw AS select `oms`.`reference_code`.`id` AS `id`,`oms`.`reference_code`.`category` AS `category`,`oms`.`reference_code`.`name` AS `name`,`oms`.`reference_code`.`code` AS `code`,`oms`.`reference_code`.`value` AS `value`,`oms`.`reference_code`.`description` AS `description`,`oms`.`reference_code`.`active` AS `active`,`oms`.`reference_code`.`create_dt` AS `create_dt`,`oms`.`reference_code`.`last_modified_dt` AS `last_modified_dt` from `oms`.`reference_code` where (`oms`.`reference_code`.`category` = 'TRANSFER_TYPE');
-- ---
select 'transfer_vw' as action from dual;
DROP VIEW IF EXISTS transfer_vw;
CREATE VIEW transfer_vw AS select `t`.`id` AS `id`,`t`.`name` AS `name`,`tsv`.`code` AS `status`,`ttv`.`code` AS `type`,`ts`.`name` AS `source`,`td`.`name` AS `destination`,`t`.`exp_start_time` AS `exp_start_time`,`t`.`exp_end_time` AS `exp_end_time`,`t`.`exp_volume` AS `exp_volume`,`t`.`act_start_time` AS `act_start_time`,`t`.`act_end_time` AS `act_end_time`,`t`.`act_volume` AS `act_volume` from ((((`oms`.`transfer` `t` join `oms`.`transfer_status_vw` `tsv` on((`t`.`status_id` = `tsv`.`id`))) join `oms`.`transfer_type_vw` `ttv` on((`t`.`transfer_type_id` = `ttv`.`id`))) join `oms`.`tag` `ts` on((`t`.`source_id` = `ts`.`id`))) join `oms`.`tag` `td` on((`t`.`destination_id` = `td`.`id`)));
-- ---
select 'user_priv' as action from dual;
DROP VIEW IF EXISTS user_priv;
CREATE VIEW user_priv AS select `u`.`alias` AS `user`,`p`.`name` AS `privilege` from ((((`oms`.`user` `u` join `oms`.`role` `r`) join `oms`.`user_role` `ur`) join `oms`.`privilege` `p`) join `oms`.`role_priv` `rp`) where ((`ur`.`user_id` = `u`.`id`) and (`ur`.`role_id` = `r`.`id`) and (`rp`.`role_id` = `r`.`id`) and (`rp`.`priv_id` = `p`.`id`)) union select `u`.`alias` AS `alias`,`p`.`name` AS `privilege` from ((((`oms`.`user` `u` join `oms`.`role` `r`) join `oms`.`user_role` `ur`) join `oms`.`privilege` `p`) join `oms`.`role_priv` `rp`) where ((`ur`.`user_id` = `u`.`id`) and (`rp`.`role_id` = `r`.`id`) and (`rp`.`priv_id` = `p`.`id`) and `r`.`parent_id` in (select `r`.`id` from ((`oms`.`user` `u` join `oms`.`role` `r`) join `oms`.`user_role` `ur`) where ((`ur`.`user_id` = `u`.`id`) and (`ur`.`role_id` = `r`.`id`))));
-- ---
select 'vertical_menu_vw' as action from dual;
DROP VIEW IF EXISTS vertical_menu_vw;
CREATE VIEW vertical_menu_vw AS select `m`.`id` AS `id`,`m`.`menu_type_id` AS `menu_type_id`,`m`.`category_id` AS `category_id`,`m`.`text` AS `text`,`m`.`page_id` AS `page_id`,`m`.`order_no` AS `order_no`,`m`.`active` AS `active` from (`oms`.`menu` `m` join `oms`.`reference_code` `rc` on((`m`.`menu_type_id` = `rc`.`id`))) where ((`rc`.`category` = 'MENU_TYPE') and (`rc`.`code` = 'VT'));
