function logEvents(workspace, VERSION, ANSWER) {
  var DEBUG = false;

  function isCodeBlock(target) { return target.classList[0] == "blocklyDraggable"; }
  function isCategory(target) { return target.classList[0] == "scratchCategoryMenuItem"; }

  var UID = getUniqueId(); // A persistent unique id for the user.
  var OS = getOS();
  var BROWSER = getBrowser();
  var startTime = new Date();
  var isCompleted = false;

  /***************************************************/
  /********** Track element interacted with **********/
  /***************************************************/
  var totalClicks = 0;
  var actionLog = [];
  var step = 1;
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
    // Replace element with name if is unique identifier
    if (element in blocksID) {
      element = blocksID[element];
    }
    var x = event.clientX;
    var y = event.clientY;
    var date = new Date();
    var data = [step++, element, x, y, date, ';'];
    actionLog.push(data);

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

  /*************************************************************************************/
  /********** Check if task is completed, i.e. code block has been replicated **********/
  /*************************************************************************************/
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
            sendLogData();
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

  function sendLogData() {
    // Calculate time taken to complete task
    var endTime = new Date();
    let timeTaken = endTime - startTime; // in ms
    timeTaken /= 1000;                   // in sec
    
    if (!isCompleted) {
      sendNetworkLog(UID, OS, BROWSER, VERSION, startTime, endTime, timeTaken, totalClicks, actionLog);
      isCompleted = true;
    }
  }

  /********************************/
  /********** logging.js **********/
  /********************************/
  // Parse user agent string by looking for recognized substring.
  function findFirstString(str, choices) {
    for (var j = 0; j < choices.length; j++) {
      if (str.indexOf(choices[j]) >= 0) {
        return choices[j];
      }
    }
    return '?';
  }

  // Generates or remembers a somewhat-unique ID with distilled user-agent info.
  function getUniqueId() {
    if (!('uid' in localStorage)) {
      var browser = findFirstString(navigator.userAgent, [
        'Seamonkey', 'Firefox', 'Chromium', 'Chrome', 'Safari', 'OPR', 'Opera',
        'Edge', 'MSIE', 'Blink', 'Webkit', 'Gecko', 'Trident', 'Mozilla']);
      var os = findFirstString(navigator.userAgent, [
        'Android', 'iOS', 'Symbian', 'Blackberry', 'Windows Phone', 'Windows',
        'OS X', 'Linux', 'iOS', 'CrOS']).replace(/ /g, '_');
      var unique = ('' + Math.random()).substr(2);
      localStorage['uid'] = os + '-' + browser + '-' + unique;
    }
    return localStorage['uid'];
  }

  function getOS() {
    return findFirstString(navigator.userAgent, [
      'Android', 'iOS', 'Symbian', 'Blackberry', 'Windows Phone', 'Windows',
      'OS X', 'Linux', 'iOS', 'CrOS']).replace(/ /g, '_');
  }

  function getBrowser() {
    return findFirstString(navigator.userAgent, [
      'Seamonkey', 'Firefox', 'Chromium', 'Chrome', 'Safari', 'OPR', 'Opera',
      'Edge', 'MSIE', 'Blink', 'Webkit', 'Gecko', 'Trident', 'Mozilla']);
  }

  // LoggingJS Test Form submission function
  // submits to the google form at this URL:
  // docs.google.com/forms/d/e/1FAIpQLScVYJZ9iRhfgRKYL4V8KSCWsNdspW1-8h9aWwhui1b1-IqyZA/viewform
  function sendNetworkLog(
    uid,
    os,
    browser,
    version,
    starttime,
    endtime,
    timetaken,
    totalclicks,
    actionlog) {
  var formid = "e/1FAIpQLScVYJZ9iRhfgRKYL4V8KSCWsNdspW1-8h9aWwhui1b1-IqyZA";
  var data = {
    "entry.1044592894": uid,
    "entry.238617146": os,
    "entry.731357939": browser,
    "entry.1421495277": version,
    "entry.931979032": starttime,
    "entry.1439011117": endtime,
    "entry.1289321526": timetaken,
    "entry.1474634529": totalclicks,
    "entry.793422062": actionlog
  };
  var params = [];
  for (key in data) {
    params.push(key + "=" + encodeURIComponent(data[key]));
  }
  // Submit the form using an image to avoid CORS warnings; warning may still happen, but log will be sent. Go check result in Google Form
  (new Image).src = "https://docs.google.com/forms/d/" + formid +
    "/formResponse?" + params.join("&");
  }
}
