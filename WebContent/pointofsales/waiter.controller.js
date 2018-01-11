sap.ui.define([
	"sap/ui/core/mvc/Controller", 
	"sap/m/MessageBox"
],function (Controller,MessageBox){
	
	return Controller.extend("pointofsales.waiter",{
		onInit : function() {
     			
			
			
			
			
			
			
			//			setInterval(function(){
//								
//				
//
//			},1000);
//		   
			/*var oModelD = new sap.ui.model.json.JSONModel();
			oModelD.setData({
				dateValue: new Date()
			});		
			this.getView().setModel(oModelD,"date");*/
			this.byId("myDate").setDateValue(new Date());
			
		     /* var oModelT = new sap.ui.model.json.JSONModel();
			oModelT.setData({
				dateValue: new Date()
			});
			this.getView().setModel(oModelT,"time");*/

			this.byId("TP3").setDateValue(new Date());

			this._iEvent = 0;

			// for the data binding example do not use the change event for check but the data binding parsing events
			sap.ui.getCore().attachParseError(
				function(oEvent) {
					var oElement = oEvent.getParameter("element");

					if (oElement.setValueState) {
						oElement.setValueState(sap.ui.core.ValueState.Error);
					}
				});

			sap.ui.getCore().attachValidationSuccess(
				function(oEvent) {
					var oElement = oEvent.getParameter("element");

					if (oElement.setValueState) {
						oElement.setValueState(sap.ui.core.ValueState.None);
					}
				});	
							
			
			
			
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({

				items : [

				{
					key : "1",
					text : "BreakFast"
				},

				{
					key : "2",
					text : "Lunch"
				},

				{
					key : "3",
					text : "Dinner"
				}

				]

			});

			this.getView().setModel(oModel, "surya");

			/*Calling Finished Items from ecc using Odata   */
			var sServiceUrlFg = "proxy/http/122.165.148.177:8000/sap/opu/odata/sap/ZFG_ODATA_ITEM_SRV";
			var user = "sapdev";
			var pass = "admin@123";

			var oModelFg = new sap.ui.model.odata.ODataModel(
					sServiceUrlFg, true, user, pass);

			var oJsonModel = new sap.ui.model.json.JSONModel(
					oModelFg);

			oModelFg.read("/zitemsSet", null, null, true, function(
					oData, response) {
				oJsonModel.setData(oData);
			})
			this.getView().setModel(oJsonModel);
			console.log(oJsonModel);

		},

		accept : function() {
			
			//var oType = new sap.ui.model.type.DateTime({pattern: "HH:mm:ss"}); 
			var oEntry = {};
			oEntry.Watid = this.getView().byId("wait").getValue();
			oEntry.Tabno = this.getView().byId("table").getValue();
		    //oEntry.Nopck = this.getView().byId("people").getValue();
			oEntry.Sessn = this.getView().byId("session").getValue();
			debugger;
			
			oEntry.Bsdat = new Date(this.getView().byId("myDate").getValue());
			var time =  oEntry.Bsdat.getTime();
			//oEntry.Btime = " \/Date("+ time + ")\/ ";
			//oEntry.Btime = time;
			oEntry.Itmno = 1;
			oEntry.Maktx = this.getView().byId("item").getValue();
			oEntry.Ordqy = this.getView().byId("qty").getValue();

			var sServiceUrlSave = "proxy/http/122.165.148.177:8000/sap/opu/odata/sap/ZKOT_MASTER_FIORI_SRV"
			var user = "sapdev";
			var pass = "admin@123";
			var oModelSave = new sap.ui.model.odata.ODataModel(
					sServiceUrlSave, true, user, pass);

			var oJsonModelSave = new sap.ui.model.json.JSONModel(
					oModelSave);
			oModelSave.create("/zkot_matmasterSet", oEntry, null,
					function(oData, response) {
				MessageBox.show("Ordered Successfully", {
					icon: MessageBox.Icon.INFORMATION,
					title: "Information",
					actions: [MessageBox.Action.OK],
					id: "messageBoxId1",
					//details: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
					//styleClass: bCompact ? "sapUiSizeCompact" : "",
					contentWidth: "100px"
				});
					})

			console.log("yes");

		},

		increment : function() {
			var qty = this.getView().byId("qty").getValue();
			var qtyFinal = ++qty;
			var qty = this.getView().byId("qty").setValue(qtyFinal);

		},

		increment1 : function() {

			var qty1 = this.getView().byId("qty1").getValue();
			var qtyFinal = ++qty1;
			var qty1 = this.getView().byId("qty1").setValue(
					qtyFinal);

		},

		decrement : function() {
			var qty = this.getView().byId("qty").getValue();
			if( qty > 0 ){
			var qtyFinal = --qty;
			var qty = this.getView().byId("qty").setValue(qtyFinal);
			}
		},
		decrement1 : function() {
			var qty = this.getView().byId("qty1").getValue();
			if( qty > 0){
			var qtyFinal = --qty;
			var qty = this.getView().byId("qty1").setValue(qtyFinal);
			}

		},

		onListUpdateFinished: function(oEvent) {
			  // create new line "AddEntry"
			  this._oTable.addItem(this._createAddLine());
			  // add new line "AddEntry"
			  this._addAddLine(this._oTable);
			  },
		
		
		createLineItem : function(){
			//jQuery.sap.require("sap.m.MessageBox");
			 MessageBox.confirm("Are you Sure To Add The Line Item?");
			    
		}
		
	});
})