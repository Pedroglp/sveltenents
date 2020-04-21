<script>
  import Icon from './Icon.svelte';
  import { fade } from 'svelte/transition';

  export let info = false;
  export let error = false;
  export let warning = false;
  export let success = false;
  export let isHidden =  true;
  export let message;

  export function show(delay) {
    isHidden = false;

    if(typeof delay !== 'undefined' && Number(delay) !== 'NaN') {
      close(delay);
      return;
    }
  }

  export function hide(delay) {
    if(typeof delay !== 'undefined' && Number(delay) !== 'NaN') {
      setTimeout(() => {
        isHidden = true;
      }, delay);
      return;
    }
    isHidden = true;
  }


</script>

<style global lang="scss">
  @import "../styles/components/notification.scss";

  .toast-wrapper {
    position: relative;
    width: 100%;
  }

  .toast {
    display: flex;
    border-radius: $notification-border-radius;
    border-left: $notification-border-left;
    border-left-color: $notification-info-color;
    background-color: $notification-info-background-color;
    padding: $notification-padding;
    align-items: center;

    &.info {
      border-left-color: $notification-info-color;
      background-color: $notification-info-background-color;
    }

    &.warning {
      border-left-color: $notification-warning-color;
      background-color: $notification-warning-background-color;
    }

    &.error {
      border-left-color: $notification-error-color;
      background-color: $notification-error-background-color;
    }

    &.success {
      border-left-color: $notification-success-color;
      background-color: $notification-success-background-color;
    }
  }

  .message {
    color: $notification-info-text-color;
    flex-grow: 1;
    margin-left: $notification-message-left-margin;
    font-weight: $notification-text-weight;

    &.info {
      color: $notification-info-text-color;
    }

    &.warning {
      color: $notification-warning-text-color;
    }

    &.error {
      color: $notification-error-text-color;
    }

    &.success {
      color: $notification-success-text-color;
    }
  }

  .icon-wrapper {
    cursor: pointer;
  }

</style>

{#if !isHidden}
  <div class="toast-wrapper"
    in:fade="{{ duration: 300}}"
    out:fade="{{ duration: 300}}"
  >
    <div class="toast"
      class:info={info}
      class:warning={warning}
      class:error={error}
      class:success={success}
    >
      {#if success}
        <Icon active fill name="check-circle"></Icon>
      {/if}
      {#if warning}
        <Icon warning fill name="alert-triangle"></Icon>
      {/if}
      {#if error}
        <Icon error fill name="alert-circle"></Icon>
      {/if}
      {#if !success && !warning && !error}
        <Icon fill name="info"></Icon>
      {/if}
      <div class="message"
        class:info={info}
        class:warning={warning}
        class:error={error}
        class:success={success}
        >
          { @html message }
        </div>
      <div class="icon-wrapper" on:click={ () => { hide() }}>
        <Icon bind:warning bind:active={ success } bind:error fill name="x"></Icon>
      </div>
    </div>
  </div>
{/if}