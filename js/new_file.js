function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }

  return array;
}

async function generateQuiz() {
  let questions = [];

  // Fetch country data from the REST Countries API
  const response = await fetch('https://restcountries.com/v3.1/all');
  const countries = await response.json();

  // Shuffle the countries to ensure randomness
  shuffle(countries);

  // Select the first 50 unique countries for the quiz
  const selectedCountries = countries.slice(0, 50);

  for (let i = 0; i < selectedCountries.length; i++) {
    let country = selectedCountries[i];

    let newQuestion = {};
    newQuestion["numb"] = i + 1;

    // Question text
    newQuestion["question"] = "What is this country?";

    // Image URL for the flag
    newQuestion["flag"] = country.flags.png; // Flag image URL from the API

    // Correct answer
    let correctOption = country.name.common;

    // Generate wrong options
    let allOptions = [correctOption];
    let optionsArray = countries
      .filter((c) => c.name.common !== correctOption) // Exclude the correct country
      .map((c) => c.name.common); // Get only the names of other countries

    shuffle(optionsArray);

    // Add three random incorrect options
    for (let x = 0; x < 3; x++) {
      allOptions.push(optionsArray[x]);
    }

    // Shuffle all options
    shuffle(allOptions);

    newQuestion["options"] = allOptions;
    newQuestion["answer"] = correctOption;

    questions.push(newQuestion);
  }

  return questions;
}

// Example usage:
generateQuiz().then((questions) => {
  console.log(questions);
});