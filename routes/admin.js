'use strict';
var express = require('express');
var router = express.Router();
var modelAdmin = require('./models/Model.admin');
var modelprod = require('./models/Model.produit');
var jf = require('jsonfile');
var file = __dirname + '/data/entreprise.json';
var entreprise;
// router.get('/admin', function(req, res) {
//     if (req.session.pseudo !== undefined) {
//         admin.get_home(req, res);
//     } else {
//         res.redirect('/login');
//     }
// });

router.get('/admin', function(req, res, next) {
    jf.readFile(file, function(err, obj) {
        entreprise = obj;
        res.render('admin/home', {
            entreprise: entreprise
        });
    });

});
router.get('/admin/societe', function(req, res, next) {
    jf.readFile(file, function(err, obj) {
        entreprise = obj;
        res.render('admin/societe', {
            entreprise: entreprise
        });
    });

});

router.post('/admin/societe', function(req, res) {
    modelAdmin.config_societe(req, res);
});
router.get('/admin/ajout_prod', function(req, res) {
    modelprod.get_ajout_prod(req, res);
});
router.post('/admin/ajout_prod', function(req, res) {
    modelprod.ajout_prod(req, res);
});
// router.get('/condidat/:quest', function(req, res) {
//     if (req.session.pseudo !== undefined) {
//         condidat.to_quiz(req, res);
//     } else {
//         res.redirect('/login');
//     }
// });
module.exports = router;
