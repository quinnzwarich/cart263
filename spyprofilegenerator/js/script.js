
let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`
};

let flowerData;
let objectData;
let tarotData;

function preload() {
  flowerData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/plants/flowers.json`);
  objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
  tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  let data = JSON.parse(localStorage.getItem(`spy-profile-data`));

  if (data !== null) {
    let password = prompt(`Agent! What is your password?!`);
    if (password === data.password) {
      spyProfile.name = data.name;
      spyProfile.alias = data.alias;
      spyProfile.secretWeapon = data.secretWeapon;
      spyProfile.password = data.password;
    }
  }
  else {
    generateSpyProfile();
  }
}

function generateSpyProfile() {
  spyProfile.name = prompt(`Agent! What is your name?!`);
  let flower = random(flowerData.flowers);
  spyProfile.alias = `the ${flower}`;
  spyProfile.secretWeapon = random(objectData.objects);
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

  localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
}

function draw() {
  background(255);

    let profile = `** SPY PROFILE! DO NOT DISTRIBUTE! >:( **

Name: ${spyProfile.name}
Alias: ${spyProfile.alias}
SecretWeapon: ${spyProfile.secretWeapon}
Password: ${spyProfile.password}`;

    push();
    textFont(`Courier, monospace`);
    textSize(24);
    textAlign(LEFT, TOP);
    text(profile, 100, 100);
    pop();
}
