var timeNow = moment();
const totalHour = 9; //9am to 5pm, set 
//9am to 5pm, set 
const startHour = 9; 

//function to generate all the time slots rows
function generateSlots() {

    var olEl = $("<ol>");
    olEl.attr("class", "time-block");
    $('div.container').append(olEl);

    //create each row
    for (var i = startHour; i < startHour + totalHour; i++) {
        var liEl = $("<li>");
        liEl.attr("class", "row"); 
        $('ol').append(liEl);

        var str = '';
        //time label, --> 9am
        var h = i % 24; 
        if (h < 12) {
            str = h + "AM";
        } else if (h == 12) {
            str = h + "PM";
        } else {
            str = (h - 12) + "PM";
        }

        //each row has one one label, one textarea input event, one save button
        var label = $("<label>");
        label.attr("class", "col-1 hour py-3");
        label.text(str);
        
        var inputEl = $("<textarea>");
        inputEl.attr({
            'class': "col-10",
            'id': str,
            //time slot hour
            'data-begin': h, 
        });

        label.attr("for", inputEl.attr('id'));
        //check LS for refresh
        inputEl.val(localStorage.getItem(inputEl.attr('id'))); 

        var saveBtn = $('<button>');
        saveBtn.attr("class", "col-1 saveBtn");
        //save icon
        saveBtn.html("<i class='fa fa-save'></i>")

        liEl.append(label).append(inputEl).append(saveBtn);  
        
        //save button onclick listener
        saveBtn.click(function(e) {callback(e)});
    }
}

function changeClass(element, target) {
    var classList = ['past', 'present','future'];
    var idx = classList.indexOf(target);

    for (var i = 0; i < classList.length; i++) {
        if (i === idx) {
            element.toggleClass(classList[i], true);
        } else {
            element.toggleClass(classList[i], false);
        }
    }
}

// change color class 
function setTime() {
    
    dateToday = timeNow.format('dddd, MMMM DD');
    $('#currentDay').text(dateToday);
    
     
    $('textarea').each(function() {
        if ($(this).attr('data-begin') < timeNow.hour()) { 
            changeClass($(this), 'past');     
        }  else if ($(this).attr('data-begin') == timeNow.hour()) {
            changeClass($(this), 'present'); 
        } else {
            changeClass($(this), 'future');
        }
    });
}

//callback function for click save button eventlistener
function callback(event) {
    var element = $( event.target );
    if (element.is( "i" )) { 
        element = element.parent();
    }
    var inputEl = element.prev();
    var key = inputEl.attr('id');
    var value = inputEl.val();
    localStorage.setItem(key, value);
}

$( document ).ready(function() {
    generateSlots(); //create DOM 
    setTime(); // set time in description and color class in each row after page loaded

    //timer trigger update time slot every hour
    var timer = setInterval(function() {
        timeNow = moment(); 
        var curMin = curTime.minute();
        minLeftBfRefresh = (60 - curMin) % 60;
        if (minLeftBfRefresh === 0) {
            setTime();
        }
    }, 1000 * 60);  
});
