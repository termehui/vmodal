<template>
    <div class="v-modal" ref="el" :class="{ 'is-loading': loading }">
        <p>{{ question }}</p>
        <div class="gaper is-auto">
            <button class="button is-simple" @click.stop="action('close')">
                Close
            </button>
            <button
                class="button is-error"
                @click.stop="action('loading')"
                :disabled="loading"
            >
                {{ loading ? "Loading..." : "Long Process" }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ModalOptions, useModal } from "../src/index";
export default defineComponent({
    name: "SimpleModal",
    props: {
        globalId: {
            type: String,
            required: true,
        },
        options: {
            type: Object as () => ModalOptions,
            required: true,
        },
        question: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const el = ref<HTMLElement>();
        const { close, loading, action } = useModal(
            props.globalId,
            props.options,
            el
        );
        return { close, loading, action, el };
    },
});
</script>
