import desktopUrl from '../images/hero/Hero-Lib_desktop.png';
import desktop2xUrl from '../images/hero/Hero-Lib_desktop@2x.png';
import tabletUrl from '../images/hero/Hero-Lib_tablet.png';
import tablet2xUrl from '../images/hero/Hero-Lib_tablet@2x.png';
import mobileUrl from '../images/hero/Hero-Lib_mobile.png';
import mobile2xUrl from '../images/hero/Hero-Lib_mobile@2x.png';

export default `<div class="hero__card swiper-slide">
          <div class="hero__info hero__info--library">
            <h1 class="hero__title">Create Your<br> Dream Cinema</h1>

            <p class="hero__description">Is a guide to designing a personalized movie theater experience with the right equipment, customized decor, and favorite films. This guide helps you bring the cinema experience into your own home with cozy seating, dim lighting, and movie theater snacks.</p>
          </div>

          <div class="hero__image-wrap hero__image-wrap--library">
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
