import { sortArrayDescending, shuffleArray, debounce } from './util.js';
import { renderThumbnailListWithRetry } from './render-thumbnails.js';

const RERENDER_DELAY = 500;
const PICTURE_COUNT = 10;

const imgFilters = document.querySelector('.img-filters');

const clearThumbnailList = () => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((element) => {
    element.remove();
  });
};

const changeThumbnailList = (evt, data) => {
  const filterActions = {
    'filter-default': () => data,
    'filter-random': () => shuffleArray(data.slice()).slice(0, PICTURE_COUNT),
    'filter-discussed': () => sortArrayDescending(data.slice(), (item) => item.comments.length),
  };

  const filterButton = Object.keys(filterActions).find((filter) => evt.target.closest(`#${filter}`));

  if (filterButton) {
    clearThumbnailList();
    const filteredPhotoData = filterActions[filterButton]();
    renderThumbnailListWithRetry(filteredPhotoData);
  }
};

const setFiltersClick = (data) => {
  const handleThumbnailChange = debounce((evt) => {
    changeThumbnailList(evt, data);
  }, RERENDER_DELAY);

  imgFilters.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      const buttons = imgFilters.querySelectorAll('.img-filters__button');
      const button = evt.target.closest('.img-filters__button');

      if (
        (button && !button.classList.contains('img-filters__button--active'))
      ) {
        buttons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
        button.classList.add('img-filters__button--active');

        handleThumbnailChange(evt);
      }
    }
  });
};

const showFilters = (data) => {
  imgFilters.classList.remove('img-filters--inactive');
  setFiltersClick(data);
};

export { showFilters };
