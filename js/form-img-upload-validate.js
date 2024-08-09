import { hasDuplicates } from './util.js';

const PATTERN = /^#[a-zа-яё0-9]+$/;
const HASHTAGS_MAX = 5;
const HASHTAG_LENGTH_MAX = 20;
const DESCRIPTION_LENGTH_MAX = 140;

let errorText = '';

const validateHashtags = (value) => {
  errorText = '';

  if (value === '') {
    return true;
  }

  const hashtagsString = value.trim().toLowerCase();
  const hashtags = hashtagsString.split(/\s+/).filter(Boolean);

  if (hashtags.length > HASHTAGS_MAX) {
    errorText = `Нельзя указать больше ${HASHTAGS_MAX} хэштегов`;
    return false;
  }

  if (hasDuplicates(hashtags)) {
    errorText = 'Хэштеги не должны повторяться';
    return false;
  }

  for (const hashtag of hashtags) {
    if (!hashtag.startsWith('#')) {
      errorText = 'Хэштег начинается с символа #';
      return false;
    }
    if (!PATTERN.test(hashtag)) {
      errorText = 'Хэштег должен состоять из букв и чисел';
      return false;
    }
    if (hashtag === '#') {
      errorText = 'Хеш-тег не может состоять только из одной решётки';
      return false;
    }
    if (hashtag.length > HASHTAG_LENGTH_MAX) {
      errorText = `Максимальная длина хэштега - ${ HASHTAG_LENGTH_MAX } символов`;
      return false;
    }
  }

  return true;
};

const validateDescription = (value) => {
  errorText = '';

  if (value.length > DESCRIPTION_LENGTH_MAX) {
    errorText = `Длина комментария не более ${ DESCRIPTION_LENGTH_MAX } символов`;
    return false;
  }

  return true;
};

const getErrorText = () => errorText;

export { validateHashtags, getErrorText, validateDescription };
