/*jslint browser: true, bitwise: true,continue: true, debug: true, eqeq: true, es5: true, evil: true, newcap: true, plusplus: true, sloppy: true, stupid: true, sub: true, vars: false, white: true maxerr: 1000 */

/** ********************************************************************
 * Avansera Bar Code Scanner, AppGyver Project, Phone gap project
 * updated to work with iOS cordova project
 *
 *
 *
 *
 * Version 1.0,   26.2.2013 Christer Nyberg
 * Version 1.1,   10.4.2013 Christer Nyberg
 *
 *
 *
 * Copyright (c) 2013 Christer Nyberg
 * Copyright (c) 2013 Avansera Oy
 ******************************************************************** */



// Application, Submit data to server, Clear old values, request new geolocation
//
// !(document.getElementsByName('avs_ean')[0].value=="") &&
// ---------------------------------------------------------------------

function form_app_submit(){
  if ( !(document.getElementById('avs_pr').value=="") ) {
    document.getElementById('avs_collect').submit();
    document.getElementById('avs_pr').placeholder="";
    document.getElementById('avs_pr').value="";
    document.getElementsByName('avs_ts')[0].value="";
    document.getElementsByName('avs_ean')[0].value="";
    document.getElementById('avsTS').innerHTML="";
    document.getElementById('avsEA').innerHTML="";
    
  }
  //get_location();
}

// update Discount value regarding the buttons
// ---------------------------------------------------------------------

// onclick="avs_dicnt_plus()"
// onclick="avs_price_plus()"
// onclick="avs_pcsam_plus()"

// "avs_price"
// "avs_amount"

function avs_dicnt_sub(){
  var value = $('#avs_discount').val();
  value++;
  console.log('discount ad ###KRISU### :' + value);
  $('#avs_discount').val(value);
  avs_calculate_price();
}

function avs_dicnt_add(){
  var value = document.getElementById('avs_discount').value;
  value =value - 1;
  if (value < 0) {value = 0;}
  var n=value.toFixed(2);
  console.log('discount sub ###KRISU### :' + n);
  document.getElementById('avs_discount').value=n;
  avs_calculate_price();
}

function avs_price_add(){
  var value = (($('#avs_price').val()/1)+0.01);
  var n=value.toFixed(2);
  console.log('price add ###KRISU### :' + n);
  $('#avs_price').val(n);
  avs_calculate_percent();
}

function avs_price_sub(){
  var value = document.getElementById('avs_price').value;
  value =value - 0.01;
  if (value < 0) {value = 0;}
  var n=value.toFixed(2);
  console.log('avs_price_minus() ###KRISU### :' + n);
  document.getElementById('avs_price').value=n;
  avs_calculate_percent();
}

function avs_pcsam_add(){
  var value = ((document.getElementById('avs_amount').value/1)+50);
  var n=value.toFixed(0);
  console.log('avs_amount_add()  ###KRISU### :' + n);
  $('#avs_amount').val(n);
}

function avs_pcsam_sub(){
  var value = document.getElementById('avs_amount').value-50;
  if (value < 0) {value = 0;}
  var n=value.toFixed(0);
  console.log('avs_amount_sub() ###KRISU### :' + n);
  document.getElementById('avs_amount').value=n;
}


// test javascript picker selector
// ---------------------------------------------------------------------

function hola(){
  alert ("holahola");
  
  $("#demo_test_tree_list").show();
  //$('#test_tree_list').val('').scroller('destroy').scroller($.extend(opt[tree_list], { theme: ios, mode: scroller, display: bottom, lang: english }));
  
  $('#demo_test_tree_list').mobiscroll().treelist({
                                                  theme: 'ios',
                                                  display: 'bottom',
                                                  mode: 'scroller',
                                                  labels: ['Region', 'Country', 'City'],
                                                  inputClass: 'i-txt'
                                                  });
  // });
  
  $('#demo').trigger('change');
}


// Picker settings
// ---------------------------------------------------------------------

