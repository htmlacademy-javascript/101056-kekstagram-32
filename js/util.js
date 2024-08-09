const ESCAPE_KEY_CODE = 27;

const getRandomNumber = (from, to) => {
  const lower = Math.ceil(Math.min(from, to));
  const upper = Math.floor(Math.max(from, to));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isEscapeKey = (evt) => evt.keyCode === ESCAPE_KEY_CODE;

const shuffleItems = (inputItems) => {
  for (let i = inputItems.length - 1; i > 0; i--) {
    const j = getRandomNumber(0, i + 1);
    [inputItems[i], inputItems[j]] = [inputItems[j], inputItems[i]];
  }
  return inputItems;
};

const hasDuplicates = (inputItems) => new Set(inputItems).size !== inputItems.length;

const sortItemsInDescendingOrder = (inputItems, comparisonFunction) =>
  [...inputItems].sort((firstElement, secondElement) => comparisonFunction(secondElement) - comparisonFunction(firstElement));

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), timeoutDelay);
  };
};

export {
  isEscapeKey,
  hasDuplicates,
  shuffleItems,
  sortItemsInDescendingOrder,
  debounce
};
