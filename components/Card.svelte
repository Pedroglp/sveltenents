<script>
  import { createEventDispatcher } from 'svelte';
  export let title;
  export let controllerLabel;

  const dispatch = createEventDispatcher();

  export function controllerClick() {
    dispatch('controllerClick');
  };

</script>

<style lang="scss">

  @import "../styles/components/card.scss";

  .card-wrapper {
    position: relative;
    background-color: $card-color;
    display: block;
    padding: $card-padding;
    border-radius: $card-border-radius;
    transition: width, height 0.3s;
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.15)
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: $card-header-size;
    margin-bottom: $card-header-margin-bottom;
    font-weight: $card-header-font-weight;
  }

  .right-controller {
    color: $card-right-controller-color;
    font-size: $font-size-default;
    font-weight: $card-header-controller-font-weight;
    text-decoration: underline;
    cursor: pointer;
  }

</style>

<div class="card-wrapper">
  {#if !!title}
    <div class="header">
      <div class="title">{title}</div>
      {#if !!controllerLabel}
        <a 
          href="javascript:void(0)" 
          class="right-controller"
          on:click={ () => { controllerClick() }}
        >
          {controllerLabel}
        </a>
      {/if}
    </div>
  {/if}
  <slot name="content"></slot>
</div>