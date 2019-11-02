'use strict';

let workspace = Blockly.inject('blocklyDiv', {
  media: '../../media/',
  zoom: {
    controls: true,
    wheel: true,
    startScale: 0.675,
    maxScale: 4,
    minScale: 0.25,
    scaleSpeed: 1.1
  },
});
workspace.updateToolbox(Blockly.Blocks.defaultToolbox);

let menuRows = Array.from(workspace.toolbox_.HtmlDiv.children[0].children);

menuRows.forEach(row => {
  const bubble = row.firstChild.firstChild;
  bubble.parentNode.removeChild(bubble);
  const icon = document.createElement('img');

  const type = row.firstChild.classList[1].split("-")[1];
  switch (type) {
    case 'motion':
      icon.src = "../../media/motion.svg";
      icon.classList.add('svg');
      row.firstChild.prepend(icon);
      break;
    case 'looks':
      // TODO
      break;
    case 'sound':
      // TODO
      break;
    case 'events':
      // TODO
      break;
    case 'control':
      // TODO
      break;
    case 'sensing':
      // TODO
      break;
    case 'operators':
      // TODO
      break;
    default:
      break;
  }
});
