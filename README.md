# Zium Slider

A lightweight, dependency-free vanilla JavaScript slider/carousel that works seamlessly via CDN or npm.

## Features

- 🚀 **Lightweight** - No dependencies, pure vanilla JavaScript
- 📱 **Responsive** - Works on all devices with breakpoint support
- 🎯 **Touch Support** - Swipe gestures for mobile devices
- ⌨️ **Keyboard Navigation** - Arrow keys support
- 🎨 **Customizable** - Easy to style and configure
- 🔄 **Auto-play** - Optional automatic sliding
- ♿ **Accessible** - ARIA labels and keyboard support
- 🛍️ **Multiple Slider Types** - Product cards, Hero, Fashion, E-commerce, Swiper, Slick
- ⚡ **Easy Presets** - One-line setup for common use cases
- 📐 **Multiple Slides Per View** - Show multiple slides at once (like Swiper)

## CDN Usage

### Basic Setup

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/zium-slider@latest/dist/simple-slider.css">
</head>
<body>
  <div id="mySlider">
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/zium-slider@latest/dist/simple-slider.min.js"></script>
  <script>
    const slider = new SimpleSlider('#mySlider');
  </script>
</body>
</html>
```

### With Presets (Easy Setup)

```javascript
// Product Card Slider
new SimpleSlider('#productSlider', { preset: 'product' });

// Hero Slider
new SimpleSlider('#heroSlider', { preset: 'hero' });

// Fashion Slider
new SimpleSlider('#fashionSlider', { preset: 'fashion' });

// E-commerce Slider
new SimpleSlider('#ecommerceSlider', { preset: 'ecommerce' });

// Swiper-style Slider
new SimpleSlider('#swiperSlider', { preset: 'swiper' });

// Slick-style Slider
new SimpleSlider('#slickSlider', { preset: 'slick' });
```

### With Options and Themes

```javascript
const slider = new SimpleSlider('#mySlider', {
  theme: 'modern',           // Choose from: classic, modern, minimal, elegant, bold, vintage
  type: 'product',           // Choose from: default, product, hero, fashion, ecommerce, swiper, slick
  slidesPerView: 4,         // Number of slides visible at once
  spaceBetween: 20,          // Space between slides in pixels
  autoplay: true,
  autoplayInterval: 3000,
  loop: true,
  showDots: true,
  showArrows: true,
  transitionSpeed: 500,
  pauseOnHover: true,
  breakpoints: {             // Responsive breakpoints
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1200: { slidesPerView: 4 }
  }
});
```

## NPM Installation

```bash
npm install zium-slider
```

```javascript
import SimpleSlider from 'zium-slider';
import 'zium-slider/dist/simple-slider.css';

const slider = new SimpleSlider('#mySlider', {
  autoplay: true
});
```

## Themes

Zium Slider comes with 6 beautiful themes:

- **classic** - Timeless design with elegant shadows and borders
- **modern** - Trendy gradient buttons with smooth animations
- **minimal** - Clean and simple with glassmorphism effects
- **elegant** - Sophisticated with backdrop blur and smooth transitions
- **bold** - Striking black and white contrast design
- **vintage** - Retro style with warm colors and classic typography

```javascript
// Use a theme
new SimpleSlider('#slider', {
  theme: 'modern'  // or 'classic', 'minimal', 'elegant', 'bold', 'vintage'
});
```

## Presets

Quick setup with predefined configurations:

- **`product`** - Product card slider (4 slides, responsive)
- **`hero`** - Hero banner slider (full-width, elegant)
- **`fashion`** - Fashion showcase slider (3 slides, elegant theme)
- **`ecommerce`** - E-commerce product grid (5 slides, responsive)
- **`swiper`** - Swiper-style slider (3 slides, modern theme)
- **`slick`** - Slick-style slider (3 slides, classic theme)

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `preset` | string | `undefined` | Use a preset: product, hero, fashion, ecommerce, swiper, slick |
| `theme` | string | `'classic'` | Theme name: classic, modern, minimal, elegant, bold, vintage |
| `type` | string | `'default'` | Slider type: default, product, hero, fashion, ecommerce, swiper, slick |
| `slidesPerView` | number | `1` | Number of slides visible at once (like Swiper) |
| `spaceBetween` | number | `0` | Space between slides in pixels |
| `autoplay` | boolean | `false` | Enable automatic sliding |
| `autoplayInterval` | number | `3000` | Time between slides in milliseconds |
| `loop` | boolean | `true` | Loop back to first slide after last |
| `showDots` | boolean | `true` | Show dot navigation indicators |
| `showArrows` | boolean | `true` | Show previous/next arrow buttons |
| `transitionSpeed` | number | `300` | Transition animation speed in milliseconds |
| `pauseOnHover` | boolean | `true` | Pause autoplay when hovering over slider |
| `breakpoints` | object | `{}` | Responsive breakpoints: `{ 768: { slidesPerView: 2 } }` |

## API Methods

### `next()`
Go to the next slide.

```javascript
slider.next();
```

### `prev()`
Go to the previous slide.

```javascript
slider.prev();
```

### `goToSlide(index)`
Go to a specific slide by index (0-based).

```javascript
slider.goToSlide(2); // Go to third slide
```

### `startAutoplay()`
Start autoplay if enabled.

```javascript
slider.startAutoplay();
```

### `pauseAutoplay()`
Pause autoplay.

```javascript
slider.pauseAutoplay();
```

### `destroy()`
Destroy the slider instance and clean up.

```javascript
slider.destroy();
```

## Styling

The slider comes with default styles, but you can easily customize them by overriding the CSS classes:

- `.zium-slider` - Main container
- `.zium-slider-track` - Track that holds slides
- `.zium-slide` - Individual slide
- `.zium-slider-arrow` - Navigation arrows
- `.zium-slider-dots` - Dots container
- `.zium-slider-dot` - Individual dot (add `.active` for active state)

## Examples

### Product Card Slider

```html
<div id="productSlider">
  <div class="product-card">
    <img src="product1.jpg" alt="Product 1">
    <h3>Product Name</h3>
    <p>$99.99</p>
  </div>
  <div class="product-card">
    <img src="product2.jpg" alt="Product 2">
    <h3>Product Name</h3>
    <p>$129.99</p>
  </div>
  <!-- More products... -->
</div>

<script>
  new SimpleSlider('#productSlider', { preset: 'product' });
</script>
```

### Hero Slider

```html
<div id="heroSlider">
  <div class="hero-slide" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    <h1>Welcome</h1>
    <p>Amazing content here</p>
  </div>
  <div class="hero-slide" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
    <h1>New Collection</h1>
    <p>Shop now</p>
  </div>
</div>

<script>
  new SimpleSlider('#heroSlider', { preset: 'hero' });
</script>
```

### E-commerce Slider with Custom Breakpoints

```html
<div id="ecommerceSlider">
  <!-- Product items -->
</div>

<script>
  new SimpleSlider('#ecommerceSlider', {
    preset: 'ecommerce',
    breakpoints: {
      576: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1200: { slidesPerView: 4 },
      1400: { slidesPerView: 5 }
    }
  });
</script>
```

### Multiple Slides Per View (Swiper-style)

```html
<div id="multiSlider">
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
  <div>Slide 4</div>
</div>

<script>
  new SimpleSlider('#multiSlider', {
    slidesPerView: 3,
    spaceBetween: 30,
    breakpoints: {
      768: { slidesPerView: 1 },
      1024: { slidesPerView: 2 },
      1400: { slidesPerView: 3 }
    }
  });
</script>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari (latest)
- Android Chrome (latest)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

