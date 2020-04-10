<script>
import { createEventDispatcher } from 'svelte';
import Icon from './Icon.svelte';

export let recordsLength = 1;
export let pageSize = 10;
export let currentPage = 1;
export let rightLabel;
export let leftLabel;

let leftControllerIsActive = true;
let rightControllerIsActive = false;
let visiblePageNumbers = [1,2,3,4];
let totalPageNumber = 1;

const dispatch = createEventDispatcher();

S:{
  totalPageNumber = Math.ceil(recordsLength/pageSize);
}

$: { 
  if(currentPage === Math.ceil(recordsLength/pageSize)) {
    rightControllerIsActive = false;
  }
  if(currentPage === 1) {
    leftControllerIsActive = false;
  }
}

export function nextPage() {
  if(currentPage === totalPageNumber) {
    return;
  }
  dispatch('pageChange', { previousPage, currentPage, pageSize });
}

export function previousPage() {
  if(currentPage === 1) {
    return;
  }
  dispatch('pageChange', { previousPage, currentPage, pageSize });
}

export function goToPage() {
  dispatch('pageChange', { previousPage, currentPage, pageSize });
}

</script>

<style lang="scss">
  @import '../styles/components/pagination.scss';

  .pagination-wrapper {
    display: flex;
    width: 100%;
    justify-content: center;
    align-self: center;
  }

  .page-number-wrapper {
    display: flex;
    width: $pagination-page-number-width;
    justify-content: center;
    align-items: center;
    color: $pagination-color;
    font-weight: 600;
    font-size: $pagination-font-size;
  }

  .controller {
    display: flex;
    padding: $pagination-controller-padding;
    background-color: $pagination-controller-background-color;
    border-radius: $pagination-controller-border-radius;
    text-align: center;
    box-shadow: $pagination-box-shadow;
    cursor: pointer;
  }

  .controller:hover {
    color: $pagination-color;
    box-shadow: $pagination-box-shadow-hover;
  }

  .controller:active {
    color: $pagination-color-hover;
    box-shadow: $pagination-box-shadow-active;
  }

</style>

<div class="pagination-wrapper">
  <div class="controller" on:click={ previousPage }>
    {#if leftLabel}
      { leftLabel }
    {:else}
      <Icon name="chevron-left"/>
    {/if}
  </div>
  <div class="page-number-wrapper">
      <div class="page-number">{ currentPage }/{ totalPageNumber }</div>
    <div class="number"></div>
  </div>
  <div class="controller" on:click={ nextPage }>
    {#if rightLabel}
      { leftLabel }
    {:else}
      <Icon name="chevron-right"/>
    {/if}
  </div>
</div>