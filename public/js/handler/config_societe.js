var editeur = new SirTrevor.Editor({
    el: $('.js-st-instance'),
    blockLimit: 10,
    blockTypes: ["Text", "Heading", "Quote", "List"]
});
$('input[type="file"]').change(function(e) {
    var img = document.querySelector('.resize-image');
    img.src = URL.createObjectURL(e.target.files[0]);
    resizeableImage($('.resize-image'));
    var crop = document.querySelector('.btn-crop');
    // crop.addEventListener('click', function (e2) {
    //     console.dir($('.resize-image'));
    // });

    $('.materialboxed').materialbox();
});

$("#configSociete").submit(function(e) {
    e.preventDefault();
    var _this = this;
    // var _thisAction = $(this).attr('action');
    var loader = document.querySelector('#loader');
    $(loader).addClass('active');
    var inputs = this.querySelectorAll('input[name],textarea');
    var data = {};
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value !== "") {
            if (inputs[i].name === "logo" && document.querySelector('#imgResult img').src !== null) {
                data[inputs[i].name] = document.querySelector('#imgResult img').src;
            } else {
                data[inputs[i].name] = inputs[i].value;
            }
        }
    }
    var _thisAction = $(this).attr('action');
    // send data
    $.ajax({
        url: _thisAction,
        type: "POST",
        data: data
    }).done(function(response) {
        if (response.stat === 'success') {
            Materialize.toast('<p>' + response.message + '</p>', 5000, 'green');
        } else if (response.stat === 'failed') {
            Materialize.toast('<p>' + response.message + '</p>', 5000, 'orange');
        }
    }).fail(function(xhr) {
        Materialize.toast('<p>Impossible d\' effectuer cette operation.</p>', 5000, 'red');
    }).complete(function() {
        document.querySelector('#toast-container').className = 'fixed-bottom';
        setTimeout(function() {
            $(loader).removeClass('active');
        }, 1000);
    });
    // return false;
});