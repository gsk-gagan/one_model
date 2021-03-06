import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';

import { ILauncher } from '@jupyterlab/launcher';

import { IMainMenu } from '@jupyterlab/mainmenu';

import { Menu } from '@lumino/widgets';

import { ExamplePanel } from './panel';

/**
 * The command IDs used by the console plugin.
 */
namespace CommandIDs {
  export const create = 'one-model:create';
}

/**
 * Initialization data for the extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'one-model',
  autoStart: true,
  optional: [ILauncher],
  requires: [ICommandPalette, IMainMenu],
  activate: activate
};

/**
 * Activate the JupyterLab extension.
 *
 * @param app Jupyter Font End
 * @param palette Jupyter Commands Palette
 * @param mainMenu Jupyter Menu
 * @param launcher [optional] Jupyter Launcher
 */
function activate(
  app: JupyterFrontEnd,
  palette: ICommandPalette,
  mainMenu: IMainMenu,
  launcher: ILauncher | null
): void {
  const manager = app.serviceManager;
  const { commands, shell } = app;
  const category = 'Extension Examples';

  // Add launcher
  if (launcher) {
    launcher.add({
      command: CommandIDs.create,
      category: category
    });
  }

  /**
   * Creates a example panel.
   *
   * @returns The panel
   */
  async function createPanel(): Promise<ExamplePanel> {
    const panel = new ExamplePanel(manager);
    shell.add(panel, 'main');
    return panel;
  }

  // add menu tab
  const exampleMenu = new Menu({ commands });
  exampleMenu.title.label = 'One Model';
  mainMenu.addMenu(exampleMenu);

  // add commands to registry
  commands.addCommand(CommandIDs.create, {
    label: 'Open the One Model Panel',
    caption: 'Open the One Model Panel',
    execute: createPanel
  });

  // add items in command palette and menu
  palette.addItem({ command: CommandIDs.create, category });
  exampleMenu.addItem({ command: CommandIDs.create });
}

export default extension;
