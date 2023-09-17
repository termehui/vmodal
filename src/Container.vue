<template>
    <div
        class="v-modal-container"
        @click.self="handleOverlyClick"
        v-show="hasModal"
    >
        <div class="wrapper">
            <component
                v-for="m in containerModals"
                :key="m.globalId"
                :is="m.component"
                v-show="m.globalId === activeId"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, watchEffect } from "vue";
import { activeIds, modals } from "./modal";
import { callCallbacks } from "./handler";
import { ModalOptions } from "./types";
import { detectContainer } from "./globalId";
import { setContainerOptions } from "./options";
export default defineComponent({
    emits: ["modal"],
    props: {
        name: {
            type: String,
            default: "default",
        },
        options: {
            type: Object as () => ModalOptions,
            default: () => ({}),
        },
    },
    setup(props, { emit }) {
        watchEffect(() => {
            if (props.options) {
                setContainerOptions(props.name, props.options);
            }
        });

        const containerModals = computed(() => {
            const res = modals.value.filter((i) =>
                detectContainer(i.globalId, props.name)
            );
            emit("modal", res.length);
            return res;
        });
        const hasModal = computed(() => containerModals.value.length > 0);
        const activeId = computed(() =>
            activeIds.value.find((i) => detectContainer(i, props.name))
        );
        function handleOverlyClick() {
            activeId.value && callCallbacks(activeId.value);
        }

        return {
            containerModals,
            hasModal,
            activeId,
            handleOverlyClick,
        };
    },
});
</script>
