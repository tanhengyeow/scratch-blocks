function logEvents(workspace, VERSION, ANSWER) {
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
    //console.log(actions);

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
    //console.log(blocksID);

    /*if (isTaskComplete()) {
      // Send logging info
    }*/
    console.log(isTaskComplete());
  }, true);

  // Check if task is completed, i.e. code block has been replicated
  function isTaskComplete() {
    function isCode(obj) {
      console.log(obj ? obj.type.split('_')[0] : "");
      return obj && obj.type.split('_')[0] in categories;
    }

    function searchAnswer(idx, block) {
      if (block == null) { return false; }
      if (!isCode(block)) { return false; }
      console.log(block, "is code block!");
    
      if (block.type === ANSWER[idx]) {
        console.log('matches', ANSWER[idx]);
        // Is end of answer
        if (idx+1 === ANSWER.length) {
          console.log("end of comparison");
          console.log(block.childBlocks_);
          if (block.childBlocks_ === undefined) {
            console.log("it has no children");
            return true; 
          }

          for (var i = 0; i < block.childBlocks_.length; i++) {
            console.log("ISCODEE", block.childBlocks_[i], isCode(block.childBlocks_[i]));
            if (isCode(block.childBlocks_[i])) {
              console.log("it is not the last block");
              return false;
            }
          }
          return true;
        }
  
        // Continue comparison
        if (!block.childBlocks_) {
          console.log("it has no children");
          return false;
        }
        for (let j = 0; j < block.childBlocks_.length; j++) {
          var result = searchAnswer(idx+1, block.childBlocks_[j]);
          if (result) {
            console.log("complete!");
            return true;
          }
        }

        return false;
      }
      console.log("does not match", ANSWER[idx])
      return false;
    }

    var blocks = workspace.getAllBlocks();
    var categories = {
      'motion': 'motion',
      'looks': 'looks',
      'sound': 'sound',
      'events': 'events',
      'control': 'control',
      'sensing': 'sensing',
      'operators': 'operators',
    };

    console.log("ALL BLOCKS", blocks);
    for (var i = 0; i < blocks.length; i++) {
      console.log("checking block", blocks[i], blocks[i].parentBlock_);
      if (isCode(blocks[i]) && !blocks[i].parentBlock_) {
        console.log('/***************************/')
        var isDone = searchAnswer(0, blocks[i]);
        console.log("IS DONEEEEE!", isDone);
        if (isDone) { return true; }
      }
    }

    return false;
  }
}
