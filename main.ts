import { Plugin } from 'obsidian';
import { SynapticRouteSettings, DEFAULT_SETTINGS, SampleSettingTab } from './src/settings/settingTab';
import { registerCommands } from './src/commands';

// Remember to rename these classes and interfaces!

export default class SynapticRoute extends Plugin {
	settings: SynapticRouteSettings;

	async onload() {
		await this.loadSettings();
		
		// 설정 탭 추가
		this.addSettingTab(new SampleSettingTab(this.app, this));
		
		// 명령어 등록
		registerCommands(this);
	}

	onunload() {
		// 플러그인 언로드 시 정리 작업
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
