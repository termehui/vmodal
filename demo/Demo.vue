<template>
    <div class="container">
        <div class="header is-primary is-huge is-left-decorated">
            <h1 class="has-primary-background">Modal</h1>
        </div>
        <div class="grid">
            <div class="column is-full">
                <div class="gaper is-auto">
                    <button class="button is-primary" @click="showModal">
                        Show In Main Container
                    </button>
                    <button class="button is-error" @click="showModalB">
                        Show Modal Right
                    </button>
                    <button class="button" @click="createCustomB">
                        Show Custom Modal Right
                    </button>
                </div>
            </div>
            <div class="column is-half"></div>
            <div class="column is-half sec">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nemo, qui, cum dolore ipsa quidem cumque, quia quibusdam
                    reiciendis explicabo iure debitis error praesentium
                    excepturi dolorem? Nisi sit facilis inventore dolorem.
                </p>
                <modal
                    class="is-sub is-light"
                    :options="{
                        enterAnimation: {
                            opacity: [0, 1],
                            translateY: ['-100%', 0],
                            easing: 'cubicBezier(0.165, 0.840, 0.440, 1.000)',
                            duration: 500,
                        },
                        leaveAnimation: {
                            opacity: [1, 0],
                            translateY: [0, '100%'],
                            easing: 'cubicBezier(0.165, 0.840, 0.440, 1.000)',
                            duration: 500,
                        },
                    }"
                    name="b"
                    @modal="bCount = $event"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
    createDefaultSimpleModal,
    createModal,
    createSimpleModal,
} from "../src/index";
import MyModal from "./MyModal.vue";
export default defineComponent({
    name: "Demo",
    setup() {
        let bCount = ref(0);
        function showModal() {
            createDefaultSimpleModal({
                title: `Hello`,
                content:
                    "This is sample content Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde harum non reprehenderit rem eaque officiis cum eum at amet, hic perspiciatis provident repellat modi nobis aliquam est exercitationem laboriosam ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde harum non reprehenderit rem eaque officiis cum eum at amet, hic perspiciatis provident repellat modi nobis aliquam est exercitationem laboriosam ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde harum non reprehenderit rem eaque officiis cum eum at amet, hic perspiciatis provident repellat modi nobis aliquam est exercitationem laboriosam ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde harum non reprehenderit rem eaque officiis cum eum at amet, hic perspiciatis provident repellat modi nobis aliquam est exercitationem laboriosam ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde harum non reprehenderit rem eaque officiis cum eum at amet, hic perspiciatis provident repellat modi nobis aliquam est exercitationem laboriosam ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde harum non reprehenderit rem eaque officiis cum eum at amet, hic perspiciatis provident repellat modi nobis aliquam est exercitationem laboriosam ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde harum non reprehenderit rem eaque officiis cum eum at amet, hic perspiciatis provident repellat modi nobis aliquam est exercitationem laboriosam ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde harum non reprehenderit rem eaque officiis cum eum at amet, hic perspiciatis provident repellat modi nobis aliquam est exercitationem laboriosam ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde harum non reprehenderit rem eaque officiis cum eum at amet, hic perspiciatis provident repellat modi nobis aliquam est exercitationem laboriosam ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde harum non reprehenderit rem eaque officiis cum eum at amet, hic perspiciatis provident repellat modi nobis aliquam est exercitationem laboriosam ipsam.",
            });
        }
        function createCustomB() {
            createModal(
                "b",
                MyModal,
                {
                    question: "Are you sure?",
                    class: "is-error is-massive-gaped",
                },
                {
                    onAction: async (k, _) => {
                        if (k === "close") {
                            return Promise.resolve(true);
                        } else {
                            var promise = new Promise<boolean>(function (
                                resolve,
                                _
                            ) {
                                window.setTimeout(function () {
                                    resolve(true);
                                }, 5000);
                            });
                            return promise;
                        }
                    },
                    onClose: (m) => console.log(m),
                }
            );
        }
        function showModalB() {
            let opt = {};
            if (bCount.value == 2) {
                opt = {
                    onOpen: () => {
                        console.log("i opened");
                    },
                };
            }
            createSimpleModal(
                "b",
                {
                    title: `Hello ${bCount.value}`,
                    content: "This is sample content",
                    class: "is-info",
                },
                opt
            );
        }
        return { bCount, showModal, showModalB, createCustomB };
    },
});
</script>
