$("#contactForm").submit(function(e) {
    e.preventDefault();
    var _this = this;
    // var _thisAction = $(this).attr('action');
    var loader = document.querySelector('#loader');
    $(loader).addClass('active');
    // var inputs = this.querySelectorAll('input[name],textarea');
    // var data={};
    // for (var i = 0; i < inputs.length; i++) {
    //  if(inputs[i].value.length > 0){
    //            data[inputs[i].name] = inputs[i].value;
    //        }

    // }
    // send data
    $(_this).ajaxSubmit({
        type: 'POST',
        error: function(xhr) {
            Materialize.toast('<p>Impossible d\' effectuer cette operation.</p>', 5000,'red');
        },

        success: function(response) {
            if (response.stat === 'success') {
                Materialize.toast('<p>' + response.message + '</p>', 5000, 'green');
            } else if (response.stat === 'failed') {
                Materialize.toast('<p>' + response.message + '</p>', 5000, 'orange');
            }
        },
        complete: function() {
            document.querySelector('#toast-container').className = 'fixed-bottom';
            setTimeout(function() {
                $(loader).removeClass('active');
            }, 1000);
        }
    });
});
