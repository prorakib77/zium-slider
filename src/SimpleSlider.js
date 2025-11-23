/**
 * Zium Slider - A lightweight, dependency-free vanilla JavaScript slider/carousel
 * @version 1.0.0
 */

class SimpleSlider {
  constructor(container, options = {}) {
    // Apply preset if provided
    if (options.preset) {
      options = { ...SimpleSlider.presets[options.preset] || {}, ...options };
    }

    // Default options
    this.options = {
      autoplay: options.autoplay || false,
      autoplayInterval: options.autoplayInterval || 3000,
      loop: options.loop !== undefined ? options.loop : true,
      showDots: options.showDots !== undefined ? options.showDots : true,
      showArrows: options.showArrows !== undefined ? options.showArrows : true,
      transitionSpeed: options.transitionSpeed || 300,
      pauseOnHover: options.pauseOnHover !== undefined ? options.pauseOnHover : true,
      theme: options.theme || 'classic',
      slidesPerView: options.slidesPerView || 1, // Number of slides visible at once (like Swiper)
      spaceBetween: options.spaceBetween || 0, // Space between slides in pixels
      type: options.type || 'default', // default, product, hero, fashion, ecommerce, swiper, slick
      breakpoints: options.breakpoints || {}, // Responsive breakpoints
      ...options
    };

    // Get container element
    this.container = typeof container === 'string' 
      ? document.querySelector(container) 
      : container;

    if (!this.container) {
      throw new Error('Container element not found');
    }

    // Initialize slider
    this.currentIndex = 0;
    this.slides = [];
    this.isPlaying = false;
    this.autoplayTimer = null;
    this.isTransitioning = false;
    this.currentSlidesPerView = this.options.slidesPerView;
    this.resizeObserver = null;

    // Handle responsive breakpoints
    this.handleBreakpoints();
    this.init();
  }

  handleBreakpoints() {
    if (Object.keys(this.options.breakpoints).length === 0) return;

    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      let newSlidesPerView = this.options.slidesPerView;

      // Sort breakpoints by width (largest first)
      const sortedBreakpoints = Object.keys(this.options.breakpoints)
        .map(Number)
        .sort((a, b) => b - a);

      for (const breakpoint of sortedBreakpoints) {
        if (width <= breakpoint) {
          newSlidesPerView = this.options.breakpoints[breakpoint].slidesPerView || this.options.slidesPerView;
          break;
        }
      }

      if (newSlidesPerView !== this.currentSlidesPerView) {
        this.currentSlidesPerView = newSlidesPerView;
        this.updateSlider();
      }
    };

