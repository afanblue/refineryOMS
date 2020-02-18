# -*- coding: utf-8 -*-

'''
Created on Nov 21, 2018

@module: 
@author: Allan

Description: 
'''
import sys
import re
import mariadb

config = {
  "user": "oms",
  "password": "omsx",
  "host": "127.0.0.1",
  "database": "oms",
  "charset": "UTF-8"
}

cnx = mariadb.connect(**config)
crsr = cnx.cursor()

args = sys.argv

qry = ( "select t.name, ctv.name contents from tag t "
        "join tank tk on t.id=tk.id "
        "join content_type_vw ctv on ctv.code=tk.content_type_code "
        "where t.name like '" + args[1] + "' and t.tag_type_code='TK'")
print( "-- " + qry + "\n" )
crsr.execute(qry)
results = crsr.fetchall()
for row in results:
    tank = row[0]
    contents = row[1]
    num = tank[len(tank)-2:]
    
    print("set @tank='"+tank+"';\n")
    print("set @devType='V';")
    print("set @dir='INL';")
    print("set @type='valve';")

    print("set @device='"+tank+"-Vi';")
    print("set @inpTag='"+tank+"-ViDI';")
    print("set @outTag='"+tank+"-ViDO';")
    print("set @desc='"+contents+" Tk "+num+"';\n")
    
    print("select 'tag' from dual;")
    print("insert into tag(name, description, tag_type_code, misc, active) values(@device, concat(@desc,' ',@type,' in'), @devType,null,'Y');")

    print("insert into tag(name, description, tag_type_code, misc, active) values(@inpTag, concat('On/Off ',@desc,@type,' in'),'DI',null,'Y');")
    print("insert into tag(name, description, tag_type_code, misc, active) values(@outTag, concat('On/Off ',@desc,@type,' in'),'DO',null,'Y');")

    print("select 'digital input' from dual;")
    print("insert into digital_input ( tag_id, scan_int, scan_offset, current_scan, hist_type_code, value_view) select id, 1, 0, 0, 'N', 'off_on_vw' from tag where name = @inpTag;")

    print("select 'digital output' from dual;")
    print("insert into digital_output(tag_id, hist_type_code, is_new, value_view) select id, 'N', 0, 'off_on_vw' from tag where name=@outTag;")

    print("select 'rel_tag_tag' from dual;")
    print("insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@tank and t1.name=@device;")
    print("insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@inpTag;")
    print("insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@outTag;")

    print("select 'sim_io' from dual;")
    print("insert into sim_io(id,in_id) select t.id, t1.id from tag t join tag t1 where t.name=@outTag and t1.name=@inpTag;")

    print("set @dir='OUTL';")
    print("set @device='"+tank+"-Vo';")
    print("set @inpTag='"+tank+"-VoDI';")
    print("set @outTag='"+tank+"-VoDO';")

    print("select 'tag' from dual;")
    print("insert into tag(name, description, tag_type_code, misc, active) values(@device, concat(@desc,' ',@type,' in'), @devType,null,'Y');")

    print("insert into tag(name, description, tag_type_code, misc, active) values(@inpTag, concat('On/Off ',@desc,@type,' in'),'DI',null,'Y');")
    print("insert into tag(name, description, tag_type_code, misc, active) values(@outTag, concat('On/Off ',@desc,@type,' in'),'DO',null,'Y');")

    print("select 'digital input' from dual;")
    print("insert into digital_input ( tag_id, scan_int, scan_offset, current_scan, hist_type_code, value_view) select id, 1, 0, 0, 'N', 'off_on_vw' from tag where name = @inpTag;")

    print("select 'digital output' from dual;")
    print("insert into digital_output(tag_id, hist_type_code, is_new, value_view) select id, 'N', 0, 'off_on_vw' from tag where name=@outTag;")

    print("select 'rel_tag_tag' from dual;")
    print("insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@tank and t1.name=@device;")
    print("insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@inpTag;")
    print("insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@outTag;")

    print("select 'sim_io' from dual;")
    print("insert into sim_io(id,in_id) select t.id, t1.id from tag t join tag t1 where t.name=@outTag and t1.name=@inpTag;")

    print("set @devType='PMP';")
    print("set @dir='OUTL';")
    print("set @type='pump';")
    print("set @device='"+tank+"-Pmp';")
    print("set @inpTag='"+tank+"-PoDI';")
    print("set @outTag='"+tank+"-PoDO';")

    print("select 'tag' from dual;")
    print("insert into tag(name, description, tag_type_code, misc, active) values(@device, concat(@desc,' ',@type,' in'), @devType,null,'Y');")

    print("insert into tag(name, description, tag_type_code, misc, active) values(@inpTag, concat('On/Off ',@desc,@type,' in'),'DI',null,'Y');")
    print("insert into tag(name, description, tag_type_code, misc, active) values(@outTag, concat('On/Off ',@desc,@type,' in'),'DO',null,'Y');")

    print("select 'digital input' from dual;")
    print("insert into digital_input ( tag_id, scan_int, scan_offset, current_scan, hist_type_code, value_view) select id, 1, 0, 0, 'N', 'off_on_vw' from tag where name = @inpTag;")

    print("select 'digital output' from dual;")
    print("insert into digital_output(tag_id, hist_type_code, is_new, value_view) select id, 'N', 0, 'off_on_vw' from tag where name=@outTag;")

    print("select 'rel_tag_tag' from dual;")
    print("insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@tank and t1.name=@device;")
    print("insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@inpTag;")
    print("insert into rel_tag_tag(parent_tag_id, child_tag_id,code) select t.id, t1.id, @dir from tag t join tag t1 where t.name=@device and t1.name=@outTag;")

    print("select 'sim_io' from dual;")
    print("insert into sim_io(id,in_id) select t.id, t1.id from tag t join tag t1 where t.name=@outTag and t1.name=@inpTag;")
    
    print("\n")

