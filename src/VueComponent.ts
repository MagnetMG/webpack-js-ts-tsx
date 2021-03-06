import Vue from 'vue';

type CSSClass = (string | {
  [key: string]: string;
})

export class VueComponent<Props = {}> extends Vue {
  public $props!: Props & {
    key?: string;
    class?: CSSClass | CSSClass[];
  }
}
