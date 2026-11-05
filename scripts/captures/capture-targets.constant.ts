// What the capture script photographs. To add a screen, add a line here.

export type CaptureTarget = {
  /** Part of the file name: `<name> <viewport>.png`. */
  name: string;
  path: string;
};

const MODES = ['arena', 'party'] as const;
const MODE_SCREENS = ['players', 'settings', 'reveal', 'round', 'result'] as const;

export const CAPTURE_TARGETS: CaptureTarget[] = [
  { name: 'home', path: '/' },
  ...MODES.flatMap((mode) =>
    MODE_SCREENS.map((screen) => ({ name: `${mode} ${screen}`, path: `/${mode}/${screen}` })),
  ),
  // The gallery exists only on the development server.
  ...MODES.map((mode) => ({ name: `gallery ${mode}`, path: `/gallery?theme=${mode}` })),
];

export const CAPTURE_VIEWPORTS = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'desktop-1280', width: 1280, height: 800 },
];

/** The server must already be running (`pnpm dev`); override with `CAPTURE_BASE_URL`. */
export const DEFAULT_BASE_URL = 'http://127.0.0.1:5173';
