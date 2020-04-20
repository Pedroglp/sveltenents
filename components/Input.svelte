<script>

import { onMount, createEventDispatcher } from 'svelte';
import masker from '../helpers/masker.js';
import tokens from '../helpers/tokens.js';

import Icon from './Icon.svelte';



export let placeholder;
export let type = '';
export let value = '';
export let error = false;
export let readonly = false;
export let errorMsg = '';
export let forceFocus = false;
export let validation = null;
export let mask = '';
export let max = '';
export let min = '';
export let step = '';
export let width = '';
export let height = '';
export let name = '';
export let autocomplete = 'off';
export let rightIcon, leftIcon;
export let onRightIconClick, onLeftIconClick = () => {};
export let id = '';

let passwordVisibile =  false;

$:error;

$:inputStyle = `
  height: ${height};
  width: ${width};
`

let input;
const dispatch = createEventDispatcher();

onMount(() => {
  input.type = type;
  input.name = name;
  input.step = step;
  input.max = max;
  input.min = min;

  if(forceFocus) {
    input.focus();
  }

  if(type === 'password') {
    rightIcon = 'eye-off';
    onRightIconClick = () => {
      type = passwordVisibile ? 'text' : 'password';
      input.type = type;
      rightIcon = `eye${ passwordVisibile ? '' : '-off' }`;
      passwordVisibile = !passwordVisibile;
    };
  }
});

export function submit(event) {
  // eslint-disable-next-line no-restricted-globals
  if (event.keyCode === 13) {
    dispatch('submit');
  }
}

export function focus() {
  input.focus();
}

export function clear() {
  value = '';
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

export function applyMask() {
  if(mask) {
    value = masker(value, mask, true, tokens);
  }
  return value;
}

function onFocus(event) {
  dispatch('focus', event);
}

function onBlur(event) {
  dispatch('blur', event);
  validate();
}

function onInput(event) {
  /** Mask handler */
  if (mask) {
    const inputEl = input;

    let position = inputEl.selectionEnd;

    /* Save the character just inserted */
    const digit = inputEl.value[position - 1];
    value = masker(value, mask, true, tokens);

    /**
     * Overwrite the input text with the masked value.
     * Needed for fixing the caret position
     * */
    input.value = value;

    /** If the digit was changed, increment position until find the digit again */
    while (
      position < value.length &&
      value.charAt(position - 1) !== digit
    ) {
      position++;
    }

    setTimeout(() => inputEl.setSelectionRange(position, position));
  }
  dispatch('input', event);
}

</script>

<style lang="scss">
  
  @import "../styles/components/input.scss";

  .component-wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .input-wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  .left-icon, .right-icon {
    display: inline-block;
    position: absolute;
    align-self: center;
    background-color: $input-background-color;
  }

  .left-icon {
    left: $input-icon-padding;
  }

  .right-icon {
    right: $input-icon-padding;
  }

  .input-wrapper input {
    flex-grow: 1;
    padding: $input-padding-top-bottom $input-padding-left-right;
    border: none;
    text-indent: $input-text-indent;
    background-color: $input-background-color;
    color: $input-text-color;
    border-bottom: $input-border-bottom; 
    border-radius: $input-border-radius;
    transition: border-bottom 0.5s;
    user-select: text;
  }

  .input-wrapper input.hasIcon {
    text-indent: $input-text-indent-icon;
  }

  .input-wrapper input:active, .input-wrapper input:focus {
    border-bottom: $input-border-bottom-focus;
  }

  .input-wrapper .error,
  .input-wrapper input:active.error,
  .input-wrapper input:focus.error {
    border-bottom-color: $input-border-color-error;
  }

  .error-msg {
    display: inline-block;
    font-size: $input-font-size-error;
    color: $input-error-color;
    flex-grow: 1;
  }

</style>

<div class="component-wrapper">
  <div class="input-wrapper" style={ inputStyle }>
    {#if leftIcon}
      <div class="left-icon" on:click={ () => { onLeftIconClick() }}>
        <Icon bind:name={ leftIcon }/>
      </div>
    {/if}
      <input class:error={ error }
        class:hasIcon={ !!leftIcon }
        placeholder={ placeholder }
        bind:value={ value }
        id={ id }
        autocomplete={ autocomplete }
        readonly= { readonly }
        bind:this={ input }
        on:focus={ (event) => { onFocus(event) }}
        on:blur={ (event) => { onBlur(event) }}
        on:keyup={ (event) => { submit(event) }}
        on:input={ (event) => { onInput(event) }}
      />
    {#if rightIcon}
      <div class="right-icon" on:click={ () => { onRightIconClick() }}>
        <Icon bind:name={ rightIcon }/>
      </div>
    {/if}
  </div>
  {#if error}
    <div class="error-msg">{ errorMsg }</div>
  {/if}
</div>