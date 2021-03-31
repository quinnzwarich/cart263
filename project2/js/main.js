/**
project 2
Quinn Zwarich

:(
*/

"use strict";

let goose = {
	direction: `right`
};

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: `arcade`,
		arcade: {
			gravity: { y: 600 }
		}
  },
  scene: [Boot, Play]
};

let game = new Phaser.Game(config);
