$("#ajoutProd").submit(function(e) {
    e.preventDefault();
    var _this = this;
    // var _thisAction = $(this).attr('action');
    var loader = document.querySelector('#loader');
    $(loader).addClass('active');
    var inputs = this.querySelectorAll('input[name],textarea,select');
    var data = {};
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value !== "") {
            if (inputs[i].name === "image_prod" && document.querySelector('#imgResult img').src !== null) {
                data[inputs[i].name] = document.querySelector('#imgResult img').src;
            } else {
                data[inputs[i].name] = inputs[i].value;
            }
        }
    }
    var _thisAction = $(this).attr('action');
    console.log(data);
    // send data
    // $.ajax({
    //     url: _thisAction,
    //     type: "POST",
    //     data: data
    // }).done(function(response) {
    //     if (response.stat === 'success') {
    //         Materialize.toast('<p>' + response.message + '</p>', 5000, 'green');
    //     } else if (response.stat === 'failed') {
    //         Materialize.toast('<p>' + response.message + '</p>', 5000, 'orange');
    //     }
    // }).fail(function(xhr) {
    //     Materialize.toast('<p>Impossible d\' effectuer cette operation.</p>', 5000, 'red');
    // }).complete(function() {
    //     document.querySelector('#toast-container').className = 'fixed-bottom';
    //     setTimeout(function() {
    //         $(loader).removeClass('active');
    //     }, 1000);
    // });
    // return false;
});