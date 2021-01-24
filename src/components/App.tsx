import {CreateElement, VNode} from 'vue';
import {Component} from "vue-property-decorator";
import {VueComponent} from "../VueComponent";

interface Props {
    msg: string
}

@Component
export class App extends VueComponent<Props> {
    render(h: CreateElement): VNode {
        return <div>Main component</div>;
    }
}
