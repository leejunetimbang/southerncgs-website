/**
 * SCGS — Product Page Sidebar Filtering
 * Filters product cards by subcategory when sidebar items are clicked
 */

document.addEventListener('DOMContentLoaded', function () {
  var sidebar = document.querySelector('.product-sidebar');
  if (!sidebar) return;

  var items = sidebar.querySelectorAll('li');
  var cards = document.querySelectorAll('.product-card-item');
  var countEl = document.querySelector('.product-count');

  items.forEach(function (item) {
    item.addEventListener('click', function () {
      var filter = this.getAttribute('data-filter');

      // Update active state
      items.forEach(function (li) { li.classList.remove('active'); });
      this.classList.add('active');

      // Filter cards
      var visibleCount = 0;
      cards.forEach(function (card) {
        if (card.getAttribute('data-subcategory') === filter) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Update count
      if (countEl) {
        countEl.textContent = 'Showing ' + visibleCount + ' product' + (visibleCount !== 1 ? 's' : '');
      }
    });
  });
});
