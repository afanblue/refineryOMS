<%--
  Copyright (c) 2002 by Phil Hanna
  All rights reserved.
  
  You may study, use, modify, and distribute this
  software for any purpose provided that this
  copyright notice appears in all copies.
  
  This software is provided without warranty
  either expressed or implied.
--%>
<%@ page import="java.util.*" %>
<html>
   <head>
      <title>debug.jsp</title>
      <style>
      <jsp:include page="style.css" flush="true"/>
      </style>
   </head>
   <body>
      <h1>System Properties:</h1>
      <table border="1" cellpadding="4" cellspacing="0">
      <%
         Properties p = System.getProperties();
         Enumeration<Object> keys = p.keys();
         while (keys.hasMoreElements()) {
            String key = (String)keys.nextElement();
            String value = (String)p.get(key);
      %>
         <tr><td><%= key %></td><td><%= value %></td></tr>
      <%
         }
      %>
      </table>
      
      <h1>HTTP Request Headers Received</h1>
      <table border="1" cellpadding="4" cellspacing="0">
      <%
         Enumeration<String> eNames = request.getHeaderNames();
         while (eNames.hasMoreElements()) {
            String name = (String) eNames.nextElement();
            String value = normalize(request.getHeader(name));
      %>
         <tr><td><%= name %></td><td><%= value %></td></tr>
      <%
         }
      %>
      </table>
      
      <h1>Request Attributes:</h1>
      <table border="1" cellpadding="4" cellspacing="0">
      <%
      Enumeration<String> in = request.getAttributeNames();
      while(in.hasMoreElements()) {
         String paramName = in.nextElement().toString();
         String value = request.getAttribute(paramName).toString();
      %>
         <tr><td><%= paramName %></td><td><%= value %></td></tr>
      <%
      }
      %>
      </table>
      
      <h1>Session attributes:</h1>
      <table border="1" cellpadding="4" cellspacing="0">
      <%
         for (Enumeration<String> e = session.getAttributeNames(); e.hasMoreElements(); ) {     
            String attribName = (String) e.nextElement();
            Object attribValue = session.getAttribute(attribName);
      %>
         <tr><td><%= attribName %></td><td><%= attribValue %></td></tr>
      <%
         }
      %>
      </table>

      <h1>Application attributes:</h1>
      <table border="1" cellpadding="4" cellspacing="0">
      <%
         for (Enumeration<String> e = application.getAttributeNames(); e.hasMoreElements(); ) {     
            String attribName = (String) e.nextElement();
            Object attribValue = application.getAttribute(attribName);
      %>
         <tr><td><%= attribName %></td><td><%= attribValue %></td></tr>
      <%
         }
      %>
      </table>

      <h1>Parameters:</h1>
      <table border="1" cellpadding="4" cellspacing="0">
      <%
      Enumeration<String> pn = request.getParameterNames();
      while(in.hasMoreElements()) {
         String paramName = pn.nextElement().toString();
         String value = request.getParameter(paramName);
      %>
         <tr><td><%= paramName %></td><td><%= value %></td></tr>
      <%
      }
      %>
      </table>

   </body>
</html>
<%!
   private String normalize(String value)
   {
      StringBuffer sb = new StringBuffer();
      for (int i = 0; i < value.length(); i++) {
         char c = value.charAt(i);
         sb.append(c);
         if (c == ';')
            sb.append("<br>");
      }
      return sb.toString();
   }
%>