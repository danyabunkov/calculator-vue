import { Component, Prop, Vue } from 'vue-property-decorator';

import styles from './error.css?module'

@Component
export default class Error extends Vue {

  @Prop()
  private message!: string;

  @Prop()
  private isShow!: boolean;

  render() {
    return (
      <div v-show={ this.isShow } class={ styles.error }>{ this.message }</div>
    )
  }
}
