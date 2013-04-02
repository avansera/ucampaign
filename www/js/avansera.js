/** ********************************************************************
 * Avansera Bar Code Scanner, AppGyver Project, Phone gap project
 *
 *
 *
 *
 * Version 1.0,   26.2.2013 Christer Nyberg
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

function avs_dicnt_add(){
  var value = $('#avs_discount').val();
  value++;
  console.log('discount ad ###KRISU### :' + value);
  $('#avs_discount').val(value);
}

function avs_dicnt_sub(){
  var value = document.getElementById('avs_discount').value;
  value =value - 1;
  if (value < 0) {value = 0;}
  var n=value.toFixed(2);
  console.log('discount sub ###KRISU### :' + n);
  document.getElementById('avs_discount').value=n;
}

function avs_price_add(){
  var value = (($('#avs_price').val()/1)+0.01);
  var n=value.toFixed(2);
  console.log('price add ###KRISU### :' + n);
  $('#avs_price').val(n);
}

function avs_price_sub(){
  var value = document.getElementById('avs_price').value;
  value =value - 0.01;
  if (value < 0) {value = 0;}
  var n=value.toFixed(2);
  console.log('avs_price_minus() ###KRISU### :' + n);
  document.getElementById('avs_price').value=n;
}

function avs_pcsam_add(){
  var value = ((document.getElementById('avs_amount').value/1)+50);
  var n=value.toFixed(2);
  console.log('avs_amount_add()  ###KRISU### :' + n);
  $('#avs_amount').val(n);
}

function avs_pcsam_sub(){
  var value = document.getElementById('avs_amount').value-50;
  if (value < 0) {value = 0;}
  var n=value.toFixed(2);
  console.log('avs_amount_sub() ###KRISU### :' + n);
  document.getElementById('avs_amount').value=n;
}


// Picker settings
// ---------------------------------------------------------------------

function picker_select(){
  
  console.log('Starting to create plugin pickerView set 2 ### KRISU ###');
  var slots = [
               {name: 'foo', value: 'baz', data: [
                                                  {value: 'foo', text: 'Displayed Foo'},
                                                  {value: 'bar', text: 'Displayed Bar'},
                                                  {value: 'baz', text: 'Displayed Baz'}
                                                  ]}
               ];
  
  window.plugin.pickerView.create('Title', slots, function(selectedValues, buttonIndex) {
                    console.warn('create(), arguments=' + Array.prototype.slice.call(arguments).join(', '));
                    });
}

  /* var slots = [
               {name : 'limit_speed', title: 'Speed', data : [
                                                              {text: '50 KB/s', value: 50},
                                                              {text: '100 KB/s', value: 100},
                                                              {text: '200 KB/s', value: 200},
                                                              {text: '300 KB/s', value: 300}
                                                              ]},
               {name : 'road_type', title: 'Road', data : [
                                                           {text: 'Highway', value: 50},
                                                           {text: 'Town', value: 100},
                                                           {text: 'City', value: 200},
                                                           {text: 'Depart', value: 300}
                                                           ]}
               ];
  
  var options = {
  title: 'title',
  style: 'black-opaque',
  doneButtonLabel: 'OK',
  cancelButtonLabel: 'Cancel',
  sourceRect: [100.0, 100.0, 20.0, 20.0], // iPad
  arrowDirection: 'up' // iPad
  };
  
  window.plugins.pickerView.create(slots, options, function(selectedValues, buttonIndex) {
                                   var args = Array.prototype.slice.call(arguments, 0);
                                   }
                                   );
  }*/
  /*
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
  
  console.log('Slots Defined');
  
  window.plugins.pickerView.create('', slots, function(selectedValues, buttonIndex) {
      console.warn('create(), arguments=' + Array.prototype.slice.call(arguments).join(', '));
      }, {style: 'black-opaque', doneButtonLabel: 'OK', cancelButtonLabel: 'Hylkää', sourceRect: [100.0, 100.0, 20.0, 20.0], arrowDirection: 'up'});
  console.log('error loading data :' + errorThrown);
  */



// setTimeout for picker selct
// ---------------------------------------------------------------------

setTimeout(function() {
           pickerView.setValue({limit_speed: 100, road_type: 200}, {animated: true});
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




// Scan barcode and place results to input box
// ---------------------------------------------------------------------

    function barcode_scan(){
      window.plugins.barcodeScanner.scan
      (
       function(result){
          if (result.cancelled)
            $('.ean_meta').text(result.text);
          else {
            // document.getElementById('avsEA').innerHTML=result.text;
            //document.getElementsByName('avs_ean')[0].value=result.text;
            $('.eancode').text(result.text);
            $('.ean_meta').text(result.text);
       // shopID
       $.mobile.loading( 'show', {
                        text: '',
                        textVisible: false,
                        theme: 'default',
                        html: ""
                        });
       var furl='http://appavanseracom.avansera.epte.fi/get_ean.php?ean=' + result.text + '&shop=1638';
       $.ajax({
              url : furl,
              type : "get",
              dataType : "json",
              timeout: 5000,
              success : function(data, textStatus, jqXHR) {
              console.log('data loaded ' + JSON.stringify(data));
              $('.ean_meta').html('EAN: '+result.text +'<br>Tuote: '+ data.name +'<br>Hinta: '+data.price+' €');
              $('#avs_price').val(data.price);
              
              
              },
              error : function(jqXHR, textStatus, errorThrown) {
              console.log('error loading data :' + errorThrown);
              }
              });

      if (data.name==null){
       $.mobile.loading( 'show', {
                        text: 'Viivakoodia ei löytynyt',
                        textVisible: true,
                        theme: 'z',
                        textonly: textonly,
                        html: ""
                        });
       
       setInterval(function(){
                   $.mobile.loading( 'hide', "");
                   },2000);
       }
       else {
            $.mobile.loading( 'hide', "");
            window.location.hash='avansera_app';
            set_timestamp();
            }
       } }

        function(error){
          document.getElementById('avsEA').innerHTML="error" + error
          }
        );
    }


// Success Function?




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



// Fetch geo location and show it to client (does not work currently)
// ---------------------------------------------------------------------
    function get_location(){
      if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    } 
    
    function successFunction(position) {
      var lati = position.coords.latitude;
      var lngt = position.coords.longitude;
	}
}

      
// ---------------------------------------------------------------------

function populate_stores( box ) {
	// Isolate the appropriate list by using the value
	// of the currently selected option

	list = lists[box.options[box.selectedIndex].value];

	// Next empty the slave list

	emptyList( box.form.slave );

	// Then assign the new list values

	fillList( box.form.slave, list );
}


// ---------------------------------------------------------------------
    function get_location(){
      if (navigator.geolocation) {
      var timeoutVal = 10 * 1000 * 1000;
      navigator.geolocation.getCurrentPosition(
        displayPosition, 
        displayError,
        { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
        );
       }
      else {
        alert("Geolocation is not supported by this browser");
       }
}

    function displayPosition(position) {
     xmlhttp.open("GET","http://appavanseracom.avansera.epte.fi/get_stores.php?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "",true);
     // alert("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
}



    function displayError(error) {
      var errors = { 
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
       };
      alert("Error: " + errors[error.code]);
}
