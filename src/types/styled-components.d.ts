// import original module declarations
import 'styled-components';

import type { theme } from '@/lib/styledComponents';

type Theme = typeof theme;

// and extend them!
declare module 'styled-components' {
  export type DefaultTheme = Theme;
}
