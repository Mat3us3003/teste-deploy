import Options from "../types/Options.tagField";

export class TagField {
    public tagFields;
    public tagContainer;
    public tagButton;

    public tags: any = [];
    public tagsValue: any = [];

    constructor(options: Options) {
        this.tagFields = document.querySelectorAll(options.tagFields);
        this.tagContainer = document.querySelector(options.tagContainer);
        this.tagButton = document.querySelector(options.tagButton);
    }

    private addTags() {
        const tags: any[] = this.tags;

        tags.forEach((tag) => {
            this.tagContainer?.appendChild(tag.element);
        });
    }

    private addTagToContainer(event: Event) {
        event.preventDefault();

        const fields: any[] = [];
        
        Array.from(this.tagFields).forEach((field: any) => {
            const name: string | null = field.getAttribute('data-tagfield-name');
            const value: string | null = field.value;

            if (name && value) {
                fields.push({
                    name,
                    value
                });
            }
        });

        if (fields.length > 0) {
            let elementId: string = Date.now() + '-' + Math.ceil(Math.random() * 100);
            let content = '';

            fields.forEach((field, index: number) => {
                
                if (fields.length == index + 1) {
                    content += field.value;
                    
                } else {
                    content += field.value + ' | ';
                }
            });

            let tagElement = this.createTagElement(content, {
                id: elementId
            });

            let values: any = {};
            values[elementId] = fields;

            this.tagsValue.push(values)

            this.tags.push({
                id: elementId,
                element: tagElement,
            });

            this.addTags();
        }
    }

    private removeTag(event: Event) {
        const element = (event.currentTarget as any).parentNode
        const id = element.getAttribute('id-element');

        if (id) {
            this.tags.forEach((tag: { id: string, element: any }, index: number) => {
                if (tag.id == id) {
                    this.tags = this.tags.filter((tag: any, indexT: number) => indexT != index);
                }
            })

            this.tagsValue.map((tag: any, index: number) => {
                if (tag[id]) {
                    this.tagsValue = this.tagsValue.filter((tag: any, indexT: number) => indexT != index);
                }
            })
        }

        element.remove();
    }

    private createTagElement(text: string, options: any = {}) {
        const element = document.createElement('div');
        const span = document.createElement('span');

        if (options.hasOwnProperty('id')) {
            element.setAttribute('id-element', options.id);
        }

        span.classList.add('tag-container_item-exit');
        span.innerText = 'X'

        span.addEventListener('click', this.removeTag);
        
        element.classList.add('tag-container_item');
        element.innerText = text;

        element.appendChild(span);

        return element;
    }

    private bindEvents() {
        this.removeTag = this.removeTag.bind(this);
        this.addTagToContainer = this.addTagToContainer.bind(this);
    }

    private addEvents() {
        this.tagButton?.addEventListener('click', this.addTagToContainer)
    }

    init() {
        this.bindEvents();
        this.addEvents();
    }
}
