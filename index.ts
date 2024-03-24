#! /usr/bin/env node
import inquirer from "inquirer";

let continuePlaying: boolean = true;

while (continuePlaying) {
  let randomNum: number = Math.floor(Math.random() * 10);

  let attemptNum: number = 0;

  let predictionDiff: number = 0;

  let { guessesAllowed } = await inquirer.prompt([
    {
      name: "guessesAllowed",
      message: "Enter the number of guesses u can make: ",
      type: "number",
      filter: (input) => input || 1,
    },
  ]);

  while (guessesAllowed - attemptNum) {
    const { guessedNum } = await inquirer.prompt([
      {
        name: "guessedNum",
        message: "Guess the number between 0 and 9: ",
        type: "number",
        filter: (input) => input || 0,
      },
    ]);
    attemptNum++;
    if (guessedNum === randomNum) {
      // he wins
      console.log(
        `Congrates!! you guessed it right in ${attemptNum} attempt(s)`
      );
      attemptNum = guessesAllowed;
    } else if (guessesAllowed - attemptNum) {
      // he still has attempts left
      const currentDiff: number = Math.abs(randomNum - guessedNum);
      if (attemptNum === 1 || predictionDiff === currentDiff) {
        // first guess or repeats previous guess
        console.log(`Wrong Guess!!`);
      } else if (predictionDiff > currentDiff) {
        // better guess than previous try
        console.log(`Wrong Guess!! But you are getting closer. `);
      } else {
        // worse guess than previous try
        console.log(`Wrong Guess!! And you are getting further away. `);
      }
      console.log(
        `Now you have ${guessesAllowed - attemptNum} attempt(s) left. `
      );
      predictionDiff = currentDiff;
    } else {
      console.log("You Lost!!");
    }
  }

  const { continueInput } = await inquirer.prompt([
    {
      name: "continueInput",
      message: "Do you wanna play again? ",
      type: "confirm",
    },
  ]);
  continuePlaying = continueInput;
}
