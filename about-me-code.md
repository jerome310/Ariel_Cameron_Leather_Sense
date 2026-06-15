{% comment %} 
============================================================
Section: ACL About Me (acl-about-me.liquid)
Location: sections/acl-about-me.liquid

ASSETS — upload ALL of these to Shopify Admin →
Online Store → Themes → Edit Code → assets/ folder:
• about_me_background_image.png
• about_me_circle_img.jpg
• home_img.webp
• Screenshot_2026-04-25_222134-removebg-preview.png
• header_stars.png
• Screenshot_2026-05-22_235739.png
============================================================
{% endcomment %}

<link rel="preconnect" href="https://fonts.googleapis.com">
<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Nunito:wght@400;600;700;800&family=Caveat:wght@600;700&display=swap"
  rel="stylesheet">

<style>
  #acl-about- {
    --acl-text: #3a3020;
    --acl-text-mid: #5a4e38;
    padding: 40px 16px 60px;
    font-family: 'Nunito', sans-serif;
    color: var(--acl-text);
    -webkit-font-smoothing: antialiased;
  }

  @keyframes aclFadeUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .acl-card {
    max-width: 680px;
    margin: 0 auto;
    position: relative;
    animation: aclFadeUp 0.6s ease both;
    background-image: url('{{ "about_me_background_image.png" | asset_url }}');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center top;
    padding: 150px 52px 64px;
    border-radius: 10px;
    /* New Code for footer */
    position: relative;
  }

  .acl-hero {
    display: grid;
    grid-template-columns: 190px 1fr;
    gap: 24px;
    align-items: center;
    position: relative;
    margin-bottom: 36px;
  }

  .acl-deco-shapes {
    position: absolute;
    top: -20px;
    right: 0;
    width: 130px;
    height: auto;
  }

  .acl-deco-shapes img {
    width: 100%;
    height: auto;
    display: block;
  }

  .acl-profile-circle {
    width: 175px;
    height: 175px;
    border-radius: 50%;
    border: 7px solid #c97d2e;
    overflow: hidden;
    flex-shrink: 0;
    background: #c8b89a;
  }

  .acl-profile-circle img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 15%;
    display: block;
  }

  .acl-greeting {
    font-family: 'Caveat', cursive;
    font-size: 22px;
    color: var(--acl-text-mid);
    margin-bottom: 4px;
    font-weight: 600;
  }

  .acl-hero-name {
    font-family: 'Playfair Display', serif;
    font-size: 42px;
    font-weight: 900;
    color: var(--acl-text);
    line-height: 1.05;
    margin-bottom: 14px;
    letter-spacing: -0.5px;
  }

  .acl-biz-bday {
    font-size: 16px;
    font-weight: 700;
    color: var(--acl-text-mid);
  }

  .acl-bday-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
    font-size: 20px;
    font-weight: 800;
    color: var(--acl-text);
  }

  /* ======================================================
   FIX: CENTER BOTH SECTIONS BUT KEEP GRID (IMPORTANT)
====================================================== */

  .acl-body-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    /* pushes whole grid into center */
    gap: 28px;
    /* tighter spacing (your request) */
    position: relative;
    max-width: 620px;
    /* forces both to stay centered together */
    margin: 0 auto;
    /* centers the group */
    padding: 0 16px;
    /* prevents edge touching */
  }

  /* ABOUT CARD */
  .acl-about-card {
    position: relative;
    grid-column: 1;
    align-self: start;
    z-index: 2;
    animation: aclFadeUp 0.7s 0.15s ease both;

    background-image: url('{{ "Screenshot_2026-04-25_222134-removebg-preview.png" | asset_url }}');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-color: transparent;

    padding: 56px 28px 48px 28px;
    border-radius: 4px;
  }

  /* optional overlay image */
  .acl-about-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 120%;
    height: 120%;
    object-fit: cover;
    pointer-events: none;
    transform: translate(-10%, -10%);
    z-index: 2;
  }

  .acl-about-card h2,
  .acl-about-card p {
    position: relative;
    z-index: 3;
  }

  .acl-about-card h2 {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 12px;
    color: var(--acl-text);
  }

  .acl-about-card p {
    font-size: 13.5px;
    line-height: 1.75;
    color: var(--acl-text);
    font-weight: 500;
    margin: 0;
  }

  /* POLAROID */
  .acl-polaroid-wrap {
    grid-column: 2;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 8px;
  }

  .acl-polaroid {
    background: #f2c4c8;
    padding: 10px 10px 0;
    box-shadow: 3px 4px 16px rgba(0, 0, 0, 0.15);
    transform: rotate(2.5deg);
    width: 175px;
    animation: aclFadeUp 0.7s 0.25s ease both;
    display: flex;
    flex-direction: column;
  }

  .acl-polaroid img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    object-position: center 20%;
    display: block;
  }

  .acl-polaroid-name {
    font-family: 'Caveat', cursive;
    font-size: 20px;
    font-weight: 700;
    color: var(--acl-text);
    text-align: center;
    padding: 8px 4px 12px;
  }

  /* MOTO */
  .acl-moto-col {
    grid-column: 1;
    margin-top: 36px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding-right: 12px;
  }

  .acl-moto-banner {
    position: relative;
    text-align: center;
    background-image: url('{{ "Moto_background_img.png" | asset_url }}');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-color: transparent;
    padding: 18px 24px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .acl-moto-label,
  .acl-moto-text {
    position: relative;
    z-index: 2;
  }

  .acl-moto-label {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 4px;
  }

  .acl-moto-text {
    font-family: 'Caveat', cursive;
    font-size: 19px;
    font-weight: 700;
    color: #3a3020;
  }

  .acl-brand {
    grid-column: 2;
    padding: 24px 0 0 16px;
  }

  .acl-brand h2 {
    font-size: 30px;
    text-align: center;
    font-weight: 700;
  }

  .acl-footer {
     position: absolute;
     bottom: 20px;
     left: 0;
     width: 100%;
     text-align: center;
  }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .acl-deco-shapes {
      display: none;
    }
  }

  /* MOBILE STACK (YOUR REQUEST) */
  @media (max-width: 560px) {

    .acl-card {
      padding: 140px 28px 100px;
    }

    .acl-hero {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .acl-profile-circle {
      width: 140px;
      height: 140px;
      margin: 75px auto 0;
    }

    .acl-hero-name {
      font-size: 32px;
    }

    .acl-bday-row {
      justify-content: center;
    }

    .acl-body-grid {
      grid-template-columns: 1fr;
      /* STACK */
      max-width: 340px;
    }

    .acl-about-card {
      grid-column: 1;
    }

    .acl-polaroid-wrap {
      grid-column: 1;
      justify-content: center;
      margin-top: 16px;
    }

    .acl-moto-col {
      padding-right: 0;
      margin-top: 24px;
    }

    .acl-brand {
      grid-column: 1;
      padding: 20px 0 0;
    }

    .acl-footer {
     position: absolute;
     bottom: 45px;
     left: 0;
     width: 100%;
     text-align: center;
  }
  }
</style>

<section id="acl-about-{{ section.id }}" aria-label="About Ariel Cameron">
  <div class="acl-card">

    <!-- ── HERO ── -->
    <div class="acl-hero">

      <div class="acl-deco-shapes" aria-hidden="true">
        <img src="{{ 'header_stars.png' | asset_url }}" alt="" width="130" loading="eager">
      </div>

      <div class="acl-profile-circle">
        <img src="{{ 'about_me_circle_img.jpg' | asset_url }}" alt="Ariel Cameron" width="175" height="175"
          loading="lazy">
      </div>

      <div class="acl-hero-text">
        <p class="acl-greeting">Hello, my name is</p>
        <h1 class="acl-hero-name">Ariel Cameron</h1>
        <div class="acl-biz-bday">
          Business Birthday
          <div class="acl-bday-row">🎉 10/2024 📍</div>
        </div>
      </div>

    </div>

    <!-- ── BODY GRID ── -->
    <div class="acl-body-grid">

      <!-- About Me card -->
      <div class="acl-about-card">
      
        <!-- BACKGROUND IMAGE (NOW USING IMG + LIQUID) -->
        <img src="{{ 'ceo-about-notepad.png' | asset_url }}" alt="" class="acl-about-bg">
      
        <!-- CONTENT -->
        <div class="acl-about-content">
          <h2>About Me</h2>
          <p>
            I am a young and ambitious woman on a journey to discover my true potential and make a positive impact in the world. Let me take you through the various aspects that define me and make me who I am.
          </p>
        </div>
      
      </div>

      <!-- Polaroid photo -->
      <div class="acl-polaroid-wrap">
        <div class="acl-polaroid">
          <img src="{{ 'home_img.jpg' | asset_url }}" alt="Ariel Cameron" width="155" height="155" loading="lazy">
          <span class="acl-polaroid-name">Ariel</span>
        </div>
      </div>

      <!-- Moto banners -->
      <div class="acl-moto-col">
      
        <div class="acl-moto-banner">
          <span class="acl-moto-label">My Moto</span>
          <span class="acl-moto-text">Do more of what you love</span>
        </div>
      
        <div class="acl-moto-banner">
          <span class="acl-moto-label">My Moto</span>
          <span class="acl-moto-text">Do more of what you love</span>
        </div>
      
      </div>

      <!-- ACL Brand -->
      <div class="acl-brand">
        <h2>ACL Brand</h2>
        <p class="acl-brand-para">My pet dog is a pug. It is fawn in colour and has a small built. We have named it Swigi. It has been with us since the last 2 years.</p>
        <p class="acl-fun-facts">
          I don't like vegetables: especially cucumber. I'm obsessed with hats: quirky collection galore
          I'm a dancing diva: surprise moves guaranteed.
        </p>
      </div>

    </div>

    <!-- ── FOOTER ── -->
    <div class="acl-footer">©{{ 'now' | date: '%Y' }} ACL Brand · Ariel Cameron</div>

  </div>
</section>