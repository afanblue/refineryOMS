'''
Created on Nov 22, 2018

@module: 
@author: Allan

Description: 
'''
import sys

args = sys.argv
#print( args )

fi = open(args[1], "r")
fo = open(args[2],'w')

for line in fi :
    print (line)
    sl = line[0:9]
    if sl == '*********' :
        fo.write( '-- ---' + line)
    elif sl == '  notice:' :
        fo.write( line[10:] )
    elif sl == ' drop_vw:' :
        fo.write( line[10:] )
    elif sl == 'view_ddl:' :
        fo.write( line[10:] )
    else :
        fo.write( line )


fi.close()
fo.close()