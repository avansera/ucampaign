/*jslint browser: true, bitwise: true,continue: true, debug: true, eqeq: true, es5: true, evil: true, newcap: true, plusplus: true, sloppy: true, stupid: true, sub: true, vars: false, white: true maxerr: 1000 */
/*global $, jQuery, alert */

/** ********************************************************************
 * Avansera Bar Code Scanner, AppGyver Project, Phone gap project
 * updated to work with iOS cordova project
 *
 *
 *
 *
 * Version 1.0,   26.2.2013 Christer Nyberg
 * Version 1.1,   10.4.2013 Christer Nyberg
 * Version 1.2,   16.4.2013 Christer Nyberg
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


// spinningwheel.js test
// ---------------------------------------------------------------------

options_array=new Object();


function swExample(){
	var numbers = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9 };
	SpinningWheel.addSlot(numbers, 'right');
	SpinningWheel.addSlot(numbers, 'right');
	SpinningWheel.addSlot({ separator: '.' }, 'readonly shrink');
	SpinningWheel.addSlot(numbers, 'right');
	SpinningWheel.addSlot({ Kg: 'Kg', Lb: 'Lb', St: 'St' }, 'shrink');
    
	SpinningWheel.setCancelAction(cancel);
	SpinningWheel.setDoneAction(done);
    
	SpinningWheel.open();
}

function done() {
	var results = SpinningWheel.getSelectedValues();
	alert('values:' + results.values.join(', ') + ' - keys: ' + results.keys.join(', '));
}

function cancel() {
	alert('cancelled!');
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



// Picker settings
// ---------------------------------------------------------------------

function picker_select(){
    
    plugintitle='Choose your store';
    
    /* console.log('open UIPickerView ###');
    pwresults=plugin.createComplex(options_array,plugintitle);
    console.log('clozeee UIPickerView ###');
    
    //pwresults=window.localStorage.getItem('selector_results'); */
    
    console.log('Shop Select4d' + JSON.stringify(slots));

    
    var options = {
        title: plugintitle,
        doneButtonLabel: 'Done',
        cancelButtonLabel: 'Cancel',
        sourceRect: [100.0, 100.0, 20.0, 20.0], // iPad
        arrowDirection: 'up' // iPad
    };
    
    window.plugins.pickerView.create(options_array, options, function(selectedValues, buttonIndex) {
                                     var args = Array.prototype.slice.call(arguments, 0);
                                     // window.localStorage.setItem('selector_results', JSON.stringify(args));
                                     console.log('Shop Select4d' + JSON.stringify(args));
                                         
                                    });
    
    alert('selecti bifoor ' + pwresults);
}




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
    
    avs_clear_geotimer();
    
    // console.log('storename got, and starting barcode scanner...');
    //
    // dont read twice storename, slows down already slow program
    
    window.plugins.barcodeScanner.scan(function(result){
                                       if (result.cancelled){
                                       $('.ean_meta').text(result.text);
                                       }
                                       
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
                                              avs_clear_geotimer();
                                              $('#avs_info').click();
                                              set_timestamp();
                                              }
                                              else {
                                              $.mobile.loading( 'hide', "");
                                              //$.mobile.navigate( "#avansera_app" );
                                              avs_clear_geotimer();
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
        avs_startdate = new Date().toISOString();
    }
    else{
        avs_startdate = new Date(startdate).toISOString();
    }
    
    var enddate = document.getElementById('avs_enddate').value;
    if (enddate == ''){
        avs_enddate = new Date(1,1,1).toISOString();
    }
    else{
        avs_enddate = new Date(enddate).toISOString();
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
           if (data.status!=='OK'){
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
           avs_geotimer();
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
        avs_getstorename();
        
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
    
    // Set default coords to Kamppi 60.169583°N 24.933444°E.
    
    localStorage.setItem('latitude', '60.169583');
    
    localStorage.setItem('longitude', '24.933444');
    
}


function loaddefaults(){
    
    //alert('loading defaults ..' );
    
    
    
    avs_load_list();
    
    localStorage.setItem('geotimer', '0');
    
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
        //alert('booting');
        
    }
    else {
        
        // Write defaults to phone memory storage
        initdefaults();
        alert('defaults written to local storage ' );
        
        
    }
    // alert('defaults loaded ####################### APP READY #####' );
    
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


// update new geolocation every 30 seconds
// ---------------------------------------------------------------------




function avs_set_geotimer(avs_seconds){
    if (arguments[0] == undefined){
        avs_seconds = 30;
    }
    else {
        avs_seconds=arguments[0];
    }
    
    console.log('Check if geotimer exists');
    
    if (localStorage.getItem('geotimer')!=1){
        localStorage.setItem('geotimer', '1');
        window.geolocation_timer = setInterval(function(){get_geolocation()},avs_seconds*1000);
        console.log('init new geotimer');
        
    }
    console.log('geotimer timer id: ' + window.geolocation_timer + ' and milliseconds ' + avs_seconds*1000);
    
}

function avs_clear_geotimer(){
    console.log('clear geotimer.....   ');
    clearInterval(window.geolocation_timer);
    localStorage.setItem('geotimer', '0');
    
}




// Fetch geo location and show it to client (does actually work now)
// ---------------------------------------------------------------------

function get_geolocation(){
    console.log('fetch geolocation.....   ');
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geosuccess, geoerror, {maximumAge:600000});
    }
}

