import { Notice } from 'obsidian';
import { Command, CommandContext } from '../../types';
import { openWith } from '../../../services/cli';
import { getVaultPath, getAbsolutePath, getParentPaths } from '../../../services/path';
import { dirname } from 'path';
import { SelectionModal } from '../../../utils/modal';

export class OpenParentFolder implements Command {
    id = 'open-parent-folder-with-cursor';
    name = 'Open Parent Folder with Cursor';
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
            const parentPath = dirname(absolutePath);
            
            const pathOptions = getParentPaths(vaultPath, activeFile.path);

            if (pathOptions.length <= 1) {
                await openWith(this.command, parentPath);
                new Notice('Parent folder opened in Cursor');
                return;
            }

            const modal = new SelectionModal(
                this.context.app,
                '폴더 선택',
                pathOptions.map(p => p.display),
                async (selectedDisplay) => {
                    const selected = pathOptions.find(p => p.display === selectedDisplay);
                    if (selected) {
                        await openWith(this.command, selected.path);
                        new Notice('Selected folder opened in Cursor');
                    }
                }
            );
            modal.open();
        } catch (error) {
            console.error('Failed to open parent folder in Cursor:', error);
            new Notice('Failed to open parent folder in Cursor. Is Cursor installed?');
        }
    }
}
