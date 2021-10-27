// ###############
// # BASIC SETUP #
// ###############

// hard vars
const numberOfImages = 4;
// get window width
const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

// adjustable variables
let minTime = 300;
let targetPointMargin = 0;
let expansion = 1;
let maskExpansion = 1;
let rotation = false;
let rotationAmount = .001;

// filter vars
var alphaemboss = false;
var maskemboss = false;
var alphablur = false;
var maskeblur = false;
var bluramount = 1;
var bloomamount = 20;
var embossamount = 4.5;

console.log("currently loading images and interface...");












// ##################
// # CONTROLS SETUP #
// ##################

document.onkeydown = function(e) {
  // console.log(e);
  // exp. speed up
  if (e.key == "ArrowUp") {
    expansion *= 1 + 0.001;
    maskExpansion *= 1 + 0.001;
    // interface
    updateConsoleInterface();
  }
  // exp. speed down
  if (e.key == "ArrowDown") {
    expansion *= 1 - 0.001;
    maskExpansion *= 1 - 0.001;
    // interface
    updateConsoleInterface();
  }
  // only mask speed up
  if (e.key == ".") {
    maskExpansion *= 1 + 0.0001;
    // interface
    updateConsoleInterface();
  }
  // only mask speed down
  if (e.key == ",") {
    maskExpansion *= 1 - 0.0001;
    // interface
    updateConsoleInterface();
  }
  // transition time up
  if (e.key == "ArrowRight") {
    minTime *= 1 + 0.1;
    // interface
    updateConsoleInterface();
  }
  // transition time down
  if (e.key == "ArrowLeft") {
    minTime *= 1 - 0.1;
    // interface
    updateConsoleInterface();
  }
  // targetpoint margin up
  if (e.key == "]") {
    targetPointMargin *= 1 + .5;
    if (targetPointMargin == 0) {
      targetPointMargin = 1;
    }
    // interface
    updateConsoleInterface();
  }
  // targetpoint margin down
  if (e.key == "[") {
    targetPointMargin *= 1 - .5;
    if (targetPointMargin == 0) {
      targetPointMargin = -1;
    }
    // interface
    updateConsoleInterface();
  }


  // filter controls
  // embossAlpha on/off
  if (e.key == "1") {
    embossAlpha.enabled = !embossAlpha.enabled
    // interface
    updateConsoleInterface();
  }
  // embossMasked on/off
  if (e.key == "2") {
    embossMasked.enabled = !embossMasked.enabled
    // interface
    updateConsoleInterface();
  }
  // blurAlpha on/off
  if (e.key == "3") {
    blurAlpha.enabled = !blurAlpha.enabled
    // interface
    updateConsoleInterface();
  }
  // blurMasked on/off
  if (e.key == "4") {
    blurMasked.enabled = !blurMasked.enabled
    // interface
    updateConsoleInterface();
  }
  // blurAlpha on/off
  if (e.key == "5") {
    bloomAlpha.enabled = !bloomAlpha.enabled
    // interface
    updateConsoleInterface();
  }
  // blurMasked on/off
  if (e.key == "6") {
    bloomMasked.enabled = !bloomMasked.enabled
    // interface
    updateConsoleInterface();
  }


  // adjustment Controls alpha
  // gamma up down
  if (e.key == "q") {
    adjustmentAlpha.gamma -= .1;
    // interface
    updateConsoleInterface();
  }
  if (e.key == "w") {
    adjustmentAlpha.gamma += .1;
    // interface
    updateConsoleInterface();
  }
  // saturation up down
  if (e.key == "e") {
    adjustmentAlpha.saturation -= .1;
    // interface
    updateConsoleInterface();
  }
  if (e.key == "r") {
    adjustmentAlpha.saturation += .1;
    // interface
    updateConsoleInterface();
  }
  // contrast up down
  if (e.key == "t") {
    adjustmentAlpha.contrast -= .1;
    // interface
    updateConsoleInterface();
  }
  if (e.key == "y") {
    adjustmentAlpha.contrast += .1;
    // interface
    updateConsoleInterface();
  }
  // brightness up down
  if (e.key == "u") {
    adjustmentAlpha.brightness -= .1;
    // interface
    updateConsoleInterface();
  }
  if (e.key == "i") {
    adjustmentAlpha.brightness += .1;
    // interface
    updateConsoleInterface();
  }


  // adjustment Controls masked
  // gamma up down
  if (e.key == "a") {
    adjustmentMasked.gamma -= .1;
    // interface
    updateConsoleInterface();
  }
  if (e.key == "s") {
    adjustmentMasked.gamma += .1;
    // interface
    updateConsoleInterface();
  }
  // saturation up down
  if (e.key == "d") {
    adjustmentMasked.saturation -= .1;
    // interface
    updateConsoleInterface();
  }
  if (e.key == "f") {
    adjustmentMasked.saturation += .1;
    // interface
    updateConsoleInterface();
  }
  // contrast up down
  if (e.key == "g") {
    adjustmentMasked.contrast -= .1;
    // interface
    updateConsoleInterface();
  }
  if (e.key == "h") {
    adjustmentMasked.contrast += .1;
    // interface
    updateConsoleInterface();
  }
  // brightness up down
  if (e.key == "j") {
    adjustmentMasked.brightness -= .1;
    // interface
    updateConsoleInterface();
  }
  if (e.key == "k") {
    adjustmentMasked.brightness += .1;
    // interface
    updateConsoleInterface();
  }

};















