'use strict';

function initialize(workspace) {
  workspace.updateToolbox(Blockly.Blocks.defaultToolbox);

  let menuRows = Array.from(workspace.toolbox_.HtmlDiv.children[0].children);

  menuRows.forEach(row => {
    const bubble = row.firstChild.firstChild;
    bubble.classList.add('invisible');
  });
}
