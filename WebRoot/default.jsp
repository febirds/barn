<%@ page language="java" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" " http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
	<title>粮仓监控管理</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" type="text/css" href="<%=path %>/system/resources/css/loading.css" />
	<link rel="stylesheet" type="text/css" href="<%=path %>/ext/resources/css/ext-all.css" />
	
	<!-- DESKTOP CSS -->
	<link rel="stylesheet" type="text/css" href="<%=path %>/system/resources/css/desktop.css" />
	<link rel="stylesheet" type="text/css" href="<%=path %>/system/resources/css/taskbar.css" />
	<link rel="stylesheet" type="text/css" href="<%=path %>/system/resources/css/QuickStartPanel.css" />
	<link rel="stylesheet" type="text/css" href="<%=path %>/system/resources/css/TaskButtonsPanel.css" />
	<link rel="stylesheet" type="text/css" href="<%=path %>/system/resources/css/TaskButton.css" />
	<link rel="stylesheet" type="text/css" href="<%=path %>/system/resources/css/TrayPanel.css" />
	<link rel="stylesheet" type="text/css" href="<%=path %>/system/resources/css/MenuPanel.css" />
	<link rel="stylesheet" type="text/css" href="<%=path %>/system/dialogs/colorpicker/colorpicker.css" />
	<link rel="stylesheet" type="text/css" href="<%=path %>/system/preference/preferences.css" />
	<!-- THEME CSS -->
	
	<!-- MODULES CSS -->
	<link rel="stylesheet" type="text/css" href="<%=path %>/system/resources/css/topbar.css" />
	<link rel="stylesheet" type="text/css" href="<%=path %>/ext/resources/css/datetime.css" />
</head>
<body scroll="no">
	<div id='loading-mask'></div>
	<div id="loading">
		<div class="loading-indicator">
			<img src="<%=path %>/ext/resources/images/default/shared/large-loading.gif"
					width="32" height="32"
					style="margin-right: 8px; float: left; vertical-align: top;" />
				<br />
			<span id="loading-msg">Source loading...</span>
		</div>
	</div>
	<input id="userid" type="hidden" value="${operator.operId }"/>
	<input id="username" type="hidden" value="${operator.operName }"/>
</body>
	<script type="text/javascript" src="<%=path %>/ext/source/ext-base.js"></script>
	<script type="text/javascript" src="<%=path %>/ext/source/ext-all-debug.js"></script>
	<script type="text/javascript" src="<%=path %>/system/patches/patches-all.js"></script>
	<script type="text/javascript" src="<%=path %>/ext/source/locale/ext-lang-zh_CN.js" ></script>
	<script type="text/javascript" src="<%=path %>/system/loading.js" ></script>

	<script type="text/javascript" src="<%=path %>/system/core/System3.js"></script>
	<script type="text/javascript" src="<%=path %>/system/core/HexField.js"></script>
	<script type="text/javascript" src="<%=path %>/system/core/Notification.js"></script>
	<script type="text/javascript" src="<%=path %>/system/core/Shortcut.js"></script>
	<script type="text/javascript" src="<%=path %>/system/core/TaskBar.js"></script>
	<script type="text/javascript" src="<%=path %>/system/core/TopTaskBar2.js"></script>
	<script type="text/javascript" src="<%=path %>/system/core/QuickStartPanel.js"></script>
	<script type="text/javascript" src="<%=path %>/system/core/TaskButtonsPanel.js"></script>
	<script type="text/javascript" src="<%=path %>/system/core/TaskButton.js"></script>
	<script type="text/javascript" src="<%=path %>/system/core/TrayPanel.js"></script>
	<script type="text/javascript" src="<%=path %>/system/core/MenuPanel.js"></script>
	<script type="text/javascript" src="<%=path %>/system/core/Window.js"></script>
	<script type="text/javascript" src="<%=path %>/system/core/MessageBox.js"></script>
	<script type="text/javascript" src="<%=path %>/system/dialogs/colorpicker/ColorPicker.js"></script>
	<script type="text/javascript" src="<%=path %>/system/core/os.js"></script>
	<!-- 
	<script type="text/javascript" src="<%=path %>/system/core/Desktop3.js"></script>
	 -->
	<!-- locale zh_CN end-->
	<script type="text/javascript" src="<%=path %>/system/config2.js"></script>
	<script type="text/javascript" src="<%=path %>/system/sample2.js"></script>
	<script type="text/javascript" src="<%=path %>/ext/source/Datetime.js"></script>	
</html>