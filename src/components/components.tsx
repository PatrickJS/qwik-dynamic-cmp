import { Component, component$, useSignal, $ } from '@builder.io/qwik';

export const ComponentA = component$(({text = 'cmp A'} : any) => {
  return <h1>{text}</h1>;
});

export const ComponentB = component$(({text = 'cmp B'} : any) => {
  return <h1>{text}</h1>;
});

export const ComponentC = component$(({text = 'cmp C'} : any) => {
  return <h1>{text}</h1>;
});

export const ComponentD = component$(({text = 'cmp D'} : any) => {
  return <h1>{text}</h1>;
});

export const ComponentE = component$(({text = 'cmp E'} : any) => {
  return <h1>{text}</h1>;
});
