// BART API call
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