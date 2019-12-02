# -*- coding: utf-8 -*-

'''
Created on Nov 21, 2018
Modified Sep 21, 2019 to re-order constraint fields

See LoadDB.py for a full explanation of all this stuff, though the queries used
to actually generate the csv files are provided here.

@author: Allan
'''
# import os, sysconfig
import MySQLdb

# Function definition is here

def addData( crsr, tbl, qry, hdr, prt ) :
    print ("Extracting {}".format(tbl))
    tblFile = open(tbl+".csv", "w")
    for item in hdr :
        tblFile.write(item+"\n")
    
    crsr.execute(qry)
    flds = crsr.description
    sep = ""
    for fld in flds:
        tblFile.write("{}{}".format(sep,fld[0]))
        sep = ","
    tblFile.write("\n")
    results = crsr.fetchall()
    if prt :
        print ( results )
    for row in results:
        sep = ""
        for item in row:
            if item == "None" :
                item = "NULL"
            tblFile.write("{}{}".format(sep,item))
            sep = ","
        tblFile.write("\n")
    tblFile.write("End")
    tblFile.close()
    return

config = {
  "user": "oms",
  "passwd": "omsx",
  "host": "127.0.0.1",
  "db": "oms",
  "use_unicode": True
}

cnx = MySQLdb.connect(**config)
crsr = cnx.cursor()

''' config '''
tbl = "config"
hdr = ("Table,"+format(tbl)+",,",
       "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
       "Data")
qry = ("select item_name, "
    "CASE "
    "WHEN item_name = 'EMAIL_FROM'  THEN 'email_from' "
    "WHEN item_name = 'EMAIL_PWD'  THEN 'email_pwd' "
    "WHEN item_name = 'EMAIL_USER' THEN 'email_user' "
    "WHEN item_name = 'SMTP_HOST' THEN 'smtp_host' "
    "WHEN item_name = 'SMTP_PORT' THEN 'smtp_port' "
    "WHEN item_name = 'WATCHDOG_EMAIL' then 'wd_email' "
    "ELSE item_value "
    "END item_value "
    "from config")

addData( crsr, tbl, qry, hdr, False )


''' watchdog '''
tbl = "watchdog"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "Data,,,")
qry = ("select name, active from watchdog")
addData( crsr, tbl, qry, hdr, False )


''' tag_type '''
tbl = "tag_type"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "Data,,,")
qry = ("select code, name, description, active from tag_type")
addData( crsr, tbl, qry, hdr, False )


''' unit_type '''
tbl = "unit_type"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "Data,,,")
qry = "select name, code from unit_type"
addData( crsr, tbl, qry, hdr, False )


''' unit '''
tbl = "unit"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "unit_type_id,unit_type,id,name",
        "Data,,,")
qry = ("select u.name, u.code, ut.name unit_type_id from unit u "
     "join unit_type ut on u.unit_type_id = ut.id")
addData( crsr, tbl, qry, hdr, True )


''' unit_conversion '''
tbl = "unit_conversion"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "from_id,unit,id,name",
        "to_id,unit,id,name",
        "Data,,,")
qry = ("select uf.name from_id, ut.name to_id, offset, factor from unit_conversion uc "
      "join unit uf on uc.from_id = uf.id "
     "join unit ut on uc.to_id = ut.id")
addData( crsr, tbl, qry, hdr, False )

''' alarm message '''
tbl = "alarm_message"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "Data,,,")
qry    = "select abbr, message from alarm_message am "
addData( crsr, tbl, qry, hdr, False )


''' alarm type '''
tbl = "alarm_type"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "alarm_msg_id,alarm_message,id,abbr",
        "Data,,,")
qry = ("select priority, am.abbr alarm_msg_id, code "
       "from alarm_type alt, alarm_message am "
       "where alt.alarm_msg_id = am.id")
addData( crsr, tbl, qry, hdr, False )


''' reference_code '''
tbl = "reference_code"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "Data,,,")
qry = "select category, name, code, value, description, active from reference_code"
addData( crsr, tbl, qry, hdr, False )


''' privilege '''
tbl = "privilege"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "Data,,,")
qry = "select name from privilege"
addData( crsr, tbl, qry, hdr, False )


''' webpage '''
tbl = "page"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "view_priv_id,privilege,id,name",
        "exec_priv_id,privilege,id,name",
        "Data,,,")
