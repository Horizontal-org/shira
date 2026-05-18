import "styled-components";

import type { Theme } from "@horizontal-org/shira-ui";

declare module "styled-components" {
  export interface DefaultTheme extends Theme { }
}
