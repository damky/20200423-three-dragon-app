import Typography from "typography";

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.666,
  scaleRatio: 2,
  googleFonts: [
    {
      name: 'Anton',
      styles: [
        '400',
      ],
    },
    {
      name: 'Open Sans',
      styles: [
        '300',
        '300i',
        '700',
        '700i',
      ],
    },
  ],
  headerFontFamily: ['Anton', 'serif'],
  bodyFontFamily: ['Open Sans', 'serif'],
  headerColor: 'rgba(199, 250, 208, 1)',
  bodyColor: 'rgba(199, 250, 208, 1)',
  headerWeight: '400',
  bodyWeight: '300',
  boldWeight: '700',
});

export default typography