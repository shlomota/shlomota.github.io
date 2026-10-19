/* Shlomo Tannor — site behaviour. Three small things: theme, filter, rail. */
(function () {
  'use strict';

  /* ---------- 1. colour scheme ---------- */

  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem('theme'); } catch (e) { /* private mode */ }
  if (stored === 'light' || stored === 'dark') root.setAttribute('data-theme', stored);

  var toggle = document.getElementById('theme');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var current = root.getAttribute('data-theme') || (prefersDark ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- 2. project filter ---------- */

  var list = document.getElementById('project-list');
  if (list) {
    var projects = Array.prototype.slice.call(list.querySelectorAll('.project'));
    var buttons = Array.prototype.slice.call(document.querySelectorAll('.filter [data-filter]'));
    var counter = document.querySelector('.filter-count');
    var empty = document.querySelector('.empty');

    function apply(tag, push) {
      var shown = 0;

      projects.forEach(function (p) {
        var tags = (p.dataset.tags || '').split(/\s+/);
        var match = tag === 'all' || tags.indexOf(tag) !== -1;
        p.hidden = !match;
        if (match) shown++;
      });

      buttons.forEach(function (b) {
        var on = b.dataset.filter === tag;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });

      if (counter) {
        counter.textContent = tag === 'all'
          ? ''
          : shown + (shown === 1 ? ' project' : ' projects');
      }
      if (empty) empty.hidden = shown !== 0;

      if (push) {
        var url = tag === 'all'
          ? location.pathname + location.hash
          : location.pathname + '?t=' + encodeURIComponent(tag) + '#projects';
        history.replaceState(null, '', url);
      }
    }

    buttons.forEach(function (b) {
      b.addEventListener('click', function () { apply(b.dataset.filter, true); });
    });

    var reset = document.querySelector('[data-filter-reset]');
    if (reset) reset.addEventListener('click', function () { apply('all', true); });

    // Deep link: ?t=audio
    var initial = new URLSearchParams(location.search).get('t');
    var known = buttons.map(function (b) { return b.dataset.filter; });
    apply(initial && known.indexOf(initial) !== -1 ? initial : 'all', false);
  }

  /* ---------- 3. section rail ---------- */

  var railLinks = Array.prototype.slice.call(document.querySelectorAll('[data-rail]'));
  if (railLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    railLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

    var visible = new Set();

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      });

      // Highlight the topmost section currently in view.
      var order = Object.keys(byId);
      var current = null;
      for (var i = 0; i < order.length; i++) {
        if (visible.has(order[i])) { current = order[i]; break; }
      }

      railLinks.forEach(function (a) {
        a.classList.toggle('is-current', a.getAttribute('href') === '#' + current);
      });
    }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });

    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }
})();
