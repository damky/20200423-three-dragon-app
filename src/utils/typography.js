import Typography from "typography";

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.666,
  scaleRatio: 4,
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
  headerColor: 'rgba(250, 250, 250, 1)',
  bodyColor: 'rgba(220, 220, 220, 1)',
  headerWeight: '400',
  bodyWeight: '300',
  boldWeight: '700',
});

// export default typography
typography.injectStyles();