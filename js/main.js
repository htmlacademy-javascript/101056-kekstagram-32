import { getData } from './api.js';
import { closeForm } from './form-img-upload.js';
import { setUserFormSubmit } from './form-img-upload-sending-data.js';
import { renderThumbnailListWithRetry, showError, showFilters, setThumbnailsClick } from './render-thumbnails.js';


getData(
  (data) => {
    renderThumbnailListWithRetry(data);
    setThumbnailsClick(data);
    showFilters(data);
  },
  () => {
    showError();
  }
);

setUserFormSubmit(closeForm);