qry = ("select p.name, uri, pv.name view_priv_id, pa.name exec_priv_id, p.active "
       "from page p, privilege pv, privilege pa "
       "where p.view_priv_id = pv.id and p.exec_priv_id = pa.id")
addData( crsr, tbl, qry, hdr, False )


''' menuAdmin '''
tbl = "menu"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "page_id,page,id,name",
        "menu_type_id,reference_code,id,code",
        "Data,,,")
qry = ("select rc.code menu_type_id, m.text, m.order_no, m.active "
       "from menu m join reference_code rc on m.menu_type_id=rc.id "
       "where m.category_id is null")
tbl = "menuAdmin"
addData( crsr, tbl, qry, hdr, False )


''' menu '''
tbl = "menu"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "page,id,name,page_id",
        "menu_type_id,reference_code,id,code",
        "category_id,horizontal_menu_vw,id,text",
        "Data,,,")
qry = ("select rc.code menu_type_id, c.text category_id, m.text, m.order_no"
       ", m.active, p.name page_id "
       "from menu m left join menu c on m.category_id=c.id "
       "join reference_code rc on m.menu_type_id=rc.id "
       "join page p on m.page_id = p.id "
       "where m.category_id is not null")
addData( crsr, tbl, qry, hdr, False )


''' role '''
tbl = "role"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "Data,,,")
tbl = "roleParent"
qry = ("select r.name, r.active "
       "from role r where r.parent_id is null")
addData( crsr, tbl, qry, hdr, False )


''' role '''
tbl = "role"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "parent_id,role,id,name",
        "Data,,,")
qry = ("select r.name, rp.name parent_id, r.active "
       "from role r, role rp where r.parent_id = rp.id")
addData( crsr, tbl, qry, hdr, False )


''' role_priv '''
tbl = "role_priv"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "role_id,role,id,name",
        "priv_id,privilege,id,name",
        "Data,,,")
qry = ("select r.name role_id, p.name priv_id "
       "from role_priv rp, role r, privilege p "
       "where rp.role_id = r.id and rp.priv_id = p.id")
addData( crsr, tbl, qry, hdr, False )


''' user '''
tbl = "user"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "Data,,,")
qry = ("select alias, first_name, middle_name, last_name, email, password, state, status "
       "from user")
addData( crsr, tbl, qry, hdr, False )


''' user_role '''
tbl = "user_role"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "user_id,user,id,alias",
        "role_id,role,id,name",
        "Data,,,")
qry = ("select u.alias user_id, r.name role_id "
       "from user_role ur join user u on ur.user_id = u.id "
       "join role r on ur.role_id = r.id")
addData( crsr, tbl, qry, hdr, False )


''' customer '''
tbl = "customer"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "Data,,,")
qry    = "select name, active, etherkey from customer "
addData( crsr, tbl, qry, hdr, False )


