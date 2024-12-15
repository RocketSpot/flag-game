function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

let questions = [];
for (let i = 0; i < 60; i++) {
  let newQuestion = {};
  newQuestion["numb"] = i + 1;

  let number1 = Math.floor(Math.random() * 10) + 2;
  let number2 = Math.floor(Math.random() * 10) + 2;
  let questionString = "What is " + number1 + " x " + number2 + "?";
  newQuestion["question"] = questionString;

  let allOptions = [];

  let correctOption = number1 * number2;
  allOptions.push(correctOption);

  let optionsArray = [];
  for (let j = correctOption - 10; j < correctOption + 10 && j !== correctOption; j++) {
    optionsArray.push(j);
  }
  
  for (let x = 0; x < 3; x++) {
    let index = Math.floor(Math.random() * optionsArray.length);
    allOptions.push(optionsArray[index]);
    optionsArray.splice(index, 1);
  }
  shuffle(allOptions);
  newQuestion["options"] = allOptions;

  newQuestion["answer"] = correctOption;

  questions.push(newQuestion);
}