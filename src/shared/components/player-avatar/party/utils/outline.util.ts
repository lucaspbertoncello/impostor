import { PARTY_OUTLINE_WIDTH } from '#/shared/components/player-avatar/party/constants/party-palette.constant.ts';

/** Outline of a shape: its own darker shade, never black. */
export function outline(color: string) {
  return {
    stroke: color,
    strokeWidth: PARTY_OUTLINE_WIDTH,
    strokeLinejoin: 'round' as const,
    strokeLinecap: 'round' as const,
  };
}
