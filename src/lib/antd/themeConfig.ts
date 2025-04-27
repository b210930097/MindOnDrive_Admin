import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    // Colors
    // colorText: "#1F2937",
    // colorPrimary: "#21CDA8",
    // colorBorder: "#DEDEDE",
    // colorBorderBg: "#DEDEDE",
    // colorBorderSecondary: "#DEDEDE",
    // colorLink: "#0057FF",
    // colorInfo: "#0057FF",
    // colorError: "#FF4949",
    // colorWarning: "#F59E0B",
    // colorSuccess: "#22C55E",

    // Height sizes
    controlHeight: 46,
    controlHeightLG: 56,
    controlHeightSM: 36,

    // Radius sizes
    borderRadius: 14,
    borderRadiusLG: 14,
    borderRadiusSM: 12,
    borderRadiusXS: 12,

    // Font
    fontFamily: '"M PLUS 1", sans-serif',
  },
  components: {
    Form: {
      controlHeightLG: 56,
      controlHeightXS: 36,
      controlHeightSM: 46,
    },
    Input: {
      colorBgBase: '#f9fafb',
      colorBorder: '#DEDEDE',
      borderRadiusSM: 12,
      algorithm: true,
    },
    Select: {
      // colorBgBase: "#f9fafb",
      // colorBorder: "#DEDEDE",
      borderRadiusSM: 12,
      algorithm: true,
    },
    DatePicker: {
      // colorBgBase: "#f9fafb",
      // colorBorder: "#DEDEDE",
      borderRadiusSM: 12,
      algorithm: true,
    },
    Alert: {
      colorInfoBg: '#e5eeff',
      colorInfoBorder: 'transparent',
    },
    Checkbox: {
      borderRadius: 6,
      borderRadiusLG: 6,
      borderRadiusSM: 6,
      borderRadiusXS: 6,
      controlInteractiveSize: 20,
    },
    Badge: {
      colorPrimary: '#0057FF',
    },
  },
};

export default theme;
