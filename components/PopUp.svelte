<script>
import { createEventDispatcher } from 'svelte';
import { fly } from 'svelte/transition';
import { showPageContent } from '../api/store.js';
import Button from './Button.svelte';

export let primaryAction = null;
export let secondaryAction = null;
export let primaryActionLabel = '';
export let secondaryActionLabel = '';
export let imageSrc = '';
export let title = '';
export let message = '';
export let isHidden = true;

const dispatch = createEventDispatcher();


$:hasButtons = primaryActionLabel && secondaryActionLabel

export function close(delay) {
  if(typeof delay !== 'undefined' && Number(delay) !== 'NaN') {
    setTimeout(() => {
      isHidden = true;
      showPageContent.set(true);
    }, delay);
    return;
  }
  isHidden = true;
  showPageContent.set(true);
}

export function open(delay) {
  isHidden = false;
  showPageContent.set(false);

  if(typeof delay !== 'undefined' && Number(delay) !== 'NaN') {
    close(delay);
    return;
  }
}

function doPrimaryAction() {
  primaryAction();
  close();
}

function doSecondaryAction() {
  secondaryAction();
  close();
}

</script>

<style lang="scss">

  @import "../styles/components/popup.scss";

  .pop-up-wrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: $pop-up-z-index;
    background-color: $pop-up-color;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: $pop-up-margin 0px 0px $pop-up-margin;
  }

  .pop-up-header {
    padding: 24px;
  }

  .pop-up-wrapper img {
    margin-bottom: $pop-up-header-margin;
  }

  .btns-wrapper {
    display: flex;
    width: 100%;
    margin-top: $pop-up-btns-margin;
    justify-content: space-evenly;
  }

</style>

{#if !isHidden}
<div class="pop-up-wrapper" 
  in:fly="{{ y: -200, duration: 1200}}"
  out:fly="{{ y: -200, duration: 1200}}"
  on:outroend={()=>{ dispatch('close') }}
  on:introend={()=>{ dispatch('open')}}
>
  <div class="pop-up-header">
    <img alt='popup-image' src={ imageSrc }/>
    <h1>{ title }</h1>
    <p>{@html message }</p>
  </div>
  {#if hasButtons}
    <div class="btns-wrapper">
      <Button isGhost on:click={ doSecondaryAction }> { secondaryActionLabel }</Button>
      <Button on:click={ doPrimaryAction }> { primaryActionLabel } </Button>
    </div>
  {/if}
</div>
{/if}
