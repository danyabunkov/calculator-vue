import { Component, Prop, Vue } from 'vue-property-decorator';

import styles from './display.css?module'
import { IDisplay } from "@/components/types/display.interface";

@Component
export default class Display extends Vue {

  @Prop()
  private display!: IDisplay;

  get reverseString(): string {
    return this.display.buffer.split(' ').reverse().join(' ');
  }

  render() {
    return (
      <div class={ styles.display }>
        <div class={ styles.display__buffer }>
          { this.reverseString || <span class={ styles.display__placeholder }>Ввод</span> }
        </div>
        <div class={ styles.display__result }>= { this.display.result }</div>
      </div>
    )
  }
}
