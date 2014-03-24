<%@ page language="java" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">

		<title>管理登陆</title>

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">

<style type="text/css">
html { height:100%;}
body { height:100%; text-align:center;background-color: #bdceeb;}
#loading-mask {	position: absolute;	left: 0;top: 0;	width: 100%;height: 100%;z-index: 20000;background-color: white;}
#loading {border: 1px solid #B6CDCB;position: absolute;margin-top: -33px;margin-left: -110px;left: 50%;top: 50%;padding: 2px;z-index: 20001;width: 220px;height: 66px;}
#loading .loading-indicator {background: white;color: #444;font: bold 20px tahoma, arial, helvetica;padding: 10px;margin: 0;height: auto;}
#loading-msg {font: normal 18px arial, tahoma, sans-serif;}
.imghand {cursor: pointer;}
.status {color: #555;}
.x-progress-wrap.left-align .x-progress-text {text-align: left;}
.x-progress-wrap.custom {height: 17px;border: 1px solid #686868;overflow: hidden;padding: 0 2px;}
.ext-ie .x-progress-wrap.custom {height: 19px;}
.custom .x-progress-inner {height: 17px;background: #fff;}
.custom .x-progress-bar {height: 15px;background: transparent url(images/custom-bar.gif) repeat-x 0 0;border-top: 1px solid #BEBEBE;border-bottom: 1px solid #EFEFEF;border-right: 0;}
.container {width:200px;border:1px solid #ccc;text-align:left;display:inline-block;vertical-align:middle;}
.centerDiv { display:inline-block; zoom:1; *display:inline; vertical-align:middle;}
.hiddenDiv { height:100%; overflow:hidden; display:inline-block; width:1px; overflow:hidden; margin-left:-1px; zoom:1; *display:inline; *margin-top:-1px; _margin-top:0; vertical-align:middle;}

</style>
	<script type="text/javascript" src='ext/source/ext-base.js'></script>
	<script type="text/javascript" src='ext/source/ext-all.js'></script>
	<script type="text/javascript"
		src="ext/source/locale/ext-lang-zh_CN.js"></script>
	<link rel="stylesheet" type="text/css"
		href='ext/resources/css/ext-all.css' />
	<script type="text/javascript">
	
Ext.onReady(function(){
	var ele = Ext.get('loading');
	ele.hide();
    Ext.get('loading-mask').hide();
	Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'qtip';
    var simpleForm = new Ext.FormPanel({
	    labelAlign: 'left',
	    title: '用户登录',
	    buttonAlign:'center',
	    bodyStyle:'padding:5px',
	    width: 300,
	    frame:true,
	    labelWidth:80,
		onSubmit: Ext.emptyFn,
		submit: function(){
			this.getEl().dom.action = 'personal/login.action'; //连接到服务器的url地址
			this.getEl().dom.submit();
		},
		items: [
		{
			layout:'column',
			border:false,
	        labelSeparator:'：',
	        items:[
	        {
	            columnWidth:1,
	            layout: 'form',
	            border:false,
	            items: [{
	                xtype:'textfield',
	                fieldLabel: '用户',
	                value:'123',
	                name: 'loginName',
	                anchor:'90%'
	            }]
        	}]
        },
        {
			layout:'column',
			border:false,
	        labelSeparator:'：',
	        items:[
	        {
	            columnWidth:1,
	            layout: 'form',
	            border:false,
	            items: [{
	                xtype:'textfield',
	                inputType: 'password',
	                fieldLabel: '密码',
	                name: 'password',
	                anchor:'90%'
	            }]
        	}]
        }],
		buttons: [{
        	text: '登录',
        	handler:function(){
            	if(simpleForm.form.isValid()){
					simpleForm.form.doAction('submit',
					{
						url:'personal/login.action',
						method:'post',
						params:'',
						success:function(form,action){
						    //Ext.Msg.alert('操作',action.result.data);
							location.href = 'default.jsp';
						},
						failure:function(){
							//alert('保存失败！');
						}
					});
            	}
        	}
    	},{
        text: '重置',
        handler:function(){simpleForm.form.reset();}
    }]
});

simpleForm.render("loginForm");
	
	},this);
   </script>
	</head>
	<body scroll="no">
		<div id='loading-mask'></div>
		<div id="loading">
			<div class="loading-indicator">
				<img src='ext/resources/images/default/shared/large-loading.gif'
					width="32" height="32"
					style="margin-right: 8px; float: left; vertical-align: top;" />
				<br />
				<span id="loading-msg">Loading ...</span>
			</div>
		</div>
		<div id="loginForm" class="centerDiv">
		</div><div class="hiddenDiv"></div>
	</body>	
</html>