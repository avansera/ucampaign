Ext.application({

    name: 'CordovaPicker',

    launch: function() {

        var callback = function() {
            console.warn('callback(), arguments=' + Array.prototype.slice.call(arguments).join(', '));
        };

        setTimeout(function() {

            var picker = Ext.create('Ext.Picker', {
                slots: [
                    {
                        name : 'limit_speed',
                        title: 'Speed',
                        data : [
                            {text: '50 KB/s', value: 50},
                            {text: '100 KB/s', value: 100},
                            {text: '200 KB/s', value: 200},
                            {text: '300 KB/s', value: 300}
                        ]
                    }
                ]
            });

            picker.on({change: function(picker, selectedValues, options, event) { console.warn('callback', arguments); }});
            Ext.Viewport.add(picker);
            picker.show();

            return;

            var datePicker = Ext.create('Ext.picker.Date', {
                value: new Date(),
                slotOrder: ["day", "month", "year"]
            });

            datePicker.on({change: function(picker, value, options, event) { console.warn('callback', arguments); }});
            Ext.Viewport.add(datePicker);
            datePicker.show();

        }, 200);

    }

});
