import { Menu, Notice, Plugin } from 'obsidian';
import { SynapticRouteSettings, DEFAULT_SETTINGS, SampleSettingTab } from './src/settings/settingTab';
import { registerCommands } from './src/commands';
import { registerEvents } from './src/events';

// Remember to rename these classes and interfaces!

export default class SynapticRoute extends Plugin {
	settings: SynapticRouteSettings;

	async onload() {
		await this.loadSettings();
		
		// 설정 탭 추가
		this.addSettingTab(new SampleSettingTab(this.app, this));
		
		// 명령어 등록
		registerCommands(this);

		// 이벤트 등록
		registerEvents(this);
	}

	onunload() {
		// 등록된 모든 이벤트 정리
		this.app.workspace.trigger('unload');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
