/**
 * SCGS — Spec Sheet Loader for Resources Page
 * Fetches documentation from the "spec-sheets" tab in Google Sheets
 * Columns: Name | Category | PDF Link
 */

(function () {
  var SHEET_ID = '1wNH0nsB7643Zp9JxEZo4C63jDByzJ5H8Pzr1T865qrE';
  var TAB_NAME = 'spec-sheets';

  var grid = document.querySelector('.spec-grid');
  var countEl = document.querySelector('.spec-count');
  var filterBtns = document.querySelectorAll('.spec-filter-btn');
  if (!grid) return;

  var allSpecs = [];
  var currentPage = 1;
  var perPage = 9; // 3 rows x 3 columns
  var currentFilter = 'all';

  var CATEGORY_LABELS = {
    'regulators': 'Regulators',
    'valves': 'Valves',
    'filters': 'Filters',
    'laboratory-fittings': 'Laboratory Fittings',
    'accessories': 'Accessories'
  };

  function getSheetURL() {
    return 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?tqx=out:json&sheet=' + encodeURIComponent(TAB_NAME);
  }

  function convertPdfURL(url) {
    if (!url) return '';
    var match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match) return 'https://drive.google.com/file/d/' + match[1] + '/preview';
    return url;
  }

  function escapeHTML(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function renderCards(filter, page) {
    currentFilter = filter;
    currentPage = page || 1;

    var filtered = filter === 'all'
      ? allSpecs
      : allSpecs.filter(function (s) { return s.category === filter; });

    grid.innerHTML = '';

    if (filtered.length === 0) {
      grid.innerHTML =
        '<div style="grid-column:1/-1;text-align:center;padding:64px 24px;">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--light-grey)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:16px;"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>' +
          '<p style="font-size:16px;font-weight:600;color:var(--med-grey);margin-bottom:4px;">Coming Soon</p>' +
          '<p style="font-size:14px;color:var(--light-grey);margin:0;">Documentation for this category is not yet available. Check back soon.</p>' +
        '</div>';
      countEl.textContent = '';
      renderPagination(0);
      return;
    }

    var totalPages = Math.ceil(filtered.length / perPage);
    if (currentPage > totalPages) currentPage = totalPages;
    var start = (currentPage - 1) * perPage;
    var pageItems = filtered.slice(start, start + perPage);

    pageItems.forEach(function (spec) {
      var card = document.createElement('div');
      card.className = 'card spec-card';
      card.style.padding = '24px';
      card.innerHTML =
        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">' +
          '<span style="font-size:24px;">&#128196;</span>' +
          '<div>' +
            '<p style="font-size:11px;color:var(--light-grey);margin:0;font-weight:700;letter-spacing:1px;text-transform:uppercase;">' + escapeHTML(spec.categoryLabel) + '</p>' +
            '<h3 style="font-size:16px;margin:0;">' + escapeHTML(spec.name) + '</h3>' +
          '</div>' +
        '</div>' +
        '<a href="' + escapeHTML(spec.url) + '" class="btn btn-sm btn-accent" target="_blank" style="width:100%;text-align:center;">Download PDF</a>';
      grid.appendChild(card);
    });

    countEl.textContent = 'Showing ' + (start + 1) + '–' + (start + pageItems.length) + ' of ' + filtered.length + ' spec sheet' + (filtered.length !== 1 ? 's' : '');
    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    var existing = document.querySelector('.spec-pagination');
    if (existing) existing.remove();

    if (totalPages <= 1) return;

    var nav = document.createElement('div');
    nav.className = 'spec-pagination';
    nav.style.cssText = 'display:flex;justify-content:center;gap:8px;margin-top:32px;';

    // Previous button
    var prev = document.createElement('button');
    prev.className = 'btn btn-sm btn-outline';
    prev.textContent = '\u2039';
    prev.style.cssText = 'min-width:36px;';
    prev.disabled = currentPage === 1;
    if (currentPage === 1) prev.style.opacity = '0.4';
    prev.addEventListener('click', function () {
      if (currentPage > 1) renderCards(currentFilter, currentPage - 1);
    });
    nav.appendChild(prev);

    // Page numbers
    for (var i = 1; i <= totalPages; i++) {
      (function (page) {
        var btn = document.createElement('button');
        btn.className = page === currentPage ? 'btn btn-sm btn-accent' : 'btn btn-sm btn-outline';
        btn.textContent = page;
        btn.style.cssText = 'min-width:36px;';
        btn.addEventListener('click', function () {
          renderCards(currentFilter, page);
        });
        nav.appendChild(btn);
      })(i);
    }

    // Next button
    var next = document.createElement('button');
    next.className = 'btn btn-sm btn-outline';
    next.textContent = '\u203A';
    next.style.cssText = 'min-width:36px;';
    next.disabled = currentPage === totalPages;
    if (currentPage === totalPages) next.style.opacity = '0.4';
    next.addEventListener('click', function () {
      if (currentPage < totalPages) renderCards(currentFilter, currentPage + 1);
    });
    nav.appendChild(next);

    grid.parentNode.insertBefore(nav, grid.nextSibling);
  }

  fetch(getSheetURL())
    .then(function (r) { return r.text(); })
    .then(function (text) {
      var json = JSON.parse(text.substring(47, text.length - 2));
      var rows = json.table.rows;

      for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].c;
        var name = cells[0] ? (cells[0].v || '').trim() : '';
        var category = cells[1] ? (cells[1].v || '').toLowerCase().trim() : '';
        var pdfLink = cells[2] ? (cells[2].v || '').trim() : '';

        if (name && name !== 'Name' && pdfLink) {
          allSpecs.push({
            name: name,
            category: category,
            categoryLabel: CATEGORY_LABELS[category] || category,
            url: convertPdfURL(pdfLink)
          });
        }
      }

      renderCards('all', 1);
    })
    .catch(function (err) {
      console.error('Failed to load spec sheets:', err);
      renderCards('all', 1);
    });

  // Filter buttons
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) {
        b.classList.remove('active', 'btn-accent');
        b.classList.add('btn-outline');
      });
      this.classList.remove('btn-outline');
      this.classList.add('active', 'btn-accent');
      renderCards(this.getAttribute('data-filter'), 1);
    });
  });
})();
