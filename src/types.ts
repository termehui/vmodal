import { AnimeParams } from "animejs";

/**
 * Simple function
 */
export type MinimalFunction = () => void;

/**
 * Action handler
 */
export type ActionHandler = (key: string, data?: unknown) => Promise<boolean>;

/**
 * Open handler
 */
export type OpenHandler = (firstTime: boolean) => void;

/**
 * Close handler
 */
export type CloseHandler = (mode: "overlay" | "click" | "action") => void;

/**
 * Modal options interface
 */
export interface ModalOptions {
    closable?: boolean;
    enterAnimation?: AnimeParams | null;
    leaveAnimation?: AnimeParams | null;
    refuseAnimation?: AnimeParams | null;
    onOpen?: OpenHandler | null;
    onAction?: ActionHandler | null;
    onClose?: CloseHandler | null;
}

/**
 * container options
 */
export interface ContainerOptions {
    [container: string]: ModalOptions;
}

/**
 * Overlay callbacks interface
 */
export interface OverlayCallback {
    globalId: string;
    handler: MinimalFunction;
}

/**
 * vue component type
 */
export interface ComponentType {
    [k: string]: any;
}

/**
 * Modal record interface
 */
export interface ModalRecord {
    globalId: string;
    component: ComponentType;
}
