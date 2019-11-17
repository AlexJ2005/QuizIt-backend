const getRightAnswers = array => {
  var rightAnswer = 0;

  array.forEach(element => {
    if (element[Object.keys(element)] === true) {
      rightAnswer++;
    }
  });
  return rightAnswer;
};

module.exports = getRightAnswers;
