'use strict';

function initialize(workspace) {
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

  const setupSubmenus = (temp, category, firstToolbox, firstLabel, secondToolBox, secondLabel) => {
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

    newRows.push(temp);
  }

  menuRows.forEach(row => {
    row = row.cloneNode(true);
    row.firstChild.classList.remove('categorySelected');
    const bubble = row.firstChild.firstChild;
    bubble.classList.add('invisible');
    topMenuRows.push(row);

    let temp = [];
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
        temp.push(row);
        setupSubmenus(temp, 'motion', Blockly.Blocks.motionStaticToolbox, 'Static', Blockly.Blocks.motionMobileToolbox, 'Mobile');
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
        temp.push(row);
        setupSubmenus(temp, 'looks', Blockly.Blocks.looksGraphicsToolbox, 'Graphics', Blockly.Blocks.looksUtilityToolbox, 'Utility');
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
        temp.push(row);
        setupSubmenus(temp, 'sound', Blockly.Blocks.soundOptionsToolbox, 'Options', Blockly.Blocks.soundVocalToolbox, 'Vocal');
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
        temp.push(row);
        setupSubmenus(temp, 'events', Blockly.Blocks.eventsMessageToolbox, 'Message', Blockly.Blocks.eventsChangeToolbox, 'Change');
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
        temp.push(row);
        setupSubmenus(temp, 'control', Blockly.Blocks.controlConditionalsToolbox, 'Condition', Blockly.Blocks.controlUtilityToolbox, 'Utility');
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
        temp.push(row);
        setupSubmenus(temp, 'sensing', Blockly.Blocks.sensingValueToolbox, 'Value', Blockly.Blocks.sensingUtilityToolbox, 'Utility');
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
        temp.push(row);
        setupSubmenus(temp, 'operators', Blockly.Blocks.operatorsLogicToolbox, 'Logic', Blockly.Blocks.operatorsCalculateToolbox, 'Calculate');
        break;
      default:
        break;
    }
  });

  newRows = [].concat.apply([], newRows);
  setToolboxMenu(Blockly.Blocks.defaultToolbox);
}