// ###############
// # LOAD IMAGES #
// ###############

var allImg = ["img/385DE7B7-4FCE-4FC9-8B90-F17BF0CA2604.JPG", "img/431295BE-2C56-47D0-B417-9C9EF338665A.JPG", "img/IMG_2110.JPG", "img/IMG_2115.JPG", "img/IMG_2116.JPG", "img/IMG_2121.JPG", "img/IMG_2122.JPG", "img/IMG_3601.jpg", "img/IMG_4047.jpg", "img/IMG_4049.jpg", "img/IMG_4052.jpg", "img/IMG_4056.jpg", "img/IMG_4496.JPG", "img/IMG_4592.JPG", "img/IMG_4680.JPG", "img/IMG_4804.JPG", "img/IMG_4854.JPG", "img/IMG_4860.JPG", "img/IMG_4867.jpg", "img/IMG_4868.JPG", "img/IMG_4874.JPG", "img/IMG_4878.JPG", "img/IMG_4886.JPG", "img/IMG_5242.JPG", "img/IMG_5253.JPG", "img/IMG_5257.JPG", "img/IMG_5260.JPG", "img/IMG_5330.JPG", "img/IMG_5346.JPG", "img/IMG_5350.JPG", "img/IMG_5354.JPG", "img/IMG_5361.JPG", "img/IMG_5363.JPG", "img/IMG_5367.jpg", "img/IMG_5372.JPG", "img/IMG_5469.JPG", "img/IMG_5477.jpg", "img/IMG_5543.jpg", "img/IMG_5544 2.JPG", "img/IMG_5643.JPG", "img/IMG_5646.jpg", "img/IMG_5647.JPG", "img/IMG_5657.JPG", "img/IMG_5661.PNG", "img/IMG_5673.jpg", "img/IMG_5836 2.JPG", "img/IMG_5837.JPG", "img/IMG_5948.jpg", "img/IMG_5949.jpg", "img/IMG_5995.JPG", "img/IMG_6020.jpg", "img/IMG_6022.JPG", "img/IMG_6023.JPG", "img/IMG_6193.JPG", "img/IMG_6194.JPG", "img/IMG_6308.JPG", "img/IMG_6485.JPG", "img/IMG_6555.JPG", "img/IMG_6564.JPG", "img/IMG_6567.JPG", "img/IMG_6646 2.JPG", "img/IMG_6647.JPG", "img/IMG_6900.JPG", "img/IMG_7754 2.JPG", "img/IMG_7763.JPG", "img/IMG_8813.JPG", "img/IMG_8900.jpg", "img/IMG_8914.JPG", "img/IMG_8921.JPG", "img/IMG_8928.JPG", "img/IMG_8933.JPG", "img/IMG_8935.jpg", "img/IMG_8989.jpg"]

