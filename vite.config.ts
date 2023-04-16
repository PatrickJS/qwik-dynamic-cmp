import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
// import { importMaps } from 'vite-plugin-import-maps';

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity({

      }),
      qwikVite({
      }),
      tsconfigPaths(),
      // importMaps([
      //   {
      //     imports: {
      //       "AppComponents/": "https://qwikstarter6gcwhe-c00j-e1q6kcqa--5173--c8358679.local-credentialless.webcontainer.io/src/components/"
      //     },
      //   },
      // ]),
    ],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  };
});
