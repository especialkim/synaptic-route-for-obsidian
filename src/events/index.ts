import { Plugin } from 'obsidian';
import { ImageContextMenu } from './image';

export function registerEvents(plugin: Plugin) {
    // 이미지 컨텍스트 메뉴 이벤트 등록
    const imageContextMenu = new ImageContextMenu(plugin);
    imageContextMenu.register();
    
    // 추후 다른 이벤트들도 여기에 추가 가능
    // registerOtherEvent(plugin);
    // registerAnotherEvent(plugin);
}
