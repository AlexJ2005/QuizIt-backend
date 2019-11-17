const getRightAnswers = array => {
  var rightAnswer = 0;

  array.forEach(element => {
    if (Object.keys(element) === true) {
      rightAnswer += 1;
    }
  });
  return rightAnswer;
};

module.exports = getRightAnswers;
