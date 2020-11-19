import { Component, Vue } from 'vue-property-decorator';

import styles from './calculator.css?module'
import Button from "@/components/button/button";
import Loader from "@/components/loader/loader";
import Display from "@/components/display/display";
import Error from "@/components/error/error";
import { buttonsList } from './buttons.list'

import { IDisplay } from "@/components/types/display.interface";
import { TOperators } from "@/components/types/operators.type";

@Component
export default class Calculator extends Vue {

  get isLoading(): boolean {
    return this.$store.getters.loading;
  }

  get display(): IDisplay {
    return this.$store.getters.display;
  }

  get errorMessage(): string {
    return this.$store.getters.error;
  }

  private doAction(value: TOperators | number): void {
    const buffer = this.display.buffer;

    /** можем сделать запрос на сервер только в случе, если у нас не пустая строка
     *  и если длина не равна трем или не включает в себя ' ',
     *  т.к. '+' и '-' добавляются как ' + ' */
    const canFetchResult = buffer.length !== 0 && (buffer.length !== 3 || !buffer.includes(' '));

    value === '='
      ? ( canFetchResult && this.$store.dispatch('fetchResult', buffer))
      : this.$store.commit('DO_ACTION', value);
  }

  render() {
    return (
      <div class={ styles.calculator }>
        <Error message={ this.errorMessage }/>
        <Loader loading={ this.isLoading }/>
        <div class={ styles.calculator__header }>
          <Display display={ this.display }/>
        </div>
        <div class={ styles.calculator__buttons }>
          { buttonsList.map(button => <Button doAction={ this.doAction.bind(this) } button={ button } />) }
        </div>
      </div>
    )
  }
}
