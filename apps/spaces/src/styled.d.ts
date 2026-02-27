import "styled-components";

import type { Theme } from "@shira/ui";

declare module "styled-components" {
  export interface DefaultTheme extends Theme { }
}
