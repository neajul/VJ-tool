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
alphagamma = 0;
alphaemboss = 0;

updateConsoleInterface();












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
  // alpha: more gamma
  if (e.key == "2") {
    alphagamma += .1;
    alphaAdjustment.gamma = alphagamma;
    // interface
    updateConsoleInterface();
    console.log("gamma", alphagamma);
  }
  // alpha: less gamma
  if (e.key == "1") {
    alphagamma -= .1;
    alphaAdjustment.gamma = alphagamma;
    // interface
    updateConsoleInterface();
    console.log("gamma", alphagamma);
  }

  // alpha: more emboss
  if (e.key == "4") {
    alphaemboss += .1;
    alphaDisplace.strength = alphaemboss;
    // interface
    updateConsoleInterface();
    // console.log("alphaDisplace", alphaemboss);
  }
  // alpha: less emboss
  if (e.key == "3") {
    alphaemboss -= .1;
    alphaDisplace.strength = alphaemboss;
    // interface
    updateConsoleInterface();
    // console.log("alphaDisplace", alphaemboss);
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

// general filter
const alphaAdjustment = new PIXI.filters.AdjustmentFilter();
alphaAdjustment.gamma = 0;
alphaAdjustment.contrast = 1;
alphaAdjustment.brightness = 1;

const alphaDisplace = new PIXI.filters.EmbossFilter();
alphaDisplace.strength = 0;

const alphaBlur = new PIXI.filters.BlurFilter();
alphaBlur.blur = 100;













// ##############
// # PIXI SETUP #
// ##############

// when all images are loaded we can start
loader.onComplete.add(() => {
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


      // // for testing just one image at a time!
      // if (elapsed[i] > maxTime / 1 && masked[i].next == true) {
      //   masked[i].next = false;
      //   addImageToScene();
      //   if (masked[i - 1]) {
      //     app.stage.removeChild(masked[i - 1]);
      //     app.stage.removeChild(mask[i - 1]);
      //     app.stage.removeChild(alpha[i - 1]);
      //   }
      // }


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
  // alpha[alpha.length - 1].filters = [alphaDisplace, alphaAdjustment];
  alpha[alpha.length - 1].filters = [alphaAdjustment];
  // alpha[alpha.length - 1].filters = [alphaBlur];




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


  masked[masked.length - 1].filters = [alphaDisplace];

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
            + "║ decr. alpha gamma ———————— 1      ║\n"
            + "║ incr. alpha gamma ———————— 2      ║\n"
            + "║ decr. alpha emboss ——————— 3      ║\n"
            + "║ incr. alpha emboss ——————— 4      ║\n"
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
      key: "target",
      value: Math.round(targetPointMargin * 10000) / 10000,
    },{
      key: "rotation",
      value: rotation,
    },{
      key: "rot. amnt.",
      value: Math.round(rotationAmount * 10000) / 10000,
    },{
      key: "a.gamma",
      value: Math.round(alphagamma * 10000) / 10000,
    },{
      key: "a.embss",
      value: Math.round(alphaemboss * 10000) / 10000,
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
