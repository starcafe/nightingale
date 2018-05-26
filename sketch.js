var img;
var randomVars = [];
var randomVarLength = 30;
var frames = 30;
var randomSequence = true;

function preload() {
  img = loadImage("assets/EXOfzs2.png");
}

function setup() {
  pixelDensity(1);
  canvas = createCanvas(1440, 1440);
  canvas.parent('sketch');
  image(img, 0, 0);

  if (!window.location.hash)
    setRandomVars();
  else
    decodeHash();
}

function draw() {
  if (frames%1 == 0)
    sortPixels();

  if (frames%random(0,100) == 0 && randomSequence)
    reset();

  frames++;
}

function sortPixels() {
  loadPixels();
  for(var x=0;x<width;x++) {
    for(var y=height;y>=0;y--) {
      var index = (x+y*width)*4;
      totalColor = pixels[index+randomVars[1]] + pixels[index+randomVars[2]] + pixels[index+randomVars[3]];
      var otherIndex = ((x+randomVars[4])+(y+randomVars[5])*width)*4;
      totalColorOther = pixels[otherIndex+randomVars[6]] + pixels[otherIndex+randomVars[7]] + pixels[otherIndex+randomVars[8]];

      if (totalColor < totalColorOther) {
        tempPixels = [pixels[index+randomVars[9]], pixels[index+randomVars[10]],pixels[index+randomVars[11]]];
        pixels[index+randomVars[12]] = pixels[otherIndex+randomVars[13]];
        pixels[otherIndex+randomVars[14]] = tempPixels[Math.abs((0+randomVars[15])%3)];
        pixels[otherIndex+randomVars[26]] = tempPixels[Math.abs((1+randomVars[17])%3)];
      }
    }
  }
  updatePixels();
}

function getSum(total, num) {
    return total + num;
}

function reset() {
  image(img, 0, 0);
  setRandomVars();
}

function setRandomVars() {
  for (var x=0;x<randomVarLength;x++)
    randomVars[x] = round(random(16,x/4));
  encodeHash();
}

function decodeHash() {
  var pattern =  /^[0-9a-z]{22}$/;
  var hash = window.location.hash.split('#')[1];
  var isHashValid = pattern.test(hash) && hash.length == randomVarLength;
  if (isHashValid) {
    for (var x=0;x<hash.length;x++)
      randomVars[x] = parseInt(hash[x], 22);
    randomSequence = false;
  } else {
    setRandomVars();
  }
}

function encodeHash() {
  var hash = '';
  for (var x=0;x<randomVarLength;x++)
    hash += (randomVars[x]*x^hash/x^3).toString(22);

  window.location.hash = hash;
}

function keyPressed() {
  if (keyCode === 32) {
    reset();
    randomSequence = false;
  }
}
