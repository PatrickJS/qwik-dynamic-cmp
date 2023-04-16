import { Component, component$, useSignal, $ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export const ComponentA = component$((props: { text: string }) => {
  return <h1>{props.text}</h1>;
});

export const ComponentB = component$((props: { text: string }) => {
  return <h1>{props.text}</h1>;
});
