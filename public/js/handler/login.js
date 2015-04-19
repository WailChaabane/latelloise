$("#loginForm").submit(function(ev) {
    ev.preventDefault();
    var _thisAction = $(this).attr('action');
    /* reponse */
    var loader = document.querySelector('#loader');
    $(loader).addClass('active');
    var pseudo = document.querySelector('input[name="pseudo"]').value;
    var mdp = document.querySelector('input[name="mdp"]').value;
    //send Data
    $.ajax({
        url: _thisAction,
        type: 'POST',
        //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
        data: {
            pseudo: pseudo,
            mdp: mdp
        }
    })
        .done(function(resultat) {
            if (resultat.stat === 'success') {
                Materialize.toast('<p>'+resultat.message+'</p>', 5000, 'green');
                setTimeout(function() {
                    document.location = "/admin";
                }, 1500);
            } else if (resultat.stat === 'failed') {
                Materialize.toast('<p>'+resultat.message+'</p>', 5000, 'orange');
            }
        })
        .fail(function() {
            Materialize.toast('<p>Impossible d\' effectuer cette operation.</p>', 5000,'red');
        }).complete(function () {
            document.querySelector('#toast-container').className='fixed-bottom';
            setTimeout(function () {
                $(loader).removeClass('active');
            },1000);
        });
});