function picker_select(){
  
  // After device ready, create a local alias
  //var pickerView = window.plugins.pickerView;
  
  
  // Basic with title & defaultValue selected
  var slots = [
               {name: 'foo', value: 'baz', data: [
                                                  {value: 'foo', text: 'Displayed Foo'},
                                                  {value: 'bar', text: 'Displayed Bar'},
                                                  {value: 'baz', text: 'Displayed Baz'}
                                                  ]}
               ];
  
  
  window.plugins.pickerView.create('Title', slots, function(selectedValues, buttonIndex) {
                                   console.warn('create(), arguments=' + Array.prototype.slice.call(arguments).join(', '));
                                   });
  alert('whaaat!!');
  // Complex example with 2 slots
  var slots = [
               {name : 'limit_speed', title: 'Speed', width: 140, data : [
                                                                          {text: '50 KB/s', value: 50},
                                                                          {text: '100 KB/s', value: 100},
                                                                          {text: '200 KB/s', value: 200},
                                                                          {text: '300 KB/s', value: 300}
                                                                          ]},
               {name : 'road_type', title: 'Road', width: 160, data : [
                                                                       {text: 'Highway', value: 50},
                                                                       {text: 'Town', value: 100},
                                                                       {text: 'City', value: 200}
                                                                       ]}
               ];
  window.plugins.pickerView.create('', slots, function(selectedValues, buttonIndex) {
                                   console.warn('create(), arguments=' + Array.prototype.slice.call(arguments).join(', '));
                                   }, {style: 'black-opaque', doneButtonLabel: 'OK', cancelButtonLabel: 'Annuler', sourceRect: [100.0, 100.0, 20.0, 20.0], arrowDirection: 'up'});
  
  // Set values after create
  setTimeout(function() {
             window.plugins.pickerView.setValue({limit_speed: 100, road_type: 200}, {animated: true});
             }, 1000);
}



// setTimeout for picker select
// ---------------------------------------------------------------------

setTimeout(function() {
           window.plugins.pickerView.setValue({limit_speed: 100, road_type: 200}, {animated: true});
           }, 1000);


// Login, submit data to server, request new geolocation (geo not in use)
// ---------------------------------------------------------------------

function form_login_submit(){
  if ( !(document.getElementById('avs_pin').value=="") ) {
		location.href="app.html";
    
    //document.getElementById('avs_login').submit();
    //get_location();
  }
}


function avs_load_list(){
  
  $('#avs_contentblock').load('http://appavanseracom.avansera.epte.fi/mcm_demo.php');
  
  /* document.getElementById('avs_contentiframe').contentDocument.location.reload(true);
   */
  console.log('reloading frontpage data...');
  
}



// Scan barcode and place results to input box
// ---------------------------------------------------------------------

