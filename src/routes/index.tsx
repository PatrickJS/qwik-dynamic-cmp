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
  ['ComponentB', { id: 2, type: 'ComponentB', props: { text: 'Hello A' } }],
]);

const componentTokens = Array.from(componentsMap.keys());

function chooseComponent(component: string) {
  // not sure how to type this
  // Components is the map of all components
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
      <div>{dsl.value}</div>
      <code>components = {JSON.stringify(components.value, null, 2)}</code>
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
