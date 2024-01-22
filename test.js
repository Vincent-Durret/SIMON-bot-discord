const svgCaptcha = require("svg-captcha");

const createCaptcha = () => {
  return svgCaptcha.create();
};

const captcha = createCaptcha();
console.log(captcha.data); // SVG data
console.log("Captcha Text:", captcha.text);
