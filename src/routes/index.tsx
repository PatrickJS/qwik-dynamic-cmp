import { component$, useSignal, $ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

// import remote components from importmaps.json
// import * as Components from "@remotes/AppComponents/components";
// TODO: using local version because of SSR error
// import * as Components from '../components/components';

const componentTokens = [
  'ComponentA',
  'ComponentB',
  'ComponentC',
  'ComponentD',
  'ComponentE',
];

async function chooseComponent(component: string) {
  // not sure how to type this
  // Components is the map of all components
  // dynamically load in each component when they're used
  // this means you can increase the components export
  // as much as you want without changing the code here
  //
  // TODO: replace importMfe with import
  // importMfe('@remote/AppComponents/components')
  // workaround qwik not being able to ignore certain imports
  let Cmps = await importMfe('@remotes/AppComponents/components');
  const Component = Cmps[component];
  // const Component = window.isLocal ? Cmps[component] : Components[component];

  // debug
  (window as any).Cmps = Cmps;
  // console.log('Component', Component);

  if (!Component) return null;
  return <Component id={componentTokens.indexOf(component)} /* {...props} */ />;
}

function parseText(inputText: string, tokens = componentTokens) {
  const components = [];
  const words = inputText.split(/\s+/);

  for (let word of words) {
    if (tokens.includes(word)) {
      components.push(word);
    }
  }

  return components;
}

export default component$(() => {
  const dsl = useSignal('');
  const components = useSignal<any[]>([]);

  return (
    <>
      <div>Hello World</div>
      <div>Components Available</div>
      <ul>
        {componentTokens.map((cmp) => (
          <li>{cmp}</li>
        ))}
      </ul>
      <p>type in anything with the component name below</p>
      <textarea
        onInput$={(evt) => {
          const val = (evt?.target as HTMLTextAreaElement)?.value;
          if (val) {
            dsl.value = val;
          }
          components.value = parseText(val);
        }}
        rows={2}
        cols={30}
      />
      <div>
        <code>components = {JSON.stringify(components.value, null, 2)}</code>
      </div>
      <hr />
      <div>{components.value.map(chooseComponent)}</div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
  // QwikGPT lied to me
  // scripts: [
  //   {
  //     type: 'importmap',
  //     innerHTML: `
  //       {
  //         "imports": {
  //           "my-module": "/path/to/my-module.js"
  //         }
  //       }
  //     `,
  //   },
  // ],
};
