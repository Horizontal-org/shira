import "styled-components";
import type { Theme } from "../theme/types";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
