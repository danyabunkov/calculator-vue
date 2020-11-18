import { Component, Vue } from 'vue-property-decorator';
import Calculator from './components/calculator/calculator';

import './App.css'

@Component
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        <Calculator />
      </div>
    )
  }
}
