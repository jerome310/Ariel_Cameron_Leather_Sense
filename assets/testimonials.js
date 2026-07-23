/**
 * =============================================================================
 * FILE: testimonials.js
 * LOCATION: Upload to your Shopify theme's "Assets" folder
 * IMPORTANT: Remove the .txt extension — upload as testimonials.js
 * =============================================================================
 *
 * HOW IT WORKS:
 *  - On load, reads every .testimonial-card from the DOM and pulls its data
 *    from data-* attributes (name, quote, photo, avatar, type, index).
 *  - Finds the block marked data-type="featured" and starts it in the center.
 *  - Always renders 3 cards: [featuredIdx - 1] | [featuredIdx] | [featuredIdx + 1]
 *    wrapping around infinitely.
 *  - Clicking Next/Prev advances or retreats featuredIdx by 1, rebuilds the
 *    3 visible cards, and plays a directional slide animation.
 * =============================================================================
 */

(function () {
  "use strict";

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTestimonials);
  } else {
    initTestimonials();
  }

  function initTestimonials() {
    var carousel = document.getElementById("testimonialsCarousel");
    if (!carousel) return;

    var track = document.getElementById("testimonialsTrack");
    var prevBtn = document.getElementById("carouselPrev");
    var nextBtn = document.getElementById("carouselNext");
    if (!track || !prevBtn || !nextBtn) return;

    /* ---------------------------------------------------------------
       1. Read all testimonial data from the server-rendered DOM cards
    --------------------------------------------------------------- */
    var rawCards = track.querySelectorAll(".testimonial-card");
    if (rawCards.length < 2) return;

    var testimonials = [];
    var startFeatured = 0; // which index starts in the center

    rawCards.forEach(function (card, i) {
      var type = card.getAttribute("data-type") || "side";
      var idx = parseInt(card.getAttribute("data-index"), 10);
      var name = card.getAttribute("data-name") || "";
      var quote = card.getAttribute("data-quote") || "";
      var photo = card.getAttribute("data-photo") || "";
      var avatar = card.getAttribute("data-avatar") || "";

      testimonials.push({
        type: type,
        index: isNaN(idx) ? i : idx,
        name: name,
        quote: quote,
        photo: photo,
        avatar: avatar,
      });

      if (type === "featured") startFeatured = isNaN(idx) ? i : idx;
    });

    // Sort by the original Liquid loop index so order is preserved
    testimonials.sort(function (a, b) {
      return a.index - b.index;
    });

    var total = testimonials.length;
    var featuredIdx = startFeatured;
    var isAnimating = false;

    /* ---------------------------------------------------------------
       2. Render 3 cards: prev | featured | next
    --------------------------------------------------------------- */
    function render(direction) {
      if (direction === "next") {
        track.classList.add("animating-next");
      } else if (direction === "prev") {
        track.classList.add("animating-prev");
      }

      setTimeout(function () {
        track.classList.remove("animating-next", "animating-prev");
        isAnimating = false;
      }, 450);

      var prevIdx = (featuredIdx - 1 + total) % total;
      var nextIdx = (featuredIdx + 1) % total;

      track.innerHTML =
        buildSideCard(testimonials[prevIdx]) +
        buildFeaturedCard(testimonials[featuredIdx]) +
        buildSideCard(testimonials[nextIdx]);
    }

    /* ---------------------------------------------------------------
       3. Card HTML builders
    --------------------------------------------------------------- */
    function buildFeaturedCard(d) {
      var bgStyle = d.photo
        ? "background-image:url('" + d.photo + "')"
        : "background:linear-gradient(160deg,#2a2a2a 0%,#4a4a4a 100%)";

      return (
        '<div class="testimonial-card testimonial-card--featured" data-index="' +
        d.index +
        '" data-type="featured">' +
        '<div class="testimonial-card__photo" style="' +
        bgStyle +
        '" aria-hidden="true"></div>' +
        '<div class="testimonial-card__overlay">' +
        '<p class="testimonial-card__featured-quote">“' +
        esc(d.quote) +
        "”</p>" +
        '<span class="testimonial-card__featured-name">' +
        esc(d.name) +
        "</span>" +
        "</div>" +
        "</div>"
      );
    }

    function buildSideCard(d) {
      var avatarHtml = d.avatar
        ? '<img src="' +
          d.avatar +
          '" alt="' +
          esc(d.name) +
          '" class="testimonial-card__avatar" width="48" height="48" loading="lazy">'
        : '<div class="testimonial-card__avatar testimonial-card__avatar--placeholder" aria-hidden="true">' +
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="#9ca3af">' +
          '<path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>' +
          "</svg>" +
          "</div>";

      return (
        '<div class="testimonial-card" data-index="' +
        d.index +
        '" data-type="side">' +
        '<div class="testimonial-card__top">' +
        avatarHtml +
        '<span class="testimonial-card__name">' +
        esc(d.name) +
        "</span></div>" +
        '<blockquote class="testimonial-card__quote">“' +
        esc(d.quote) +
        "”</blockquote>" +
        "</div>"
      );
    }

    /* ---------------------------------------------------------------
       4. Arrow navigation
    --------------------------------------------------------------- */
    nextBtn.addEventListener("click", function () {
      if (isAnimating) return;
      isAnimating = true;
      featuredIdx = (featuredIdx + 1) % total;
      render("next");
    });

    prevBtn.addEventListener("click", function () {
      if (isAnimating) return;
      isAnimating = true;
      featuredIdx = (featuredIdx - 1 + total) % total;
      render("prev");
    });

    /* ---------------------------------------------------------------
       5. Touch swipe support
    --------------------------------------------------------------- */
    var touchStartX = 0;

    track.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.touches[0].clientX;
      },
      { passive: true },
    );

    track.addEventListener(
      "touchend",
      function (e) {
        var diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) < 40) return;
        if (diff > 0) {
          nextBtn.click();
        } else {
          prevBtn.click();
        }
      },
      { passive: true },
    );

    /* ---------------------------------------------------------------
       6. Keyboard arrow support
    --------------------------------------------------------------- */
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") nextBtn.click();
      if (e.key === "ArrowLeft") prevBtn.click();
    });

    /* ---------------------------------------------------------------
       7. Initial render
    --------------------------------------------------------------- */
    render(null);
  }

  /* ── Helper ────────────────────────────────────────────────────── */
  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
