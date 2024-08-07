const COMMENTS_COUNT = 5;
let comments = [];

const bigPictureSocial = document.querySelector('.big-picture__social');
const socialComments = bigPictureSocial.querySelector('.social__comments');
const commentsTemplate = socialComments.querySelector('.social__comment');
const commentsLoader = bigPictureSocial.querySelector('.comments-loader');

const commentsFragment = document.createDocumentFragment();

const createCommentsFragment = (index) => {
  const commentsElement = commentsTemplate.cloneNode(true);
  commentsElement.querySelector('img').src = comments[index].avatar;
  commentsElement.querySelector('img').alt = comments[index].name;
  commentsElement.querySelector('.social__text').textContent = comments[index].message;
  commentsFragment.appendChild(commentsElement);
};

const renderSocialCommentShownCount = () => {
  const commentsShown = socialComments.children.length;
  bigPictureSocial.querySelector('.social__comment-shown-count').textContent = commentsShown;
};

const renderCommentsLoader = () => {
  const commentsTotal = comments.length;
  const commentsShown = socialComments.children.length;
  commentsLoader.classList.remove('hidden');

  if (commentsShown >= commentsTotal) {
    commentsLoader.classList.add('hidden');
  }
};

const renderFirstsComments = (commentsArray) => {
  socialComments.innerHTML = '';
  comments = commentsArray;

  for (let i = 0; i < COMMENTS_COUNT && i < comments.length; i++) {
    createCommentsFragment(i);
  }
  socialComments.appendChild(commentsFragment);
  renderSocialCommentShownCount();
  renderCommentsLoader();
};

const renderMoreComments = () => {
  const lastIndex = socialComments.children.length;

  for (let i = lastIndex; i < lastIndex + COMMENTS_COUNT && i < comments.length; i++) {
    createCommentsFragment(i);
  }
  socialComments.appendChild(commentsFragment);
  renderSocialCommentShownCount();
  renderCommentsLoader();
};

export { renderFirstsComments, renderMoreComments };
