import { createRoute, type AnyRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { GalleryPage } from '#/pages/gallery/gallery.page.tsx';

// Development only: `/gallery?theme=arena|party`. A function (not a constant) so the build drops
// the gallery with the dead `import.meta.env.DEV` branch in create-router.util.tsx.
export function createGalleryRoute<TParent extends AnyRoute>(parent: TParent) {
  return createRoute({
    getParentRoute: () => parent,
    path: 'gallery',
    validateSearch: z.object({ theme: z.enum(['arena', 'party']).catch('party') }),
    component: GalleryPage,
  });
}
