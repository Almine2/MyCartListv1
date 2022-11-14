let isStorageAvailable = false;
let currentItemAllNumber = 0;
//let localStorage;
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

let MoveToSubFunc = function(){
  MoveToSub(this);
}

function Addlist(){
  console.log("ee");
  var itemname = document.getElementById('itemname').value;
  var itemnumber = document.getElementById('itemnumber').value;
  
  if (itemname && itemnumber){
	console.log("ff");
    var objmainlist = document.getElementById('mainlist');
    var newobjlist = document.createElement('button');
    newobjlist.id = currentItemAllNumber;
	AddToStorage(itemname,itemnumber,'yes',currentItemAllNumber);
    newobjlist.className = 'm-tlbr-5';
    newobjlist.innerHTML = itemname + ' : ' + itemnumber;
    objmainlist.appendChild(newobjlist);
	newobjlist.addEventListener('click',MoveToSubFunc);
    currentItemAllNumber += 1;
  }
}

function MoveToSub(obj){
  var objaddedlist = document.getElementById('addedlist');
  var childobj = document.getElementById(obj.id);
  obj.removeEventListener('click',MoveToSubFunc);
  ChangeStrorage(obj.id);
  objaddedlist.appendChild(childobj);
}

function AddToStorage(name,number,isinmain,itemidt){
  console.log("gg : " + itemidt);
  var jsonobj = {
    itemid: itemidt,
	itemname: name,
	itemnumber: number,
	itemmain: isinmain
  }
  localStorage.setItem(itemidt.toString(),JSON.stringify(jsonobj));
}
function RemoveFromStorage(itemid){
  localStorage.removeItem(itemid.toString());
}
function ChangeStrorage(itemid){
  console.log("ii : " + itemid.toString());
  var obj = JSON.parse(localStorage.getItem(itemid.toString()));
  RemoveFromStorage(itemid);
  AddToStorage(obj.itemname,obj.itemnumber,'no',obj.itemid);
}

function GetFromStorage(){
  return;
}

function ClearAllData(){
  console.log("jj");
  currentItemAllNumber = 0;
  localStorage.clear();
  var objmainlist = document.getElementById('mainlist');
  var objaddedlist = document.getElementById('addedlist');
  for (var i = objmainlist.childNodes.length-1;i>=0;i--){
    objmainlist.removeChild(objmainlist.childNodes[i]);
  }
  for (var i = objaddedlist.childNodes.length-1;i>=0;i--){
    objaddedlist.removeChild(objaddedlist.childNodes[i]);
  }
  localStorage.setItem('currentItemAllNumber','0');
}

function OnMinusClick(){
  console.log("minus");
  var mmstr = document.getElementById("calcmoney").innerHTML;
  var mmint = parseInt(mmstr,10);
  mmint = mmint - 100;
  document.getElementById("calcmoney").innerHTML = mmint.toString();
}

function OnPlusClick(){
  console.log("plus");
  var mpstr = document.getElementById("calcmoney").innerHTML;
  var mpint = parseInt(mpstr,10);
  mpint = mpint + 100;
  document.getElementById("calcmoney").innerHTML = mpint.toString();
}


function onLoadInit(){
  if (storageAvailable('localStorage')) {
    isStorageAvailable = true;
	console.log("aa");
    //localStorage = window.localStorage;
  }
  else {
  }
  
  let addlistbutton = document.getElementById('addlistbutton');
  addlistbutton.addEventListener('click', Addlist);
  
  let clearbutton = document.getElementById('clearbutton');
  clearbutton.addEventListener('click', ClearAllData);
  
  let moneyminusbutton = document.getElementById('minusb');
  moneyminusbutton.addEventListener('click', OnMinusClick);
  
  let moneyplusbutton = document.getElementById('plusb');
  moneyplusbutton.addEventListener('click', OnPlusClick);
  
  if (localStorage.getItem('currentItemAllNumber')){
    currentItemAllNumber = Number(localStorage.getItem('currentItemAllNumber'));
	console.log("bb");
    var objmainlist = document.getElementById('mainlist');
    var objaddedlist = document.getElementById('addedlist');

    for (var i = 0;i < currentItemAllNumber;i++){
	  console.log("cc");
      var obj = JSON.parse(localStorage.getItem(i.toString()));
	  var newobjlist = document.createElement('button');
      newobjlist.id = obj.itemid;
	  newobjlist.className = 'm-tlbr-5';
	  console.log("cc : " + obj.itemnumber);
      newobjlist.innerHTML = obj.itemname + ' : ' + obj.itemnumber;
	  console.log("cc : " + obj.itemmain);
	  if (obj.itemmain === 'yes'){
        objmainlist.appendChild(newobjlist);
		newobjlist.addEventListener('click',MoveToSubFunc);
	  }else{
        objaddedlist.appendChild(newobjlist);
	  }
	}
  }else{
	console.log("dd");
    localStorage.setItem('currentItemAllNumber','0');
  }
}
function OnUnLoadInit(){
  console.log("hh");
  localStorage.setItem('currentItemAllNumber',currentItemAllNumber);
}





