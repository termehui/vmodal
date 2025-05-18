import anime, { AnimeInstance } from "animejs";
import { computed, onMounted, ref, Ref, watch } from "vue";
import { detectContainer, getContainer } from "./globalId";
import { onOverlayClick } from "./handler";
import {
    activateModal,
    destroyModal,
    modals,
    activeIds,
    nextIds,
} from "./modal";
import { ModalOptions } from "./types";

/**
 * composition api for modal component
 *
 * @param globalId global id (passed as `globalId` props to component by constructor function)
 * @param options modal options (passed as props to component by constructor function)
 * @param el modal container element ref
 */
export function useModal(
    globalId: string,
    options: ModalOptions,
    el: Ref<HTMLElement | undefined>
) {
    // animations
    let enterAnimation: AnimeInstance | null = null;
    let leaveAnimation: AnimeInstance | null = null;
    let refuseAnimation: AnimeInstance | null = null;
    let firstTime = true;
    let closing = false;
    onMounted(() => {
        if (!el.value) return;
        if (options.enterAnimation) {
            enterAnimation = anime({
                ...options.enterAnimation,
                ...{
                    targets: el.value,
                    autoplay: false,
                    complete: () => {
                        options.onOpen && options.onOpen(firstTime);
                        firstTime = false;
                    },
                },
            });
        }
        if (options.leaveAnimation) {
            leaveAnimation = anime({
                ...options.leaveAnimation,
                ...{
                    targets: el.value,
                    autoplay: false,
                },
            });
        }
        if (options.refuseAnimation) {
            refuseAnimation = anime({
                ...options.refuseAnimation,
                ...{
                    targets: el.value,
                    autoplay: false,
                },
            });
        }
    });

    // computed
    const container = getContainer(globalId);
    const containerModals = computed(() =>
        modals.value.filter((i) => detectContainer(i.globalId, container))
    );
    const activeId = computed<string | null>({
        get: function () {
            return (
                activeIds.value.find((i) => detectContainer(i, container)) ||
                null
            );
        },
        set: function (v) {
            activeIds.value = activeIds.value.filter(
                (i) => !detectContainer(i, container)
            );
            if (v) {
                activeIds.value.push(v);
            }
        },
    });
    const nextId = computed<string | null>({
        get: function () {
            return (
                nextIds.value.find((i) => detectContainer(i, container)) || null
            );
        },
        set: function (v) {
            nextIds.value = nextIds.value.filter(
                (i) => !detectContainer(i, container)
            );
            if (v) {
                nextIds.value.push(v);
            }
        },
    });

    // internal functions
    function doClear(mode: "overlay" | "click" | "action") {
        destroyModal(globalId);
        options.onClose && options.onClose(mode);
        if (containerModals.value.length > 0) {
            activeId.value = null;
            activateModal(
                containerModals.value[containerModals.value.length - 1].globalId
            );
        } else {
            activeId.value = null;
            nextId.value = null;
        }
    }
    const doClose = (mode: "overlay" | "click" | "action") => {
        enterAnimation?.pause();
        refuseAnimation?.pause();
        if (leaveAnimation) {
            closing = true;
            leaveAnimation.restart();
            leaveAnimation.finished
                .then(() => doClear(mode))
                .catch(() => doClear(mode));
        } else {
            doClear(mode);
        }
    };

    // states and methods
    const loading = ref(false);
    function action(key: string, data?: unknown): void {
        if (options.onAction) {
            loading.value = true;
            closing = true;
            options
                .onAction(key, data)
                .then((res) => {
                    loading.value = false;
                    res && doClose("action");
                })
                .catch(() => {
                    loading.value = false;
                });
        }
    }
    function close(): void {
        doClose("click");
    }

    // hooks
    onMounted(() => {
        if (containerModals.value.length === 1) {
            enterAnimation?.restart();
        }
    });

    // register overlay click handler
    onOverlayClick(globalId, () => {
        if (closing == false) {
            enterAnimation?.pause();
            leaveAnimation?.pause();
            refuseAnimation?.pause();
            if (options.closable) {
                doClose("overlay");
            } else {
                refuseAnimation?.restart();
            }
        }
    });

    // switch effect
    watch(
        activeId,
        (newId, _) => {
            if (newId === globalId) {
                leaveAnimation?.pause();
                refuseAnimation?.pause();
                enterAnimation?.restart();
            }
        },
        { immediate: true }
    );
    watch(
        nextId,
        function (newId, _) {
            if (!newId) return;
            if (activeId.value === globalId && newId !== globalId) {
                enterAnimation?.pause();
                refuseAnimation?.pause();
                if (leaveAnimation) {
                    leaveAnimation.restart();
                    leaveAnimation.finished.then(
                        () => (activeId.value = newId)
                    );
                    return;
                } else {
                    activeId.value = newId;
                }
            } else if (!activeId.value) {
                activeId.value = newId;
            }
        },
        { immediate: true }
    );

    return { loading, action, close };
}
