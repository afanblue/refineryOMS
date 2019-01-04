set @tank='CT01';

set @devType='V';
set @dir='INL';
set @type='valve';

set @device='CT01-Vi';
set @inpTag='CT01-ViDI';
set @outTag='CT01-ViDO';
set @desc='Crude Tk 1';

-- tag
insert into tag(name, description, tag_type_code, misc, active) values(@device, concat(@desc,' ',@type,' in'), @devType,null,'Y');

insert into tag(name, description, tag_type_code, misc, active) values(@inpTag, concat('On/Off ',@desc,@type,' in'),'DI',null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@outTag, concat('On/Off ',@desc,@type,' in'),'DO',null,'Y');

-- digital input
insert into digital_input ( tag_id, scan_int, scan_offset, current_scan, hist_type_code, value_view) select id, 1, 0, 0, 'N', 'off_on_vw' from tag where name = @inpTag;

-- digital output
insert into digital_output(tag_id, hist_type_code, is_new, value_view) select id, 'N', 0, 'off_on_vw' from tag where name=@outTag;

-- rel_tag_tag
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@tank and t1.name=@device;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@inpTag;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@outTag;

-- sim_io
insert into sim_io(id,in_id) select t.id, t1.id from tag t join tag t1 where t.name=@outTag and t1.name=@inpTag;

set @dir='OUTL';
set @device='CT01-Vo';
set @inpTag='CT01-VoDI';
set @outTag='CT01-VoDO';

-- tag
insert into tag(name, description, tag_type_code, misc, active) values(@device, concat(@desc,' ',@type,' in'), @devType,null,'Y');

insert into tag(name, description, tag_type_code, misc, active) values(@inpTag, concat('On/Off ',@desc,@type,' in'),'DI',null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@outTag, concat('On/Off ',@desc,@type,' in'),'DO',null,'Y');

-- digital input
insert into digital_input ( tag_id, scan_int, scan_offset, current_scan, hist_type_code, value_view) select id, 1, 0, 0, 'N', 'off_on_vw' from tag where name = @inpTag;

-- digital output
insert into digital_output(tag_id, hist_type_code, is_new, value_view) select id, 'N', 0, 'off_on_vw' from tag where name=@outTag;

-- rel_tag_tag
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@tank and t1.name=@device;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@inpTag;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@outTag;

-- sim_io
insert into sim_io(id,in_id) select t.id, t1.id from tag t join tag t1 where t.name=@outTag and t1.name=@inpTag;

set @devType='PMP';
set @dir='OUTL';
set @type='pump';
set @device='CT01-Pmp';
set @inpTag='CT01-PoDI';
set @outTag='CT01-PoDO';

-- tag
insert into tag(name, description, tag_type_code, misc, active) values(@device, concat(@desc,' ',@type,' in'), @devType,null,'Y');

insert into tag(name, description, tag_type_code, misc, active) values(@inpTag, concat('On/Off ',@desc,@type,' in'),'DI',null,'Y');
insert into tag(name, description, tag_type_code, misc, active) values(@outTag, concat('On/Off ',@desc,@type,' in'),'DO',null,'Y');

-- digital input
insert into digital_input ( tag_id, scan_int, scan_offset, current_scan, hist_type_code, value_view) select id, 1, 0, 0, 'N', 'off_on_vw' from tag where name = @inpTag;

-- digital output
insert into digital_output(tag_id, hist_type_code, is_new, value_view) select id, 'N', 0, 'off_on_vw' from tag where name=@outTag;

-- rel_tag_tag
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@tank and t1.name=@device;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@inpTag;
insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@outTag;

-- sim_io
insert into sim_io(id,in_id) select t.id, t1.id from tag t join tag t1 where t.name=@outTag and t1.name=@inpTag;
