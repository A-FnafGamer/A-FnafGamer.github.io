window.onload = function() {
  Start();
};

var can,
  game_loop,
  ctx,
  fctx,
  targetft = 20;
var timePassed = 0;
var dtime = 0;
var ptime = 0;
var frame = 0;
var lmao = false;
var frameBuffer;
var Osu = {
  init: function() {},
  mouse: { x: 0, y: 0, bDown: [], onbDown: [], onbUp: [] },
  keyboard: { kDown: [], onkDown: [], onkUp: [] },
  objects: [],
  pObjects: [],
  timedEvents: [],
  bmParser: function(bm) {
    var lines = bm.split("\n");
    var hitObj = lines.splice(lines.indexOf("[HitObjects]"));
    var params = [];

    console.log("pepe");

    for (var i = 1; i < hitObj.length; i++) {
      params = hitObj[i].split(",");
      if (params[3] === "1") {
        Osu.objects.push(new Circle());
        TCircle(
          parseInt(params[2]),
          [
            (parseInt(params[0]) / 640) * can.width,
            (parseInt(params[1]) / 480) * can.height
          ],
          30,
          Osu.pObjects.length - 1
        );
        console.log(parseInt(params[2]));
      }
    }
  }
};

function CheckClick() {
  for (var i = 0; i < Osu.objects.length; i++) {
    if (
      Math.abs(Osu.mouse.x - Osu.objects[i].pos[0]) < Osu.objects[i].size &&
      Math.abs(Osu.mouse.y - Osu.objects[i].pos[1]) < Osu.objects[i].size
    ) {
      Osu.objects[i].click();
      return true;
    }
  }
}

function TCircle(_time, pos, size, poi) {
  if (Osu.pObjects[poi].status)
    Osu.timedEvents.push({
      time: _time,
      callback: function() {
        Osu.pObjects[poi].obj.live(pos, size);
      }
    });
}

function Circle() {
  this.pos = [];
  this.size = 1;
  this.age = 0.5;
  this.alive = false;
  this.poi = Osu.pObjects.length;

  if (Osu.objects.indexOf(this) === -1) Osu.objects.push(this);

  Osu.pObjects[this.poi] = { status: 1, obj: this };

  this.click = function() {
    this.die();
  };

  this.die = function() {
    if (Osu.objects.splice(Osu.objects.indexOf(this), 1));
    Osu.pObjects[this.poi].status = 0;

    console.log(this + " destroyed");
    delete this;
  };

  this.live = function(_pos, _size) {
    this.pos = _pos;
    this.size = _size;
    this.alive = true;
    Osu.pObjects[this.poi].status = 2;
  };

  this.update = function() {
    if (!this.alive) return;

    this.age += 0.01;

    if (this.age > 1.3) {
      this.die();
    }
  };

  this.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(this.pos[0], this.pos[1], this.size / this.age, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "pink";
    ctx.arc(this.pos[0], this.pos[1], this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  };
}

function Start() {
  can = document.createElement("canvas");
  ctx = can.getContext("2d");

  document.oncontextmenu = function() {
    return false;
  };

  can.width = window.innerWidth;
  can.height = window.innerHeight;

  frameBuffer = document.createElement("canvas");
  frameBuffer.width = can.width;
  frameBuffer.height = can.height;

  fctx = frameBuffer.getContext("2d");

  document.body.appendChild(frameBuffer);

  Osu.init();

  document.addEventListener("mousemove", function(e) {
    Osu.mouse.x = e.offsetX;
    Osu.mouse.y = e.offsetY;
  });
  document.addEventListener("mousedown", function(e) {
    Osu.mouse.bDown[e.button] = true;
    if (Osu.mouse.onbDown[e.button]) {
      for (var i = 0; i < Osu.mouse.onbDown[e.button].length; i++)
        Osu.mouse.onbDown[e.button][i]();
    }
  });
  document.addEventListener("mouseup", function(e) {
    Osu.mouse.bDown[e.button] = false;
    if (Osu.mouse.onbUp[e.button]) {
      for (var i = 0; i < Osu.mouse.onbUp[e.button].length; i++)
        Osu.mouse.onbUp[e.button][i]();
    }
  });
  document.addEventListener("keydown", function(e) {
    Osu.keyboard.kDown[e.key] = true;
    if (Osu.keyboard.onkDown[e.key]) {
      for (var i = 0; i < Osu.keyboard.onkDown[e.key].length; i++)
        if (Osu.keyboard.onkDown[e.key][i]()) {
          return;
        }
    }
  });
  document.addEventListener("keyup", function(e) {
    Osu.keyboard.kDown[e.key] = false;
    if (Osu.keyboard.onkUp[e.key]) {
      for (var i = 0; i < Osu.keyboard.onkUp[e.key].length; i++)
        Osu.keyboard.onkUp[e.key][i]();
    }
  });

  Osu.mouse.onbDown[0] = [CheckClick];
  Osu.mouse.onbDown[2] = [CheckClick];
  Osu.keyboard.onkDown["a"] = [CheckClick];
  Osu.keyboard.onkDown["s"] = [CheckClick];

  var Http = new XMLHttpRequest();
  var url = "/ricked.osu";
  Http.open("POST", url);
  Http.send();

  Http.onreadystatechange = function(e) {
    if (Http.status === 200 && Http.responseText.length > 2 && !lmao) {
      lmao = true;
      console.log("lel");
      Osu.bmParser(Http.responseText);
      clearInterval(game_loop);
      game_loop = setInterval(tick, 17);
    }
  };
}

function ClearScreen() {
  ctx.beginPath;
  ctx.fillStyle = "#abc";
  ctx.fillRect(0, 0, can.width, can.height);
  ctx.closePath();
}

function Reset() {
  clearInterval(game_loop);
  Start();
}

function tick() {
  if (!ptime) ptime = Date.now();

  if (frame % 10 == 0) document.title = Math.floor(1000 / dtime);

  ClearScreen();
  frame++;

  if (Osu.objects.length === 69) {
    Reset();
  }

  while (Osu.timedEvents[0] && Osu.timedEvents[0].time <= timePassed) {
    Osu.timedEvents.shift().callback();
  }

  for (var i = 0; i < Osu.objects.length; i++) {
    Osu.objects[i].update();
  }

  for (var i = 0; i < Osu.objects.length; i++) {
    Osu.objects[i].draw();
  }

  dtime = Date.now() - ptime;
  ptime = Date.now();

  fctx.beginPath();
  fctx.drawImage(can, 0, 0, frameBuffer.width, frameBuffer.height);
  fctx.closePath();

  timePassed += dtime;

  // window.requestAnimationFrame(tick)
}