''' AI tags '''
tbl = "AItag"
hdr = ( "Table,tag,,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "Data,,,")
qry = ("select name, description, tag_type_code, misc, c1_lat, c1_long, c2_lat, c2_long, active "
       "from tag where tag_type_code = 'AI'")
addData( crsr, tbl, qry, hdr, False )


''' AO tags '''
tbl = "AOtag"
hdr = ( "Table,tag,,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "Data,,,")
qry = ("select name, description, tag_type_code, misc, c1_lat, c1_long, c2_lat, c2_long, active "
       "from tag where tag_type_code = 'AO'")
addData( crsr, tbl, qry, hdr, False )


''' DI tags '''
tbl = "DItag"
hdr = ( "Table,tag,,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "Data,,,")
qry = ("select name, description, tag_type_code, misc, c1_lat, c1_long, c2_lat, c2_long, active "
       "from tag where tag_type_code = 'DI'")
addData( crsr, tbl, qry, hdr, False )


''' DO tags '''
tbl = "DOtag"
hdr = ( "Table,tag,,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "Data,,,")
qry = ("select name, description, tag_type_code, misc, c1_lat, c1_long, c2_lat, c2_long, active "
       "from tag where tag_type_code = 'DO'")
addData( crsr, tbl, qry, hdr, False )


''' Calc tags '''
tbl = "CalcTag"
hdr = ( "Table,tag,,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "Data,,,")
qry = ("select name, description, tag_type_code, misc, c1_lat, c1_long, c2_lat, c2_long, active "
       "from tag where tag_type_code = 'C'")
addData( crsr, tbl, qry, hdr, False )


''' CB tags '''
tbl = "CBtag"
hdr = ( "Table,tag,,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "Data,,,")
qry = ("select name, description, tag_type_code, misc, c1_lat, c1_long, c2_lat, c2_long, active "
       "from tag where tag_type_code = 'CB'")
addData( crsr, tbl, qry, hdr, False )


''' Everything else tags '''
tbl = "tag"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "Data,,,")
qry = ("select name, description, tag_type_code, misc, c1_lat, c1_long, c2_lat, c2_long, active "
       "from tag where tag_type_code not in ('AI','AO','DI','DO','C','CB')")
addData( crsr, tbl, qry, hdr, False )


''' rel-tag_tag '''
tbl = "rel_tag_tag"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "parent_tag_id,tag,id,name,tag,tag_type_code,tag_type_code",
        "child_tag_id,tag,id,name,tag,tag_type_code,tag_type_code",
        "Data,,,")
qry = ("select concat(tp.name,'|',tp.tag_type_code) parent_tag_id"
            ", concat(tc.name,'|',tc.tag_type_code) child_tag_id, rtt.code "
       "from rel_tag_tag rtt, tag tp, tag tc "
       "where rtt.parent_tag_id=tp.id and rtt.child_tag_id = tc.id")
addData( crsr, tbl, qry, hdr, False )


''' field '''
tbl = "field"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "id,tag,id,name",
        "Data,,,")
qry = ("select t.name id, road_image, satellite_image "
       "from field f, tag t where f.id = t.id")
addData( crsr, tbl, qry, hdr, False )


''' hot_spot (link) '''
tbl = "hot_spot"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "field_id,tag,id,name",
        "Data,,,")
qry = ("select t.name field_id, c1Lat, c1Long, c2Lat, c2Long, page_id, hs.active "
       "from hot_spot hs, tag t where hs.field_id = t.id")
addData( crsr, tbl, qry, hdr, False )


''' vertex (end points of pipes) '''
tbl = "vertex"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "tag_id,tag,id,name,tag,tag_type_code,tag_type_code",
        "Data,,,")
qry = ("select concat(t.name,'|',t.tag_type_code) tag_id, seq_no, latitude, longitude "
       "from vertex v, tag t where v.tag_id = t.id")
addData( crsr, tbl, qry, hdr, False )


''' analog input '''
tbl = "analog_input"
hdr = ( "Table,"+tbl+",,,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "tag_id,tag,id,name,tag,tag_type_code,tag_type_code",
        "unit,id,name,unit_id",
        "Data,,,")
qry = ("select concat(t.name,'|',t.tag_type_code) tag_id, u.name unit_id, analog_type_code"
       ", scan_int, scan_offset"
       ", zero_value, max_value, hist_type_code, percent, hh, hi, ll, lo "
       "from analog_input ai join tag t on ai.tag_id = t.id "
       "join unit u on ai.unit_id = u.id")
addData( crsr, tbl, qry, hdr, False )


''' analog output '''
tbl = "analog_output"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "tag_id,tag,id,name,tag,tag_type_code,tag_type_code",
        "Data,,,")
qry = ("select concat(t.name,'|',t.tag_type_code) tag_id, zero_value, max_value, hist_type_code "
       "from analog_output ao join tag t on ao.tag_id = t.id")
addData( crsr, tbl, qry, hdr, False )


''' digital input '''
tbl = "digital_input"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "tag_id,tag,id,name,tag,tag_type_code,tag_type_code",
        "Data,,,")
qry = ("select concat(t.name,'|',t.tag_type_code) tag_id, scan_int, scan_offset"
       ", alarm_code, alarm_state, value_view "
       "from digital_input di join tag t on di.tag_id = t.id")
addData( crsr, tbl, qry, hdr, False )


''' digital output '''
tbl = "digital_output"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "tag_id,tag,id,name,tag,tag_type_code,tag_type_code",
        "Data,,,")
qry = ("select concat(t.name,'|',t.tag_type_code) tag_id, value_view "
       "from digital_output od join tag t on od.tag_id = t.id")
addData( crsr, tbl, qry, hdr, False )


