/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        // Save the appointment
        $("#btn-save").on("touchend", function () { 
            app.saveAppointment();
         });

        // Reset form fields
        $("#btn-create").on("touchend", function () { 
            $('#title').val('');
            $('#date').val('');
            $('#time').val('');
            $('#minutes').val(2);
         });
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {

    },

    saveAppointment: function() {

        var title    = $('#title').val(),
            dateStr  = $('#date').val().trim(),
            timeStr  = $('#time').val().trim(),
            minutes  = parseInt($('#minutes').val()),
            notes    = '',
            location = '';

        // Validate form
        if (dateStr.length == 0) {
            alert('Please pick date for appointment');
            return;
        }

        if (timeStr.length == 0) {
            alert('Please pick time for appointment');
            return;
        }

        // Solve timezone issues
        var date  = dateStr.split('-');
        var year  = parseInt(date[0]);
        var month = parseInt(date[1] - 1); // Starting form 0
        var day   = parseInt(date[2]);

        var time  = timeStr.split(':');
        var hour  = parseInt(time[0]);
        var min   = parseInt(time[1]);

        var startDate = new Date(year, month, day, hour, min, 0, 0, 0);

        var endDate = startDate;

        var success = function(message) {
            app.handleSuccess(message);
        };
        
        var error = function(message) {
            alert("Error: " + message);
        };

        var options = {};
        options.firstReminderMinutes = minutes;
        window.plugins.calendar.createEventWithOptions(title,location,notes,startDate,endDate,options,success,error);
    },

    /**
     * Handle appointment creation
     * Show alert success message, then close the opened modal
     */

    handleSuccess: function(message) {

        alert('Appointment created successfully');

        // Close modal
        $('#appointment-modal').modal('hide');
    },
};
