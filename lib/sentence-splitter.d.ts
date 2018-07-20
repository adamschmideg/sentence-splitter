import { TxtNode, TxtParentNode, TxtTextNode } from "@textlint/ast-node-types";
import { SourceCode } from "./parser/SourceCode";
import { AbstractParser } from "./parser/AbstractParser";
export declare const Syntax: {
    WhiteSpace: string;
    Punctuation: string;
    Sentence: string;
    Str: string;
};
export interface ToTypeNode<T extends string> extends TxtTextNode {
    readonly type: T;
}
export interface WhiteSpaceNode extends TxtTextNode {
    readonly type: "WhiteSpace";
}
export interface PunctuationNode extends TxtTextNode {
    readonly type: "Punctuation";
}
export interface StrNode extends TxtTextNode {
    readonly type: "Str";
}
export interface SentenceNode extends TxtParentNode {
    readonly type: "Sentence";
}
export declare class SplitParser {
    private nodeList;
    private results;
    source: SourceCode;
    constructor(text: string | TxtParentNode);
    readonly current: TxtParentNode | undefined;
    pushNodeToCurrent(node: TxtNode): void;
    open(parentNode: TxtParentNode): void;
    isOpened(): boolean;
    nextLine(parser: AbstractParser): {
        line: number;
        column: number;
        offset: number;
    };
    nextSpace(parser: AbstractParser): void;
    nextValue(parser: AbstractParser): void;
    close(parser: AbstractParser): void;
    toList(): (TxtParentNode | TxtNode)[];
}
/**
 * split `text` into Sentence nodes
 */
export declare function split(text: string): (TxtParentNode | TxtNode)[];
/**
 * Convert Paragraph Node to Paragraph node that convert children to Sentence node
 * This Node is based on TxtAST.
 * See https://github.com/textlint/textlint/blob/master/docs/txtnode.md
 */
export declare function splitAST(paragraphNode: TxtParentNode): TxtParentNode;
/**
 * WhiteSpace is space or linebreak
 */
export declare function createWhiteSpaceNode(text: string, startPosition: {
    line: number;
    column: number;
    offset: number;
}, endPosition: {
    line: number;
    column: number;
    offset: number;
}): ToTypeNode<"WhiteSpace">;
export declare function createPunctuationNode(text: string, startPosition: {
    line: number;
    column: number;
    offset: number;
}, endPosition: {
    line: number;
    column: number;
    offset: number;
}): PunctuationNode;
export declare function createTextNode(text: string, startPosition: {
    line: number;
    column: number;
    offset: number;
}, endPosition: {
    line: number;
    column: number;
    offset: number;
}): StrNode;
export declare function createEmptySentenceNode(): SentenceNode;
export declare function createNode<T extends string>(type: T, text: string, startPosition: {
    line: number;
    column: number;
    offset: number;
}, endPosition: {
    line: number;
    column: number;
    offset: number;
}): ToTypeNode<T>;
