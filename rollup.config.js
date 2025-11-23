import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/SimpleSlider.js',
    output: {
      file: 'dist/simple-slider.js',
      format: 'umd',
      name: 'SimpleSlider',
      sourcemap: true
    }
  },
  {
    input: 'src/SimpleSlider.js',
    output: {
      file: 'dist/simple-slider.min.js',
      format: 'umd',
      name: 'SimpleSlider',
      sourcemap: true
    },
    plugins: [terser()]
  }
];

