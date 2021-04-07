const Colors = Object.freeze({
  primary: '#ef5350',
  accent: '#DCE775',
  background: '#FAFAFA',
  surface: '#EEEEEE',
  text: '#212121',
  disabled: '#9E9E9E',
  placeholder: '#757575',
  backdrop: '#B0BEC5',
  notification: '#E64A19',
});

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const shuffleArray = array => {
  let newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    let j = getRandomIntInclusive(0, i);
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export {Colors, getRandomIntInclusive, shuffleArray};
