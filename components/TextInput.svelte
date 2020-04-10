<script>

import { onMount, createEventDispatcher } from 'svelte';

export let placeholder;
export let value = '';
export let error = false;
export let readonly = false;
export let errorMsg = '';
export let forceFocus = false;
export let validation = null;
export let height = '';
export let width = '';
export let rows = 10;
export let cols;

let textarea;

$:textAreaStyle = `
  height: ${height};
  width: ${width};
`
const dispatch = createEventDispatcher();

onMount(() => {
  if(forceFocus) {
    textarea.focus();
  }
});

export function submit(event) {
  // eslint-disable-next-line no-restricted-globals
  if (event.keyCode === 13) {
    dispatch('submit');
  }
}

export function focus() {
  textarea.focus();
}

export function validate() {
  if(!!(validation && validation.constructor 
      && validation.call && validation.apply)) {
    const validationResult = validation(value);
    error = validationResult.error;
    errorMsg = validationResult.message;
    return;
  }
  error = false;
}

function onFocus(event) {
  dispatch('focus', event);
}

function onBlur(event) {
  dispatch('blur', event);
  validate();
}

</script>

<style global lang="scss">

@import "../styles/components/input.scss";

.input-wrapper {
    display: flex;
    position: relative;
    width: 100%;
    flex-direction: row;
    align-items: stretch;
  }

  .input-wrapper textarea {
    flex-grow: 1;
    padding: $input-padding-top-bottom $input-padding-left-right;
    border: none;
    background-color: $input-background-color;
    color: $input-text-color;
    border-bottom: $input-border-bottom; 
    border-radius: $input-border-radius;
    transition: border-bottom 0.5s;
    text-indent: $input-text-indent;
    font-family: inherit;
    font-size: inherit;
    resize: none;
  }

  .input-wrapper textarea:active,
  .input-wrapper textarea:focus {
    border-bottom: $input-border-bottom-focus;
  }

  .input-wrapper .error,
  .input-wrapper textarea:active.error,
  .input-wrapper textarea:focus.error {
    border-bottom-color: $input-border-color-error;
  }

  .error-msg {
    display: inline;
    font-size: $input-font-size-error;
    color: $input-error-color;
  }

</style>

<div class="input-wrapper">
  <textarea class:error={ error }
    placeholder={ placeholder }
    bind:value = { value }
    readonly= { readonly }
    bind:this={ textarea }
    style={ textAreaStyle }
    rows={ rows }
    cols={ cols }
    on:focus={ (event) => { onFocus(event) } }
    on:blur={ (event) => { onBlur(event) } }
    on:keyup={(event) => { submit(event) }}
  />
</div>
{#if error}
  <div class="error-msg">{ errorMsg }</div>
{/if}