function barcode_scan(){
  
  //avs_getstorename();
  // console.log('storename got, and starting barcode scanner...');
  //
  // dont read twice storename, slows down already slow program
  
  window.plugins.barcodeScanner.scan
  (
   function(result){
   if (result.cancelled)
   $('.ean_meta').text(result.text);
   else {
   // document.getElementById('avsEA').innerHTML=result.text;
   //document.getElementsByName('avs_ean')[0].value=result.text;
   // $('.eancode').text(result.text);
   $('.ean_meta').text(result.text);
   // shopID
   $.mobile.loading( 'show', {
                    text: '',
                    textVisible: false,
                    theme: 'default',
                    html: ""
                    });
   var furl='http://appavanseracom.avansera.epte.fi/get_ean.php?ean=' + result.text + '&shop=' + document.getElementById('shopselector').value + '&userid=' + $('#userselector').val();
   $.ajax({
          url : furl,
          type : "get",
          dataType : "json",
          timeout: 5000,
          success : function(data, textStatus, jqXHR) {
          console.log('data loaded ' + JSON.stringify(data));
          $('#avs_meta_ean').html(result.text);
          $('#avs_meta_title').html(data.name);
          $('#avs_meta_price').html(data.price);
          localStorage.setItem('avs_meta_price', data.price);
          localStorage.setItem('avs_eancode', result.text);
          $('#avs_discount').val(0);
          $('#avs_price').val(data.price);
          $('#avs_thumbnail').attr('src', data.thumbnail);
          $('#avs_info_ean').text(data.name + ' (EAN: ' +result.text + ')');
          $('#avs_info_ean_2').text(result.text);
          $.mobile.loading( 'hide', "");
          if (data.status=='NO PRODUCTS'){
          $('#avs_info_noproduct').click();
          /*  $.mobile.loading( 'show', {
           text: 'Tuotetta ei löytynyt',
           textVisible: true,
           theme: 'a',
           textonly: true,
           html: ""
           }); */
          
          setTimeout(function(){
                     $('.avs_dialog_noproduct').dialog('close');
                     window.location.hash='';
                     //$.mobile.loading( 'hide', "");
                     },3000);
          }
          else if (data.status=='NO PRICE') {
          $.mobile.loading( 'hide', "");
          console.log('NO PRICE ###KRISU### :' + data.status);
          //$('#avs_dialog').dialog({ position: [50,50] });
          //$('#avs_dialog').dialog({ autoOpen: true});
          /* $("#dialog-form").dialog({
           autoOpen: false,
           width: dialogWidth,
           position: [($(window).width() / 2) - (dialogWidth / 2), 150],
           modal: true,
           resizable: false,
           closeOnEscape: false
           });*/
          $('#avs_info').click();
          set_timestamp();
          }
          else {
          $.mobile.loading( 'hide', "");
          //$.mobile.navigate( "#avansera_app" );
          window.location.hash='avansera_app';
          set_timestamp();
          
          }
          
          },
          error : function(jqXHR, textStatus, errorThrown) {
          console.log('error loading data :' + errorThrown);
          $.mobile.loading( 'hide', "");
          }
          });
   
   
   } }   );
  
}

// close avs dialog
// ---------------------------------------------------------------------

function avs_closedialog(){
  window.location.hash='avansera_app';
  //$.mobile.navigate( "#avansera_app" );
  $('.avs_dialog').dialog('close');
}


// avs submit data
// ---------------------------------------------------------------------

function avs_cancelsubmit(){
  //$.mobile.navigate( "#" );
  window.location.hash='';
}

function avs_campaignsubmit(){
  
  $.mobile.loading( 'show', {
                   text: '',
                   textVisible: false,
                   theme: 'default',
                   html: ""
                   });
  console.log('postdata preparing + furl');
  // startdate $('#avs_enddate').val()
  /* var n = new Date();
   var date=n.toISOString();
   document.getElementsByName('avs_ts')[0].value=date;
   document.getElementById('avsTS').innerHTML=date;
   */
  var startdate = document.getElementById('avs_startdate').value;
  if ( startdate == ''){
    var avs_startdate = new Date().toISOString();
  }
  else{
    var avs_startdate = new Date(startdate).toISOString();
  }
  
  var enddate = document.getElementById('avs_enddate').value;
  if (enddate == ''){
    var avs_enddate = new Date(1,1,1).toISOString();
  }
  else{
    var avs_enddate = new Date(enddate).toISOString();
  }
  
  var furl='http://appavanseracom.avansera.epte.fi/submit.php?ean=' + localStorage.getItem('avs_eancode') + '&discount='+ $('#avs_discount').val() + '&price=' +$('#avs_price').val() + '&amount=' + $('#avs_amount').val() + '&start_date=' + avs_startdate + '&end_date=' + avs_enddate + '&shop=' +document.getElementById('shopselector').value + '&userid=' + $('#userselector').val();
  console.log('postdata prepared ' + furl);
  
  $.ajax({
         url : furl,
         type : "get",
         dataType : "json",
         timeout: 5000,
         success : function(data, textStatus, jqXHR) {
         console.log('data loaded ' + JSON.stringify(data));
         $.mobile.loading( 'hide', "");
         if (data.status!='OK'){
         $.mobile.loading( 'show', {
                          text: 'Hintatietojen päivitys\n epäonnistui!',
                          textVisible: true,
                          theme: 'a',
                          textonly: true,
                          html: ""
                          });
         
         setTimeout(function(){
                    $.mobile.loading( 'hide', "");
                    },3000);
         }
         else {
         $.mobile.loading( 'hide', "");
         avs_load_list();
         $('#avs_info_storedok').click();
         
         setTimeout(function(){
                    $('.avs_dialog_storedok').dialog('close');
                    window.location.hash='';
                    },2000);
         }
         },
         error : function(jqXHR, textStatus, errorThrown) {
         console.log('error loading data :' + errorThrown);
         $.mobile.loading( 'hide', "");
         }
         });
  
}


