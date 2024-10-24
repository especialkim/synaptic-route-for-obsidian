import { Notice, Plugin } from 'obsidian';
import { Command } from '../../types';
import { getVaultPath, getAbsolutePath } from '../../../services/path';
import { TFile } from 'obsidian';

export class OpenWithCleanShot implements Command {
    id = 'open-with-cleanshot';
    name = 'Open With CleanShotX';
    command = 'cleanshot';

    constructor(private plugin: Plugin) {}

    async execute(file?: TFile): Promise<void> {
        try {
            const vaultPath = getVaultPath(this.plugin.app);
            const absolutePath = getAbsolutePath(vaultPath, file?.path || '');
            const encodedPath = encodeURIComponent(absolutePath);
            
            const cleanshotUrl = `cleanshot://open-annotate?filepath=${encodedPath}`;
            window.open(cleanshotUrl);
            new Notice('File opened in CleanShotX');
        } catch (error) {
            console.error('Failed to open file in CleanShotX:', error);
            new Notice('Failed to open file in CleanShotX. Is CleanShotX installed?');
        }
    }
}