'use strict';
var express = require('express');
var router = express.Router();
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

router.get('/produits', function(req, res) {
    jf.readFile(file, function(err, obj) {
        entreprise = obj;
        
        res.render('content/produits', {
            entreprise: entreprise
        });
    });
});

router.post('/produits_filter', function(req, res) {
    modelprod.list_prod(req,res,null,10);
});
// router.get('/condidat/:quest', function(req, res) {
//     if (req.session.pseudo !== undefined) {
//         condidat.to_quiz(req, res);
//     } else {
//         res.redirect('/login');
//     }
// });
module.exports = router;
