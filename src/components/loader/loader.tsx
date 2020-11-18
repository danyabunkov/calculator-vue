import { Component, Prop, Vue } from 'vue-property-decorator';

import styles from './loader.css?module'

@Component
export default class Loader extends Vue {

  @Prop()
  private loading!: boolean;

  render() {
    return (
      <div v-show={ this.loading } class={ styles.loader }>Loading...</div>
    )
  }
}
