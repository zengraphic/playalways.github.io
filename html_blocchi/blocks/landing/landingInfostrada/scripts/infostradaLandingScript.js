

$(document).ready(function() {
    var counter = $(".infostrada__event--counter"),
        data_event = counter[0].getAttribute("data-event") || "";
    counter
        .countdown(data_event, function(event) {
            $(this)
                .html(event.strftime('<span class="time gg">%D</span> giorni <span class="time hh">%H</span> ore <span class="time mm">%M</span> minuti <span class="time sec">%S</span> secondi'));
        })
        .on('update.countdown', function() {})
        .on('finish.countdown', function() {})
})