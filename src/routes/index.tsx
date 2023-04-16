import { Component, component$, useSignal, $, JSXNode } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import * as Components from '../components/components';
// TODO: better type info
interface ComponentOptions {
  id: number;
  type: string;
  props: any;
}
const componentsMap = new Map([
  ['ComponentA', { id: 1, type: 'ComponentA', props: { text: 'Hello A' } }],
  ['ComponentB', { id: 1, type: 'ComponentB', props: { text: 'Hello A' } }],
]);

const componentTokens = Array.from(componentsMap.keys());

// export const ComponentA = component$((props: { text: string }) => {
//   return <h1>{props.text}</h1>;
// });

// export const ComponentB = component$((props: { text: string }) => {
//   return <h1>{props.text}</h1>;
// });

function escapeRegex(string: string) {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}

function chooseComponent(component: string) {
  console.log('Components', Components);
  const Component = Components[component];
  return <Component />;
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
  const arr = useSignal<any[]>([]);
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
      <code>arr = {JSON.stringify(arr.value, null, 2)}</code>
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
