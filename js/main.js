// hard vars
numberOfImages = 4;

// adjustable variables
const minTime = 500;
const targetPointMargin = 5;

// get window width
const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

// make new pixi app
const app = new PIXI.Application({ width: windowWidth, height: windowHeight });
document.body.appendChild(app.view);

// load all image resources
const loader = PIXI.Loader.shared;
const sprites = {};
loader.add('img1', 'img/IMG_2110.JPG')
      .add('img2', 'img/IMG_2115.JPG')
      .add('img3', 'img/IMG_2116.JPG')
      .add('img4', 'img/IMG_2121.JPG')
      .add('img5', 'img/IMG_2122.JPG')
      .add('img6', 'img/IMG_4496.JPG')
      .add('img7', 'img/IMG_4592.JPG')
      .add('img8', 'img/IMG_4804.JPG')
      .add('img9', 'img/IMG_4854.JPG')
      .add('img10', 'img/IMG_4860.JPG')
      .add('img11', 'img/IMG_4680.JPG')
      .add('img12', 'img/IMG_8928.JPG');

// The `load` method loads the queue of resources, and calls the passed in callback called once all
// resources have loaded.
loader.load((loader, resources) => {
    // resources is an object where the key is the name of the resource loaded and the value is the resource object.
    // They have a couple default properties:
    // - `url`: The URL that the resource was loaded from
    // - `error`: The error that happened when trying to load (if any)
    // - `data`: The raw data that was loaded
    // also may contain other properties based on the middleware that runs.
    sprites.img1 = new PIXI.Sprite(resources.img1.texture);
    sprites.img2 = new PIXI.Sprite(resources.img2.texture);
    sprites.img3 = new PIXI.Sprite(resources.img3.texture);
    sprites.img4 = new PIXI.Sprite(resources.img4.texture);
    sprites.img5 = new PIXI.Sprite(resources.img5.texture);
    sprites.img6 = new PIXI.Sprite(resources.img6.texture);
    sprites.img7 = new PIXI.Sprite(resources.img7.texture);
    sprites.img8 = new PIXI.Sprite(resources.img8.texture);
    sprites.img9 = new PIXI.Sprite(resources.img9.texture);
    sprites.img10 = new PIXI.Sprite(resources.img10.texture);
    sprites.img11 = new PIXI.Sprite(resources.img11.texture);
    sprites.img12 = new PIXI.Sprite(resources.img12.texture);
});

// when all images are loaded we can start
loader.onComplete.add(() => {
  // console.log("loaded");

  // dynamically create some images, and their counterparts
  masked = [];
  mask = [];
  alpha = [];
  targetPoints = [];
  elapsed = [];

  for (var i = 0; i < numberOfImages; i++) {
    // define the image that will be masked
    masked[i] = new PIXI.Sprite();
    masked[i].time = minTime + minTime * Math.random();
    masked[i].alpha = 0;
    addRandomImage(masked[i], sprites);
    placeImage(masked[i]);

    // create mask for this image
    mask[i] = new PIXI.Sprite();
    mask[i].texture = masked[i].texture;
    placeImage(mask[i]);
    // define the mask image as the mask for the top image
    masked[i].mask = mask[i];

    // create alpha for this image
    alpha[i] = new PIXI.Sprite();
    alpha[i].texture = masked[i].texture;
    alpha[i].alpha = 0;
    placeImage(alpha[i]);

    // create targetpoints for this image
    targetPoints[i] = new PIXI.Point();

    // create new counter
    elapsed[i] = 0.0;
  }

  // create a point where the mask image will move towards
  resetTargetPoints();

  // reset basically moves this point randomly, and the mask will then start moving there
  function resetTargetPoints() {
    for (var i = 0; i < targetPoints.length; i++) {
      targetPoints[i].x  = ( ( Math.random() - .5 ) * targetPointMargin ) + ( windowWidth / 2 );
      targetPoints[i].y  = ( ( Math.random() - .5 ) * targetPointMargin ) + ( windowWidth / 2 );
    }
  }



  // Tell our application's ticker to run a new callback every frame, passing
  // in the amount of time that has passed since the last tick
  app.ticker.add((delta) => {
    // for each image instance do a thing
    for (var i = 0; i < numberOfImages; i++) {
      const maxTime = masked[i].time;
      // count time
      elapsed[i] += delta;
      // turn up alpha
      masked[i].alpha = masked[i].alpha + 1 / masked[i].time / 2;
      alpha[i].alpha = alpha[i].alpha + 1 / masked[i].time;
      // move mask towards target point
      // mask[i].x += (targetPoints[i].x - mask[i].x) * 1 / masked[i].time;
      // mask[i].y += (targetPoints[i].y - mask[i].y) * 1 / masked[i].time;
      // scale image
      masked[i].scale.set( masked[i].scale._x * 1.001 );
      mask[i].scale.set( mask[i].scale._x * 1.002 );
      alpha[i].scale.set( alpha[i].scale._x * 1.001 );
      // if time is up, reset everything
      if (elapsed[i] > maxTime) {
        // make a new base image
        masked[i].alpha = 0;
        addRandomImage(masked[i], sprites);
        placeImage(masked[i]);
        // new mask
        mask[i].texture = masked[0].texture;
        placeImage(mask[i]);
        // new alpha
        alpha[i].texture = masked[i].texture;
        placeImage(alpha[i]);
        alpha[i].alpha = 0;
        // reset timer
        elapsed[i] = 0;
        // reset the point that the mask moves towards
        resetTargetPoints();
      }
    }
  });

}); // called once when the queued resources all load.



// putting the fun back into functions
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
