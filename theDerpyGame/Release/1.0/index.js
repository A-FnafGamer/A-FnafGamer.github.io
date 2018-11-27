var Config = {
FPS : 100,
CDM : "per_Frame",
CanvasScale : "fill_Screen",
CustomCDRR : 60,
CustomResCanvasWidth : 1080,
CustomResCanvasHieght : 720,
keysDown:[]
};

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
  
  
  
  this._Tick = setInterval(Tick(), 1000/this.Config.CDRR);
  this._Game = setInterval(Frame_Render(), 1000/this.Config.FPS);
}

function Tick() {
   
}

function Frame_Render() {
   
}
