<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let isGhost = false;
  export let isDisabled = false;
  export let value;
  export let type;
  export let sendForm = true;
  export let full;

  function onClick() {
    dispatch('click');
  }

</script>


<style lang="scss">
  @import '../styles/components/button.scss';

  button {
    display: inline-block;
    border-radius: $button-border-radius;
    background-color: $button-color;
    color: $white;
    min-width: $button-min-width;
    margin: $button-margin;
    padding: $button-padding;
    font-weight: $button-font-weight;
    text-decoration: none;
    text-align: center;
    border: none;
    cursor: pointer;
    transition: background 250ms ease-in-out, 
                transform 150ms ease;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  button.full {
    width: 100%;
  }

  button:active {
		transform: scale(0.99);
  }

  button:hover {
      background: $button-color-hover;
  }

  .ghost {
    background-color: transparent;
    color: $button-color;
    font-weight: 500;
    text-decoration: underline;
  }

  .ghost:hover {
    background-color: $light-gray;
  }

  .disabled,
  .disabled:hover {
    pointer-events: none;
    cursor: default;
    background: $button-color-disabled;
    color: $button-text-color-disabled;
  }

</style>

<button 
  value={ value }
  type= { type }
  class:ghost={ isGhost }
  class:disabled={ isDisabled }
  class:full
  on:click={() => { onClick() }}
  onclick="return { sendForm }"
  >
  <slot></slot>
</button>