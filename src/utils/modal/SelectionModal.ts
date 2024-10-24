import { App, Modal, Setting } from 'obsidian';

export class SelectionModal extends Modal {
    private selectedIndex: number = 0;
    private suggestEl: HTMLElement;

    constructor(
        app: App,
        private title: string,
        private options: string[],
        private onSelect: (selected: string) => void
    ) {
        super(app);
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        
        contentEl.parentElement?.addClass('synaptic-route-modal');
        contentEl.createEl('h2', { text: this.title });
        
        this.suggestEl = contentEl.createDiv('suggestion-container');
        
        this.renderSuggestions();
        this.registerNavigationKeys();
    }

    private renderSuggestions() {
        this.suggestEl.empty();
        
        this.options.forEach((option, index) => {
            const suggestionEl = this.suggestEl.createDiv('suggestion-item');
            if (index === this.selectedIndex) {
                suggestionEl.addClass('is-selected');
            }
            
            suggestionEl.createDiv({
                text: option,
                cls: 'suggestion-content',
            });

            suggestionEl.addEventListener('click', () => {
                this.selectOption(index);
            });

            suggestionEl.addEventListener('mouseenter', () => {
                this.selectedIndex = index;
                this.renderSuggestions();
            });
        });
    }

    private registerNavigationKeys() {
        this.scope.register([], 'ArrowUp', () => {
            this.selectedIndex = (this.selectedIndex - 1 + this.options.length) % this.options.length;
            this.renderSuggestions();
            return false;
        });

        this.scope.register([], 'ArrowDown', () => {
            this.selectedIndex = (this.selectedIndex + 1) % this.options.length;
            this.renderSuggestions();
            return false;
        });

        this.scope.register([], 'Enter', () => {
            this.selectOption(this.selectedIndex);
            return false;
        });
    }

    private selectOption(index: number) {
        this.onSelect(this.options[index]);
        this.close();
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
