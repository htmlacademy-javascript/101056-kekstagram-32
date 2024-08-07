const imgUploadScale = document.querySelector('.img-upload__scale');
const controlValue = imgUploadScale.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const STEP = 25;

const updateImageScale = (formStep) => {
  const value = parseInt(controlValue.value.slice(0, -1), 10);
  let scaleValue = value + formStep;

  if (scaleValue < 25) {
    scaleValue = 25;
  } else if (scaleValue > 100) {
    scaleValue = 100;
  }

  const transformValue = `scale(${scaleValue / 100})`;
  imgUploadPreview.style.transform = transformValue;
  controlValue.value = `${scaleValue}%`;
};

const onFormClickScaleButtons = (evt) => {
  const clickedElementClassList = evt.target.classList;

  if (clickedElementClassList.contains('scale__control--bigger')) {
    updateImageScale(STEP);
  } else if (clickedElementClassList.contains('scale__control--smaller')) {
    updateImageScale(-STEP);
  }
};

export { onFormClickScaleButtons, updateImageScale };
