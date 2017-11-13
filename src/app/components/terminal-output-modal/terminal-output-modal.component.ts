import { Component } from "@angular/core";
import { SuiModal, ComponentModalConfig, ModalSize } from "ng2-semantic-ui";

interface ITerminalOutputModalContext {
    message:string;
    title?:string;
    description?:string;
}

@Component({
    selector: "terminal-output-modal",
    templateUrl: "./terminal-output-modal.component.html"
})
export class TerminalOutputModalComponent {
    constructor(public modal:SuiModal<ITerminalOutputModalContext, void, void>) {}
}

export class TerminalOutputModal extends ComponentModalConfig<ITerminalOutputModalContext, void, void> {
    constructor(message:string, title?:string, description?:string) {
        super(TerminalOutputModalComponent, { message, title, description });

        this.transitionDuration = 200;
        this.size = ModalSize.Large;
    }
}
