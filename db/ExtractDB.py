# -*- coding: utf-8 -*-

'''
Created on Nov 21, 2018

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
       "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
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
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "Data,,,")
qry = ("select name, active from watchdog")
addData( crsr, tbl, qry, hdr, False )


''' tag_type '''
tbl = "tag_type"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "Data,,,")
qry = ("select code, name, description, active from tag_type")
addData( crsr, tbl, qry, hdr, False )


''' unit_type '''
tbl = "unit_type"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "Data,,,")
qry = "select name, code from unit_type"
addData( crsr, tbl, qry, hdr, False )


''' unit '''
tbl = "unit"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "unit_type,id,name,unit_type_id",
        "Data,,,")
qry = ("select u.name, u.code, ut.name unit_type_id from unit u "
     "join unit_type ut on u.unit_type_id = ut.id")
addData( crsr, tbl, qry, hdr, True )


''' unit_conversion '''
tbl = "unit_conversion"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "unit,id,name,from_id",
        "unit,id,name,to_id",
        "Data,,,")
qry = ("select uf.name from_id, ut.name to_id, offset, factor from unit_conversion uc "
      "join unit uf on uc.from_id = uf.id "
     "join unit ut on uc.to_id = ut.id")
addData( crsr, tbl, qry, hdr, False )

''' alarm message '''
tbl = "alarm_message"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "Data,,,")
qry    = "select abbr, message from alarm_message am "
addData( crsr, tbl, qry, hdr, False )


''' alarm type '''
tbl = "alarm_type"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "alarm_message,id,abbr,alarm_msg_id",
        "Data,,,")
qry = ("select priority, am.abbr alarm_msg_id, code "
       "from alarm_type alt, alarm_message am "
       "where alt.alarm_msg_id = am.id")
addData( crsr, tbl, qry, hdr, False )


''' reference_code '''
tbl = "reference_code"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "Data,,,")
qry = "select category, name, code, value, description, active from reference_code"
addData( crsr, tbl, qry, hdr, False )


''' privilege '''
tbl = "privilege"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "Data,,,")
qry = "select name from privilege"
addData( crsr, tbl, qry, hdr, False )


''' webpage '''
tbl = "page"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "privilege,id,name,view_priv_id",
        "privilege,id,name,exec_priv_id",
        "Data,,,")
qry = ("select p.name, uri, pv.name view_priv_id, pa.name exec_priv_id, p.active "
       "from page p, privilege pv, privilege pa "
       "where p.view_priv_id = pv.id and p.exec_priv_id = pa.id")
addData( crsr, tbl, qry, hdr, False )


''' menuAdmin '''
tbl = "menu"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "page,id,name,page_id",
        "menu_type_vw,id,code,menu_type_id",
        "Data,,,")
qry = ("select rc.code menu_type_id, m.text, m.order_no, m.active "
       "from menu m join reference_code rc on m.menu_type_id=rc.id "
       "where m.category_id is null")
tbl = "menuAdmin"
addData( crsr, tbl, qry, hdr, False )


''' menu '''
tbl = "menu"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "page,id,name,page_id",
        "menu_type_vw,id,code,menu_type_id",
        "horizontal_menu_vw,id,text,category_id",
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
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "Data,,,")
tbl = "roleParent"
qry = ("select r.name, r.active "
       "from role r where r.parent_id is null")
addData( crsr, tbl, qry, hdr, False )


''' role '''
tbl = "role"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "role,id,name,parent_id",
        "Data,,,")
qry = ("select r.name, rp.name parent_id, r.active "
       "from role r, role rp where r.parent_id = rp.id")
addData( crsr, tbl, qry, hdr, False )


''' role_priv '''
tbl = "role_priv"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "role,id,name,role_id",
        "privilege,id,name,priv_id",
        "Data,,,")
qry = ("select r.name role_id, p.name priv_id "
       "from role_priv rp, role r, privilege p "
       "where rp.role_id = r.id and rp.priv_id = p.id")
addData( crsr, tbl, qry, hdr, False )


''' user '''
tbl = "user"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "Data,,,")
qry = ("select alias, first_name, middle_name, last_name, email, password, state, status "
       "from user")
addData( crsr, tbl, qry, hdr, False )


''' user_role '''
tbl = "user_role"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "user,id,alias,user_id",
        "role,id,name,role_id",
        "Data,,,")
qry = ("select u.alias user_id, r.name role_id "
       "from user_role ur join user u on ur.user_id = u.id "
       "join role r on ur.role_id = r.id")
addData( crsr, tbl, qry, hdr, False )


''' customer '''
tbl = "customer"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "Data,,,")
qry    = "select name, active, etherkey from customer "
addData( crsr, tbl, qry, hdr, False )


''' AI tags '''
tbl = "AItag"
hdr = ( "Table,tag,,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "Data,,,")
qry = ("select name, description, tag_type_code, misc, c1_lat, c1_long, c2_lat, c2_long, active "
       "from tag where tag_type_code = 'AI'")
addData( crsr, tbl, qry, hdr, False )


''' AO tags '''
tbl = "AOtag"
hdr = ( "Table,tag,,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "Data,,,")
qry = ("select name, description, tag_type_code, misc, c1_lat, c1_long, c2_lat, c2_long, active "
       "from tag where tag_type_code = 'AO'")
addData( crsr, tbl, qry, hdr, False )


''' DI tags '''
tbl = "DItag"
hdr = ( "Table,tag,,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "Data,,,")
qry = ("select name, description, tag_type_code, misc, c1_lat, c1_long, c2_lat, c2_long, active "
       "from tag where tag_type_code = 'DI'")
addData( crsr, tbl, qry, hdr, False )


''' DO tags '''
tbl = "DOtag"
hdr = ( "Table,tag,,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "Data,,,")
qry = ("select name, description, tag_type_code, misc, c1_lat, c1_long, c2_lat, c2_long, active "
       "from tag where tag_type_code = 'DO'")
addData( crsr, tbl, qry, hdr, False )


''' Calc tags '''
tbl = "CalcTag"
hdr = ( "Table,tag,,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "Data,,,")
qry = ("select name, description, tag_type_code, misc, c1_lat, c1_long, c2_lat, c2_long, active "
       "from tag where tag_type_code = 'C'")
addData( crsr, tbl, qry, hdr, False )


''' CB tags '''
tbl = "CBtag"
hdr = ( "Table,tag,,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "Data,,,")
qry = ("select name, description, tag_type_code, misc, c1_lat, c1_long, c2_lat, c2_long, active "
       "from tag where tag_type_code = 'CB'")
addData( crsr, tbl, qry, hdr, False )


''' Everything else tags '''
tbl = "tag"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "Data,,,")
qry = ("select name, description, tag_type_code, misc, c1_lat, c1_long, c2_lat, c2_long, active "
       "from tag where tag_type_code not in ('AI','AO','DI','DO','C','CB')")
addData( crsr, tbl, qry, hdr, False )


''' rel-tag_tag '''
tbl = "rel_tag_tag"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "tag,id,name,parent_tag_id",
        "tag,id,name,child_tag_id",
        "Data,,,")
qry = ("select tp.name parent_tag_id, tc.name child_tag_id, code "
       "from rel_tag_tag rtt, tag tp, tag tc "
       "where rtt.parent_tag_id=tp.id and rtt.child_tag_id = tc.id")
addData( crsr, tbl, qry, hdr, False )


''' field '''
tbl = "field"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "tag,id,name,id",
        "Data,,,")
qry = ("select t.name id, road_image, satellite_image "
       "from field f, tag t where f.id = t.id")
addData( crsr, tbl, qry, hdr, False )


''' hot_spot (link) '''
tbl = "hot_spot"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "tag,id,name,field_id",
        "Data,,,")
qry = ("select t.name field_id, c1Lat, c1Long, c2Lat, c2Long, page_id, hs.active "
       "from hot_spot hs, tag t where hs.field_id = t.id")
addData( crsr, tbl, qry, hdr, False )


''' vertex (end points of pipes) '''
tbl = "vertex"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "tag,id,name,tag_id",
        "Data,,,")
qry = ("select t.name tag_id, seq_no, latitude, longitude "
       "from vertex v, tag t where v.tag_id = t.id")
addData( crsr, tbl, qry, hdr, False )


''' analog input '''
tbl = "analog_input"
hdr = ( "Table,"+tbl+",,,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "tag,id,name,tag_id",
        "unit,id,name,unit_id",
        "Data,,,")
qry = ("select t.name tag_id, u.name unit_id, analog_type_code, scan_int, scan_offset"
       ", zero_value, max_value, hist_type_code, percent, hh, hi, ll, lo "
       "from analog_input ai join tag t on ai.tag_id = t.id "
       "join unit u on ai.unit_id = u.id")
addData( crsr, tbl, qry, hdr, False )


''' analog output '''
tbl = "analog_output"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "tag,id,name,tag_id",
        "Data,,,")
qry = ("select t.name tag_id, zero_value, max_value, hist_type_code "
       "from analog_output ao join tag t on ao.tag_id = t.id")
addData( crsr, tbl, qry, hdr, False )


''' digital input '''
tbl = "digital_input"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "tag,id,name,tag_id",
        "Data,,,")
qry = ("select t.name tag_id, scan_int, scan_offset, alarm_code, alarm_state, value_view "
       "from digital_input di join tag t on di.tag_id = t.id")
addData( crsr, tbl, qry, hdr, False )


''' digital output '''
tbl = "digital_output"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "tag,id,name,tag_id",
        "Data,,,")
qry = ("select t.name tag_id, value_view "
       "from digital_output od join tag t on od.tag_id = t.id")
addData( crsr, tbl, qry, hdr, False )


''' calculated '''
tbl = "calculated"
hdr = ( "Table,"+tbl+",,,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "tag,id,name,id",
        "tag,id,name,output_tag_id",
        "Data,,,")
qry = ("select tc.name id, c.definition, tx.name output_tag_id "
       "from calculated c join tag tc on c.id = tc.id "
       "join tag tx on c.output_tag_id = tx.id")
addData( crsr, tbl, qry, hdr, False )


''' control block '''
tbl = "control_block"
hdr = ( "Table,"+tbl+",,,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "tag,id,name,id",
        "tag,id,name,tag_id",
        "Data,,,")
qry = ("select tc.name id, tx.name pv_id, ts.name sp_id "
       "from control_block cb join tag tc on cb.id = tc.id "
       "join tag tx on cb.pv_id = tx.id "
       "left outer join tag ts on ts.id = cb.sp_id")
addData( crsr, tbl, qry, hdr, False )


''' tank '''
tbl = "tank"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "tag,id,name,id",
        "Data,,,")
qry = ("select t.name id, api, density, height, diameter, units, content_type_code "
       "from tank tk join tag t on tk.id = t.id")
addData( crsr, tbl, qry, hdr, False )


''' volume (for tank) '''
tbl = "volume"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "tag,id,name,tank_id",
        "Data,,,")
qry = ("select t.name tank_id, level, volume "
       "from volume v, tag t where v.tank_id = t.id")
addData( crsr, tbl, qry, hdr, False )


''' transfer '''
tbl = "transfer"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "tag,id,name,source_id",
        "tag,id,name,destination_id",
        "transfer_status_vw,id,name,status_id",
        "transfer_type_vw,id,name,transfer_type_id",
        "Data,,,")
qry    = ("select x.name, tsv.name status_id, ttv.name transfer_type_id, "
          "ts.name source_id, td.name destination_id, "
          "exp_start_time, exp_end_time, exp_volume, "
          "act_start_time, act_end_time, act_volume "
          "from transfer x join tag ts on x.source_id = ts.id "
          "join tag td on x.destination_id=td.id "
          "join transfer_status_vw tsv on x.status_id = tsv.id "
          "join transfer_type_vw ttv on x.transfer_type_id = ttv.id" )
addData( crsr, tbl, qry, hdr, False )


''' xfer '''
tbl = "xfer"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "Data,,,")
qry    = "select x.id from xfer x"
addData( crsr, tbl, qry, hdr, False )

''' hold '''
tbl = "hold"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "tag,id,name,carrier_id",
        "Data,,,")
qry = ( "select t.name carrier_id, hold_no, volume, no_duplicates "
        "from hold h join tag t on h.carrier_id = t.id" )
addData( crsr, tbl, qry, hdr, False )


''' plot_group '''
tbl = "plot_group"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "tag,id,name,id1",
        "tag,id,name,id2",
        "tag,id,name,id3",
        "tag,id,name,id4",
        "Data,,,")
qry = ( "select pg.id, pg.name, t1.name id1, t2.name id2, t3.name id3, t4.name id4, pg.active "
        "from plot_group pg join tag t1 on pg.id1=t1.id "
        "join tag t2 on pg.id2=t2.id join tag t3 on pg.id3=t3.id "
        "join tag t4 on pg.id4=t4.id")
addData( crsr, tbl, qry, hdr, False )


''' sim_IO '''
tbl = "sim_io"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "tag,id,name,id",
        "tag,id,name,in_id",
        "Data,,,")
qry = ( "select t1.name id, t2.name in_id from sim_io sio "
        "join tag t1 on sio.id=t1.id join tag t2 on sio.in_id=t2.id")
addData( crsr, tbl, qry, hdr, False )

''' These are ACTIVE data files, not configuration and are best not backed up here '''

''' alarm '''
tbl = "alarm"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "alarm_type,id,code,alarm_type_id",
        "tag_type,id,code,tag_type_id",
        "tag,id,name,tag_id",
        "alarm_message,id,abbr,alarm_msg_id",
        "Data,,,")
qry = ( "select at.code alarm_type_id, tt.code tag_type_id, t.name tag_id, alm_occurred, "
        "acknowledged, a.active, am.abbr alarm_msg_id, a.create_dt "
        "from alarm a join alarm_type at on a.alarm_type_id=at.id "
        "join tag t on a.tag_id = t.id "
        "join alarm_message am on a.alarm_msg_id=am.id "
        "join tag_type tt on a.tag_type_id = tt.id "  )
''' addData( crsr, tbl, qry, hdr, False ) '''


''' history '''
tbl = "history"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "tag,id,name,tag_id",
        "Data,,,")
qry = ( "select id, t.name tag_id, scan_value, scan_time, h.create_dt "
        "from history h join tag t on h.tag_id = t.id " )
''' addData( crsr, tbl, qry, hdr, False ) '''


''' shipment '''
tbl = "shipment"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "customer,id,name,customer_id",
        "tag,id,name,carrier_id"
        "Data,,,")
qry = ( "select c.name customer_id, t.name carrier_id, purchase, exp_date, act_date, s.create_dt "
        "from shipment s join customer c on s.customer_id = c.id "
        "join tag t on s.carrier_id = t.id " )
''' addData( crsr, tbl, qry, hdr, False ) '''


''' shipment_item '''
tbl = "shipment_item"
hdr = ( "Table,"+tbl+",,",
        "ConstraintTable,ConstraintField,ConstraintEquivalence,ColumnConstrained",
        "tag,id,name,tag_id",
        "Data,,,")
qry = ( "select si.shipment_id, si.item_no, si.active, si.content_cd, "
        "si.exp_volume_min, si.exp_volume_max, si.act_volume, si.create_dt "
        "from shipment_item si " )
''' addData( crsr, tbl, qry, hdr, False ) '''




crsr.close()
cnx.close()