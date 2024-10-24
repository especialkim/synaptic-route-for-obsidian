import { Notice } from 'obsidian';
import { Command, CommandContext } from '../../types';
import { openWith } from '../../../services/cli';
import { getVaultPath } from '../../../services/path';

export class OpenVault implements Command {
    id = 'open-vault-with-cursor';
    name = 'Open Vault with Cursor';
    command = 'cursor';

    constructor(private context: CommandContext) {}

    async execute(): Promise<void> {
        try {
            const vaultPath = getVaultPath(this.context.app);
            await openWith(this.command, vaultPath);
            new Notice('Vault opened in Cursor');
        } catch (error) {
            console.error('Failed to open vault in Cursor:', error);
            new Notice('Failed to open vault in Cursor. Is Cursor installed?');
        }
    }
}
