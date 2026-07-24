{% comment %}
=============================================================================
FILE: testimonials-section.liquid
LOCATION: Upload to your Shopify theme's "Sections" folder
PURPOSE: Customer Reviews & Testimonials carousel with featured center card

HOW TO EDIT TESTIMONIALS (no theme editor / schema needed):
Each testimonial is a plain <div class="testimonial-card">...</div> block
below, inside "TESTIMONIAL DATA". Just edit the name/quote text directly,
or copy/paste a whole card block to add a new testimonial, or delete one
to remove it.

- The FIRST card in the list must always keep the class
"testimonial-card--featured" and data-type="featured" — that's the one
that opens centered/large. All others should be data-type="side".
- Keep data-index sequential (0, 1, 2, 3...) with no gaps or the carousel
ordering will break.
- PHOTOS/AVATARS: Upload the image in Shopify Admin > Content > Files,
copy its URL, and paste it into the two spots marked for that person
(once in the visible tag, once in the matching data-photo/data-avatar
attribute — both need updating together).
=============================================================================
{% endcomment %}

{{ 'testimonials.css' | asset_url | stylesheet_tag }}

<section class="testimonials-section">
    <div class="testimonials-container">

        <!-- Section Heading -->
        <div class="testimonials-heading">
            <h2 class="testimonials-title">Customer Reviews &amp; Testimonials</h2>
            <p class="testimonials-subtitle">See what our customers have to say about our products</p>
        </div>

        <!-- Carousel Wrapper -->
        <div class="testimonials-carousel" id="testimonialsCarousel">

            <!-- Left Arrow -->
            <button class="carousel-arrow carousel-arrow--prev" id="carouselPrev" aria-label="Previous testimonial"
                type="button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                    aria-hidden="true">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>

            <!-- Cards Track -->
            <div class="testimonials-track" id="testimonialsTrack">

                {% comment %} ============= TESTIMONIAL DATA — EDIT BELOW ============= {% endcomment %}

                <!-- Card 1: FEATURED (opens centered) -->
                <div class="testimonial-card testimonial-card--featured" data-index="0" data-type="featured"
                    data-name="Ariel Cameron"
                    data-quote="From the moment I opened the package, I knew this was something special. Premium leather, timeless design, and built to last. Highly recommend."
                    data-photo="https://i.ibb.co/rGPtSTQH/about-me-circle-img.jpg"
                    data-avatar="https://i.ibb.co/rGPtSTQH/about-me-circle-img.jpg">
                    <div class="testimonial-card__photo"
                        style="background-image: url('https://i.ibb.co/rGPtSTQH/about-me-circle-img.jpg');"
                        aria-hidden="true"></div>
                    <div class="testimonial-card__overlay">
                        <p class="testimonial-card__featured-quote">&ldquo;From the moment I opened the package, I knew
                            this was something special. Premium leather, timeless design, and built to last. Highly
                            recommend.&rdquo;</p>
                        <span class="testimonial-card__featured-name">Ariel Cameron</span>
                    </div>
                </div>

                <!-- Card 2: side card -->
                <div class="testimonial-card" data-index="1" data-type="side" data-name="Ethan Caldwell"
                    data-quote="The craftsmanship is outstanding. You can tell real care goes into every detail. This is one of those products that actually feels better the more you use it."
                    data-avatar="https://i.pravatar.cc/120?img=13">
                    <div class="testimonial-card__top">
                        <img src="https://i.pravatar.cc/120?img=13" alt="Ethan Caldwell"
                            class="testimonial-card__avatar" width="48" height="48" loading="lazy">
                        <span class="testimonial-card__name">Ethan Caldwell</span>
                    </div>
                    <blockquote class="testimonial-card__quote">
                        &ldquo;The craftsmanship is outstanding. You can tell real care goes into every detail. This is
                        one of those products that actually feels better the more you use it.&rdquo;
                    </blockquote>
                </div>

                <!-- Card 3: side card -->
                <div class="testimonial-card" data-index="2" data-type="side" data-name="Marcus Bennett"
                    data-quote="I've owned a lot of leather goods, but this brand stands out. The quality, feel, and durability exceeded my expectations. I'll definitely be purchasing again."
                    data-avatar="https://i.pravatar.cc/120?img=52">
                    <div class="testimonial-card__top">
                        <img src="https://i.pravatar.cc/120?img=52" alt="Marcus Bennett"
                            class="testimonial-card__avatar" width="48" height="48" loading="lazy">
                        <span class="testimonial-card__name">Marcus Bennett</span>
                    </div>
                    <blockquote class="testimonial-card__quote">
                        &ldquo;I've owned a lot of leather goods, but this brand stands out. The quality, feel, and
                        durability exceeded my expectations. I'll definitely be purchasing again.&rdquo;
                    </blockquote>
                </div>

                <!-- Card 4: side card -->
                <div class="testimonial-card" data-index="3" data-type="side" data-name="Priya Shah"
                    data-quote="Every piece feels handmade with intention. The stitching, the materials, the finish, nothing about it feels mass produced."
                    data-avatar="https://i.pravatar.cc/120?img=47">
                    <div class="testimonial-card__top">
                        <img src="https://i.pravatar.cc/120?img=47" alt="Priya Shah" class="testimonial-card__avatar"
                            width="48" height="48" loading="lazy">
                        <span class="testimonial-card__name">Priya Shah</span>
                    </div>
                    <blockquote class="testimonial-card__quote">
                        &ldquo;Every piece feels handmade with intention. The stitching, the materials, the finish,
                        nothing about it feels mass produced.&rdquo;
                    </blockquote>
                </div>

                <!-- Card 5: side card -->
                <div class="testimonial-card" data-index="4" data-type="side" data-name="Jordan Lee"
                    data-quote="Fast shipping and the product looks even better in person. Already thinking about what I'll order next."
                    data-avatar="https://i.pravatar.cc/120?img=33">
                    <div class="testimonial-card__top">
                        <img src="https://i.pravatar.cc/120?img=33" alt="Jordan Lee" class="testimonial-card__avatar"
                            width="48" height="48" loading="lazy">
                        <span class="testimonial-card__name">Jordan Lee</span>
                    </div>
                    <blockquote class="testimonial-card__quote">
                        &ldquo;Fast shipping and the product looks even better in person. Already thinking about what
                        I'll order next.&rdquo;
                    </blockquote>
                </div>

                {% comment %} ============= END TESTIMONIAL DATA ============= {% endcomment %}

            </div><!-- /.testimonials-track -->

            <!-- Right Arrow -->
            <button class="carousel-arrow carousel-arrow--next" id="carouselNext" aria-label="Next testimonial"
                type="button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                    aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>

        </div><!-- /.testimonials-carousel -->

    </div>
</section>

<script src="{{ 'testimonials.js' | asset_url }}" defer></script>