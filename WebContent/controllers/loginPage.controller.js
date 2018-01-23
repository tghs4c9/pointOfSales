sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/m/MessageBox",
],function(Controller,MessageBox){
	return Controller
	.extend(
			"surya.controllers.loginPage",
			{


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf pointofsales.loginPage
*/              

	next: function() {
		
		var oView = this.getView();
		var var_user = oView.byId("user").getValue();
		var var_pass = oView.byId("pass").getValue();
		
		if (var_user == "surya"  &&   var_pass == "surya")
		{
		//console.log("Event Successful");
		$('#user').val('');         
		var oPage1 = new sap.ui.getCore().byId("myApp");
        oPage1.to("orders","flip");
		}
 
		
		else
			{
			//jQuery.sap.require("sap.m.MessageBox");
			MessageBox.information("Invalid Username/Password!!");
			
			}
		
       
	}

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf pointofsales.loginPage
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf pointofsales.loginPage
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf pointofsales.loginPage
*/
//	onExit: function() {
//
//	}

			})
});