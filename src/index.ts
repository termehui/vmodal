import { App } from "vue";
import Container from "./Container.vue";
import "./style.scss";

/**
 * install modal plugin
 */
export default {
    install: (app: App): void => {
        app.component("modal", Container);
    },
};
export { Container };
export {
    detectContainer,
    detectModal,
    getContainer,
    getModalId,
} from "./globalId";
export {
    createDefaultModal,
    createDefaultSimpleModal,
    createModal,
    createSimpleModal,
} from "./modal";
export {
    getContainerOptions,
    getGlobalOptions,
    setContainerOptions,
    setGlobalOptions,
} from "./options";
export type {
    ActionHandler,
    CloseHandler,
    OpenHandler,
    ModalOptions,
} from "./types";
export { useModal } from "./useModal";
