import { isEscapeKey } from './util.js';
import { renderFirstsComments, renderMoreComments } from './render-comments.js';

const modalBigPhoto = document.querySelector('.big-picture');
const bigPhoto = modalBigPhoto.querySelector('.big-picture__img');
const bigPictureSocial = modalBigPhoto.querySelector('.big-picture__social');
const commentsLoader = bigPictureSocial.querySelector('.comments-loader');

const findPhotoObject = (pictureId, photoData) =>
  photoData.find((item) => item.id === parseInt(pictureId, 10));

const onCommentsLoaderClick = () => renderMoreComments();

const openModalBigPhoto = (pictureId, photoData) => {
  modalBigPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onModalEscKeydown);
  modalBigPhoto.addEventListener('click', onModalElsewhereClick);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  const photoObject = findPhotoObject(pictureId, photoData);

  bigPhoto.querySelector('img').src = photoObject.url;
  bigPhoto.querySelector('img').alt = photoObject.description;
  bigPictureSocial.querySelector('.likes-count').textContent = photoObject.likes;
  bigPictureSocial.querySelector('.social__comment-total-count').textContent = photoObject.comments.length;
  bigPictureSocial.querySelector('.social__caption').textContent = photoObject.description;

  renderFirstsComments(photoObject.comments);
};

const closeModalBigPhoto = () => {
  modalBigPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onModalEscKeydown);
  modalBigPhoto.removeEventListener('click', onModalElsewhereClick);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
};

function onModalEscKeydown (evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalBigPhoto();
  }
}

function onModalElsewhereClick (evt) {
  if (!evt.target.closest('.big-picture__preview')) {
    closeModalBigPhoto();
  }
}

export { openModalBigPhoto, closeModalBigPhoto };
