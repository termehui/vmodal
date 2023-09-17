import { OverlayCallback, MinimalFunction } from "./types";

/**
 * overlay callbacks list
 */
const overlayCallbacks: Array<OverlayCallback> = [];

/**
 * register callback for overlay click
 * @param globalId global id
 * @param handler callback functions
 */
export function onOverlayClick(
    globalId: string,
    handler: MinimalFunction
): void {
    overlayCallbacks.push({
        globalId,
        handler,
    });
}

/**
 * call callback handler for modal
 * @param globalId global id
 */
export function callCallbacks(globalId: string): void {
    const cbs = overlayCallbacks.filter((cb) => cb.globalId === globalId);
    cbs.length && cbs[0] && cbs[0].handler && cbs[0].handler();
}
