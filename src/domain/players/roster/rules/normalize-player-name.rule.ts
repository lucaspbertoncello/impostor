/** BR-MAT-011: the comparison key of a name ignores case, accents and spaces at the ends. */
export function normalizePlayerName(name: string): string {
  return name.trim().normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('pt-BR');
}
