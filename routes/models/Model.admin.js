var _ = require('underscore');
var mysql = require('mysql');
var controleur = /^[0-9a-zA-Z\.\_\-]{1,25}$/i;
var config = require('./config');
var crypto = require('./Model.crypto');
var jf = require('jsonfile');
/*Authentification*/
exports.login = function(request, callback) {
    if (controleur.test(request.body.pseudo) && controleur.test(request.body.mdp)) {
        var connection = mysql.createConnection(config.config);
        connection.connect();
        // console.log(crypto.encrypt(request.body.mdp));
        // appeler une procedure.
        //call questionnaire.getCompte('amina', 'amina',@first,@second);
        connection.query("SELECT * FROM compte WHERE pseudo_cpt='" + request.body.pseudo + "' AND pass_cpt ='" + crypto.encrypt(request.body.mdp) + "';",
            function(err, rows, fields) {
                if (err) {
                    callback.json({
                        message: config.message.ERROR_CON,
                        stat: "failed"
                    });
                    console.log(err);

                    // throw err;
                } else {
                    // console.log(rows);
                    if (!_.isEmpty(rows[0])) {
                        if (rows[0].etat_cpt == 'active') {
                            request.session.pseudo = rows[0].pseudo_cpt;
                            request.session.email = rows[0].email_cpt;
                            request.session.id_cpt = rows[0].id_cpt;
                            request.session.type_cpt = rows[0].type_cpt;
                            callback.json({
                                message: config.message.SUCCESS,
                                type: request.session.type_cpt,
                                stat: "success"
                            });
                        } else {
                            callback.json({
                                message: config.message.NOT_ACTIVE,
                                stat: "failed"
                            });
                        }
                    } else {
                        callback.json({
                            message: config.message.NOT_EXIST,
                            stat: "failed"
                        });
                    }

                }
            });
        connection.end();

    } else {
        callback.json({
            stat: "failed"
        });
    }
};
exports.config_societe = function(req, res) {
    // entreprise.nom= req.body.data.nom_soc;
    try {
        var configData = {};
        _(req.body).map(function(element, key) {
            if (element.length > 0) {
                if (key === "presentation") {
                    configData[key] = "";
                    var jsonPres = JSON.parse(element);
                    console.log(jsonPres);
                    _(jsonPres.data).each(function(row, i) {
                        switch (row.type) {
                            case "heading":
                                {
                                    configData[key] += "<br><h5>" + row.data.text + "</h5>";
                                }
                                break;
                            case "text":
                                {
                                    configData[key] += row.data.text;
                                }
                                break;
                            case "quote":
                                {
                                    configData[key] += row.data.text;
                                }
                                break;
                            case "list":
                                {
                                    configData[key] += row.data.text;
                                }
                                break;
                        }
                    });

                } else {
                    configData[key] = element;
                }
            }

        });
        console.log(configData);
        var file = __dirname + '/../data/entreprise.json';
        jf.readFile(file, function(err, obj) {
            var oldData = obj;
            if (!_.isEmpty(req.files)) {
                configData.logo = "/img/" + req.files.logo.name;
            }
            var newData = _.extendOwn(oldData, configData);
            jf.writeFile(file, newData, function(err) {
                if (err) {
                    console.log(err);
                    res.json({
                        message: err.CODE,
                        stat: "failed"
                    });
                } else {
                    res.json({
                        message: config.message.SUCCESS,
                        stat: "success"
                    });
                }

            });
        });

    } catch (e) {
        console.log(e);
    }
};
