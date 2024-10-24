import { App, PluginSettingTab } from 'obsidian';
import MyPlugin from '../main';

export interface MyPluginSettings {
    mySetting: string;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
    mySetting: 'default'
}

export class SampleSettingTab extends PluginSettingTab {
    plugin: MyPlugin;

    constructor(app: App, plugin: MyPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const {containerEl} = this;
        containerEl.empty();
        
        containerEl.createEl('h1', { text: 'Sample Plugin Template' });
        
        // 여기에 설정 UI를 추가하세요
    }
}