var allImgNames = [];
// make array of names
for (var i = 0; i < allImg.length; i++) {
  allImgNames.push("img" + i);
}

// make new pixi app
const app = new PIXI.Application({ width: windowWidth, height: windowHeight });
document.body.appendChild(app.view);

// load all image resources
const loader = PIXI.Loader.shared;
const sprites = {};
// load all images programmatically
for (var i = 0; i < allImg.length; i++) {
  loader.add('img' + i, allImg[i]);
}

// The `load` method loads the queue of resources, and calls the passed in callback called once all
// resources have loaded.
loader.load((loader, resources) => {
  for (var i = 0; i < allImg.length; i++) {
    sprites["img" + i] = new PIXI.Sprite(resources["img" + i].texture);
  }
});














// ################
// # FILTER SETUP #
// ################


const adjustmentAlpha = new PIXI.filters.AdjustmentFilter();
adjustmentAlpha.gamma = 1;
adjustmentAlpha.saturation = 1;
adjustmentAlpha.contrast = 1;
adjustmentAlpha.brightness = 1;

const adjustmentMasked = new PIXI.filters.AdjustmentFilter();
adjustmentMasked.gamma = 1;
adjustmentMasked.saturation = 1;
adjustmentMasked.contrast = 1;
adjustmentMasked.brightness = 1;

const embossAlpha = new PIXI.filters.EmbossFilter();
embossAlpha.enabled = false;
embossAlpha.strength = embossamount;

const embossMasked = new PIXI.filters.EmbossFilter();
embossMasked.enabled = false;
embossMasked.strength = embossamount * -1;

const bloomAlpha = new PIXI.filters.BloomFilter();
bloomAlpha.enabled = false;
bloomAlpha.blur = bloomamount;

const bloomMasked = new PIXI.filters.BloomFilter();
bloomMasked.enabled = false;
bloomMasked.blur = bloomamount;

const blurAlpha = new PIXI.filters.BlurFilter();
blurAlpha.enabled = false;
blurAlpha.blur = bluramount;

const blurMasked = new PIXI.filters.BlurFilter();
blurMasked.enabled = false;
blurMasked.blur = bluramount;









// ##############
// # PIXI SETUP #
// ##############

// when all images are loaded we can start
loader.onComplete.add(() => {
  // build interface
  updateConsoleInterface();

  // dynamically create some images, and their counterparts
  masked = [];
  mask = [];
  alpha = [];
  targetPoints = [];
  elapsed = [];

  addImageToScene();

  // reset basically moves this point randomly, and the mask will then start moving there
  function resetTargetPoints(id) {
    targetPoints[id].x  = ( ( Math.random() - .5 ) * targetPointMargin ) + ( windowWidth / 2 );
    targetPoints[id].y  = ( ( Math.random() - .5 ) * targetPointMargin ) + ( windowWidth / 2 );
  }

  // Tell our application's ticker to run a new callback every frame, passing
  // in the amount of time that has passed since the last tick
  app.ticker.add((delta) => {
    // for each image instance do a thing
    for (var i = 0; i < masked.length; i++) {

      // movement etc
      const maxTime = masked[i].time;
      // count time
      elapsed[i] += delta;
      // turn up alpha of mask
      masked[i].alpha = masked[i].alpha + 1 / (masked[i].time / 2);
      // only start with main alpha a bit later
      if (elapsed[i] > masked[i].time / 2) {
        alpha[i].alpha = alpha[i].alpha + 1 / ( masked[i].time - masked[i].time / 2 );
      }
      // move mask towards target point
      mask[i].x += (targetPoints[i].x - mask[i].x) * 1 / masked[i].time;
      mask[i].y += (targetPoints[i].y - mask[i].y) * 1 / masked[i].time;

      // scale image
      masked[i].scale.set( masked[i].scale._x * expansion );
      mask[i].scale.set( mask[i].scale._x * maskExpansion );
      alpha[i].scale.set( alpha[i].scale._x * expansion );

      // rotation
      if (rotation == true) {
        masked[i].rotation += masked[i].rotationAmount;
        mask[i].rotation += masked[i].rotationAmount;
        alpha[i].rotation += masked[i].rotationAmount;
      }

      // if time is up, delete previous image, add new one
      if (elapsed[i] > maxTime / 2 && masked[i].next == true) {
        masked[i].next = false;
        addImageToScene();
        if (masked[i - 3]) {
          app.stage.removeChild(masked[i - 3]);
          app.stage.removeChild(mask[i - 3]);
          app.stage.removeChild(alpha[i - 3]);
        }
      }
    }
  });
}); // called once when the queued resources all load.















