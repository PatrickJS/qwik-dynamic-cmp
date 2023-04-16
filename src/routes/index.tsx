import { Component, component$, useSignal, $, JSXNode } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import * as Components from '../components/components';
// TODO: better type info
interface ComponentOptions {
  id: number;
  type: string;
  props: any;
}
const componentsMap = new Map<string, ComponentOptions>([
  ['ComponentA', { id: 1, type: 'ComponentA', props: { text: 'Hello A' } }],
  ['ComponentB', { id: 2, type: 'ComponentB', props: { text: 'Hello B' } }],
]);

const componentTokens = Array.from(componentsMap.keys());

function chooseComponent(component: string) {
  // not sure how to type this
  // Components is the map of all components
  // dynamiclly load in each component when they're used
  // this means you can increase the components export as much as you want
  const Component = Components[component];
  console.log('Component', Component);
  const opt = componentsMap.get(component);
  if (!Component || !opt) return null;
  return <Component key={opt.id} {...opt.props} />;
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
};
