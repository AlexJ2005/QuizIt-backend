const getRightAnswers = array => {
  var rightAnswer = 0;

  const rightAnswers = array.forEach(element => {
    if (Object.keys(element) === true) {
      rightAnswer++;
    }
  });
  return rightAnswer;
};

module.exports = getRightAnswers;
