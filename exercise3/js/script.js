/*****************
Spy Profile Generator++
Quinn Zwarich

I attempted to make an algorithm that could encode a message and later
decode the same message based on interaction from the user.
I have not yet succeeded.
******************/

let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`,
  location: ``
};

let flowerData;
let objectData;
let tarotData;
let planetData;

let phrase = ``;
let message;
let key = true;

function preload() {
  flowerData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/plants/flowers.json`);
  objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
  tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`);
  planetData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/science/minor_planets.json`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(`Courier, monospace`);
  textAlign(LEFT, TOP);

  let data = JSON.parse(localStorage.getItem(`spy-profile-data`));

  if (data !== null) {
    let password = prompt(`Agent! What is your password?!`);
    if (password === data.password) {
      spyProfile.name = data.name;
      spyProfile.alias = data.alias;
      spyProfile.secretWeapon = data.secretWeapon;
      spyProfile.password = data.password;
      spyProfile.location = data.location;
    }
  }
  else {
    generateSpyProfile();
  }

  // I am using planet data to supply a location that will supposedly be attacked
  phrase = `we strike ${spyProfile.location} at dawn`;
  message = new Encrypt(100, 300, phrase);
}

function generateSpyProfile() {
  spyProfile.name = prompt(`Agent! What is your name?!`);
  let flower = random(flowerData.flowers);
  spyProfile.alias = `the ${flower}`;
  spyProfile.secretWeapon = random(objectData.objects);
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);
  spyProfile.location = random(planetData.minor_planets);

  localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
}

function draw() {
  background(255);
  message.display();

    let profile = `** SPY PROFILE! DO NOT DISTRIBUTE! >:( **

Name: ${spyProfile.name}
Alias: ${spyProfile.alias}
SecretWeapon: ${spyProfile.secretWeapon}
Password: ${spyProfile.password}`;

    push();
    textSize(24);
    text(profile, 100, 100);
    pop();
}

// for now all the user has to do is click to decode the message
function mousePressed() {
  if (key) {
    message.mousePressed();
    key = false;
  }
}
