function isCodeBlock(target) { return target.classList[0] == "blocklyDraggable"; }
function isCategory(target) { return target.classList[0] == "scratchCategoryMenuItem"; }

// Track element interacted with
var totalClicks = 0;
var step = 1;
var actions = [];
var lastClickedBlock = "";
var blocklyDiv = document.getElementById('blocklyDiv');
blocklyDiv.addEventListener('mousedown', function(event){
  var isOthers = false;

  // Find encapsulating parent
  var target = event.target;
  while (!isCodeBlock(target) && !isCategory(target)) {
    target = target.parentElement;
    if (target == null) {
      isOthers = true;
      break;
    }
  }

  // Format logged data
  var element;
  if (isOthers) {
    element = event.target.classList.length ? event.target.classList[0] : event.target.localName;
  }
  else if (isCodeBlock(target)) {
    element = target.getAttribute('data-id');
    lastClickedBlock = element;
  }
  else {
    element = target.classList[1];
  }
  var x = event.clientX;
  var y = event.clientY;
  var date = new Date();
  var data = [step++, element, x, y, date, event.target];
  actions.push(data);
  console.log(actions);
  console.log(lastClickedBlock);

  totalClicks++;
}, true);

// Identify "gibberish" unique identifier to readable block names
var blocksID = {};
blocklyDiv.addEventListener('mouseup', function(event){

  // Find encapsulating parent
  var target = event.target;
  while (!isCodeBlock(target)) {
    target = target.parentElement;
    if (target == null) {
      return;
    }
  }

  // Map unique identifier to unique block name
  var uniqueIdentifier = target.getAttribute('data-id');
  if (!(uniqueIdentifier in blocksID) && uniqueIdentifier != lastClickedBlock) {
    blocksID[uniqueIdentifier] = lastClickedBlock;
  }
  console.log(blocksID);
}, true);
