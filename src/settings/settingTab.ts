import { App, PluginSettingTab } from 'obsidian';
import SynapticRoute from '../../main';

export interface SynapticRouteSettings {
    mySetting: string;
}

export const DEFAULT_SETTINGS: SynapticRouteSettings = {
    mySetting: 'default'
}

export class SampleSettingTab extends PluginSettingTab {
    plugin: SynapticRoute;

    constructor(app: App, plugin: SynapticRoute) {
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
