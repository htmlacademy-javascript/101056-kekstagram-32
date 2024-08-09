import { isEscapeKey } from './util.js';
import { onScaleButtonsClick, updateImageScale } from './form-img-upload-scale.js';
import { onImgUploadEffectsClick, resetFilter } from './form-img-upload-slider.js';
import { resetPristine } from './form-img-upload-sending-data.js';

const TIMEOUT_DELAY = 2000;
const DEFAULT_IMAGE_SCALE = 100;

const form = document.querySelector('.img-upload__form');
const formImgUploadInput = form.querySelector('.img-upload__input');

const formImgUploadOverlay = form.querySelector('.img-upload__overlay');
const formImgUploadWrapper = formImgUploadOverlay.querySelector('.img-upload__wrapper');
const formImgPreviewContainer = formImgUploadWrapper.querySelector('.img-upload__preview-container');
const formImgUploadPreview = formImgPreviewContainer.querySelector('.img-upload__preview');
const formImgUploadCancel = formImgUploadOverlay.querySelector('.img-upload__cancel');
const formImgUploadScale = formImgUploadWrapper.querySelector('.img-upload__scale');
const imgUploadEffects = formImgUploadWrapper.querySelector('.img-upload__effects');
const slider = formImgUploadWrapper.querySelector('.img-upload__effect-level');
const previews = formImgUploadWrapper.querySelectorAll('.effects__preview');


const showError = () => {
  const existingError = document.querySelector('.data-error');
  if (existingError) {
    existingError.remove();
  }

  const errorTemplate = document.getElementById('data-error');
  const clone = document.importNode(errorTemplate.content, true);
  const errorElement = document.createElement('div');
  errorElement.appendChild(clone);
  document.body.appendChild(errorElement);
  const errorText = document.body.querySelector('.data-error__title');
  errorText.textContent = 'Не верный формат файла. Загружайте: .jpg / .jpeg / .png';

  setTimeout(() => {
    errorElement.remove();
  }, TIMEOUT_DELAY);
};

const openForm = () => {
  const file = formImgUploadInput.files[0];
  const fileName = file ? file.name.toLowerCase() : '';

  if (file && (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.png'))) {
    const fileURL = URL.createObjectURL(file);
    formImgUploadPreview.querySelector('img').src = fileURL;

    previews.forEach((preview) => {
      preview.style.backgroundImage = `url(${fileURL})`;
      preview.style.backgroundSize = 'cover';
    });

    document.body.classList.add('modal-open');
    formImgUploadOverlay.classList.remove('hidden');
    slider.classList.add('hidden');

    formImgUploadCancel.addEventListener('click', onCancelButtonClick);
    document.addEventListener('keydown', onOverlayEscKeydown);

    formImgUploadScale.addEventListener('click', onScaleButtonsClick);
    imgUploadEffects.addEventListener('change', onImgUploadEffectsClick);
  } else {
    showError();
    formImgUploadInput.value = '';
  }
};

const resetForm = () => {
  form.reset();
  formImgUploadPreview.querySelector('img').src = 'img/upload-default-image.jpg';
  previews.forEach((preview) => {
    preview.style.backgroundImage = '';
    preview.style.backgroundSize = '';
  });
  resetFilter();
  updateImageScale(DEFAULT_IMAGE_SCALE);
  resetPristine();
};

const closeForm = (isError) => {
  document.body.classList.remove('modal-open');
  formImgUploadOverlay.classList.add('hidden');

  if (!isError) {
    formImgUploadCancel.removeEventListener('click', onCancelButtonClick);
    document.removeEventListener('keydown', onOverlayEscKeydown);
    formImgUploadScale.removeEventListener('click', onScaleButtonsClick);
    imgUploadEffects.removeEventListener('change', onImgUploadEffectsClick);

    resetForm();
  }
};

function onOverlayEscKeydown (evt) {

  if (isEscapeKey(evt) && !formImgUploadOverlay.classList.contains('hidden')) {

    const hashtagsInput = form.querySelector('.text__hashtags');
    const descriptionInput = form.querySelector('.text__description');

    if (document.activeElement === hashtagsInput || document.activeElement === descriptionInput) {

      evt.preventDefault();
      return;
    }

    evt.preventDefault();
    closeForm();
  }
}

function onCancelButtonClick (evt) {
  evt.preventDefault();
  closeForm();
}

formImgUploadInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  openForm();
});

export { closeForm };
