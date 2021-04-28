import { Transforms, Element, Text, Node, Editor, Path } from 'slate';
import { Elements, ElementsDefinitionTypes } from '../elements';
import Command from '../elements/Command';
import { withCommand } from './normalizer';

import { iterateValue } from '../extras';
import { getNode } from '../../customize/extras';
import { ElementDefinitionType } from '../elements';

const COMMAND_KEY = '/';

const cleanCommand = (editor: Editor, node: Node, path: Path) => {
    if (node.element === 'command') {
        // Transforms.removeNodes(editor, { at: path });
        Command.unset && Command.unset({ editor, at: path });
    }
}

const cleanCommands = iterateValue(cleanCommand);

const getElementCommand = (command: string, elements: ElementsDefinitionTypes): (ElementDefinitionType | void) => {
    const text = command.replace(' ', '').replace('/', '');
    for (let key in elements) {
        const element = elements[key];
        if (element.command === text || element.name === text)
            return element;
    }
    return;
}

type onKeyDownFunctionType = (event: KeyboardEvent, editor: Editor, value:any, elements: ElementsDefinitionTypes) => any | void;
type onKeyDownHandlererFunctionType = (command: ElementDefinitionType | void) => any | void; 
export const makeOnKeyDown = (handlerer: onKeyDownHandlererFunctionType, elements: ElementsDefinitionTypes): onKeyDownFunctionType => {
    const onKeyDown = (event: KeyboardEvent, editor: Editor, value: any) => {
        const { selection } = editor;
        const { path, offset } = editor.selection.anchor;
        const node = getNode(value, selection.anchor.path);

        if (event.key === COMMAND_KEY) {
            event.preventDefault();
            // check if there is any other command on the editor if so delete it first
            cleanCommands({ editor, value });

            Transforms.insertNodes(editor, { element: "command", text: COMMAND_KEY });
            return;
        }

        if (node.element === 'command') {
            // only if it is inside the command element
            if (event.key === ' ' || event.code === "Enter" || event.key === COMMAND_KEY) {
                // check if command is valid if not delete command
                event.preventDefault();
                const commandElement = getElementCommand(node.text, elements);
                if (commandElement) {
                    let element = {};
                    switch (commandElement.name) {
                        /* case Elements.variable.name:
                            element = commandElement.create({ ref: 'var' });
                            break;
                        case Elements.list.name:
                            element = commandElement.create({
                                ref: 'list',
                                children: [{
                                    text: 'list',
                                }]
                            });
                            break;
                        case Elements.conditional.name:
                            element = commandElement.create({
                                conditional: 'true',
                                ifTrue: { element: 'conditional-true', text: 'place this if true' },
                                ifFalse: { element: 'conditional-false', text: 'place this if false' }
                            });
                            break; */
                        case Elements.title.name:
                            element = commandElement.create({
                                title: 'Mock'
                            });
                            break;

                        case Elements.bold.name:
                            element = commandElement.create({
                                text: 'bold'
                            });
                            break;
                        case Elements.italic.name:
                            element = commandElement.create({
                                text: 'italic'
                            });
                            break;
                        case Elements.underline.name:
                            element = commandElement.create({
                                text: 'underline'
                            });
                            break;
                        default:
                            element = handlerer(commandElement);
                            if (!element) {
                                commandElement.unset && commandElement.unset({ editor });
                                return;
                            }
                    }
                    if (element) {
                        Transforms.removeNodes(editor, { at: path });
                        commandElement.insert && commandElement.insert({ editor, event, meta: { element, at: path } });
                    } else {
                        Command.unset && Command.unset({ editor });
                    }
                    //Transforms.insertNodes(editor, {text: 'var', element: 'variable', ref: 'var'})
                    //commandElement.insert && commandElement.insert({ editor, event, meta: {element: { text: 'var', ref: 'var' }}});
                } else {
                    Command.unset && Command.unset({ editor });
                    // show alert of command not completed or bad command 
                }
                
            }
        }
    }
    return onKeyDown;
}

export default withCommand;
