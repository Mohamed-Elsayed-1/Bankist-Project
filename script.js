'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const scrolTo = document.querySelector('.btn--scroll-to');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll(`.operations__content`);
const toggle = document.querySelector('.toggle');
const input = document.querySelector('.toggle__input');

scrolTo.addEventListener('click', () => {
  // const s1coords = document.querySelector('#section--1').getBoundingClientRect();
  // console.log(s1coords);
  // window.scrollTo({
  //   top: s1coords.top + window.scrollY,
  //   left: s1coords.left + window.scrollX,
  //   behavior: 'smooth'
  // })
  document.querySelector('#section--1').scrollIntoView({ behavior: 'smooth' });
});

input.addEventListener('click', function () {
  toggle.classList.toggle('right');
  if (this.checked) {
    document.body.style.backgroundColor = '#333';
    document.body.style.color = '#fff';
    document.querySelector('.nav__logo').style.filter = `invert(1)`;
    document.querySelector('.nav').style.backgroundColor = '#333';
  } else {
    document.querySelector('.nav').style.backgroundColor = '#fff';
    document.body.style.backgroundColor = '#fff';
    document.body.style.color = '#000';
    document.querySelector('.nav__logo').style.filter = `invert(0)`;
  }
});

// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click',function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior:'smooth'})
//   })
// })

document.querySelector('.nav__links').addEventListener('click', e => {
  const link = e.target.closest('.nav__link');

  if (!link || link.matches(':last-child')) return;

  e.preventDefault();

  document
    .querySelector(link.getAttribute('href'))
    .scrollIntoView({ behavior: 'smooth' });
});

// this way bad make browser slow

// document.querySelectorAll('.operations__tab').forEach(el => {
//   el.addEventListener('click', function (e) {
//     document.querySelectorAll('.operations__tab').forEach(tab => {
//       tab.style.transform = '';
//     });
//     this.style.transform = 'translateY(-4rem)';
//     document.querySelectorAll('.operations__content').forEach(ele => {
//       ele.classList.remove('operations__content--active');
//     });
//     document
//       .querySelector(`.operations__content--${e.target.dataset.tab}`)
//       .classList.add('operations__content--active');
//   });
// });

// this the beast way;

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// sticky navbar

const nav = document.querySelector('.nav');

// const initialCoords = document.querySelector('#section--1').getBoundingClientRect();

// window.addEventListener('scroll',()=>{
//   if(window.scrollY > initialCoords.top){
//     nav.classList.add('sticky');
//   }else{
//     nav.classList.remove('sticky')
//   }
// })

// const observer = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       console.log('Element is visible');
//     }
//   });
// });

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

const allSections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver(
  (entries, observe) => {
    const [entry] = entries;

    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observe.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0.15,
  }
);

allSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

const lazyImages = document.querySelectorAll('img[data-src]');

const imgObserver = new IntersectionObserver(
  (entries, observe) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', () => {
      entry.target.classList.remove('lazy-img');
    });
    observe.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0.2,
    rootMargin: '-200px',
  }
);

lazyImages.forEach(image => {
  imgObserver.observe(image);
});

//slider

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

const dotContainer = document.querySelector('.dots');

const createDots = () => {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};



createDots();


const activateDot = slide => {
  document.querySelectorAll('.dots__dot').forEach(el => {
    el.classList.remove('dots__dot--active');
  });
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  
};


function goToSlide(slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
  activateDot(slide);
}

goToSlide(0);

let currSlide = 0;
let maxSlide = slides.length - 1;

const prevSlide = () => {
  if (currSlide === 0) currSlide = maxSlide;
  else currSlide--;
  goToSlide(currSlide);
  // activateDot(currSlide)

};

const nextSlide = () => {
  if (currSlide === maxSlide) currSlide = 0;
  else currSlide++;
  goToSlide(currSlide);
  // activateDot(currSlide)
};

btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});



dotContainer.addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    // activateDot(slide)
  }
});