// Show dialog for stored ok
// ---------------------------------------------------------------------

function show_stored_ok_dialog(){
  avs_load_list();
  $('#avs_info_storedok').click();
  
  setTimeout(function(){
             $('.avs_dialog_storedok').dialog('close');
             window.location.hash='';
             },3000);
}


// validate store id and "launch" user selector
// ---------------------------------------------------------------------


// If (document.form1.Enter.value >=1<=10)

function validateshopid(){
  if (document.getElementById('shopselector').value >=1<=10000){
    $("userselector").focus();
    $("userselector").click();
    avs_getstorename();
    console.log('validated shopid :' + document.getElementById('shopselector').value + ' ' + $('#userselector').val());
    localStorage.setItem('avs_default_user', $('#userselector').val() );
    localStorage.setItem('avs_default_shop', $('#shopselector').val() );
    
    
  }
  else {
    $('#shopselector').val(1638);
  }
}


// set defaults to localstorage if avs_default_user does not exist..
// ---------------------------------------------------------------------

function initdefaults(){
  
  // User
  localStorage.setItem('avs_default_user', 31);
  
  // Shop
  localStorage.setItem('avs_default_shop', 1638);
  
  // Shopname
  localStorage.setItem('avs_default_shopname','Valintatalo Konalantie');
  
}


function loaddefaults(){
  
  console.log('loading defaults ' );
  
  // next just takes defauts directly (for lähikauppa demo)
  
  avs_load_list();
  
  // User
  
  if (localStorage.getItem('avs_default_user')){
    
    $('#userselector').val(localStorage.getItem('avs_default_user')).change();
    $('#userselector option:selected');
    
    // last shop
    
    $('#shopselector').val(localStorage.getItem('shopselector'));
    $('#shopselector').val(localStorage.getItem('avs_default_shop')).change();
    $('#shopselector option:selected');
    
    // shopname
    
    $('#avs_shopname').text(localStorage.getItem('avs_default_shopname'));
    
    
  }
  else {
    
    // Write defaults to phone memory storage
    initdefaults();
    console.log('defaults written to local storage ' );
    
    
  }
  console.log('defaults loaded ####################### APP READY #####' );
  
  get_geolocation();
  
}

// ---------- activate drop down...

/* function activatekey{
 var press = jQuery.Event("keypress");
 press.ctrlKey = false;
 press.which = 32;
 $("#shopselector").trigger(press);
 } */



// calculate price after percentage has been entered
// ---------------------------------------------------------------------

function avs_calculate_price(){
  var startprice = localStorage.getItem('avs_meta_price');
  var newprice = (((100-document.getElementById('avs_discount').value)/100) * startprice).toFixed(2);
  $('#avs_price').val(newprice);
  
  
}


// $('#avs_meta_ean').html(result.text);
// $('#avs_meta_title').html(data.name);
// $('#avs_meta_price').html(data.price);



// calculate percentage after price has been entered
// ---------------------------------------------------------------------

function avs_calculate_percent(){
  var startprice = localStorage.getItem('avs_meta_price');
  var newprice = document.getElementById('avs_price').value;
  var newpercent = (100-(newprice/startprice)*100).toFixed(0);
  console.log('calc percent :' + startprice + ' ' + newprice + ' ' + newpercent);
  $('#avs_discount').val(newpercent);
  
}


// Set UTC-timestamp to input box
// ---------------------------------------------------------------------

function set_timestamp(){
  var n = new Date();
  var date=n.toISOString();
  document.getElementsByName('avs_ts')[0].value=date;
  document.getElementById('avsTS').innerHTML=date;
}


// Modify results to have 2 decimal eg input 500 comes to 5.00
// ---------------------------------------------------------------------

function mod_price(){
  var modpr = document.getElementById('avs_pr').value;
  modpr=modpr/100;
  var n=modpr.toFixed(2);
  document.getElementById('avs_pr').value=n;
}



