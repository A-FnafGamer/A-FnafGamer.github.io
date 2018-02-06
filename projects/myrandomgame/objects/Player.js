this.Player = {
"x":0,
"y":0,
"width":10,
"height":10,
"Draw":"gg",
"Erase":function(EraseType){if (EraseType == "Content"){this.x = 0; this.y = 0;}else if(EraseType == "Graphics"){console.log("notavailable")}}
}
