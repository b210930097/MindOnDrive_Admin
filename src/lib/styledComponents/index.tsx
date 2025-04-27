'use client';

import StyledComponentsRegistry from './registry';
import { ThemeProvider } from 'styled-components';
import config from '../../../tailwind.config';

export const theme = config.theme;

const StyledComponentsProvider = (props: React.PropsWithChildren) => {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </StyledComponentsRegistry>
  );
};

export default StyledComponentsProvider;
