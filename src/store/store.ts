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
        state.display.buffer += value;
        return;
      } else {
        if (value === 'C') {
          state.display.buffer = '';
          state.display.result = 0;
          return;
        }
        if (value === '+' || value === '-') {
          let lastChar = state.display.buffer.length - 2;
          state.display.buffer = lastSighIsAddOrMinus(state.display.buffer)
            ? state.display.buffer.slice(0, lastChar) + `${value} `
            : state.display.buffer + ` ${value} `;
        }
      }
    },
    DO_RESULT: (state, value: number): void => {
      value >= 0
        ? state.display.buffer = '' + value
        : state.display.buffer = ' - ' + Math.abs(value);

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
    async fetchResult(ctx) {
      ctx.commit('DO_LOADING', true);
      try {
        await setTimeout(() => {
          const result = calculateResult(ctx.state.display.buffer);
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
