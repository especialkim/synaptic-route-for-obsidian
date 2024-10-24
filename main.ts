import { Plugin } from 'obsidian';
import { MyPluginSettings, DEFAULT_SETTINGS, SampleSettingTab } from './src/settings';

// Remember to rename these classes and interfaces!

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();
		
		// 설정 탭 추가
		this.addSettingTab(new SampleSettingTab(this.app, this));
		
		// 여기에 플러그인 기능을 추가하세요
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
