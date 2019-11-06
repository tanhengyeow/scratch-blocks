'use strict';

function initialize() {
  workspace.updateToolbox(Blockly.Blocks.defaultToolbox);

  const numSubmenu = 2;
  let currSubmenuSelected = null;
  let menuRows = Array.from(workspace.toolbox_.HtmlDiv.children[0].children);
  let topMenuRows = [];
  let newRows  = [];

  const setToolboxMenu = toolBox => {
    workspace.updateToolbox(toolBox);
    let menu = document.querySelector('.scratchCategoryMenu');
    menu.innerHTML = '';
    for (let row of newRows) {
      menu.appendChild(row);
    }
  }

  const toggleSubmenu = submenu => {
    if (currSubmenuSelected && currSubmenuSelected === submenu) {
      return;
    }
    if (currSubmenuSelected) {
      currSubmenuSelected.firstChild.classList.toggle('selected');
    }
    currSubmenuSelected = submenu;
    currSubmenuSelected.firstChild.classList.toggle('selected');
  }

  const showHideSubmenus = category => {
    const submenus = Array.from(document.querySelectorAll('.submenu'));
    submenus.forEach(submenu => {
      if ((submenu.classList.contains(category) && submenu.classList.contains('hidden')) ||
          !submenu.classList.contains(category) && !submenu.classList.contains('hidden')) {
        submenu.classList.toggle('hidden');
      }
    });
  }

  const removeSelectedCategories = currCategory => {
    topMenuRows.forEach(row => {
      if (!row.classList.contains(currCategory)) {
        row.firstChild.classList.remove('categorySelected');
      }
    });
  }

  const setupSubmenus =
    (temp, category, firstToolbox, firstLabel, firstSvg, secondToolBox, secondLabel, secondSvg) => {
    // Create submenu elements
    for (let i = 0; i < numSubmenu; i++) {
      let subMenu = temp[temp.length - 1].cloneNode(true);
      temp.push(subMenu);
    }
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');

    // First submenu
    const firstSubmenu = temp[1];
    firstSubmenu.classList.add(category, 'submenu', 'hidden');
    firstSubmenu.prepend(indicator);
    firstSubmenu.lastChild.classList.remove(`scratchCategoryId-${category}`);
    firstSubmenu.lastChild.classList.add(`scratchCategoryId-${firstLabel.toLowerCase()}`);
    firstSubmenu.addEventListener('click', () => {
      setToolboxMenu(firstToolbox);
      toggleSubmenu(firstSubmenu);
    });
    firstSubmenu.lastChild.lastChild.innerHTML = firstLabel;
    firstSubmenu.lastChild.firstChild.src = firstSvg;

    // Second submenu
    const secondSubmenu = temp[2];
    secondSubmenu.classList.add(category, 'submenu', 'hidden');
    secondSubmenu.prepend(indicator.cloneNode(true));
    secondSubmenu.lastChild.classList.remove(`scratchCategoryId-${category}`);
    secondSubmenu.lastChild.classList.add(`scratchCategoryId-${secondLabel.toLowerCase()}`);
    secondSubmenu.addEventListener('click', () => {
      setToolboxMenu(secondToolBox);
      toggleSubmenu(secondSubmenu);
    });
    secondSubmenu.lastChild.lastChild.innerHTML = secondLabel;
    secondSubmenu.lastChild.firstChild.src = secondSvg;

    newRows.push(temp);
  }

  menuRows.forEach(row => {
    row = row.cloneNode(true);
    row.firstChild.classList.remove('categorySelected');
    const bubble = row.firstChild.firstChild;
    bubble.parentNode.removeChild(bubble);
    topMenuRows.push(row);

    let temp = [];
    const icon = document.createElement('img');
    const type = row.firstChild.classList[1].split("-")[1];
    switch (type) {
      case 'motion':
        row.classList.add('motion');
        row.addEventListener('click', () => {
          setToolboxMenu(Blockly.Blocks.motionToolbox);
          row.firstChild.classList.add('categorySelected');
          removeSelectedCategories('motion');
          showHideSubmenus('motion');
          if (currSubmenuSelected) {
            currSubmenuSelected.firstChild.classList.toggle('selected');
            currSubmenuSelected = null;
          }
        })
        icon.src = "../../../media/motion.svg";
        icon.classList.add('svg');
        row.firstChild.prepend(icon);

        temp.push(row);
        setupSubmenus(temp, 'motion', Blockly.Blocks.motionStaticToolbox, 'Static', '../../../media/motion-static.svg',
                      Blockly.Blocks.motionMobileToolbox, 'Mobile', '../../../media/motion-mobile.svg');
        break;
      case 'looks':
        row.classList.add('looks');
        row.addEventListener('click', () => {
          setToolboxMenu(Blockly.Blocks.looksToolbox);
          row.firstChild.classList.add('categorySelected');
          removeSelectedCategories('looks');
          showHideSubmenus('looks');
          if (currSubmenuSelected) {
            currSubmenuSelected.firstChild.classList.toggle('selected');
            currSubmenuSelected = null;
          }
        })
        icon.src = "../../../media/looks.svg";
        icon.classList.add('svg');
        row.firstChild.prepend(icon);

        temp.push(row);
        setupSubmenus(temp, 'looks', Blockly.Blocks.looksGraphicsToolbox, 'Graphics', '../../../media/looks-graphics.svg',
                      Blockly.Blocks.looksUtilityToolbox, 'Utility', '../../../media/looks-utility.svg');
        break;
      case 'sound':
        row.classList.add('sound');
        row.addEventListener('click', () => {
          setToolboxMenu(Blockly.Blocks.soundToolbox);
          row.firstChild.classList.add('categorySelected');
          removeSelectedCategories('sound');
          showHideSubmenus('sound');
          if (currSubmenuSelected) {
            currSubmenuSelected.firstChild.classList.toggle('selected');
            currSubmenuSelected = null;
          }
        })
        icon.src = "../../../media/sound.svg";
        icon.classList.add('svg');
        row.firstChild.prepend(icon);

        temp.push(row);
        setupSubmenus(temp, 'sound', Blockly.Blocks.soundOptionsToolbox, 'Options', '../../../media/sound-options.svg',
                      Blockly.Blocks.soundVocalToolbox, 'Vocal', '../../../media/sound-vocal.svg');
        break;
      case 'events':
        row.classList.add('events');
        row.addEventListener('click', () => {
          setToolboxMenu(Blockly.Blocks.eventsToolbox);
          row.firstChild.classList.add('categorySelected');
          removeSelectedCategories('events');
          showHideSubmenus('events');
          if (currSubmenuSelected) {
            currSubmenuSelected.firstChild.classList.toggle('selected');
            currSubmenuSelected = null;
          }
        })
        icon.src = "../../../media/events.svg";
        icon.classList.add('svg');
        row.firstChild.prepend(icon);

        temp.push(row);
        setupSubmenus(temp, 'events', Blockly.Blocks.eventsMessageToolbox, 'Message', '../../../media/events-message.svg',
                      Blockly.Blocks.eventsChangeToolbox, 'Change', '../../../media/events-change.svg');
        break;
      case 'control':
        row.classList.add('control');
        row.addEventListener('click', () => {
          setToolboxMenu(Blockly.Blocks.controlToolbox);
          row.firstChild.classList.add('categorySelected');
          removeSelectedCategories('control');
          showHideSubmenus('control');
          if (currSubmenuSelected) {
            currSubmenuSelected.firstChild.classList.toggle('selected');
            currSubmenuSelected = null;
          }
        })
        icon.src = "../../../media/control.svg";
        icon.classList.add('svg');
        row.firstChild.prepend(icon);

        temp.push(row);
        setupSubmenus(temp, 'control', Blockly.Blocks.controlConditionalsToolbox, 'Condition', '../../../media/control-condition.svg',
                      Blockly.Blocks.controlUtilityToolbox, 'Utility', '../../../media/control-utility.svg');
        break;
      case 'sensing':
        row.classList.add('sensing');
        row.addEventListener('click', () => {
          setToolboxMenu(Blockly.Blocks.sensingToolbox);
          row.firstChild.classList.add('categorySelected');
          removeSelectedCategories('sensing');
          showHideSubmenus('sensing');
          if (currSubmenuSelected) {
            currSubmenuSelected.firstChild.classList.toggle('selected');
            currSubmenuSelected = null;
          }
        })
        icon.src = "../../../media/sensing.svg";
        icon.classList.add('svg');
        row.firstChild.prepend(icon);

        temp.push(row);
        setupSubmenus(temp, 'sensing', Blockly.Blocks.sensingValueToolbox, 'Value', '../../../media/sensing-value.svg',
                      Blockly.Blocks.sensingUtilityToolbox, 'Utility', '../../../media/sensing-utility.svg');
        break;
      case 'operators':
        row.classList.add('operators');
        row.addEventListener('click', () => {
          setToolboxMenu(Blockly.Blocks.operatorsToolbox);
          row.firstChild.classList.add('categorySelected');
          removeSelectedCategories('operators');
          showHideSubmenus('operators');
          if (currSubmenuSelected) {
            currSubmenuSelected.firstChild.classList.toggle('selected');
            currSubmenuSelected = null;
          }
        })
        icon.src = "../../../media/operators.svg";
        icon.classList.add('svg');
        row.firstChild.prepend(icon);

        temp.push(row);
        setupSubmenus(temp, 'operators', Blockly.Blocks.operatorsLogicToolbox, 'Logic', '../../../media/operators-logic.svg',
                      Blockly.Blocks.operatorsCalculateToolbox, 'Calculate', '../../../media/operators-calculate.svg');
        break;
      default:
        break;
    }
  });

  newRows = [].concat.apply([], newRows);
  setToolboxMenu(Blockly.Blocks.defaultToolbox);
}
