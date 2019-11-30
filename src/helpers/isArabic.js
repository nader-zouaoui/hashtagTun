const isArabic = text => {
  const pattern = /[\u0600-\u06FF\u0750-\u077F]/;
  const result = pattern.test(text);
  return result;
};

export default isArabic;
