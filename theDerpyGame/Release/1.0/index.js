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
var Main_Scene = document.getElementById("Scene");

//the game's components(Objects)
var test = new Component("TO", 0, 0, Main_Scene);

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
   test.Render();
}

function Frame_Render() {
   
}

function Component (_Name, _x, _y, _Color, _Scene) {
  this.Name = _name;
  this.x = _x;
  this.y = _y;
  this.Color = _Color;
  this.Scene = _Scene;
  this.ctx = this.Scene.getContext("2d");
  
  this.Render = function() {
    this.ctx.beginPath();
    this.ctx.rect(100, 100, 30, 30);
    this.ctx.fillStyle = "Black";
    this.ctx.fill();
    this.ctx.closePath();
  }
}
