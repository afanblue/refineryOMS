-- select t.name, ctv.name contents from tag t join tank tk on t.id=tk.id join content_type_vw ctv on ctv.code=tk.content_type_code where t.name like 'NT%' and t.tag_type_code='TK'

set @tank='NT01';

set @devType='V';
set @dir='INL';
set @type='valve';
set @device='NT01-Vi';
set @inpTag='NT01-ViDI';
set @outTag='NT01-ViDO';
set @desc='Naptha Tk 01';

select 'tag' from dual;
insert into tag(name, description, tag_type_code, misc, active) values(@device, concat(@desc,' ',@type,' in'), @devType,null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@inpTag, concat('On/Off ',@desc,@type,' in'),'DI',null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@outTag, concat('On/Off ',@desc,@type,' in'),'DO',null,'Y');
select 'digital input' from dual;
insert into digital_input ( tag_id, scan_int, scan_offset, current_scan, hist_type_code, value_view) select id, 1, 0, 0, 'N', 'off_on_vw' from tag where name = @inpTag;
select 'digital output' from dual;
insert into digital_output(tag_id, hist_type_code, is_new, value_view) select id, 'N', 0, 'off_on_vw' from tag where name=@outTag;
select 'rel_tag_tag' from dual;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@tank and t1.name=@device;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@inpTag;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@outTag;
select 'sim_io' from dual;
insert into sim_io(id,in_id) select t.id, t1.id from tag t join tag t1 where t.name=@outTag and t1.name=@inpTag;
set @dir='OUTL';
set @device='NT01-Vo';
set @inpTag='NT01-VoDI';
set @outTag='NT01-VoDO';
select 'tag' from dual;
insert into tag(name, description, tag_type_code, misc, active) values(@device, concat(@desc,' ',@type,' in'), @devType,null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@inpTag, concat('On/Off ',@desc,@type,' in'),'DI',null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@outTag, concat('On/Off ',@desc,@type,' in'),'DO',null,'Y');
select 'digital input' from dual;
insert into digital_input ( tag_id, scan_int, scan_offset, current_scan, hist_type_code, value_view) select id, 1, 0, 0, 'N', 'off_on_vw' from tag where name = @inpTag;
select 'digital output' from dual;
insert into digital_output(tag_id, hist_type_code, is_new, value_view) select id, 'N', 0, 'off_on_vw' from tag where name=@outTag;
select 'rel_tag_tag' from dual;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@tank and t1.name=@device;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@inpTag;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@outTag;
select 'sim_io' from dual;
insert into sim_io(id,in_id) select t.id, t1.id from tag t join tag t1 where t.name=@outTag and t1.name=@inpTag;
set @devType='PMP';
set @dir='OUTL';
set @type='pump';
set @device='NT01-Pmp';
set @inpTag='NT01-PoDI';
set @outTag='NT01-PoDO';
select 'tag' from dual;
insert into tag(name, description, tag_type_code, misc, active) values(@device, concat(@desc,' ',@type,' in'), @devType,null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@inpTag, concat('On/Off ',@desc,@type,' in'),'DI',null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@outTag, concat('On/Off ',@desc,@type,' in'),'DO',null,'Y');
select 'digital input' from dual;
insert into digital_input ( tag_id, scan_int, scan_offset, current_scan, hist_type_code, value_view) select id, 1, 0, 0, 'N', 'off_on_vw' from tag where name = @inpTag;
select 'digital output' from dual;
insert into digital_output(tag_id, hist_type_code, is_new, value_view) select id, 'N', 0, 'off_on_vw' from tag where name=@outTag;
select 'rel_tag_tag' from dual;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@tank and t1.name=@device;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@inpTag;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@outTag;
select 'sim_io' from dual;
insert into sim_io(id,in_id) select t.id, t1.id from tag t join tag t1 where t.name=@outTag and t1.name=@inpTag;


set @tank='NT02';

set @devType='V';
set @dir='INL';
set @type='valve';
set @device='NT02-Vi';
set @inpTag='NT02-ViDI';
set @outTag='NT02-ViDO';
set @desc='Naptha Tk 02';

