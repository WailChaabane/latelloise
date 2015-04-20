var _ = require('underscore');
var mysql = require('mysql');
var fs = require('fs');
var dateformat = require('dateformat');
var controleur = /^[0-9a-zA-Z\.\_\-]{1,25}$/i;
var config = require('./config');
var crypto = require('./Model.crypto');
var jf = require('jsonfile');
var file = __dirname + '/../data/entreprise.json';

exports.get_ajout_prod = function(req, res) {
    var connection = mysql.createConnection(config.config);
    connection.connect();
    connection.query("SELECT * FROM categorie;",
        function(err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                jf.readFile(file, function(err, obj) {
                    entreprise = obj;
                    res.render('admin/ajout_prod', {
                        entreprise: entreprise,
                        categories: rows
                    });
                });
            }
        });
    connection.end();
};
exports.list_prod = function(req, res, visiteurs, limit) {
    limit = limit || 10;
    var connection = mysql.createConnection(config.config);
    connection.connect();
    connection.query("SELECT * FROM produit LIMIT " + limit + ";",
        function(err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                var data = [];
                _(rows).each(function(element, indice) {
                    data[indice] = {};
                    _(element).each(function(value, key) {
                        if (key === 'image_prod') {
                            // fs.writeFileSync(__dirname+'/../../public/img/products/produit_'+data[indice].id_prod+'.jpg', new Buffer(value, 'base64'));
                            // data[indice][key]='/img/products/produit_'+data[indice].id_prod+'.jpg';
                            try {
                                data[indice][key] = "data:image/png;base64," + value.toString('base64');
                            } catch (exc) {
                                // console.log("error: image vide.");
                                data[indice][key] = "data:image/png;base64," + new Buffer(0, 'binary').toString('base64');
                            }

                        } else if (key === 'date_prod') {
                            data[indice][key] = dateformat(value, "dd-mm-yyyy");
                        } else if (key === 'etat_prod') {
                            data[indice][key] = (value === '0') ? false : true;
                        } else {
                            data[indice][key] = value;
                        }
                    });
                });
                if (visiteurs !== null) {
                    jf.readFile(file, function(err, obj) {
                        entreprise = obj;
                        res.render('content/home', {
                            entreprise: entreprise,
                            produits: data,
                            visiteurs: visiteurs.length
                        });
                    });
                } else {
                    res.json({
                        stat: "success",
                        produits: data
                        // categories: categories
                    })
                }
                // console.log(data);

            }
        });
    connection.end();
};
exports.ajout_prod = function(req, res) {
    // console.log(req.body);
    var connection = mysql.createConnection(config.config);
    connection.connect();
    connection.query("INSERT INTO `latelloise`.`produit`" +
        " (`desc_prod`,`design_prod`, `prix_prod`, `image_prod`, `date_prod`, `etat_prod`, `id_cpt`, `id_cat`) " +
        "VALUES ('" + req.body.desc_prod + "','" + req.body.design_prod + "', '" + req.body.prix_prod + "', '" + req.body.image_prod.slice(22, req.body.image_prod.length) + "', '" +
        dateformat(req.body.date_prod, "yyyy-dd-mm") + "', '" + req.body.etat_prod + "', '" + req.session.id_cpt + "', '" + req.body.categorie + "');",
        function(err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                var data = [];
                res.json({
                    stat: "success",
                    message: config.message.SUCCESS
                    // categories: categories
                });
                // console.log(data);

            }
        });
    connection.end();
};