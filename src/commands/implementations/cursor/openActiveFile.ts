import { Notice } from 'obsidian';
import { Command, CommandContext } from '../../types';
import { openWith } from '../../../services/cli';
import { getVaultPath, getAbsolutePath } from '../../../services/path';

export class OpenActiveFile implements Command {
    id = 'open-active-file-with-cursor';
    name = 'Open Current File with Cursor';
    command = 'cursor';

    constructor(private context: CommandContext) {}

    async execute(): Promise<void> {
        const activeFile = this.context.app.workspace.getActiveFile();
        if (!activeFile) {
            new Notice('No active file');
            return;
        }

        try {
            const vaultPath = getVaultPath(this.context.app);
            const absolutePath = getAbsolutePath(vaultPath, activeFile.path);
            
            await openWith(this.command, absolutePath);
            new Notice('File opened in Cursor');
        } catch (error) {
            console.error('Failed to open file in Cursor:', error);
            new Notice('Failed to open file in Cursor. Is Cursor installed?');
        }
    }
}
