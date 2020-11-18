import { IDisplay } from "@/components/types/display.interface";
import { IError } from "@/components/types/error.interface";

export interface ICalculatorState {
  display: IDisplay;
  loading: boolean;
  error: IError;
}
