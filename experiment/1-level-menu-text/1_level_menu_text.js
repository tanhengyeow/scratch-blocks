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
  bubble.classList.add('invisible');
});