// #####################
// # GENERAL FUNCTIONS #
// #####################

// putting the fun back into functions
function findLongestString(array){
  var longestWord = array.sort(function(a, b) {
    return b.length - a.length;
  });
  return array[0];
}
// add an image to the scene
function addImageToScene(){

  // create alpha for this image
  alpha.push(new PIXI.Sprite());
  alpha[alpha.length - 1].alpha = 0;
  addRandomImage(alpha[alpha.length - 1], sprites);
  placeImage(alpha[alpha.length - 1]);




  // apply filter to alpha
  alpha[alpha.length - 1].filters = [embossAlpha, adjustmentAlpha, blurAlpha];

  // define the image that will be masked
  masked.push(new PIXI.Sprite());
  // add random time value for this
  masked[masked.length - 1].time = minTime + minTime * Math.random();
  // add next value
  masked[masked.length - 1].next = true;
  // alpha value
  masked[masked.length - 1].alpha = 0;
  // roation
  masked[masked.length - 1].rotationAmount = (Math.random() - .5) * rotationAmount;
  masked[masked.length - 1].texture = alpha[masked.length - 1].texture;
  placeImage(masked[masked.length - 1]);

  // apply masked filters
  masked[masked.length - 1].filters = [embossMasked, adjustmentMasked, blurMasked, bloomMasked];

  // create mask for this image
  mask.push(new PIXI.Sprite());
  mask[mask.length - 1].texture = alpha[mask.length - 1].texture;
  placeImage(mask[mask.length - 1]);
  // define the mask image as the mask for the top image
  masked[mask.length - 1].mask = mask[mask.length - 1];

  // create targetpoints for this image (center of image)
  // only if there are less targetPoints than images
  if (targetPoints.length < masked.length) {
    targetPoints.push(new PIXI.Point(windowWidth/2, windowHeight/2));
  }

  // create new counter
  elapsed.push(0.0);
}
// add a random image
function addRandomImage(target, src){
  target.texture = getRandomProp(src).texture;
}

// get random property from object
function getRandomProp(obj){
  var keys = Object.keys(obj);
  return obj[keys[ keys.length * Math.random() << 0]];
}

// place an image and center it
function placeImage(target){
  // reset scale otherwise it fucks up
  target.scale.set(1);
  // size the image so that it covers the canvas
  target.scale.set(getScaleFactor(target.width, target.height));
  // center image
  target.anchor.x = 0.5;
  target.anchor.y = 0.5;
  target.position.x = windowWidth / 2;
  target.position.y = windowHeight / 2;
  // add background to stage
  app.stage.addChild(target);
}

// find scale factor for image any image
function getScaleFactor(imgwidth, imgheight){
  scalex = windowWidth / imgwidth;
  scaley = windowHeight / imgheight;
  if (scalex > scaley) {
    return scalex
  } else {
    return scaley
  }
}









// ######################
// # INTERFACE FUNCTION #
// ######################

