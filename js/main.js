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

const app = new PIXI.Application();
document.body.appendChild(app.view);

const bg = PIXI.Sprite.from('img/color/2004273_PS5.jpg');

app.stage.addChild(bg);

const cells = PIXI.Sprite.from('img/color/test.jpg');

cells.scale.set(1.5);

const mask = PIXI.Sprite.from('img/color/test.jpg');
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
