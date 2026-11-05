import type { WordCategory } from '#/domain/words/word-bank/types/word-category.type.ts';

export const ARENA_CHAMPION_CATEGORY: WordCategory = {
  id: 'arena-champion',
  name: 'Campeãs',
  kind: 'normal',
  mode: 'arena',
  words: [
    {
      id: 'rei-esqueleto',
      word: 'Rei Esqueleto',
      hint: 'Dono do pedaço',
      level: 'medium',
      categoryId: 'arena-champion',
    },
    {
      id: 'cavaleiro-dourado',
      word: 'Cavaleiro Dourado',
      hint: 'Pódio',
      level: 'medium',
      categoryId: 'arena-champion',
    },
    {
      id: 'rainha-arqueira',
      word: 'Rainha Arqueira',
      hint: 'Sangue azul',
      level: 'medium',
      categoryId: 'arena-champion',
    },
    {
      id: 'mineiro-bombado',
      word: 'Mineiro Bombado',
      hint: 'Hora extra',
      level: 'hard',
      categoryId: 'arena-champion',
    },
    {
      id: 'goblinstein',
      word: 'Goblinstein',
      hint: 'Cientista maluco',
      level: 'hard',
      categoryId: 'arena-champion',
    },
  ],
};
