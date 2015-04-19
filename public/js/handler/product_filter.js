jQuery(document).ready(function($) {
    
    $.ajax({
            url: "/produits_filter",
            type: 'POST',
            //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
            data: {},
        })
        .done(function(resultat) {
            if (resultat.stat === 'success') {
                var container = document.querySelector('#Container');
                _(resultat.produits).each(function(produit) {
                    container.appendChild(new_product(produit));
                });
                setTimeout(function () {
                    $('#Container').mixItUp({
                        animation: {
                            duration: 400,
                            effects: 'scale(0.01) fade',
                            easing: 'ease'
                        }
                    });
                },1700);
                
            } else if (resultat.stat === 'failed') {

            }
        })
        .fail(function() {
            toast('<p>Impossible d\' effectuer cette operation.</p>', 5000, ' red ');
            document.querySelector('#toast-container').className = 'fixed-bottom';
            setTimeout(function() {
                $(loader).removeClass('active');
            }, 1000);
        }).complete(function() {});
});

function new_product(product) {
    var mix = document.createElement('div');
    mix.className = "col s12 m4 l3 mix category_" + product.id_cat;
    mix.dataset.myorder= product.id_prod;
    mix.innerHTML = '<div class="card small">' +
        '<div class="card-image waves-effect waves-block waves-light">' +
        '<img src="' + product.image_prod + '" height="200" class="activator"/></div>' +
        '<div class="card-content">' +
        '<span class="card-title card-title-small activator grey-text text-darken-4">' +
        product.desc_prod +
        '<i class="mdi-navigation-more-vert right"></i></span>' +
        '<p><a href="#" class="deep-orange-text">' + product.prix_prod +
        ' DA</a></p>  </div>  <div class="card-reveal">'+
        '<span class="card-title card-title-small grey-text text-darken-4">'+product.desc_prod+
        '<i class="mdi-navigation-close right"></i></span> '+
        '<p><span>'+product.date_prod+'</span><br/>'+
        ((product.etat_prod)? '<span class="green-text">disponible</span>':'<span class="red-text">non disponible</span>')+'<br/>'+product.design_prod+'</p></div></div>';
    return mix;
}
