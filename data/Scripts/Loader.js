function Load(Request, Method, dataType, callback)
{
 XReq = new XMLHttpRequest();
 XReq.overrideMimeType(dataType);
 XReq.open(Method, Request);
 XReq.onreadystatechange = callback;
 XReq.send();
}
