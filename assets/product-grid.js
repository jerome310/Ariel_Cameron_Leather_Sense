(function () {
  "use strict";

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    initGridColumns();
    initCustomSelect();
    initSortFunctionality();
    initImageHover();
  }

  /* ===========================================================================
     GRID COLUMN TOGGLE
     =========================================================================== */

  function initGridColumns() {
    var grid = document.querySelector(".product-grid");
    var buttons = document.querySelectorAll(".grid-col-btn");

    if (!grid || !buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var cols = this.getAttribute("data-cols");

        grid.setAttribute("data-cols", cols);

        buttons.forEach(function (b) {
          b.classList.remove("active");
        });
        this.classList.add("active");
      });
    });
  }

  /* ===========================================================================
     CUSTOM SELECT DROPDOWN
     =========================================================================== */

  function initCustomSelect() {
    var selectWrappers = document.querySelectorAll('[data-select="sort"]');

    selectWrappers.forEach(function (wrapper) {
      var trigger = wrapper.querySelector(".select-trigger");
      var dropdown = wrapper.querySelector(".select-dropdown");
      var options = wrapper.querySelectorAll(".select-option");
      var valueDisplay = wrapper.querySelector(".select-value");

      if (!trigger || !dropdown || !options.length) return;

      trigger.addEventListener("click", function (e) {
        e.stopPropagation();
        var isActive = wrapper.classList.contains("active");
        closeAllSelects();

        if (!isActive) {
          wrapper.classList.add("active");
          trigger.setAttribute("aria-expanded", "true");
        }
      });

      options.forEach(function (option) {
        option.setAttribute("tabindex", "0");

        option.addEventListener("click", function () {
          var value = this.getAttribute("data-value");
          var text = this.textContent;

          valueDisplay.textContent = text;

          options.forEach(function (opt) {
            opt.classList.remove("selected");
          });
          this.classList.add("selected");

          wrapper.classList.remove("active");
          trigger.setAttribute("aria-expanded", "false");

          handleSortChange(value);
        });

        // Keyboard accessibility
        option.addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
            this.click();
          }
        });
      });
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".custom-select")) {
        closeAllSelects();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeAllSelects();
      }
    });
  }

  function closeAllSelects() {
    document
      .querySelectorAll(".custom-select.active")
      .forEach(function (select) {
        select.classList.remove("active");
        var trigger = select.querySelector(".select-trigger");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
  }

  /* ===========================================================================
     SORT FUNCTIONALITY
     =========================================================================== */

  function initSortFunctionality() {
    var urlParams = new URLSearchParams(window.location.search);
    var currentSort = urlParams.get("sort_by") || "manual";

    var currentOption = document.querySelector(
      '[data-value="' + currentSort + '"]',
    );

    if (currentOption) {
      var select = currentOption.closest(".custom-select");
      var valueDisplay = select ? select.querySelector(".select-value") : null;

      if (valueDisplay) {
        valueDisplay.textContent = currentOption.textContent;
      }

      currentOption.classList.add("selected");
    }
  }

  function handleSortChange(sortValue) {
    var url = new URL(window.location.href);

    if (sortValue === "manual") {
      url.searchParams.delete("sort_by");
    } else {
      url.searchParams.set("sort_by", sortValue);
    }

    window.location.href = url.toString();
  }

  /* ===========================================================================
     IMAGE ZOOM PREVIEW (CSS handles hover swap)
     =========================================================================== */

  function initImageHover() {
    var productCards = document.querySelectorAll(".product-card");

    productCards.forEach(function (card) {
      var imageContainer = card.querySelector("[data-image-swap]");
      var zoomPreview = card.querySelector("[data-zoom-preview]");
      var zoomTimeout;

      if (!imageContainer || !zoomPreview) return;

      var zoomPreviewImage = zoomPreview.querySelector(".zoom-preview-image");

      imageContainer.addEventListener("mouseenter", function () {
        zoomTimeout = setTimeout(function () {
          if (card.matches(":hover")) {
            zoomPreview.classList.add("active");
          }
        }, 200);
      });

      imageContainer.addEventListener("mouseleave", function () {
        clearTimeout(zoomTimeout);
        zoomPreview.classList.remove("active");
      });

      imageContainer.addEventListener("mousemove", function (e) {
        if (!zoomPreview.classList.contains("active")) return;

        var rect = imageContainer.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;

        var clampedX = Math.max(0, Math.min(100, x));
        var clampedY = Math.max(0, Math.min(100, y));

        if (zoomPreviewImage) {
          zoomPreviewImage.style.backgroundPosition =
            clampedX + "% " + clampedY + "%";
        }
      });
    });
  }
})();

/* =============================================================================
   FILTER PANEL LOGIC
   Filters apply LIVE as soon as you click a checkbox, swatch, toggle, or move
   the price slider. "View Results" just closes the panel.
   ============================================================================= */

