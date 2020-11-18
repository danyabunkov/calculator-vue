import { IDisplay } from "@/components/types/display.interface";
import { IError } from "@/components/types/error.interface";
import { IHiddenResult } from "@/components/types/hiddenResult.interface";

export interface ICalculatorState {
  display: IDisplay;
  hiddenResult: IHiddenResult;
  loading: boolean;
  error: IError;
}