// Fetch geo location and show it to client (does actually work now)
// ---------------------------------------------------------------------

function get_geolocation(){
  console.log('fetch geolocation');
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geosuccess, geoerror);
  }
}

function geosuccess(position){
  var lati = position.coords.latitude;
  var lngt = position.coords.longitude;
  
  // Verify coordinates that they are between absolute 0 and 90 for latitude and 0 and 180 for longitude
  
  if (Math.abs(lati) >= 0 && Math.abs(lati) <= 90 && Math.abs(lngt) >=0 && Math.abs(lngt) <= 180){
    console.log('got coordinates:' + lati + ' and ' + lngt);
    get_shops(lati, lngt);
  }
  else {
    alert ('coords failed' + lati + lngt);
  }
}

function geoerror(){
  console.log('Geo failed');
}


// round up distance with 25meters accuracy correction
// ---------------------------------------------------------------------

function avsroundup(avsnr){
  
  var avsnr, avsnrr, avsnrhalf;
  avsnr=avsnr+25;
  avsnrr= Math.round(avsnr/100)*100;
  avshalf = Math.round((avsnr-avsnrr+25)/50)*50;
  
  //alert (avsnr + ' ' + avsnrr +' '+ avshalf +' ='+ (avsnrr+avshalf) );
  return (avsnrr+avshalf);
  
  
}


// get shops closest 50 using latitude and longitude
// ---------------------------------------------------------------------

function get_shops(lati, lngt){
  
  
  $.mobile.loading( 'show', {
                   text: '',
                   textVisible: false,
                   theme: 'default',
                   html: ""
                   });
  var furl='http://appavanseracom.avansera.epte.fi/get_stores.php?lat=' + lati + '&lon=' + lngt +'&results=50';
  
  $.ajax({                    /* fetch shops by coordinate from server */
         url : furl,
         type : "get",
         dataType : "json",
         timeout: 5000,
         success : function(data, textStatus, jqXHR) {
         /* alert('data loaded ' + JSON.stringify(data));*/
         
         if (data.status!='OK'){
         console.log('sumting happened');
         
         }
         
         else {  /* populate shopselector */
         var options ='';
         for (var i = 0; i < 50 ; i++){
         options += '<option value="' + data[i].id + '">' + data[i].chain + ' ' + data[i].name +' (' + avsroundup(data[i].distance) + ')' + '</option>';
         }
         
         // alert (options);
         $('#shopselector').html(options);
         $('#shopselector option:selected');
         
         localStorage.setItem('shopselector', options);
         validateshopid();
         $.mobile.loading( 'hide', "");
         set_timestamp();
         }},
         
         error : function(jqXHR, textStatus, errorThrown) {
         console.log('error loading data (SHOPID) :' + errorThrown);
         $.mobile.loading( 'hide', "");
         }
         
         });
  
  
}



// get store name by store id
// ---------------------------------------------------------------------

function avs_getstorename(){
  var furl='http://appavanseracom.avansera.epte.fi/get_shopname.php?shop=' + document.getElementById('shopselector').value + '&userid=' + $('#userselector').val();
  $.ajax({
         url : furl,
         type : "get",
         dataType : "json",
         timeout: 5000,
         success : function(data, textStatus, jqXHR) {
         console.log('data loaded ' + JSON.stringify(data));
         
         if (data.status!='OK'){
         $('#avs_info_noshop').click();
         
         setTimeout(function(){
                    $('.avs_dialog_noshop').dialog('close');
                    window.location.hash='';
                    document.getElementById('shopselector').value=1638;
                    },3000);
         }
         
         else {
         $('#avs_shopname').text(data.shopname);
         $('#avs_shopname_header').text(data.shopname);
         localStorage.setItem('avs_default_shopname', data.shopname);
         $.mobile.loading( 'hide', "");
         set_timestamp();
         
         }
         
         },
         error : function(jqXHR, textStatus, errorThrown) {
         console.log('error loading data (SHOPID) :' + errorThrown);
         $.mobile.loading( 'hide', "");
         }
         });
  
  
}


// ---------------------------------------------------------------------