function updateConsoleInterface(){
  console.clear();
  // explain controls
  console.log("╔ Controls ═════════════════════════╗\n"
            + "║                                   ║\n"
            + "║ Image expansion combined — ↑ or ↓ ║\n"
            + "║ Mask expansion alone ————— < or > ║\n"
            + "║ Image transition time ———— ← or → ║\n"
            + "║ mask movement amount ————— [ or ] ║\n"
            + "║ ————————————————————————————————— ║\n"
            + "║ alpha emboss toggle ——————————— 1 ║\n"
            + "║ mask emboss toggle ———————————— 2 ║\n"
            + "║ alpha blur toggle ————————————— 3 ║\n"
            + "║ mask blur toggle —————————————— 4 ║\n"
            + "║ alpha bloom toggle ———————————— 5 ║\n"
            + "║ mask bloom toggle ————————————— 6 ║\n"
            + "║ ————————————————————————————————— ║\n"
            + "║ alpha gamma —————————————— q or e ║\n"
            + "║ alpha saturation ————————— e or r ║\n"
            + "║ alpha contrast ——————————— t or y ║\n"
            + "║ alpha brightness ————————— u or i ║\n"
            + "║ ————————————————————————————————— ║\n"
            + "║ masked gamma ————————————— a or s ║\n"
            + "║ masked saturation ———————— d or f ║\n"
            + "║ masked contrast —————————— g or h ║\n"
            + "║ masked brightness ———————— j or k ║\n"
            + "║                                   ║\n"
            + "╚═══════════════════════════════════╝"
          );
  // make array of value objects, round to certin number of digits after 0
  var values = [
    {
      key: "time",
      value: Math.round(minTime * 10000) / 10000,
    },{
      key: "exp.",
      value: Math.round(expansion * 10000) / 10000,
    },{
      key: "maks",
      value: Math.round(maskExpansion * 10000) / 10000,
    },{
      key: "a.emb",
      value: + embossAlpha.enabled,
    },{
      key: "m.emb",
      value: + embossMasked.enabled,
    },{
      key: "a.blr",
      value: + blurAlpha.enabled,
    },{
      key: "m.blr",
      value: + blurMasked.enabled,
    },{
      key: "a.blm",
      value: + bloomAlpha.enabled,
    },{
      key: "m.blm",
      value: + bloomMasked.enabled,
    },{
      key: "a.gamma",
      value: Math.round(adjustmentAlpha.gamma * 10000) / 10000,
    },{
      key: "a.strtn",
      value: Math.round(adjustmentAlpha.saturation * 10000) / 10000,
    },{
      key: "a.contr",
      value: Math.round(adjustmentAlpha.contrast * 10000) / 10000,
    },{
      key: "a.brght",
      value: Math.round(adjustmentAlpha.brightness * 10000) / 10000,
    },{
      key: "m.gamma",
      value: Math.round(adjustmentMasked.gamma * 10000) / 10000,
    },{
      key: "m.strtn",
      value: Math.round(adjustmentMasked.saturation * 10000) / 10000,
    },{
      key: "m.contr",
      value: Math.round(adjustmentMasked.contrast * 10000) / 10000,
    },{
      key: "m.brght",
      value: Math.round(adjustmentMasked.brightness * 10000) / 10000,
    }
  ];
  // define output object
  var output = {
    bordertop:    "╔",
    keyline:      "║ ",
    bordermiddle: "╟",
    valueline:    "║ ",
    borderbottom: "╚",
  };
  // find the longest statement for each object, add to total length, add to output object
  for (var i = 0; i < values.length; i++) {
    // find longest entry
    values[i].length = findLongestString([values[i].key, String(values[i].value)]);
    // add to output array
    output.bordertop    += new Array(values[i].length.length + 3).join( "═" ) + "╤";
    output.keyline      += values[i].key + new Array(values[i].length.length - values[i].key.length + 1).join( " " ) + " │ ";
    output.bordermiddle += new Array(values[i].length.length + 3).join( "─" ) + "┼";
    output.valueline    += values[i].value + new Array(values[i].length.length - String(values[i].value).length + 1).join( " " ) + " │ ";
    output.borderbottom += new Array(values[i].length.length + 3).join( "═" ) + "╧";
    // fix the ends of each line
    if (i == values.length - 1) {
      output.bordertop    = output.bordertop.substr(0, output.bordertop.length - 2) + "═╗\n";
      output.keyline      = output.keyline.substr(0, output.keyline.length - 3) + " ║\n";
      output.bordermiddle = output.bordermiddle.substr(0, output.bordermiddle.length - 2) + "─╢\n";
      output.valueline    = output.valueline.substr(0, output.valueline.length - 3) + " ║\n";
      output.borderbottom = output.borderbottom.substr(0, output.borderbottom.length - 2) + "═╝\n";
    }
  }
  console.warn("\n" + output.bordertop + output.keyline + output.bordermiddle + output.valueline + output.borderbottom);
}
