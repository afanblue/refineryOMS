
<!-- @author Dennis Selfridge
             Brad Spenla
         Description: Debug Page
             Prints out everything you want to know about the application, server,
                 environment, etc. 
         @version $Revision: 1.2 $ 
         Copywrite 2000,2001,2002,2003,2004,2005,2006 Kaloke Technologies Inc 
-->
<%@ page import="java.util.*" %>
<%@ page import="java.net.*" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

<html>
<head>
  <title>Debug</title>
  <META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW"> 

<style>
    body { font-family : sans-serif ; }
    .key {
      color : Black ;
      font-weight : bold ;
    }
    .value {}
    .title {
      background-color : Silver ;
      color : Black ;
    }
    .equals { font-weight : bold ; }
</style>
  
</head>

<body>
    

<!-- -->
<h2 class="title">system</h2>

<table border="1" cellpadding="4" cellspacing="0">

<% 

  Properties sp = System.getProperties() ;
  Object [] spKeys = sp.keySet().toArray() ;
  Arrays.sort(spKeys) ;
  for(int i = 0; i < spKeys.length; i++) { 
    String key = (String)spKeys[i] ;
    Object value = System.getProperty(key) ;

%>

<tr>
  <td class="key"><%=key%></td>
  <td class="value"><%=value%></td>
</tr>

<% } %>

</table>                                
<!-- -->
    
<h2 class="title">server</h2>

<table border="1" cellpadding="4" cellspacing="0">
    
<% 
   InetAddress localhost = InetAddress.getLocalHost() ;
%>

<tr>
  <td class="key">server hostname</td>
  <td class="value"><%=localhost.getHostName()%></td>
</tr>

<tr>
  <td class="key">request hostname</td>
  <td class="value"><%=request.getServerName()%></td>
</tr>   

<tr>
  <td class="key">server address</td>
  <td class="value"><%=localhost.getHostAddress()%></td>
</tr>

<tr>
  <td class="key">remote user</td>
  <td class="value"><%=request.getRemoteUser()%></td>
</tr>

<tr>
  <td class="key">remote address</td>
  <td class="value"><%=request.getRemoteAddr()%></td>
</tr>

<tr>
  <td class="key">request port</td>
  <td class="value"><%=request.getServerPort()%></td>
</tr>

<tr>
  <td class="key">context path</td>
  <td class="value"><%=request.getContextPath()%></td>
</tr>

</table>                
    

<h2 class="title">application</h2>

<table border="1" cellpadding="4" cellspacing="0">

<% 
  Enumeration a = application.getAttributeNames() ;
  while(a.hasMoreElements()) { 
    String key = (String)a.nextElement() ;
    Object value = application.getAttribute(key) ;
%>

<tr>
  <td class="key"><%=key%></td>
  <td class="value"><%=value%></td>
</tr>

<% } %>

</table>


    
<h2 class="title">session</h2>

<table border="1" cellpadding="4" cellspacing="0">

<% 
  Enumeration s = session.getAttributeNames() ;
  while(s.hasMoreElements()) { 
    String key = (String)s.nextElement() ;
    Object value = session.getAttribute(key) ;
%>

<tr>
  <td class="key"><%=key%></td>
  <td class="value"></span><%=value%></td>
</tr>

<% } %>

</table>

<h2 class="title">request</h2>

<table border="1" cellpadding="4" cellspacing="0">

<% 
  Enumeration r = request.getAttributeNames() ;
  while(r.hasMoreElements()) { 
    String key = (String)r.nextElement() ;
    Object value = request.getAttribute(key) ;
%>

<tr>
  <td class="key"><%=key%></td>
  <td class="value"><%=value%></td>
</tr>

<% } %>

</table>        

<h2 class="title">request parameters</h2>

<table border="1" cellpadding="4" cellspacing="0">

<% 
  Enumeration rp = request.getParameterNames() ;
  while(rp.hasMoreElements()) { 
    String key = (String)rp.nextElement() ;
    Object value = request.getParameter(key) ;
%>

<tr>
  <td class="key"><%=key%></td>
  <td class="value"><%=value%></td>
</tr>

<% } %>

</table>

<h2 class="title">cookies</h2>

<table border="1" cellpadding="4" cellspacing="0">

<% 
   Cookie [] cookies = request.getCookies() ;
   for(int i = 0; i < cookies.length; i++) {
      String key = cookies[i].getName() ;
      String value = cookies[i].getValue() ;
%>

<tr>
  <td class="key"><%=key%></td>
  <td class="value"><%=value%></td>
</tr>

<% } %>
</table>

<h2 class="title">Headers</h2>

<table border="1" cellpadding="4" cellspacing="0">

<% java.util.Enumeration names = request.getHeaderNames();
        while(names.hasMoreElements()){
            String name = (String) names.nextElement();
            String value = request.getHeader(name);
%>
  <tr>
    <td class="key"><%=name%></td>
    <td class="value"><%=value%></td>
  </tr>
<%
    }
 %>

</table>                

</body>
</html>



 
