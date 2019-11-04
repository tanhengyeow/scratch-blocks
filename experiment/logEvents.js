function logEvents(workspace, VERSION, ANSWER) {
  var DEBUG = true;

  function isCodeBlock(target) { return target.classList[0] == "blocklyDraggable"; }
  function isCategory(target) { return target.classList[0] == "scratchCategoryMenuItem"; }

  // Track element interacted with
  var totalClicks = 0;
  var step = 1;
  var actions = [];
  var lastClickedBlock = "";
  var blocklyDiv = document.getElementById('blocklyDiv');
  blocklyDiv.addEventListener('mousedown', function(event) {
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

    totalClicks++;
  }, true);

  // Identify "gibberish" unique identifier to readable block names
  var blocksID = {};
  blocklyDiv.addEventListener('mouseup', function(event) {

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
  }, true);

  // Check if task is completed, i.e. code block has been replicated
  workspace.addChangeListener(isTaskComplete);
  function isTaskComplete() {
    function searchAnswer(idx, block) {
      if (block == null) { return false; }
    
      DEBUG && console.log(`Type: ${block.type} comparing with ${ANSWER[idx]}`);
      if (block.type === ANSWER[idx]) {
        DEBUG && console.log(`It is a match to ${ANSWER[idx]}.`)
        // Is end of answer
        var nextBlock = block.getNextBlock();
        if (idx+1 === ANSWER.length) {
          if (!nextBlock) {
            DEBUG && console.log(`This is the end of the answer.`);
            //sendLogData();
            return true;
          }
          else {
            DEBUG && console.log(`There is extra child block(s).`);
            return false;
          }
        }
  
        // Continue comparison
        if (!nextBlock) {
          DEBUG && console.log(`There are no more blocks left.`);
          return false;
        }
        DEBUG && console.log(`Recursively searching child block ${nextBlock.type}`);
        return searchAnswer(idx+1, nextBlock);
      }
      return false;
    }

    var blocks = workspace.getTopBlocks();
    for (var i = 0; i < blocks.length; i++) {
      DEBUG && console.log(`/******** ${blocks[i]} ********/`);
      var isDone = searchAnswer(0, blocks[i]);
      DEBUG && console.log("isDone?", isDone);
      if (isDone) { return true; }
    }

    return false;
  }
}
