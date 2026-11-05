/** RF-PAR-002: the group may know how many impostors to look for ("1 impostor entre vocês"). */
export function getImpostorLabel(impostorCount: number): string {
  return impostorCount === 1
    ? '1 impostor entre vocês'
    : `${String(impostorCount)} impostores entre vocês`;
}
