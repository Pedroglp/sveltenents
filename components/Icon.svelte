<script>
  import { onMount, afterUpdate } from 'svelte';
  import feather from 'feather-icons';

  export let name;
  export let size = 24;
  export let active = false;
  export let warning = false;
  export let error =  false;
  export let fill = false;
  let iconClass = 'icon';
  let iconStyle = '';
  let icon;

  $: {
    iconClass = `icon 
          ${active ? 'active ' : '' }
          ${warning ? 'warning ' : '' }
          ${error ? 'error ' : '' }
          ${fill ? 'filled ' : '' }
        `
    feather.replace({ class: iconClass })
  }

  $: {
    iconStyle =
      `width: ${size}px;
      height: ${size}px;`
  }

  onMount(() => {
    feather.replace({
      class: `icon
                ${active ? 'active ' : '' }
                ${warning ? 'warning ' : '' }
                ${error ? 'error ' : '' }
                ${fill ? 'filled ' : '' }`});
  });

</script>

<style global lang="scss">
  @import "../styles/components/icon.scss";

  .icon {
    width: $icon-size-default;
    height: $icon-size-default;
    stroke: $icon-color;
    stroke-width: $icon-stroke-width;
    stroke-linecap: $icon-line-cap-join;
    stroke-linejoin: $icon-line-cap-join;
      &.filled {
        fill: $icon-color-light;
        stroke: $icon-color;
      }
  }

  .icon.warning {
    stroke: $icon-color-alert-light;

    &.filled {
      stroke: $icon-color-alert;
      fill: $icon-color-alert-light;
    }
  }

  .icon.error {
    stroke: $icon-color-error-light;

    &.filled {
      stroke: $icon-color-error;
      fill: $icon-color-error-light;
    }
  }

  .icon.active {
    stroke: $icon-color-active-light;

    &.filled {
      stroke: $icon-color-active;
      fill: $icon-color-active-light;
    }
  }

</style>

{@html `${feather.icons[name].toSvg({ class: iconClass, width: size, height: size })}`}



  