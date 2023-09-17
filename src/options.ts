import { ContainerOptions, ModalOptions } from "./types";

/**
 * Default modal options
 */
const globalOptions: ModalOptions = {
    closable: false,
    enterAnimation: {
        scale: [0, 1],
        opacity: [0, 1],
        easing: "cubicBezier(0.165, 0.840, 0.440, 1.000)",
        duration: 200,
    },
    leaveAnimation: {
        scale: [1, 0],
        opacity: [1, 0],
        easing: "cubicBezier(0.165, 0.840, 0.440, 1.000)",
        duration: 200,
    },
    refuseAnimation: {
        scale: [1, 1.1],
        rotate: [0, -5],
        easing: "cubicBezier(0.165, 0.840, 0.440, 1.000)",
        duration: 200,
        direction: "alternate",
    },
};

/**
 * set global modal options
 * @param option new options
 */
export function setGlobalOptions(option: ModalOptions): void {
    const res = mergeOptions(globalOptions, option);
    globalOptions.closable = res.closable;
    globalOptions.enterAnimation = res.enterAnimation;
    globalOptions.leaveAnimation = res.leaveAnimation;
    globalOptions.refuseAnimation = res.refuseAnimation;
    globalOptions.onOpen = res.onOpen;
    globalOptions.onAction = res.onAction;
    globalOptions.onClose = res.onClose;
}

/**
 * get global modal options
 */
export function getGlobalOptions(): ModalOptions {
    return globalOptions || {};
}

/**
 * container Options
 */
const containerOptions: ContainerOptions = {};

/**
 * set container options
 * @param container container name
 * @param option new options
 */
export function setContainerOptions(
    container: string,
    option: ModalOptions | null | undefined
): void {
    containerOptions[container] = option || {};
}

/**
 * get container options
 * @param container container name
 */
export function getContainerOptions(container: string): ModalOptions {
    return containerOptions[container] || {};
}

/**
 * merge multiple modal options
 * ignore undefined value
 * latest option value has priority
 *
 * @param options options list to merge
 * @returns merged options
 */
export function mergeOptions(...options: ModalOptions[]): ModalOptions {
    const res: ModalOptions = {};
    for (const option of options) {
        if (option.closable != undefined) {
            res.closable = option.closable;
        }
        if (option.enterAnimation != undefined) {
            res.enterAnimation = option.enterAnimation;
        }
        if (option.leaveAnimation != undefined) {
            res.leaveAnimation = option.leaveAnimation;
        }
        if (option.refuseAnimation != undefined) {
            res.refuseAnimation = option.refuseAnimation;
        }
        if (option.onOpen != undefined) {
            res.onOpen = option.onOpen;
        }
        if (option.onAction != undefined) {
            res.onAction = option.onAction;
        }
        if (option.onClose != undefined) {
            res.onClose = option.onClose;
        }
    }
    return res;
}
