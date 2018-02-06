this.Player = new function(){
this.x = 0;
this.y = 0;
this.width = 10;
this.height = 10;
"Erase":function(EraseType){if (EraseType == "Content"){this.x = 0; this.y = 0;}else if(EraseType == "Graphics"){console.log("notavailable")}}
}
