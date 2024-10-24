import { App } from 'obsidian';
import { dirname } from 'path';

export interface PathInfo {
    display: string;  // Vault 기준 상대 경로
    path: string;     // 절대 경로
}

export function getVaultPath(app: App): string {
    // @ts-ignore (vault.adapter.basePath는 존재하지만 타입 정의가 되어있지 않음)
    return app.vault.adapter.basePath;
}

export function getAbsolutePath(vaultPath: string, relativePath: string): string {
    return `${vaultPath}/${relativePath}`;
}

export function getParentPaths(vaultPath: string, relativePath: string): PathInfo[] {
    const relativeParentParts = dirname(relativePath).split('/');
    
    return relativeParentParts.reduce((acc: PathInfo[], _, index) => {
        if (relativeParentParts.length - index <= 0) return acc;
        const relativePart = relativeParentParts.slice(0, relativeParentParts.length - index).join('/');
        const absolutePart = getAbsolutePath(vaultPath, relativePart);
        acc.push({
            display: relativePart || '/',
            path: absolutePart
        });
        return acc;
    }, []);
}
