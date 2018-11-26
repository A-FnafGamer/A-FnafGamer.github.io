this.onload = Startup();

this.Config = {
FPS:100,
CDM:"per_Frame",
CanvasScale:"fill_Screen",
CustomCDRR:60,
CustomResCanvasWidth:1080,
CustomResCanvasHieght:720,
keysDown:[]
};

function Startup() {
  console.log("Starting up game: Configuring...");
  if (this.Config.CDM === "per_Two_Frames") {
    this.Config.CDRR = this.Config.FPS/2
  }else if (this.Config.CDM === "per_Frame") {
    this.Config.CDRR = this.Config.FPS;
  }else if (this.Config.CDM === "Per_Half_Frame") {
    this.Config.CDRR = 2*this.Config.FPS;
  }else if (Config.CDM === "Custom") {
    this.Config.CDRR = this.Config.CustomCDRR;
  }
  
  
  
  this._Tick = setInterval(Tick(), 1000/this.Config.CDRR);
  this._Game = setInterval(Frame_Render(), 1000/this.Config.FPS);
}

function Tick() {
   
}

function Frame_Render() {
   
}
