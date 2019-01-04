-- select t.name, ctv.name contents from tag t join tank tk on t.id=tk.id join content_type_vw ctv on ctv.code=tk.content_type_code where t.name like 'FOT02%' and t.tag_type_code='TK'

set @tank='FOT02';

set @devType='V';
set @dir='INL';
set @type='valve';
set @device='FOT02-Vi';
set @inpTag='FOT02-ViDI';
set @outTag='FOT02-ViDO';
set @desc='FuelOil Tk 02';

select 'tag' from dual
insert into tag(name, description, tag_type_code, misc, active) values(@device, concat(@desc,' ',@type,' in'), @devType,null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@inpTag, concat('On/Off ',@desc,@type,' in'),'DI',null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@outTag, concat('On/Off ',@desc,@type,' in'),'DO',null,'Y');
select 'digital input' from dual
insert into digital_input ( tag_id, scan_int, scan_offset, current_scan, hist_type_code, value_view) select id, 1, 0, 0, 'N', 'off_on_vw' from tag where name = @inpTag;
select 'digital output' from dual
insert into digital_output(tag_id, hist_type_code, is_new, value_view) select id, 'N', 0, 'off_on_vw' from tag where name=@outTag;
select 'rel_tag_tag' from dual
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@tank and t1.name=@device;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@inpTag;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@outTag;
select 'sim_io' from dual
insert into sim_io(id,in_id) select t.id, t1.id from tag t join tag t1 where t.name=@outTag and t1.name=@inpTag;
set @dir='OUTL';
set @device='FOT02-Vo';
set @inpTag='FOT02-VoDI';
set @outTag='FOT02-VoDO';
select 'tag' from dual
insert into tag(name, description, tag_type_code, misc, active) values(@device, concat(@desc,' ',@type,' in'), @devType,null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@inpTag, concat('On/Off ',@desc,@type,' in'),'DI',null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@outTag, concat('On/Off ',@desc,@type,' in'),'DO',null,'Y');
select 'digital input' from dual
insert into digital_input ( tag_id, scan_int, scan_offset, current_scan, hist_type_code, value_view) select id, 1, 0, 0, 'N', 'off_on_vw' from tag where name = @inpTag;
select 'digital output' from dual
insert into digital_output(tag_id, hist_type_code, is_new, value_view) select id, 'N', 0, 'off_on_vw' from tag where name=@outTag;
select 'rel_tag_tag' from dual
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@tank and t1.name=@device;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@inpTag;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@outTag;
select 'sim_io' from dual
insert into sim_io(id,in_id) select t.id, t1.id from tag t join tag t1 where t.name=@outTag and t1.name=@inpTag;
set @devType='PMP';
set @dir='OUTL';
set @type='pump';
set @device='FOT02-Pmp';
set @inpTag='FOT02-PoDI';
set @outTag='FOT02-PoDO';
select 'tag' from dual
insert into tag(name, description, tag_type_code, misc, active) values(@device, concat(@desc,' ',@type,' in'), @devType,null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@inpTag, concat('On/Off ',@desc,@type,' in'),'DI',null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@outTag, concat('On/Off ',@desc,@type,' in'),'DO',null,'Y');
select 'digital input' from dual
insert into digital_input ( tag_id, scan_int, scan_offset, current_scan, hist_type_code, value_view) select id, 1, 0, 0, 'N', 'off_on_vw' from tag where name = @inpTag;
select 'digital output' from dual
insert into digital_output(tag_id, hist_type_code, is_new, value_view) select id, 'N', 0, 'off_on_vw' from tag where name=@outTag;
select 'rel_tag_tag' from dual
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@tank and t1.name=@device;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@inpTag;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@outTag;
select 'sim_io' from dual
insert into sim_io(id,in_id) select t.id, t1.id from tag t join tag t1 where t.name=@outTag and t1.name=@inpTag;


