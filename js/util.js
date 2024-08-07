const getRandomNumber = (from, to) => {
  const lower = Math.ceil(Math.min(from, to));
  const upper = Math.floor(Math.max(from, to));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isEscapeKey = (evt) => evt.keyCode === 27;

const hasDuplicates = (array) => new Set(array).size !== array.length;

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomNumber(0, i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const sortArrayDescending = (array, compareFunction) =>
  [...array].sort((a, b) => compareFunction(b) - compareFunction(a));

const debounce = (cb, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};

export {
  isEscapeKey,
  hasDuplicates,
  shuffleArray,
  sortArrayDescending,
  debounce
};
