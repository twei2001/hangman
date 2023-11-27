import prompt from "readline-sync";
import wordBank from "./word-bank.js";

const playGame = () => {
  const getRandomWord = () => {
    const index = Math.floor(Math.random() * wordBank.length);
    return wordBank[index];
  };

  const randomWord = getRandomWord();
  let letters = randomWord.split("");
  let underscoreArray = [];
console.log(randomWord)
  for (let i = 0; i < letters.length; i++) {
    underscoreArray.push("_");
  }
  let letterInput = [];
  let round = 0;
  let roundLoss = 0;
  let stickfigure = "";

  const logStickFigure = () => {
    console.log(`Guesses Left: ${6 - roundLoss}`);
    const parts = ["  O  ", "\n /", "|", "\\", "\n /", " \\"];
    stickfigure += parts[roundLoss - 1];
    console.log(stickfigure);
  };

  while (round < randomWord.length && roundLoss < 6) {
    console.log(underscoreArray.join(" "));
    const guess = prompt.question("Please guess a letter: ").toLowerCase();

    if (letters.includes(guess)) {
      round++;
      const guessIndexes = [];
      for (let i = 0; i < letters.length; i++) {
        if (letters[i] === guess) {
          guessIndexes.push(i);
        }
      }
      guessIndexes.forEach((index) => {
        underscoreArray[index] = guess;
      });
    } else if (letterInput.includes(guess)) {
      console.log("You already guessed that letter");
    } else {
      roundLoss++;
      logStickFigure();
    }
    letterInput.push(guess);

    const playAgain = ()=>{
      const response = prompt.question("Do you want to play again? Type yes or no  " ).toLowerCase();
      if(response === 'yes'){
        playGame()
      }
    }
    if (roundLoss === 6) {
      console.log(`You lose, the word was ${randomWord.toUpperCase()}`);
      playAgain()
    } else if (underscoreArray.join("") === letters.join("")) {
      console.log(`You guessed the word ${randomWord.toUpperCase()}, you win!`);
      playAgain()
      break;
    }
  }
};
playGame();
