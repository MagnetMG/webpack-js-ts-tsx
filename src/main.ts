///<reference path="./jsx.d.ts"/>

import Vue from "vue";
import './main.scss';
import {App} from "./components/App";

new Vue({
  el: '#app',
  components: {App},
  template: '<div><App /></div>'
});