    window.addEventListener('resize', updateSlidesPerView);
    updateSlidesPerView();
  }

  init() {
    // Get all slide elements
    this.slides = Array.from(this.container.children);
    
    if (this.slides.length === 0) {
      throw new Error('No slides found in container');
    }

    // Create slider wrapper
    this.setupSlider();
    
    // Create controls
    if (this.options.showDots) {
      this.createDots();
    }
    
    if (this.options.showArrows) {
      this.createArrows();
    }

    // Set initial state
    this.updateSlider();
    
    // Start autoplay if enabled
    if (this.options.autoplay) {
      this.startAutoplay();
    }

    // Add event listeners
    this.attachEventListeners();
  }

  setupSlider() {
    // Add slider class to container with theme and type
    this.container.classList.add('zium-slider');
    this.container.classList.add(this.options.theme);
    this.container.classList.add(`zium-slider-${this.options.type}`);
    
    // Create track wrapper
    this.track = document.createElement('div');
    this.track.className = 'zium-slider-track';
    this.track.style.transition = `transform ${this.options.transitionSpeed}ms ease-in-out`;
    
    // Set space between slides
    if (this.options.spaceBetween > 0) {
      this.track.style.gap = `${this.options.spaceBetween}px`;
    }
    
    // Wrap slides in track
    this.slides.forEach((slide, index) => {
      slide.classList.add('zium-slide');
      slide.setAttribute('data-slide-index', index);
      if (this.options.spaceBetween > 0 && index > 0) {
        slide.style.marginLeft = `${this.options.spaceBetween}px`;
      }
      this.track.appendChild(slide);
    });
    
    // Clear container and add track
    this.container.innerHTML = '';
    this.container.appendChild(this.track);
    
    // Update slides reference after moving to track
    this.slides = Array.from(this.track.children);
    
    // Update slide widths for multiple slides per view
    this.updateSlideWidths();
  }

  updateSlideWidths() {
    if (this.currentSlidesPerView === 1) {
      this.slides.forEach(slide => {
        slide.style.minWidth = '100%';
        slide.style.flexShrink = '0';
      });
    } else {
      const slideWidth = `calc((100% - ${(this.currentSlidesPerView - 1) * this.options.spaceBetween}px) / ${this.currentSlidesPerView})`;
      this.slides.forEach(slide => {
        slide.style.minWidth = slideWidth;
        slide.style.flexShrink = '0';
      });
    }
  }

  createDots() {
    this.dotsContainer = document.createElement('div');
    this.dotsContainer.className = 'zium-slider-dots';
    
    // For multiple slides per view, calculate number of dots
    const maxIndex = Math.max(0, this.slides.length - this.currentSlidesPerView);
    const dotCount = this.currentSlidesPerView === 1 
      ? this.slides.length 
      : maxIndex + 1;
    
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'zium-slider-dot';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
    }
    
    this.container.appendChild(this.dotsContainer);
  }

  createArrows() {
    this.prevArrow = document.createElement('button');
    this.prevArrow.className = 'zium-slider-arrow zium-slider-arrow-prev';
    this.prevArrow.innerHTML = '‹';
    this.prevArrow.setAttribute('aria-label', 'Previous slide');
    this.prevArrow.addEventListener('click', () => this.prev());
    
    this.nextArrow = document.createElement('button');
    this.nextArrow.className = 'zium-slider-arrow zium-slider-arrow-next';
    this.nextArrow.innerHTML = '›';
    this.nextArrow.setAttribute('aria-label', 'Next slide');
    this.nextArrow.addEventListener('click', () => this.next());
    
    this.container.appendChild(this.prevArrow);
    this.container.appendChild(this.nextArrow);
  }

  attachEventListeners() {
    // Pause on hover
    if (this.options.pauseOnHover && this.options.autoplay) {
      this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
      this.container.addEventListener('mouseleave', () => this.startAutoplay());
    }

    // Keyboard navigation
    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prev();
      } else if (e.key === 'ArrowRight') {
        this.next();
      }
    });

    // Touch/swipe support
    this.addSwipeSupport();
  }

  addSwipeSupport() {
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isDragging = true;
    });

    this.track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });

    this.track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = startY - endY;

      // Only swipe if horizontal movement is greater than vertical
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          this.next();
        } else {
          this.prev();
        }
      }
    });
  }

  updateSlider() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    this.updateSlideWidths();

    // Calculate translateX based on slides per view
    const slideWidth = this.currentSlidesPerView === 1 
      ? 100 
      : 100 / this.currentSlidesPerView;
    const translateX = -(this.currentIndex * slideWidth);
    this.track.style.transform = `translateX(${translateX}%)`;

    // Calculate max index for multiple slides per view
    const maxIndex = Math.max(0, this.slides.length - this.currentSlidesPerView);

    // Update dots
    if (this.options.showDots && this.dotsContainer) {
      const dots = this.dotsContainer.querySelectorAll('.zium-slider-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentIndex);
      });
    }

    // Update arrows
    if (this.options.showArrows) {
      if (!this.options.loop) {
        this.prevArrow.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.prevArrow.disabled = this.currentIndex === 0;
        this.nextArrow.style.opacity = this.currentIndex >= maxIndex ? '0.5' : '1';
        this.nextArrow.disabled = this.currentIndex >= maxIndex;
      }
    }

    // Reset transition flag after animation
    setTimeout(() => {
      this.isTransitioning = false;
    }, this.options.transitionSpeed);
  }

  next() {
    if (this.isTransitioning) return;
    
    const maxIndex = Math.max(0, this.slides.length - this.currentSlidesPerView);
    
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
    } else if (this.options.loop) {
      this.currentIndex = 0;
    } else {
      return;
    }
    
    this.updateSlider();
  }

  prev() {
    if (this.isTransitioning) return;
    
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else if (this.options.loop) {
      const maxIndex = Math.max(0, this.slides.length - this.currentSlidesPerView);
      this.currentIndex = maxIndex;
    } else {
      return;
    }
    
    this.updateSlider();
  }

  goToSlide(index) {
    if (this.isTransitioning) return;
    if (index < 0 || index >= this.slides.length) return;
    
    this.currentIndex = index;
    this.updateSlider();
  }

  startAutoplay() {
    if (!this.options.autoplay || this.isPlaying) return;
    
    this.isPlaying = true;
    this.autoplayTimer = setInterval(() => {
      this.next();
    }, this.options.autoplayInterval);
  }

  pauseAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
      this.isPlaying = false;
    }
  }

  destroy() {
    this.pauseAutoplay();
    // Remove event listeners and clean up
    this.container.classList.remove('zium-slider');
    if (this.dotsContainer) {
      this.dotsContainer.remove();
    }
    if (this.prevArrow) {
      this.prevArrow.remove();
    }
    if (this.nextArrow) {
      this.nextArrow.remove();
    }
  }
}

