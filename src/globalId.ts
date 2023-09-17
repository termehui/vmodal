/**
 * generate global id from container name and modal id
 * @param container container name
 * @param modal modal id
 */
export function generateId(container: string, modal: string): string {
    return `${container}:::${modal}`;
}

/**
 * get container name from global id
 * @param id global id
 */
export function getContainer(id: string): string {
    return id.split(":::")[0];
}

/**
 * get modal id from global id
 * @param id global id
 */
export function getModalId(id: string): string {
    return id.split(":::")[1];
}

/**
 * detect if global id belongs to container
 * @param id global id
 * @param container container name
 */
export function detectContainer(id: string, container: string): boolean {
    return id.startsWith(`${container}:::`);
}

/**
 * detect if global id is for modal
 * @param id global id
 * @param modal modal id
 */
export function detectModal(id: string, modal: string): boolean {
    return id.endsWith(`:::${modal}`);
}
