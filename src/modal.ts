import { h, ref } from "vue";
import { ModalRecord, ModalOptions, ComponentType } from "./types";
import { generate } from "shortid";
import SimpleModal from "./Simple.vue";
import { detectContainer, generateId, getContainer } from "./globalId";
import { getContainerOptions, getGlobalOptions, mergeOptions } from "./options";

/**
 * modals list
 */
export const modals = ref<ModalRecord[]>([]);

/**
 * Active modal list
 */
export const activeIds = ref<string[]>([]);

/**
 * Next modal list
 */
export const nextIds = ref<string[]>([]);

/**
 * activate modal
 * @param globalId global id
 * @returns true on success, false otherwise.
 */
export function activateModal(globalId: string): boolean {
    // Found modal
    const modal = modals.value.find((i) => i.globalId === globalId);
    if (modal === undefined) return false;
    const remains = modals.value.filter((i) => i.globalId !== globalId);
    remains.push(modal);
    // Set next id
    const nexts = nextIds.value.filter(
        (i) => !detectContainer(i, getContainer(globalId))
    );
    nexts.push(globalId);
    nextIds.value = nexts;

    modals.value = remains;
    return true;
}

/**
 * remove modal by id
 * @param globalId global id
 */
export function destroyModal(globalId: string): void {
    modals.value = modals.value.filter((i) => i.globalId !== globalId);
}

/**
 * create new modal
 *
 * @param container container name
 * @param com component instance
 * @param props components props list
 * @param options modal options (optional)
 */
export function createModal(
    container: string,
    com: ComponentType,
    props: { [k: string]: any },
    options: ModalOptions = {}
): string {
    props["globalId"] = generateId(container, generate());
    props["options"] = mergeOptions(
        getGlobalOptions(),
        getContainerOptions(container),
        options
    );
    modals.value.push({
        globalId: props["globalId"],
        component: h(com, props),
    });
    activateModal(props["globalId"]);
    return props["globalId"];
}

/**
 * create new simple modal
 *
 * @param container container name
 * @param props components props list
 * @param options modal options (optional)
 */
export function createSimpleModal(
    container: string,
    props: {
        content: string;
        title?: string;
        [key: string]: any;
    },
    options: ModalOptions = {}
): string {
    return createModal(container, SimpleModal, props, options);
}

/**
 * create new modal for default container
 *
 * @param com component instance
 * @param props components props list
 * @param options modal options (optional)
 */
export function createDefaultModal(
    com: ComponentType,
    props: { [k: string]: any },
    options: ModalOptions = {}
): string {
    return createModal("default", com, props, options);
}

/**
 * create new simple modal for default container
 *
 * @param props components props list
 * @param options modal options (optional)
 */
export function createDefaultSimpleModal(
    props: {
        content: string;
        title?: string;
        [key: string]: any;
    },
    options: ModalOptions = {}
): string {
    return createSimpleModal("default", props, options);
}
