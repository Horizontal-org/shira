import { App } from "./app";

export interface Result {
  id: string;
  apps?: App[];
  app: App;
}