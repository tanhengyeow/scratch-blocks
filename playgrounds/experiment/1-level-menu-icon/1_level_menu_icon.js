'use strict';

function initialize(workspace) {
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
        break;
      case 'looks':
        icon.src = "../../media/looks.svg";
        break;
      case 'sound':
        icon.src = "../../media/sound.svg";
        break;
      case 'events':
        icon.src = "../../media/events.svg";
        break;
      case 'control':
        icon.src = "../../media/control.svg";
        break;
      case 'sensing':
        icon.src = "../../media/sensing.svg";
        break;
      case 'operators':
        icon.src = "../../media/operators.svg";
        break;
      default:
        break;
    }
    icon.classList.add('svg');
    row.firstChild.prepend(icon);
  });
}