document.addEventListener("DOMContentLoaded", function () {
  var panel = document.getElementById("filterPanel");
  var openBtn = document.getElementById("openFilters");
  var closeBtn = document.getElementById("closeFilters");
  var clearBtn = document.getElementById("clearFilters");
  var applyBtn = document.getElementById("applyFilters");
  var resultCountEl = document.getElementById("resultCount");
  var productCountEl = document.querySelector(".product-count");
  var grid = document.querySelector(".product-grid");

  if (!panel || !grid) return;

  var cards = Array.prototype.slice.call(
    grid.querySelectorAll(".product-card"),
  );
  var absMin = parseFloat(panel.dataset.priceAbsMin) || 0;
  var absMax = parseFloat(panel.dataset.priceAbsMax) || 0;
  var priceGap = Math.max(1, Math.round((absMax - absMin) * 0.02)) || 1;

  function emptyState() {
    return {
      types: [],
      colors: [],
      inStock: false,
      priceMin: absMin,
      priceMax: absMax,
    };
  }

  var state = emptyState();

  // ---------------------------------------------------------------------
  // Open / close panel (click-outside-to-close)
  // ---------------------------------------------------------------------
  function openPanel() {
    syncUIFromState(state);
    panel.classList.add("active");
    document.addEventListener("click", handleOutsideClick, true);
    document.addEventListener("keydown", handleEscape);
  }

  function closePanel() {
    panel.classList.remove("active");
    document.removeEventListener("click", handleOutsideClick, true);
    document.removeEventListener("keydown", handleEscape);
  }

  function handleOutsideClick(e) {
    if (
      panel.contains(e.target) ||
      e.target === openBtn ||
      openBtn.contains(e.target)
    )
      return;
    closePanel();
  }

  function handleEscape(e) {
    if (e.key === "Escape") closePanel();
  }

  if (openBtn) openBtn.addEventListener("click", openPanel);
  if (closeBtn) closeBtn.addEventListener("click", closePanel);

  // ---------------------------------------------------------------------
  // Accordion sections (.filter-group toggles .active)
  // ---------------------------------------------------------------------
  document
    .querySelectorAll("[data-filter-group] .filter-group-header")
    .forEach(function (header) {
      header.addEventListener("click", function () {
        header.closest(".filter-group").classList.toggle("active");
      });
    });

  // ---------------------------------------------------------------------
  // Product type checkboxes
  // ---------------------------------------------------------------------
  document
    .querySelectorAll('input[data-filter="type"]')
    .forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        var val = checkbox.value;
        var idx = state.types.indexOf(val);
        if (checkbox.checked && idx === -1) state.types.push(val);
        if (!checkbox.checked && idx > -1) state.types.splice(idx, 1);
        afterFilterChange();
      });
    });

  // ---------------------------------------------------------------------
  // Color swatches
  // ---------------------------------------------------------------------
  document
    .querySelectorAll('.color-swatch[data-filter="color"]')
    .forEach(function (swatch) {
      swatch.addEventListener("click", function () {
        var val = swatch.dataset.value;
        var idx = state.colors.indexOf(val);
        if (idx > -1) {
          state.colors.splice(idx, 1);
          swatch.classList.remove("active");
        } else {
          state.colors.push(val);
          swatch.classList.add("active");
        }
        afterFilterChange();
      });
    });

  // ---------------------------------------------------------------------
  // Availability toggle
  // ---------------------------------------------------------------------
  var availToggle = document.getElementById("availabilityToggle");
  var availCount = document.getElementById("availabilityCount");

  if (availToggle) {
    availToggle.addEventListener("click", function () {
      state.inStock = !state.inStock;
      availToggle.classList.toggle("active", state.inStock);
      if (availCount) availCount.hidden = !state.inStock;
      afterFilterChange();
    });
  }

  // ---------------------------------------------------------------------
  // Price dual slider
  // ---------------------------------------------------------------------
  var minThumb = document.getElementById("priceMin");
  var maxThumb = document.getElementById("priceMax");
  var priceFill = document.getElementById("priceFill");
  var minInput = document.getElementById("priceMinInput");
  var maxInput = document.getElementById("priceMaxInput");

  function getPercent(val) {
    if (absMax === absMin) return 0;
    return ((val - absMin) / (absMax - absMin)) * 100;
  }

  function renderPriceUI() {
    if (!priceFill) return;
    var minPct = getPercent(state.priceMin);
    var maxPct = getPercent(state.priceMax);
    priceFill.style.left = minPct + "%";
    priceFill.style.width = maxPct - minPct + "%";
    if (minThumb) minThumb.value = state.priceMin;
    if (maxThumb) maxThumb.value = state.priceMax;
    if (minInput) minInput.value = state.priceMin;
    if (maxInput) maxInput.value = state.priceMax;
  }

  if (minThumb) {
    minThumb.addEventListener("input", function () {
      state.priceMin = Math.min(
        Number(minThumb.value),
        state.priceMax - priceGap,
      );
      renderPriceUI();
      afterFilterChange();
    });
  }
  if (maxThumb) {
    maxThumb.addEventListener("input", function () {
      state.priceMax = Math.max(
        Number(maxThumb.value),
        state.priceMin + priceGap,
      );
      renderPriceUI();
      afterFilterChange();
    });
  }
  if (minInput) {
    minInput.addEventListener("change", function () {
      var parsed = parseInt(minInput.value, 10);
      if (!isNaN(parsed))
        state.priceMin = Math.max(
          absMin,
          Math.min(parsed, state.priceMax - priceGap),
        );
      renderPriceUI();
      afterFilterChange();
    });
  }
  if (maxInput) {
    maxInput.addEventListener("change", function () {
      var parsed = parseInt(maxInput.value, 10);
      if (!isNaN(parsed))
        state.priceMax = Math.min(
          absMax,
          Math.max(parsed, state.priceMin + priceGap),
        );
      renderPriceUI();
      afterFilterChange();
    });
  }

  // ---------------------------------------------------------------------
  // Matching
  // ---------------------------------------------------------------------
  function cardMatches(card, s) {
    if (s.types.length > 0 && s.types.indexOf(card.dataset.type) === -1)
      return false;

    if (s.colors.length > 0) {
      var productColors = (card.dataset.colors || "")
        .split(",")
        .map(function (c) {
          return c.trim();
        })
        .filter(Boolean);
      var hasColor = s.colors.some(function (c) {
        return productColors.indexOf(c) > -1;
      });
      if (!hasColor) return false;
    }

    if (s.inStock && card.dataset.available !== "true") return false;

    var price = parseFloat(card.dataset.price);
    if (!isNaN(price) && (price < s.priceMin || price > s.priceMax))
      return false;

    return true;
  }

  // ---------------------------------------------------------------------
  // Apply filters to the grid immediately + update counts
  // ---------------------------------------------------------------------
  function applyFiltersLive() {
    var visibleCount = 0;
    cards.forEach(function (card) {
      if (cardMatches(card, state)) {
        card.removeAttribute("data-filtered-out");
        visibleCount++;
      } else {
        card.setAttribute("data-filtered-out", "");
      }
    });
    if (productCountEl) productCountEl.textContent = visibleCount + " Products";
    if (resultCountEl) resultCountEl.textContent = "(" + visibleCount + ")";
  }

  function updateClearButtonVisibility() {
    var isDefault =
      state.types.length === 0 &&
      state.colors.length === 0 &&
      !state.inStock &&
      state.priceMin === absMin &&
      state.priceMax === absMax;
    if (clearBtn) clearBtn.hidden = isDefault;
  }

  function updateAvailabilityCount() {
    if (!availCount) return;
    var hypothetical = {
      types: state.types,
      colors: state.colors,
      inStock: true,
      priceMin: state.priceMin,
      priceMax: state.priceMax,
    };
    var count = cards.filter(function (c) {
      return cardMatches(c, hypothetical);
    }).length;
    availCount.textContent = "(" + count + ")";
  }

  function afterFilterChange() {
    applyFiltersLive();
    updateAvailabilityCount();
    updateClearButtonVisibility();
  }

  // ---------------------------------------------------------------------
  // Sync all panel controls to a given state (used on open + clear all)
  // ---------------------------------------------------------------------
  function syncUIFromState(s) {
    document
      .querySelectorAll('input[data-filter="type"]')
      .forEach(function (checkbox) {
        checkbox.checked = s.types.indexOf(checkbox.value) > -1;
      });

    document
      .querySelectorAll('.color-swatch[data-filter="color"]')
      .forEach(function (swatch) {
        swatch.classList.toggle(
          "active",
          s.colors.indexOf(swatch.dataset.value) > -1,
        );
      });

    if (availToggle) availToggle.classList.toggle("active", s.inStock);
    if (availCount) availCount.hidden = !s.inStock;

    renderPriceUI();
    updateClearButtonVisibility();
    updateAvailabilityCount();
  }

  // ---------------------------------------------------------------------
  // Clear all
  // ---------------------------------------------------------------------
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      state = emptyState();
      syncUIFromState(state);
      applyFiltersLive();
    });
  }

  // ---------------------------------------------------------------------
  // "View Results" now just closes the panel — filtering already happened live.
  // ---------------------------------------------------------------------
  if (applyBtn) {
    applyBtn.addEventListener("click", function () {
      closePanel();
    });
  }

  // Initial paint
  renderPriceUI();
  applyFiltersLive();
  updateAvailabilityCount();
});
