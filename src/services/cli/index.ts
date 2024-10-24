import { exec } from 'child_process';
import { promisify } from 'util';
import { platform } from 'os';

const execAsync = promisify(exec);

type PlatformPaths = {
    [key in NodeJS.Platform]?: string;
};

const DEFAULT_PATHS: PlatformPaths = {
    darwin: '/Applications/Cursor.app/Contents/MacOS/Cursor',
    win32: 'cursor',
    linux: 'cursor'
};

async function findProgramPath(program: string): Promise<string | undefined> {
    try {
        const currentPlatform = platform();
        console.log(`현재 플랫폼: ${currentPlatform}`);
        
        // Cursor인 경우 기본 경로 사용
        if (program === 'cursor') {
            const defaultPath = DEFAULT_PATHS[currentPlatform];
            console.log(`Cursor 기본 경로 사용: ${defaultPath}`);
            return defaultPath;
        }

        const command = currentPlatform === 'win32' ? `where ${program}` : `which ${program}`;
        console.log(`실행할 명령어: ${command}`);
        
        console.log(`현재 PATH: ${process.env.PATH}`);
        
        const { stdout } = await execAsync(command, {
            env: { ...process.env, PATH: process.env.PATH }
        });
        const programPath = stdout.trim().split('\n')[0];
        console.log(`찾은 프로그램 경로: ${programPath}`);
        return programPath;
    } catch (error) {
        console.error(`프로그램 경로를 찾을 수 없습니다: ${program}`, error);
        throw new Error(`프로그램 ${program}을(를) 찾을 수 없습니다.`);
    }
}

export async function openWith(program: string, path: string): Promise<void> {
    try {
        const programPath = await findProgramPath(program);
        console.log(`실행 중: ${programPath} -n "${path}"`);
        await execAsync(`"${programPath}" -n "${path}"`);  
    } catch (error) {
        console.error(`${program} 명령어 실행 실패:`, error);
        throw error;
    }
}
