const imgUploadScale = document.querySelector('.img-upload__scale');
const controlValue = imgUploadScale.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const STEP = 25;
const SCALE_VALUE_MIN = 25;
const SCALE_VALUE_MAX = 100;
const PERCENTAGE_BASE = 100;

const updateImageScale = (formStep) => {
  const value = parseInt(controlValue.value.slice(0, -1), 10);
  let scaleValue = value + formStep;

  if (scaleValue < SCALE_VALUE_MIN) {
    scaleValue = SCALE_VALUE_MIN;
  } else if (scaleValue > SCALE_VALUE_MAX) {
    scaleValue = SCALE_VALUE_MAX;
  }

  const transformValue = `scale(${scaleValue / PERCENTAGE_BASE})`;
  imgUploadPreview.style.transform = transformValue;
  controlValue.value = `${scaleValue}%`;
};

const onScaleButtonsClick = (evt) => {
  const clickedElementClassList = evt.target.classList;

  if (clickedElementClassList.contains('scale__control--bigger')) {
    updateImageScale(STEP);
  } else if (clickedElementClassList.contains('scale__control--smaller')) {
    updateImageScale(-STEP);
  }
};

export { onScaleButtonsClick, updateImageScale };
