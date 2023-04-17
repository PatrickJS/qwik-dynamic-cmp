import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
// import { importMaps } from 'vite-plugin-import-maps';


export function transformPrePlugin() {
  return {
    name: 'transform-pre-plugin',
    enforce: 'pre',
    transform(code, id) {
      // workaround ignoring imports and SSR
      const importPattern = /importMfe\(/g;

      if (importPattern.test(code)) {
        return {
          code: code.replace(importPattern, () => {
            return `window.importMfe(`;
          }),
          map: null, // You can generate a source map if needed
        };
      }
    },
  };
}

export default defineConfig(() => {
  return {
    server: {
      cors: true,
      proxy: {
        '/@remotes/AppComponents': {
          target: 'http://127.0.0.1:5173/src/components',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/@remotes\/AppComponents/, ''),
        }
      }
    },
    plugins: [
      transformPrePlugin(),
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
      // transformPostPlugin(),
    ],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  };
});