''' calculated '''
tbl = "calculated"
hdr = ( "Table,"+tbl+",,,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "id,tag,id,name,,,",
        "output_tag_id,tag,id,name,,,,",
        "Data,,,")
qry = ("select tc.name id, c.definition, tx.name output_tag_id "
       "from calculated c join tag tc on c.id = tc.id "
       "join tag tx on c.output_tag_id = tx.id")
addData( crsr, tbl, qry, hdr, False )


''' device '''
tbl = "device"
hdr = ( "Table,"+tbl+",,,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "Data,,,")
qry = ("select description, type, model, param1, param2, param3"
       ", param4, cycle_time, offset, active "
       "from device")
addData( crsr, tbl, qry, hdr, False )


''' address '''
tbl = "address"
hdr = ( "Table,"+tbl+",,,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "device_id,device,id,type,device,model,model",
        "Data,,,")
qry = ("select a.id, concat(d.type,'|',d.model) device_id, a.cycle_time, a.offset, "
       "a.iaddr1, a.iaddr2, a.iaddr3, a.iaddr4, a.iaddr5, a.iaddr6, "
       "a.saddr1, a.saddr2, a.saddr3, a.saddr4, a.saddr5, a.saddr6 "
       "from address a join device d on a.device_id=d.id ")
addData(crsr, tbl, qry, hdr, False )


''' control block '''
tbl = "control_block"
hdr = ( "Table,"+tbl+",,,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "id,tag,id,name,tag,tag_type_code,tag_type_code",
        "pv_id,tag,id,name,tag,tag_type_code,tag_type_code",
        "sp_id,tag,id,name,tag,tag_type_code,tag_type_code",
        "Data,,,")
qry = ("select concat(tc.name,'|',tc.tag_type_code) id"
       ", concat(tx.name,'|',tx.tag_type_code) pv_id"
       ", concat(ts.name,'|',ts.tag_type_code) sp_id "
       "from control_block cb join tag tc on cb.id = tc.id "
       "join tag tx on cb.pv_id = tx.id "
       "left outer join tag ts on ts.id = cb.sp_id")
addData( crsr, tbl, qry, hdr, False )


''' tank '''
tbl = "tank"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "id,tag,id,name,tag,tag_type_code,tag_type_code",
        "Data,,,")
qry = ("select concat(t.name,'|',t.tag_type_code) id, api, density, height, diameter, units, content_type_code "
       "from tank tk join tag t on tk.id = t.id")
addData( crsr, tbl, qry, hdr, False )


''' volume (for tank) '''
tbl = "volume"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "tank_id,tag,id,name,tag,tag_type_code,tag_type_code",
        "Data,,,")
qry = ("select concat(t.name,'|',t.tag_type_code) tank_id, level, volume "
       "from volume v, tag t where v.tank_id = t.id")
addData( crsr, tbl, qry, hdr, False )


''' transfer '''
tbl = "transfer"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "tag_id,tag,id,name,tag,tag_type_code,tag_type_code",
        "source_id,tag,id,name,tag,tag_type_code,tag_type_code",
        "destination_id,tag,id,name,tag,tag_type_code,tag_type_code",
        "status_id,transfer_status_vw,value,name",
        "transfer_type_id,transfer_type_vw,value,name",
        "Data,,,")
qry    = ("select x.name, tsv.name status_id, ttv.name transfer_type_id"
          ", concat(tt.name,'|',tt.tag_type_code) tag_id"
          ", concat(ts.name,'|',ts.tag_type_code) source_id"
          ", concat(td.name,'|',td.tag_type_code) destination_id"
          ", exp_start_time, exp_end_time, exp_volume"
          ", act_start_time, act_end_time, act_volume "
          "from transfer x join tag ts on x.source_id = ts.id " 
          "join tag td on x.destination_id=td.id "
          "join tag tt on x.tag_id=tt.id "
          "join transfer_status_vw tsv on x.status_id = tsv.value "
          "join transfer_type_vw ttv on x.transfer_type_id = ttv.value" )
addData( crsr, tbl, qry, hdr, False )


''' xfer '''
tbl = "xfer"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "Data,,,")
qry    = "select x.id from xfer x"
addData( crsr, tbl, qry, hdr, False )

''' carriers loaded as Tags '''
''' hold '''
tbl = "hold"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "carrier_id,tag,id,name,tag,tag_type_code,tag_type_code",
        "Data,,,")
