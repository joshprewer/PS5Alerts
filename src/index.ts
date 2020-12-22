import fetch from 'node-fetch'

async function main() {
  try {
    const gameResponse = await fetch('https://www.game.co.uk/playstation-5');
    console.log(gameResponse);
  } catch (error) {
    console.log(error);
  }
}

main();