select 'tag' from dual;
insert into tag(name, description, tag_type_code, misc, active) values(@device, concat(@desc,' ',@type,' in'), @devType,null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@inpTag, concat('On/Off ',@desc,@type,' in'),'DI',null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@outTag, concat('On/Off ',@desc,@type,' in'),'DO',null,'Y');
select 'digital input' from dual;
insert into digital_input ( tag_id, scan_int, scan_offset, current_scan, hist_type_code, value_view) select id, 1, 0, 0, 'N', 'off_on_vw' from tag where name = @inpTag;
select 'digital output' from dual;
insert into digital_output(tag_id, hist_type_code, is_new, value_view) select id, 'N', 0, 'off_on_vw' from tag where name=@outTag;
select 'rel_tag_tag' from dual;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@tank and t1.name=@device;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@inpTag;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@outTag;
select 'sim_io' from dual;
insert into sim_io(id,in_id) select t.id, t1.id from tag t join tag t1 where t.name=@outTag and t1.name=@inpTag;
set @dir='OUTL';
set @device='NT02-Vo';
set @inpTag='NT02-VoDI';
set @outTag='NT02-VoDO';
select 'tag' from dual;
insert into tag(name, description, tag_type_code, misc, active) values(@device, concat(@desc,' ',@type,' in'), @devType,null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@inpTag, concat('On/Off ',@desc,@type,' in'),'DI',null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@outTag, concat('On/Off ',@desc,@type,' in'),'DO',null,'Y');
select 'digital input' from dual;
insert into digital_input ( tag_id, scan_int, scan_offset, current_scan, hist_type_code, value_view) select id, 1, 0, 0, 'N', 'off_on_vw' from tag where name = @inpTag;
select 'digital output' from dual;
insert into digital_output(tag_id, hist_type_code, is_new, value_view) select id, 'N', 0, 'off_on_vw' from tag where name=@outTag;
select 'rel_tag_tag' from dual;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@tank and t1.name=@device;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@inpTag;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@outTag;
select 'sim_io' from dual;
insert into sim_io(id,in_id) select t.id, t1.id from tag t join tag t1 where t.name=@outTag and t1.name=@inpTag;
set @devType='PMP';
set @dir='OUTL';
set @type='pump';
set @device='NT02-Pmp';
set @inpTag='NT02-PoDI';
set @outTag='NT02-PoDO';
select 'tag' from dual;
insert into tag(name, description, tag_type_code, misc, active) values(@device, concat(@desc,' ',@type,' in'), @devType,null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@inpTag, concat('On/Off ',@desc,@type,' in'),'DI',null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@outTag, concat('On/Off ',@desc,@type,' in'),'DO',null,'Y');
select 'digital input' from dual;
insert into digital_input ( tag_id, scan_int, scan_offset, current_scan, hist_type_code, value_view) select id, 1, 0, 0, 'N', 'off_on_vw' from tag where name = @inpTag;
select 'digital output' from dual;
insert into digital_output(tag_id, hist_type_code, is_new, value_view) select id, 'N', 0, 'off_on_vw' from tag where name=@outTag;
select 'rel_tag_tag' from dual;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@tank and t1.name=@device;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@inpTag;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@outTag;
select 'sim_io' from dual;
insert into sim_io(id,in_id) select t.id, t1.id from tag t join tag t1 where t.name=@outTag and t1.name=@inpTag;


set @tank='NT03';

set @devType='V';
set @dir='INL';
set @type='valve';
set @device='NT03-Vi';
set @inpTag='NT03-ViDI';
set @outTag='NT03-ViDO';
set @desc='Naptha Tk 03';

select 'tag' from dual;
insert into tag(name, description, tag_type_code, misc, active) values(@device, concat(@desc,' ',@type,' in'), @devType,null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@inpTag, concat('On/Off ',@desc,@type,' in'),'DI',null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@outTag, concat('On/Off ',@desc,@type,' in'),'DO',null,'Y');
select 'digital input' from dual;
insert into digital_input ( tag_id, scan_int, scan_offset, current_scan, hist_type_code, value_view) select id, 1, 0, 0, 'N', 'off_on_vw' from tag where name = @inpTag;
select 'digital output' from dual;
insert into digital_output(tag_id, hist_type_code, is_new, value_view) select id, 'N', 0, 'off_on_vw' from tag where name=@outTag;
select 'rel_tag_tag' from dual;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@tank and t1.name=@device;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@inpTag;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@outTag;
select 'sim_io' from dual;
insert into sim_io(id,in_id) select t.id, t1.id from tag t join tag t1 where t.name=@outTag and t1.name=@inpTag;
set @dir='OUTL';
set @device='NT03-Vo';
set @inpTag='NT03-VoDI';
set @outTag='NT03-VoDO';
select 'tag' from dual;
insert into tag(name, description, tag_type_code, misc, active) values(@device, concat(@desc,' ',@type,' in'), @devType,null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@inpTag, concat('On/Off ',@desc,@type,' in'),'DI',null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@outTag, concat('On/Off ',@desc,@type,' in'),'DO',null,'Y');
select 'digital input' from dual;
insert into digital_input ( tag_id, scan_int, scan_offset, current_scan, hist_type_code, value_view) select id, 1, 0, 0, 'N', 'off_on_vw' from tag where name = @inpTag;
select 'digital output' from dual;
insert into digital_output(tag_id, hist_type_code, is_new, value_view) select id, 'N', 0, 'off_on_vw' from tag where name=@outTag;
select 'rel_tag_tag' from dual;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@tank and t1.name=@device;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@inpTag;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@outTag;
select 'sim_io' from dual;
insert into sim_io(id,in_id) select t.id, t1.id from tag t join tag t1 where t.name=@outTag and t1.name=@inpTag;
set @devType='PMP';
set @dir='OUTL';
set @type='pump';
set @device='NT03-Pmp';
set @inpTag='NT03-PoDI';
set @outTag='NT03-PoDO';
select 'tag' from dual;
insert into tag(name, description, tag_type_code, misc, active) values(@device, concat(@desc,' ',@type,' in'), @devType,null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@inpTag, concat('On/Off ',@desc,@type,' in'),'DI',null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@outTag, concat('On/Off ',@desc,@type,' in'),'DO',null,'Y');
select 'digital input' from dual;
insert into digital_input ( tag_id, scan_int, scan_offset, current_scan, hist_type_code, value_view) select id, 1, 0, 0, 'N', 'off_on_vw' from tag where name = @inpTag;
select 'digital output' from dual;
insert into digital_output(tag_id, hist_type_code, is_new, value_view) select id, 'N', 0, 'off_on_vw' from tag where name=@outTag;
select 'rel_tag_tag' from dual;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@tank and t1.name=@device;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@inpTag;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@outTag;
select 'sim_io' from dual;
insert into sim_io(id,in_id) select t.id, t1.id from tag t join tag t1 where t.name=@outTag and t1.name=@inpTag;


