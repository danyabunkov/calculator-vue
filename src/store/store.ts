import Vue from 'vue'
import Vuex from 'vuex'
import { Module } from 'vuex'

import { ICalculatorState } from "@/store/types/calculator-state.interface";
import { TOperators } from "@/components/types/operators.type";
import { calculateResult } from "@/functions/calculateResult.function";
import { lastSighIsAddOrMinus } from "@/functions/lastSighIsAddOrMinus.function";
import { IError } from "@/components/types/error.interface";

Vue.use(Vuex)

export const calculator: Module<ICalculatorState, {}> = {
  state: {
    display: {
      buffer: '',
      result: 0,
      resultDone: false,
    },
    error: {
      message: '',
      isShow: false,
    },
    loading: false,
  },
  mutations: {
    DO_ACTION: (state, value: TOperators | number): void => {
      if (typeof value === 'number') {
        state.display.resultDone
          ? state.display.buffer = ''+value
          : state.display.buffer += value;
        state.display.resultDone = false;
        return;
      } else {
        if (value === 'C') {
          state.display.buffer = '';
          state.display.result = 0;
          state.display.resultDone = false;
          return;
        }
        if (value === '+' || value === '-') {
          state.display.resultDone = false;
          let lastChar = state.display.buffer.length - 2;

          /** если нажимаем +, а потом сразу -, то идет замена знака и наоборот */
          state.display.buffer = lastSighIsAddOrMinus(state.display.buffer)
            ? state.display.buffer.slice(0, lastChar) + `${value} `
            : state.display.buffer + ` ${value} `;
        }
      }
    },
    DO_RESULT: (state, value: number): void => {

      /** так как используется direction: rtl, то при вводе отрицательного числа, к примеру
       *  -9 в буффере появится 9- из-за того, что нет пробела между '-' и '9'
       *  с '+' аналогично, поэтому решим сделать такой тернарник */
      value >= 0
        ? state.display.buffer = '' + value
        : state.display.buffer = ' - ' + Math.abs(value);

      state.display.resultDone = true;
      state.display.result = value;
      state.loading = false;
    },
    DO_LOADING: (state, value: boolean): void => {
      state.loading = value;
    },
    DO_ERROR: (state, error: IError): void => {
      state.error.message = error.message;
      state.error.isShow = error.isShow;
    },
  },
  getters: {
    loading: state => state.loading,
    display: state => state.display,
    error: state => state.error,
  },
  actions: {
    async fetchResult(ctx, buffer: string) {
      ctx.commit('DO_LOADING', true);
      try {
        await setTimeout(() => {
          const result = calculateResult(buffer);
          ctx.commit('DO_RESULT', result);
        }, 2000);
      } catch (error) {
        console.log(error);
        ctx.commit('DO_ERROR', { message: 'Попробуйте еще раз', isShow: true })
        await setTimeout(() => {
          ctx.commit('DO_ERROR', { message: '', isShow: false })
        }, 2000);
      }
    },
  },
}
