const desktopUrl = new URL('../images/Hero_desktop.png', import.meta.url);
const desktop2xUrl = new URL('../images/Hero_desktop@2x.png', import.meta.url);
const tabletUrl = new URL('../images/Hero_tablet.png', import.meta.url);
const tablet2xUrl = new URL('../images/Hero_tablet@2x.png', import.meta.url);
const mobileUrl = new URL('../images/Hero_mobile.png', import.meta.url);
const mobile2xUrl = new URL('../images/Hero_mobile@2x.png', import.meta.url);

export default `        <div class="hero__card swiper-slide">
          <div class="hero__info hero__info--default">
            <h1 class="hero__title">Let’s Make Your Own Cinema</h1>

            <p class="hero__description">Is a guide to creating a personalized movie theater experience. You'll need a
              projector, screen, and speakers. <span class="not-mobile">Decorate your space, choose your films, and
                stock up on snacks for the full experience.</span></p>
            <a class="hero__btn" href="./catalog">Get Started</a>
          </div>

          <div class="hero__image-wrap">
            <picture>
              <source srcset="${desktopUrl} 1x, ${desktop2xUrl} 2x" media="(min-width: 1280px)"
                type="image/png" />
              <source srcset="${tabletUrl} 1x, ${tablet2xUrl} 2x" media="(min-width: 768px)"
                type="image/png" />
              <source srcset="${mobileUrl} 1x, ${mobile2xUrl} 2x" media="(max-width: 767px)"
                type="image/png" />
              <img class="hero__image" src="${desktopUrl}" alt="hero" />
            </picture>
          </div>

        </div>`;
