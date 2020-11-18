import Vue from 'vue'
import Vuex from 'vuex'
import { Module } from 'vuex'

import { ICalculatorState } from "@/store/types/calculator-state.interface";
import { TOperators } from "@/components/types/operators.type";
import { lastSighIsAddOrMinus } from "@/functions/lastSighIsAddOrMinus.function";
import { IError } from "@/components/types/error.interface";

Vue.use(Vuex)

export const calculator: Module<ICalculatorState, {}> = {
  state: {
    display: {
      buffer: '',
      result: 0,
    },
    hiddenResult: {
      result: 0,
      sign: '+',
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
        state.hiddenResult.sign === '+'
          ? state.hiddenResult.result += value
          : state.hiddenResult.result -= value;
        return;
      } else {
        if (value === 'C') {
          state.display.buffer = '';
          state.display.result = 0;
          state.hiddenResult.result = 0;
          state.hiddenResult.sign = '+';
          return;
        }
        if (value === '+' || value === '-') {
          state.hiddenResult.sign = value;
          let lastChar = state.display.buffer.length - 2;
          state.display.buffer = lastSighIsAddOrMinus(state.display.buffer)
            ? state.display.buffer.slice(0, lastChar) + `${value} `
            : state.display.buffer + ` ${value} `;
        }
      }
    },
    DO_RESULT: (state): void => {
      state.display.buffer = '';
      state.display.result = state.hiddenResult.result;
      state.hiddenResult.result = 0;
      state.hiddenResult.sign = '+';
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
          ctx.commit('DO_RESULT');
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
