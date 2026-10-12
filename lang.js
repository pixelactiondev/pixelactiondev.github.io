// Sprache wählen: ?lang=de|en|tr (z. B. aus dem Spiel), sonst gespeicherte Wahl, sonst Gerätesprache.
// Ohne JavaScript bleiben alle drei Sprachen sichtbar.
(function () {
  var LANGS = ['de', 'en', 'tr'];
  var root = document.documentElement;
  function pick() {
    var q = (location.search.match(/[?&]lang=([a-z]{2})/) || [])[1];
    if (LANGS.indexOf(q) >= 0) return q;
    try {
      var s = localStorage.getItem('pa-lang');
      if (LANGS.indexOf(s) >= 0) return s;
    } catch (e) {}
    var n = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return LANGS.indexOf(n) >= 0 ? n : 'en';
  }
  function show(l) {
    root.setAttribute('data-show', l);
    root.setAttribute('lang', l);
    var t = document.querySelector('meta[name="title-' + l + '"]');
    if (t) document.title = t.getAttribute('content');
    var b = document.querySelectorAll('.langs button');
    for (var i = 0; i < b.length; i++) b[i].setAttribute('aria-pressed', b[i].getAttribute('data-set') === l ? 'true' : 'false');
  }
  root.className += ' js';
  show(pick());
  document.addEventListener('DOMContentLoaded', function () {
    show(root.getAttribute('data-show'));
    var b = document.querySelectorAll('.langs button');
    for (var i = 0; i < b.length; i++) {
      b[i].addEventListener('click', function () {
        var l = this.getAttribute('data-set');
        try {
          localStorage.setItem('pa-lang', l);
        } catch (e) {}
        show(l);
      });
    }
  });
})();
