function HashMap()
{
var index = 0;
var key = new Array();
var value = new Array();
this.set = function (keyin,valuein)
{
if (keyin != undefined)
{
key[index] = keyin;
value[index] = valuein;
index++
return true;
}
else
{
throw("the key cannot be empty")
return false;
}
}
this.get = function(keyout) 
{
if (index == 0)
{
throw("no data")
}
else
{
for(i=0; i<=index; i++)
{
if (key[i] == keyout)
    {
return value[i];
    }
    else if (i == this.key.length)
    {
    throw("\""+keyout+"\""+" was not found")
    return false;
    }
    }
}
}
this.remove = function (keydel)
{
for (i=0; i<=index; i++)
{
if (this.key[i] == keydel)
{
key[i] = "";
value[i] = "";
return true;
}
else if (i == key.length)
{
throw("cannot delete undefined")
return false;
}
}
}
}
