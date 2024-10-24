import { Menu, TFile, Plugin } from 'obsidian';
import { OpenWithCleanShot } from '../../commands/implementations/cleanshotX/openWithCleanShot';

export class ImageContextMenu {
    private cleanShotCommand: OpenWithCleanShot;

    constructor(private plugin: Plugin) {
        this.cleanShotCommand = new OpenWithCleanShot(plugin);
    }

    register() {
        const eventRef = this.plugin.app.workspace.on('file-menu', (menu: Menu, file: TFile) => {
            if (file.extension === 'png' || file.extension === 'jpg' || file.extension === 'jpeg' || file.extension === 'gif' || file.extension === 'svg') {
                menu.addItem((item) => {
                    item.setTitle('Open With CleanShotX 🖌️')
                        .setIcon('image')
                        .onClick(() => {
                            this.cleanShotCommand.execute(file);
                        });
                });
            }
        });

        this.plugin.register(() => {
            this.plugin.app.workspace.offref(eventRef);
        });
    }
}
