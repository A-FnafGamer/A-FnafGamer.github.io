//the game's configuration:
var Config = {
FPS : 100,
CDM : "per_Frame",
CanvasScale : "fill_Screen",
CustomCDRR : 60,
CustomResCanvasWidth : 1080,
CustomResCanvasHieght : 720,
keysDown:[]
};

//the game's vital Components:
var Canvas = document.getElementById("Main");
console.log(Canvas);

//the game's components(Objects)
var Player1 = new Component("Player1", 0, 0, "Black", Canvas);

function Startup() {
  console.log("Starting up game: Configuring...");
  if (Config.CDM === "per_Two_Frames") {
    Config.CDRR = Config.FPS/2
  }else if (Config.CDM === "per_Frame") {
    Config.CDRR = Config.FPS;
  }else if (Config.CDM === "Per_Half_Frame") {
    Config.CDRR = 2*Config.FPS;
  }else if (Config.CDM === "Custom") {
    Config.CDRR = Config.CustomCDRR;
  }
  
  
  
  this._Tick = setInterval(Tick, 1000/this.Config.CDRR);
  this._Game = setInterval(Frame_Render, 1000/this.Config.FPS);
}

function Tick() {
   
}

function Frame_Render() {
   Player1.Render();
}

function addComponent (_Name, _x, _y, _Color, _Canvas) {
  this.Name = _Name;
  this.x = _x;
  this.y = _y;
  this.Color = _Color;
  this.Canvas = _Canvas;
  this.ctx = _Canvas.getContext("2d");
  
  this.Render = function() {
    this.ctx.beginPath();
    this.ctx.rect(100, 100, 30, 30);
    this.ctx.fillStyle = this.Color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}
