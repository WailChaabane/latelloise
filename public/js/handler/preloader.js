var loaders, w, d, e, g, x, y;
(function() {
    w = window;
    d = document;
    e = d.documentElement;
    g = d.getElementsByTagName('body')[0];
    x = w.innerWidth || e.clientWidth || g.clientWidth;
    y = w.innerHeight || e.clientHeight || g.clientHeight;
    loaders = document.querySelector('.loaders');
    loaders.style.marginLeft = (x / 2) - 100 + 'px';
    loaders.style.marginTop = (y / 2) - 100 + 'px';
    setTimeout(function() {
        loaders.style.opacity = 1;

    }, 500);


})();

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.querySelector('.contentPage').removeChild(loaders);
    }, 1000);
    setTimeout(function() {
        document.querySelector('.mainPage').className += ' loaded ';
    }, 1200);
});
