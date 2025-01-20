import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { Button, RadioGroup, RadioButton } from 'ant-design-vue';
import ScriptOp from './components/ScriptOp.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register global components
    app.component('script-op', ScriptOp);
    app.component('cea-button', Button);
    app.component('cea-radio-button', RadioButton);
    app.component('cea-radio-group', RadioGroup);
  }
} satisfies Theme;
