import { Plugin, App } from 'obsidian';
import { Command, CommandContext } from './types';
import { OpenActiveFile, OpenParentFolder, OpenVault } from './implementations/cursor/';

export function registerCommands(plugin: Plugin): Command[] {
    const context: CommandContext = {
        app: plugin.app,
        plugin: plugin
    };

    const commands: Command[] = [
        new OpenActiveFile(context),
        new OpenParentFolder(context),
        new OpenVault(context)
    ];

    // 각 명령어를 Obsidian에 등록
    commands.forEach(command => {
        plugin.addCommand({
            id: command.id,
            name: command.name,
            callback: () => command.execute()
        });
    });

    return commands;
}
