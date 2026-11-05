/** Heading of the impostors block: singular for one, plural for more (RF-RES-005). */
export function getImpostorsTitle(impostorCount: number): string {
  return impostorCount === 1 ? 'Impostor' : 'Impostores';
}
