import { App, Plugin } from 'obsidian';

export interface Command {
    id: string;
    name: string;
    execute: () => Promise<void>;
}

export interface CommandContext {
    app: App;
    plugin: Plugin;
}

