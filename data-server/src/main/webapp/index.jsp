<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@page session="true"%>
<html>
  <head>
    <title>OMS - Oil Movement System</title>
    <c:import url="/common/head_common.jsp"/>
    <c:import url="/common/oms_style.jsp"  />
    <style>
      body, ul, li, a, td, div { color:white; background-color:midnightblue;}
    </style>
  </head>
  <body>
    <table>
      <tr>
        <td>
          <c:import url="/common/banner.jsp" />
        </td>
      </tr>
      <tr>
        <td>

<!--  begin body  -->

    <div>

	   <h2>OMS Login</h2>
	   
	   <img src="images/spacer.png" height="20px" width="1px" />
	   <h2><a href="user">Refinery</a></h2>
	   <img src="images/spacer.png" height="10px" width="1px" />
	   <h2><a href="admin">Admin</a></h2>
	   
	   <img src="images/spacer.png" height="150px" width="1px" />
	   
	   <input type="hidden" name="${_csrf.parameterName}"
		      value="${_csrf.token}" />
	</div>

<!--  end body  -->

        </td>
      </tr>
      <tr>
        <td>
          <c:import url="/common/credits.jsp" />
        </td>
      </tr>
    </table>
  </body>
</html>
