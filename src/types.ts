import { TFile } from 'obsidian';

export interface Command {
    id: string;
    name: string;
    execute(file?: TFile): Promise<void>;
}

