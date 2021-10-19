// // create the canvas
// document.body.appendChild(app.view);
//
// // Magically load the PNG asynchronously
// let sprite = PIXI.Sprite.from('img/2004273_PS5.jpg');
// // add to stage
// app.stage.addChild(sprite);
//
// // Add a variable to count up the seconds our demo has been running
// let elapsed = 0.0;
// // Tell our application's ticker to run a new callback every frame, passing
// // in the amount of time that has passed since the last tick
// app.ticker.add((delta) => {
//   // Add the time to our total elapsed time
//   elapsed += delta;
//   // Update the sprite's X position based on the cosine of our elapsed time.  We divide
//   // by 50 to slow the animation down a bit...
//   sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
// });

// get window width
const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

// make new pixi app
const app = new PIXI.Application({ width: windowWidth, height: windowHeight });
document.body.appendChild(app.view);

// load all image resources
const loader = PIXI.Loader.shared;
const sprites = {};
loader.add('one', 'img/2004273_PS5.jpg')
      .add('two', 'img/test.jpg')
      .add('three', 'img/arseniy-chebynkin-sermetch.jpg');

// The `load` method loads the queue of resources, and calls the passed in callback called once all
// resources have loaded.
loader.load((loader, resources) => {
    // resources is an object where the key is the name of the resource loaded and the value is the resource object.
    // They have a couple default properties:
    // - `url`: The URL that the resource was loaded from
    // - `error`: The error that happened when trying to load (if any)
    // - `data`: The raw data that was loaded
    // also may contain other properties based on the middleware that runs.
    sprites.one = new PIXI.Sprite(resources.one.texture);
    sprites.two = new PIXI.Sprite(resources.two.texture);
    sprites.three = new PIXI.Sprite(resources.three.texture);
});

// when all images are loaded we can start
loader.onComplete.add(() => {
  // console.log("loaded");

  // define background image
  const bg = sprites.one;
  // place random image
  addRandomImage(bg, sprites);
  placeImage(bg);

  // define the image that will be masked
  const top = sprites.two;
  addRandomImage(top, sprites);
  placeImage(top);

  // define the image that masks the top image
  const mask = sprites.three;
  addRandomImage(mask, sprites);
  placeImage(mask);

  // define the mask image as the mask for the top image
  top.mask = mask;

  // create a point where the mask image will move towards
  const targetPoint = new PIXI.Point();
  const targetPointMargin = 20;
  reset();

  // reset basically moves this point randomly, and the mask will then start moving there
  function reset() {
      targetPoint.x = ( ( Math.random() - .5 ) * targetPointMargin ) + ( windowWidth / 2 );
      targetPoint.y = ( ( Math.random() - .5 ) * targetPointMargin ) + ( windowHeight / 2 );
  }









  // Add a variable to count up the seconds our demo has been running
  let elapsed = 0.0;
  // Tell our application's ticker to run a new callback every frame, passing
  // in the amount of time that has passed since the last tick
  app.ticker.add((delta) => {
    // Add the time to our total elapsed time
    elapsed += delta;

    // move the mask towards the targetpoint
    mask.x += (targetPoint.x - mask.x) * 0.1;
    mask.y += (targetPoint.y - mask.y) * 0.1;

    // if the mask has reached it's target, move the target
    if (Math.abs(mask.x - targetPoint.x) < 1) {
        reset();
    }

    // scale mask, bg, top img
    bg.scale.set( bg.scale._x * 1.001 );
    mask.scale.set( mask.scale._x * 1.001 );
    top.scale.set( top.scale._x * 1.001 );

    // if (bg.scale._x > 1) {
    //   addRandomImage(bg, sprites);
    //   placeImage(bg);
    // }
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
