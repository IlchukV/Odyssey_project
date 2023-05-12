import Swiper, { Pagination, Autoplay, Navigation } from 'swiper';
import 'swiper/swiper.min.css';

const swiper = new Swiper('.swiper', {
  modules: [Pagination, Autoplay, Navigation],
  // autoplay: {
  //   delay: 7000,
  //   disableOnInteraction: false,
  // },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

export default swiper;
