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
  console.log("loaded");

  // define background image
  const bg = sprites.one;
  // size the image so that it covers the canvas
  bg.scale.set(getScaleFactor(bg.width, bg.height));

  // center image
  bg.anchor.x = 0.5;
  bg.anchor.y = 0.5;
  bg.position.x = windowWidth / 2;
  bg.position.y = windowHeight / 2;

  // add background to stage
  app.stage.addChild(bg);

  // define the image that will be masked
  const cells = sprites.two;

  // cells.scale.set(1.5);

  const mask = sprites.three;
  mask.anchor.set(0.5);
  mask.x = 310;
  mask.y = 190;

  cells.mask = mask;

  app.stage.addChild(mask, cells);

  const target = new PIXI.Point();

  reset();

  function reset() {
      target.x = Math.floor(Math.random() * 550);
      target.y = Math.floor(Math.random() * 300);
  }

  app.ticker.add(() => {
      mask.x += (target.x - mask.x) * 0.1;
      mask.y += (target.y - mask.y) * 0.1;

      if (Math.abs(mask.x - target.x) < 1) {
          reset();
      }
  });

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

}); // called once when the queued resources all load.
