import { Component, component$, useSignal, $ } from '@builder.io/qwik';

export const ComponentA = component$(({text = 'cmp A'} : {text: string}) => {
  return <h1>{text}</h1>;
});

export const ComponentB = component$(({text = 'cmp B'} : {text: string}) => {
  return <h1>{text}</h1>;
});
