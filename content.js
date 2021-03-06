// Schedules call
$.ajax({
    type: 'GET',
    url: 'http://api.bart.gov/api/etd.aspx?cmd=etd&orig=12TH&key=MW9S-E7SL-26DU-VV8V',
    dataType: 'xml',
    success: parseSchedule
});

function parseSchedule(xml) {

    var times = [];
    
    $(xml).find('etd').each(function() {
        if($(this).find('abbreviation').text() === 'MLBR' || $(this).find('abbreviation').text() === 'FRMT') {
            $(this).find('minutes').each(function() {
                times.push($(this).text());
            });
        };
    });

    // Sort array
    function sortAs(a,b) {
      return a - b;
    };
    times.sort(sortAs);

    // Trim 'min' if train time is stating 'arriving' or 'leaving'
    if (times[0] === 'arriving' || times[0] === 'leaving') {
        $('.train-time').append('<span>' + times[0] + '</span>');
    } else {
        $('.train-time').append('<span>' + times[0] + ' min</span>');
    };

    $('.next-train-time').append('<span>next train ' + times[1] + ' min</span>');
};

// Advisory call
$.ajax({
    type: 'GET',
    url: 'http://api.bart.gov/api/bsa.aspx?cmd=bsa&key=MW9S-E7SL-26DU-VV8V&date=today',
    dataType: 'xml',
    success: parseAdvisory
});

function parseAdvisory(xml) {

    $(xml).find('description').each(function() {
        if ($(this).text() === 'No delays reported.') {
            $('#advisory-list').append('<li>all trains on-time</li>');
        } else {
            $('#advisory-list').append('<li>' + $(this).text() + '</li>');
        };
    });
    
};