// Preset configurations
SimpleSlider.presets = {
  // Product Card Slider
  product: {
    type: 'product',
    theme: 'modern',
    slidesPerView: 4,
    spaceBetween: 20,
    autoplay: true,
    autoplayInterval: 4000,
    showDots: true,
    showArrows: true,
    loop: true,
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1200: { slidesPerView: 4 }
    }
  },
  
  // Hero Slider
  hero: {
    type: 'hero',
    theme: 'elegant',
    slidesPerView: 1,
    autoplay: true,
    autoplayInterval: 5000,
    showDots: true,
    showArrows: true,
    loop: true,
    transitionSpeed: 600
  },
  
  // Fashion Slider
  fashion: {
    type: 'fashion',
    theme: 'elegant',
    slidesPerView: 3,
    spaceBetween: 30,
    autoplay: true,
    autoplayInterval: 3500,
    showDots: true,
    showArrows: true,
    loop: true,
    breakpoints: {
      768: { slidesPerView: 1 },
      1024: { slidesPerView: 2 },
      1400: { slidesPerView: 3 }
    }
  },
  
  // E-commerce Slider
  ecommerce: {
    type: 'ecommerce',
    theme: 'modern',
    slidesPerView: 5,
    spaceBetween: 15,
    autoplay: true,
    autoplayInterval: 3000,
    showDots: true,
    showArrows: true,
    loop: true,
    breakpoints: {
      576: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1200: { slidesPerView: 4 },
      1400: { slidesPerView: 5 }
    }
  },
  
  // Swiper-style Slider
  swiper: {
    type: 'swiper',
    theme: 'modern',
    slidesPerView: 3,
    spaceBetween: 30,
    autoplay: true,
    autoplayInterval: 3000,
    showDots: true,
    showArrows: true,
    loop: true,
    breakpoints: {
      768: { slidesPerView: 1 },
      1024: { slidesPerView: 2 },
      1400: { slidesPerView: 3 }
    }
  },
  
  // Slick-style Slider
  slick: {
    type: 'slick',
    theme: 'classic',
    slidesPerView: 3,
    spaceBetween: 20,
    autoplay: true,
    autoplayInterval: 2500,
    showDots: true,
    showArrows: true,
    loop: true,
    transitionSpeed: 500
  }
};

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SimpleSlider;
}

if (typeof window !== 'undefined') {
  window.SimpleSlider = SimpleSlider;
}

