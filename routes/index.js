var express = require('express');
var _ =require('underscore');
var router = express.Router();
var jf = require('jsonfile');
var entreprise;
var file = __dirname + '/data/entreprise.json';
var admin = require('./admin');
var produits = require('./produits');
var modelAdmin = require('./models/Model.admin');
var modelProd = require('./models/Model.produit');
var mailer= require('./mailer');
var visiteurs=[];
/* GET home page. */
router.get('/', function(req, res, next) {
    var ipBrut=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var ip=ipBrut.split(':')[3];
    if(!_.contains(visiteurs,ip) && ip!== undefined){
        visiteurs.push(ip);
    }
    modelProd.list_prod(req,res,visiteurs);
    // mailer.envoyerMail();
});
router.get('/presentation', function(req, res) {
    jf.readFile(file, function(err, obj) {
        entreprise = obj;
        res.render('content/presentation', {
            entreprise: entreprise
        });
    });
});
router.get('/contact', function(req, res) {
    jf.readFile(file, function(err, obj) {
        entreprise = obj;
        res.render('content/contact', {
            entreprise: entreprise
        });
    });
});
router.post('/contact', function(req, res) {
    jf.readFileSync(file, function(err, obj) {
        entreprise = obj;
    });
    var mailOptions = {
        from: 'LA TELLOISE '+entreprise.email, // sender address
        to: entreprise.email, // list of receivers, baz@blurdybloop.com
        subject: 'Contact Site :'+req.body.email, // Subject line
        // text: 'Hello world ✔', // plaintext body
        html: '<b>'+req.body.message+'</b>' // html body
    };
    mailer.envoyerMail(mailOptions);
    res.json({
        stat:"success",
        message:"Message Envoyé avec Succé."
    });
});

router.route(/produits[\/.]*/)
    .all(function(req, res, next) {
        next();
    }).get(produits)
    .post(produits);

router.post('/login', function(req, res) {
    modelAdmin.login(req, res);
});
router.get('/login', function(req, res) {
    req.session.destroy();
    jf.readFile(file, function(err, obj) {
        entreprise = obj;
        res.render('admin/login', {
            entreprise: entreprise
        });
    });
});
router.route(/admin[\/.]*/)
    .all(function(req, res, next) {
        if (req.session.pseudo !== undefined) {
            next();
        } else {
            res.redirect('/login');
        }
    }).get(admin)
    .post(admin);
module.exports = router;
