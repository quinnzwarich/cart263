class Encrypt {
  constructor(x, y, string) {
    this.x = x;
    this.y = y;
    this.string = string;
    this.randomInts = {
      ii: floor(random(1, 5)),
      ij: floor(random(1, 5)),
      ji: floor(random(1, 5)),
      jj: floor(random(1, 5))
    };
    // I am using math.js to handle matrix multiplication for me
    this.matrix = math.matrix([[this.randomInts.ii, this.randomInts.ij],
    [this.randomInts.ji, this.randomInts.jj]]);
    this.arrays = [];
    this.offset = 112;
    this.secondOffset = 0;
    this.thirdOffset = 0;
    let characters = this.string.split('');
    for (let i = 0; i < characters.length; i++) {
      if (!(i % 2 === 0)) {
        // characters from the string are divided into groups of two
        // these characters are then converted to their corresponding alphanumeric value
        // solution for achieving this was found here:
        // https://stackoverflow.com/questions/22624379/how-to-convert-letters-to-numbers-with-javascript
        // these vectors are then multiplied agaisnt a matrix
        let vector = characters.slice(i - 1, i + 1);
        vector[0] = vector[0].charCodeAt(0) - 97;
        vector[1] = vector[1].charCodeAt(0) - 97;
        vector = math.multiply(this.matrix, vector);
        this.arrays.push(vector);
      }
    }
  }

  decode() {
    // calculate the inverse matrix
    // I know this part works
    let inverseMultiplier =
    1 / ((this.randomInts.ii * this.randomInts.jj) - (this.randomInts.ij * this.randomInts.ji));
    let moddedMatrix = math.matrix([[this.randomInts.jj, -this.randomInts.ij],
    [-this.randomInts.ji, this.randomInts.ii]]);
    let inverseMatrix = math.multiply(inverseMultiplier, moddedMatrix); console.log(inverseMatrix);

    // multiply the inverse matrix with the vectors from earlier
    // then convert them back into their corresponding letter value
    for (let i = 0; i < this.arrays.length; i++) {
      let vector = math.multiply(inverseMatrix, this.arrays[i]);
      let stringVector = [String.fromCharCode(97 + vector[0]), String.fromCharCode(97 + vector[1])];
      console.log(vector);
      this.arrays.splice(i, 1, stringVector);
    }
  }

  display() {
    for (let i = 0; i < this.arrays.length; i++) {
      if (i <= floor(this.arrays.length / 2)) {
        this.secondOffset = (i + 1) * this.offset;
        push();
        textSize(14);
        text(`${this.arrays[i]}`, this.x + (i * this.offset), this.y);
        pop();
      }
      else {
        push();
        textSize(14);
        text(`${this.arrays[i]}`, this.x + (i * this.offset) - this.secondOffset, this.y + this.offset / 4);
        pop();
      }
    }
  }

  mousePressed() {
    this.decode();
  }
}