qry = ( "select concat(t.name,'|',t.tag_type_code) carrier_id, hold_no, volume, no_duplicates "
        "from hold h join tag t on h.carrier_id = t.id" )
addData( crsr, tbl, qry, hdr, False )


''' plot_group '''
tbl = "plot_group"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "id1,tag,id,name,tag,tag_type_code,tag_type_code",
        "id2,tag,id,name,tag,tag_type_code,tag_type_code",
        "id3,tag,id,name,tag,tag_type_code,tag_type_code",
        "id4,tag,id,name,tag,tag_type_code,tag_type_code",
        "Data,,,")
qry = ( "select pg.id, pg.name"
        ", concat(t1.name,'|',t1.tag_type_code) id1"
        ", concat(t2.name,'|',t2.tag_type_code) id2"
        ", concat(t3.name,'|',t3.tag_type_code) id3"
        ", concat(t4.name,'|',t4.tag_type_code) id4, pg.active "
        "from plot_group pg join tag t1 on pg.id1=t1.id "
        "join tag t2 on pg.id2=t2.id join tag t3 on pg.id3=t3.id "
        "join tag t4 on pg.id4=t4.id")
addData( crsr, tbl, qry, hdr, False )


''' sim_IO '''
tbl = "sim_io"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "id,tag,id,name,tag,tag_type_code,tag_type_code",
        "in_id,tag,id,name,tag,tag_type_code,tag_type_code",
        "Data,,,")
qry = ( "select concat(t1.name,'|',t1.tag_type_code) id"
        ", concat(t2.name,'|',t2.tag_type_code) in_id from sim_io sio "
        "join tag t1 on sio.id=t1.id join tag t2 on sio.in_id=t2.id")
addData( crsr, tbl, qry, hdr, False )

''' These are ACTIVE data files, not configuration and are best not backed up here '''

''' alarm '''
tbl = "alarm"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "alarm_type_id,alarm_type,id,code,,,,",
        "tag_type_id,tag_type,id,code,,,,",
        "tag_id,tag,id,name,tag_type,code,tag_type_code",
        "alarm_msg_id,alarm_message,id,abbr,,,,",
        "Data,,,")
qry = ( "select at.code alarm_type_id, tt.code tag_type_id"
        ", concat(t.name,'|',t.tag_type_code) tag_id, alm_occurred, "
        "acknowledged, a.active, am.abbr alarm_msg_id, a.create_dt "
        "from alarm a join alarm_type at on a.alarm_type_id=at.id "
        "join tag t on a.tag_id = t.id "
        "join alarm_message am on a.alarm_msg_id=am.id "
        "join tag_type tt on a.tag_type_id = tt.id "  )
''' addData( crsr, tbl, qry, hdr, False ) '''


''' history '''
tbl = "history"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "tag_id,tag,id,name,tag,tag_type_code,tag_type_code",
        "Data,,,")
qry = ( "select id, concat(t.name,'|',t.tag_type_code) tag_id"
        ", scan_value, scan_time, h.create_dt "
        "from history h join tag t on h.tag_id = t.id " )
''' addData( crsr, tbl, qry, hdr, False ) '''


''' shipment '''
tbl = "shipment"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "customer_id,customer,id,name",
        "carrier_id,tag,id,name,tag,tag_type_code,tag_type_code"
        "Data,,,")
qry = ( "select c.name customer_id, concat(t.name,'|',t.tag_type_code) carrier_id"
        ", purchase, exp_date, act_date, s.create_dt "
        "from shipment s join customer c on s.customer_id = c.id "
        "join tag t on s.carrier_id = t.id " )
''' addData( crsr, tbl, qry, hdr, False ) '''


''' shipment_item '''
tbl = "shipment_item"
hdr = ( "Table,"+tbl+",,",
        "ColumnConstrained,ConstraintTable,ConstraintField,ConstraintEquivalence,2ndTable,2ndField,2ndEquivalence",
        "Data,,,")
qry = ( "select si.shipment_id, si.item_no, si.active, si.content_cd, "
        "si.exp_volume_min, si.exp_volume_max, si.act_volume, si.create_dt "
        "from shipment_item si " )
''' addData( crsr, tbl, qry, hdr, False ) '''




crsr.close()
cnx.close()