function geosuccess(position){
    var lati = position.coords.latitude;
    var lngt = position.coords.longitude;
    
    // init timeout to repeat every 30 sec..
    
    avs_set_geotimer();
    
    // alert ('coords got ' + lati + lngt);
    
    
    // Verify coordinates that they are between absolute 0 and 90 for latitude and 0 and 180 for longitude
    
    if (Math.abs(lati) >= 0 && Math.abs(lati) <= 90 && Math.abs(lngt) >=0 && Math.abs(lngt) <= 180){
        console.log('got coordinates:' + lati + ' and ' + lngt);
        localStorage.setItem('latitude', lati);
        localStorage.setItem('longitude', lngt);
        get_shops(lati, lngt);
        
    }
    else {
        
        alert ('coords failed' + lati + lngt);
        
        switch(error.code)
        {
            case error.PERMISSION_DENIED:
                alert('This application requires user to accept geolocation!');
                avs_clear_geotimer();
                break;
                
            case error.POSITION_UNAVAILABLE:
                alert('Could not detect current position!');
                break;
                
            case error.TIMEOUT:
                
                // Fallback to previous stored coords
                lati=localStorage.getItem('latitude');
                lngt=localStorage.getItem('longitude');
                get_shops(lati, lngt);
                
                //alert("Retrieving position timed out");
                break;
                
            default: alert('unknown error');
                break;
        }
        
    }
}

function geoerror(){
    console.log('Geo failed');
}


// round up distance with 25meters accuracy correction
// ---------------------------------------------------------------------

function avsroundup(avsnr){
    
    var avsnrr, avshalf;
    avsnr=avsnr+25;
    avsnrr= Math.round(avsnr/100)*100;
    avshalf = Math.round((avsnr-avsnrr+25)/50)*50;
    
    //alert (avsnr + ' ' + avsnrr +' '+ avshalf +' ='+ (avsnrr+avshalf) );
    return (avsnrr+avshalf);
    
    
}


// get shops closest 50 using latitude and longitude
// ---------------------------------------------------------------------

function get_shops(lati, lngt){
    var i = 0;
    
    
    $.mobile.loading( 'show', {
                     text: 'loading',
                     textVisible: false,
                     theme: 'default',
                     html: ''
                     });
    var furl='http://appavanseracom.avansera.epte.fi/get_stores.php?lat=' + lati + '&lon=' + lngt +'&results=50';
    
    //alert (furl);
    
    $.ajax({                    /* fetch shops by coordinate from server */
           url : furl,
           type : "get",
           dataType : "json",
           timeout: 5000,
           success : function(data, textStatus, jqXHR) {
           /* alert('data loaded ' + JSON.stringify(data));*/
           
           if (data.status!=='OK'){
           console.log('sumting happened');
           
           }
           
           else {  /* populate shopselector */
           var options ='';
           options_array.data = 'jotain' ;
           
           /*els[0][0].id = 'input5';
           els[0][1].id = 'input6';
           els[1][0].id = 'input7';
           els[1][1].id = 'input8';
            */
           
           options_array=[{name : 'placeholder', title: 'value', data : [ {text: 'placeholder', value: 0} ]}];
           options_array[0]['name']='set_store';
           options_array[0]['title']='ShopSelector';
           
           
           for (i = 0; i < 50 ; i++){
           options += '<option value="' + data[i].id + '">' + data[i].chain + ' ' + data[i].name +' (' + avsroundup(data[i].distance) + ')' + '</option>';
           arrtext=data[i].chain + ' ' + data[i].name +' (' + avsroundup(data[i].distance) + 'm)';
           arrshopid=data[i].id;
           options_array[0].data[i]={text: arrtext, value: arrshopid};
           }
           


           
           
           //localStorage.setItem('shopidobject',options_array);
           
           //alert (JSON.stringify(options_array));
           //justandjust=plugin.createComplex(options_array,'Shop Selekti');
           
           // alert (options);
           $('#shopselector').html(options);
           $('#shopselector option:selected');
           
           localStorage.setItem('shopidobject', options_array);
           
           localStorage.setItem('shopselector', options);
           
           validateshopid();
           $.mobile.loading( 'hide', '');
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
           
           if (data.status!=='OK'){
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




