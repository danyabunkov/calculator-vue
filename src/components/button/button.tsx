import { Component, Prop, Vue } from 'vue-property-decorator';

import styles from './button.css?module'
import { IButton } from "@/components/types/button.interface";

@Component
export default class Button extends Vue {

  @Prop()
  private button!: IButton;

  @Prop()
  private doAction!: Function;

  get classNames(): string[] {
    return [
      styles.button,
      this.button.value === 0 ? styles.buttonZero : '',
      this.button.operator ? styles.buttonOperator : '',
    ]
  }

  render() {
    return (
      <button
        class={ this.classNames }
        onclick={ () => this.doAction(this.button.value) }
      >
        { this.button.value }
      </button>
    )
  }
}
