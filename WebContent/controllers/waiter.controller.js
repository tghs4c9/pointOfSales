sap.ui
		.define(
				[ "sap/ui/core/mvc/Controller", "sap/m/MessageBox",
						"sap/m/MessageToast" ],
				function(Controller, MessageBox, MessageToast) {

					return Controller
							.extend(
									"surya.controllers.waiter",
									{
										
										onInit : function() {
																		
											window.KOT = 1;
											var oCounter = new sap.ui.model.json.JSONModel();
											oCounter.setData({count:2});

											this.getView().setModel(oCounter,"counter");
                                            										
											//var count = 0;
											// setInterval(function(){
											//								
											//				
											//
											// },1000);
											//		   
											/*
											 * var oModelD = new
											 * sap.ui.model.json.JSONModel();
											 * oModelD.setData({ dateValue: new
											 * Date() });
											 * this.getView().setModel(oModelD,"date");
											 */
											this.byId("myDate").setDateValue(
													new Date());
											var c =this;

											/*
											 * var oModelT = new
											 * sap.ui.model.json.JSONModel();
											 * oModelT.setData({ dateValue: new
											 * Date() });
											 * this.getView().setModel(oModelT,"time");
											 */

											this.byId("TP3").setDateValue(
													new Date());

											this._iEvent = 0;

											// for the data binding example do
											// not use the change event for
											// check but the data binding
											// parsing events
											sap.ui
													.getCore()
													.attachParseError(
															function(oEvent) {
																var oElement = oEvent
																		.getParameter("element");

																if (oElement.setValueState) {
																	oElement
																			.setValueState(sap.ui.core.ValueState.Error);
																}
															});

											sap.ui
													.getCore()
													.attachValidationSuccess(
															function(oEvent) {
																var oElement = oEvent
																		.getParameter("element");

																if (oElement.setValueState) {
																	oElement.setValueState(sap.ui.core.ValueState.None);
																}
															});

											var oModel = new sap.ui.model.json.JSONModel();
											oModel.setData({

												items : [

												{
													key : "1",
													text : "BREAKFAST"
												},

												{
													key : "2",
													text : "LUNCH"
												},

												{
													key : "3",
													text : "DINNER"
												}

												]

											});

											this.getView().setModel(oModel,"surya");

											/*
											 * Calling Finished Items from ecc
											 * using Odata
											 */
											//oModel.refresh();
											var sServiceUrlFg = "proxy/http/122.165.148.177:8000/sap/opu/odata/sap/ZFG_ODATA_ITEM_SRV";
											//var sServiceUrlFgTest = "proxy/http/122.165.148.177:8000/sap/opu/odata/sap/ZFG_ODATA_ITEM_SRV";
											var user = "sapdev";
											var pass = "admin@123";

											var oModelFg = new sap.ui.model.odata.ODataModel(sServiceUrlFg,true,user,pass);
											//var oModelFgTest = new sap.ui.model.odata.ODataModel(sServiceUrlFgTest,true,user,pass);
											var oJsonModel = new sap.ui.model.json.JSONModel(oModelFg);
											//var oJsonModelTest = new sap.ui.model.json.JSONModel(oModelFgTest);
											//oJsonModel.refresh();
											oModelFg.read("/zitemsSet",null,null,true,function(oData,response) {
																oJsonModel.setData(oData);
															});
											/*ModelFgTest.read("/zitemsSet/$count",null,null,true,function(oData,response) {
												window.FG = response.body;
												console.log(response.body);
												oJsonModelTest.setData(oData);
											})
*/											this.getView().setModel(oJsonModel);
                                             var z = this;
											console.log(oJsonModel);	
											var sServiceUrlCount = "proxy/http/122.165.148.177:8000/sap/opu/odata/sap/ZKOT_MASTER_FIORI_SRV";
											var oModelCount = new sap.ui.model.odata.ODataModel(sServiceUrlCount,true,user, pass);
											var oJsonModelCount = new sap.ui.model.json.JSONModel(oModelCount);
											oModelCount.read("/zkot_matmasterSet/$count",null,null,true,
													function(oData,response) 
											{
									        	 console.log(response.body);
									        	 var kot = response.body ;
                                                 var orderno = (+kot + +1);
									        	 var counter = z.getView().byId(
													"kot").setValue(orderno);
											});
											//var kot = count;
											

											},

										accept : function() {
											// var oType = new
											// sap.ui.model.type.DateTime({pattern:
											// "HH:mm:ss"});
											debugger;
											
											//console.log(count);
											console.log(KOT);
											var oEntry = {};
											oEntry.Kotno = Number(this.getView().byId("kot").getValue());
											oEntry.Itmno = 1;
											//oEntry.Itmno = this.getView().byId("kot").getValue();
											oEntry.Watid = this.getView().byId("wait").getValue();
										    oEntry.Tabno = this.getView().byId("table").getValue();
											oEntry.Nopck = Number(this.getView().byId("people").getValue());
											oEntry.Bsdat = new Date(this.getView().byId("myDate").getValue());
											oEntry.Sessn = this.getView().byId("session").getValue();
											oEntry.Maktx = this.getView().byId("item").getValue();
											oEntry.Ordqy = this.getView().byId("qty").getValue();
											
											//var time = oEntry.Bsdat.getTime();
											// oEntry.Btime = " \/Date("+ time +
											// ")\/ ";
											// oEntry.Btime = time;
											
																				

											var sServiceUrlSave = "proxy/http/122.165.148.177:8000/sap/opu/odata/sap/ZKOT_MASTER_FIORI_SRV"
											var user = "sapdev";
											var pass = "admin@123";
											var oModelSave = new sap.ui.model.odata.ODataModel(sServiceUrlSave,true,user, pass);
											var oJsonModelSave = new sap.ui.model.json.JSONModel(oModelSave);
									       // var a = this;
									      							
									        
											MessageBox.confirm("Are you Sure To Place The Order??",{
												onClose : function(selection){
													if(selection == "OK"){
														oModelSave.create("/zkot_matmasterSet",oEntry,null,
																function(oData,response) 
														{
												        	 MessageBox.success("Your Order Has Been Placed!!");		
														});
													}
												}
											})
											
										},
												
											increment : function() {
											var qty = this.getView()
													.byId("qty").getValue();
											var qtyFinal = ++qty;
											var qty = this.getView()
													.byId("qty").setValue(
															qtyFinal);

										},

										increment1 : function() {

											var qty1 = this.getView().byId(
													"qty1").getValue();
											var qtyFinal = ++qty1;
											var qty1 = this.getView().byId(
													"qty1").setValue(qtyFinal);

										},

										decrement : function() {
											var qty = this.getView()
													.byId("qty").getValue();
											if (qty > 0) {
												var qtyFinal = --qty;
												var qty = this.getView().byId(
														"qty").setValue(
														qtyFinal);
											}
										},
										decrement1 : function() {
											var qty = this.getView().byId(
													"qty1").getValue();
											if (qty > 0) {
												var qtyFinal = --qty;
												var qty = this.getView().byId(
														"qty1").setValue(
														qtyFinal);
											}

										},
			
								
										createLineItem : function() {
											var a = this;
											var counter = this.getView().byId(
											"counter").getValue();
											var counterFinal = ++counter;
											var counter = this.getView().byId(
											"counter").setValue(counterFinal);
											/*var oModel = this.getView().getModel();
											    var nCurrentCount = oModel.getProperty('/count');
											    oModel.setProperty('/count', ++nCurrentCount);*/
											MessageBox
													.confirm("Are you Sure To Add New Line Item?",{
														onClose : function(selection){
															if(selection == "OK"){
																
																oItemFg = new sap.ui.core.ListItem({text:'{Maktg}'});
																var oTable = a.byId("itemTable");
																var oItem = new sap.m.ColumnListItem({
																	cells :[
																		new sap.m.Input({
																			value :counterFinal,
																			enabled : false }),
																		new sap.m.ComboBox({
																			items : {path:"/results",
																				     template:oItemFg}
																		}),
																		new sap.m.Input({value:0,
																			enabled: true }),
																		new sap.m.Button({
																			type : "Accept",
					                                                        icon : "sap-icon://sys-add",
					                                                        width : "1px"
																		}),
																		new sap.m.Button({
																			type : "Reject",
					                                                        icon : "sap-icon://sys-minus",
					                                                        width : "1px"
																		})
																	]
																})
																oTable.addItem(oItem);
																
															}
														}
													});
											

										},

										logout : function() {
											
											MessageBox.confirm("Are you Sure To Logout?",{
												onClose : function(selection){
													if(selection == "OK"){
														var oPage1 = new sap.ui.getCore()
														.byId("myApp");
												oPage1.to("idwaiter1");	
												
													}
												}
											})
											
										},
										
										reset : function(){
											$('.reset').val('');
											//log.console(qty);
											//
										//$(qty)[0].reset();
										}

									});
				})