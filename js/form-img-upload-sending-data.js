import { validateHashtags, getErrorText, validateDescription } from './form-img-upload-validate.js';
import { isEscapeKey } from './util.js';
import { sendData } from './api.js';

const form = document.querySelector('.img-upload__form');
const formImgUploadOverlay = form.querySelector('.img-upload__overlay');
const templateSuccess = document.querySelector('#success');
const templateError = document.querySelector('#error');
const submitButton = form.querySelector('.img-upload__submit');

let notificationContainer;
let notificationCloseButton;
let isResponseError;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

pristine.addValidator(form.querySelector('.text__hashtags'), validateHashtags, getErrorText);
pristine.addValidator(form.querySelector('.text__description'), validateDescription, getErrorText);

const resetPristine = () => {
  pristine.reset();
};

const closeNotification = () => {
  if (isResponseError) {
    formImgUploadOverlay.classList.remove('hidden');
  }
  if (notificationCloseButton) {
    notificationCloseButton.removeEventListener('click', onNotificationCloseButtonClick);
    notificationContainer.removeEventListener('click', onNotificationElsewhereClick);
  }
  document.removeEventListener('keydown', onNotificationEscKeydown);
  if (notificationContainer) {
    notificationContainer.remove();
    notificationContainer = null;
  }
};

const showNotification = (isError) => {
  const clone = document.importNode(isError ? templateError.content : templateSuccess.content, true);

  if (notificationContainer) {
    document.body.removeChild(notificationContainer);
  }

  notificationContainer = document.createElement('div');
  notificationContainer.appendChild(clone);
  document.body.appendChild(notificationContainer);

  notificationCloseButton = document.querySelector(isError ? '.error__button' : '.success__button');
  notificationCloseButton.addEventListener('click', onNotificationCloseButtonClick);
  document.addEventListener('keydown', onNotificationEscKeydown);
  notificationContainer.addEventListener('click', onNotificationElsewhereClick);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (!isValid) {
      return;
    }

    const formData = new FormData(evt.target);
    blockSubmitButton();

    try {
      const response = await sendData(formData);
      isResponseError = !response.ok;
      showNotification(isResponseError);
      onSuccess(isResponseError);
    } finally {
      unblockSubmitButton();
    }
  });
};

function onNotificationCloseButtonClick (evt) {
  evt.preventDefault();
  closeNotification();
}

function onNotificationElsewhereClick (evt) {
  if (!evt.target.closest('.error__inner') && isResponseError) {
    closeNotification();
  } else if (!evt.target.closest('.success__inner') && !isResponseError) {
    closeNotification();
  }
}

function onNotificationEscKeydown (evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeNotification();
  }
}

export { setUserFormSubmit, resetPristine };
