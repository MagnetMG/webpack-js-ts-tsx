import Vue, {VNode} from 'vue';

declare global {
    declare namespace JSX {
        interface Element extends VNode {}

        interface ElementClass extends Vue {}

        interface ElementAttributesProperty {
            $props: {};
        }

        interface IntrinsicElements {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [element: string]: any;
        }
    }
}
