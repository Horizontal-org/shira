import "styled-components";
import type { defaultTheme } from "@horizontal-org/shira-ui";

type ShiraTheme = typeof defaultTheme;

declare module "styled-components" {
  export interface DefaultTheme extends ShiraTheme {}
}