set @tank='NT04';

set @devType='V';
set @dir='INL';
set @type='valve';
set @device='NT04-Vi';
set @inpTag='NT04-ViDI';
set @outTag='NT04-ViDO';
set @desc='Naptha Tk 04';

select 'tag' from dual;
insert into tag(name, description, tag_type_code, misc, active) values(@device, concat(@desc,' ',@type,' in'), @devType,null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@inpTag, concat('On/Off ',@desc,@type,' in'),'DI',null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@outTag, concat('On/Off ',@desc,@type,' in'),'DO',null,'Y');
select 'digital input' from dual;
insert into digital_input ( tag_id, scan_int, scan_offset, current_scan, hist_type_code, value_view) select id, 1, 0, 0, 'N', 'off_on_vw' from tag where name = @inpTag;
select 'digital output' from dual;
insert into digital_output(tag_id, hist_type_code, is_new, value_view) select id, 'N', 0, 'off_on_vw' from tag where name=@outTag;
select 'rel_tag_tag' from dual;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@tank and t1.name=@device;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@inpTag;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@outTag;
select 'sim_io' from dual;
insert into sim_io(id,in_id) select t.id, t1.id from tag t join tag t1 where t.name=@outTag and t1.name=@inpTag;
set @dir='OUTL';
set @device='NT04-Vo';
set @inpTag='NT04-VoDI';
set @outTag='NT04-VoDO';
select 'tag' from dual;
insert into tag(name, description, tag_type_code, misc, active) values(@device, concat(@desc,' ',@type,' in'), @devType,null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@inpTag, concat('On/Off ',@desc,@type,' in'),'DI',null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@outTag, concat('On/Off ',@desc,@type,' in'),'DO',null,'Y');
select 'digital input' from dual;
insert into digital_input ( tag_id, scan_int, scan_offset, current_scan, hist_type_code, value_view) select id, 1, 0, 0, 'N', 'off_on_vw' from tag where name = @inpTag;
select 'digital output' from dual;
insert into digital_output(tag_id, hist_type_code, is_new, value_view) select id, 'N', 0, 'off_on_vw' from tag where name=@outTag;
select 'rel_tag_tag' from dual;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@tank and t1.name=@device;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@inpTag;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@outTag;
select 'sim_io' from dual;
insert into sim_io(id,in_id) select t.id, t1.id from tag t join tag t1 where t.name=@outTag and t1.name=@inpTag;
set @devType='PMP';
set @dir='OUTL';
set @type='pump';
set @device='NT04-Pmp';
set @inpTag='NT04-PoDI';
set @outTag='NT04-PoDO';
select 'tag' from dual;
insert into tag(name, description, tag_type_code, misc, active) values(@device, concat(@desc,' ',@type,' in'), @devType,null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@inpTag, concat('On/Off ',@desc,@type,' in'),'DI',null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@outTag, concat('On/Off ',@desc,@type,' in'),'DO',null,'Y');
select 'digital input' from dual;
insert into digital_input ( tag_id, scan_int, scan_offset, current_scan, hist_type_code, value_view) select id, 1, 0, 0, 'N', 'off_on_vw' from tag where name = @inpTag;
select 'digital output' from dual;
insert into digital_output(tag_id, hist_type_code, is_new, value_view) select id, 'N', 0, 'off_on_vw' from tag where name=@outTag;
select 'rel_tag_tag' from dual;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@tank and t1.name=@device;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@inpTag;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@outTag;
select 'sim_io' from dual;
insert into sim_io(id,in_id) select t.id, t1.id from tag t join tag t1 where t.name=@outTag and t1.name=@inpTag;


