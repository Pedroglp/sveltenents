<script>
  import Icon from './Icon.svelte';

  import Pikaday from 'pikaday';
  import { onMount, createEventDispatcher } from 'svelte';

  export let bound = true;
  export let ariaLabel;
  export let position =  'bottom';
  export let format = 'D/M/YYYY';
  export let defaultDate =  new Date();
  export let setDefaultDate = true;
  export let firstDay =  0;
  export let minDate;
  export let maxDate;
  export let disableWeekends = false;
  export let disableDayFn = () => {};
  export let yearRange;
  export let showWeekNumber = false;
  export let pickWholeWeek =  false;
  export let isRTL = false;
  export let i18n = {
    previousMonth : 'Previous Month',
    nextMonth     : 'Next Month',
    months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
    weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  };
  export let yearSuffix = '';
  export let showMonthAfterYear = false;
  export let showDaysInNextAndPreviousMonths = false;
  export let enableSelectionDaysInNextAndPreviousMonths = false;
  export let numberOfMonths;
  export let events = [];
  export let blurFieldOnSelect = true;
  export let keyboardInput;

  export let errorMsg;
  export let error;
  export let validation = () => {};



  let input;
  let calendarIcon;
  let datePicker;
  let mainCalendar;

  const dispatch = createEventDispatcher();

  export function show() {
    if(typeof datePicker !== 'undefined') {
      datePicker.show();
    }
  }

  export function clear() {
    if(typeof datePicker !== 'undefined') {
      datePicker.hide();
      input.value = '';
      datePicker.setDate(null);
      validate(datePicker.getDate());
      dispatch('clear');
    }
  }

  export function hide() {
    if(typeof datePicker !== 'undefined') {
      datePicker.hide();
    }
  }

  export function setDate(dateString) {
    if(typeof datePicker !== 'undefined') {
      datePicker.setDate(dateString);
    }
  }

  export function getDate() {
    if(typeof datePicker !== 'undefined') {
      return datePicker.getDate();
    }
  }

  export function toString() {
    if(typeof datePicker !== 'undefined') {
      return datePicker.toString();
    }
  }

  export function validate() {
  if(!!(validation && validation.constructor 
      && validation.call && validation.apply)) {
    const validationResult = validation(datePicker.getDate());
    error = validationResult.error;
    errorMsg = validationResult.message;
    return;
  }
  error = false;
}

  onMount(() => {
    datePicker = new Pikaday({
      field: input,
      trigger: calendarIcon,
      bound,
      ariaLabel,
      position,
      format,
      defaultDate,
      setDefaultDate,
      firstDay,
      minDate,
      maxDate,
      disableWeekends,
      disableDayFn,
      yearRange,
      showWeekNumber,
      pickWholeWeek,
      isRTL,
      i18n,
      yearSuffix,
      showMonthAfterYear,
      showDaysInNextAndPreviousMonths,
      enableSelectionDaysInNextAndPreviousMonths,
      numberOfMonths,
      mainCalendar,
      events,
      blurFieldOnSelect,
      keyboardInput,
      onSelect: () => {
        validate();
        dispatch('select');
      },
      onOpen: () => {
        dispatch('open');
      },
      onClose: () => {
        dispatch('close');
      },
      onDraw: () => {
        dispatch('draw');
      },
    });
  });

</script>

<style lang="scss" global>
  
    @import "../styles/components/datepicker.scss";
  
    .component-wrapper {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }
  
    .input-wrapper {
      display: flex;
      flex-wrap: wrap;
    }
  
    .left-icon, .right-icon  {
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

    .pika-single {
    z-index: 9999;
    display: block;
    position: relative;
    color: $pd-text-color;
    background: $pd-picker-bg;
    border: 1px solid $pd-picker-border;
    border-bottom-color: $pd-picker-border-bottom;
    font-family: $pd-font-family;

    &.is-hidden {
        display: none;
    }

    &.is-bound {
        position: absolute;
        box-shadow: 0 5px 15px -5px $pd-picker-shadow;
    }
}

// clear child float (pika-lendar), using the famous micro clearfix hack
// http://nicolasgallagher.com/micro-clearfix-hack/
.pika-single {
    &:before,
    &:after {
        content: " ";
        display: table;
    }

    &:after { clear: both }
}

.pika-lendar {
    float: left;
    width: 240px;
    margin: 8px;
}

.pika-title {
    position: relative;
    text-align: center;

    select {
        cursor: pointer;
        position: absolute;
        z-index: 9998;
        margin: 0;
        left: 0;
        top: 5px;
        opacity: 0;
    }
}

.pika-label {
    display: inline-block;
    position: relative;
    z-index: 9999;
    overflow: hidden;
    margin: 0;
    padding: 5px 3px;
    font-size: 14px;
    line-height: 20px;
    font-weight: bold;
    color: $pd-title-color;
    background-color: $pd-title-bg;
}

.pika-prev,
.pika-next {
    display: block;
    cursor: pointer;
    position: relative;
    outline: none;
    border: 0;
    padding: 0;
    width: 20px;
    height: 30px;
    text-indent: 20px; // hide text using text-indent trick, using width value (it's enough)
    white-space: nowrap;
    overflow: hidden;
    background-color: transparent;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 75% 75%;
    opacity: .5;

    &:hover {
        opacity: 1;
    }

    &.is-disabled {
        cursor: default;
        opacity: .2;
    }
}

.pika-prev,
.is-rtl .pika-next {
    float: left;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAUklEQVR42u3VMQoAIBADQf8Pgj+OD9hG2CtONJB2ymQkKe0HbwAP0xucDiQWARITIDEBEnMgMQ8S8+AqBIl6kKgHiXqQqAeJepBo/z38J/U0uAHlaBkBl9I4GwAAAABJRU5ErkJggg==');
}

.pika-next,
.is-rtl .pika-prev {
    float: right;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAU0lEQVR42u3VOwoAMAgE0dwfAnNjU26bYkBCFGwfiL9VVWoO+BJ4Gf3gtsEKKoFBNTCoCAYVwaAiGNQGMUHMkjGbgjk2mIONuXo0nC8XnCf1JXgArVIZAQh5TKYAAAAASUVORK5CYII=');
}

.pika-select {
    display: inline-block;
}

.pika-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border: 0;

    th,
    td {
        width: 14.285714285714286%;
        padding: 0;
    }

    th {
        color: $pd-th-color;
        font-size: 12px;
        line-height: 25px;
        font-weight: bold;
        text-align: center;
    }

    abbr {
        border-bottom: none;
        cursor: help;
    }
}

.pika-button {
    cursor: pointer;
    display: block;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    border: 0;
    margin: 0;
    width: 100%;
    padding: 5px;
    color: $pd-day-color;
    font-size: 12px;
    line-height: 15px;
    text-align: right;
    background: $pd-day-bg;

    .is-today & {
        color: $pd-day-today-color;
        font-weight: bold;
    }

    .is-selected & {
        color: $pd-day-selected-color;
        font-weight: bold;
        background: $pd-day-selected-bg;
        box-shadow: inset 0 1px 3px $pd-day-selected-shadow;
        border-radius: 3px;
    }

    .is-disabled &,
    .is-outside-current-month & {
        color: $pd-day-disabled-color;
        opacity: .3;
    }

    .is-disabled & {
        pointer-events: none;
        cursor: default;
    }

    &:hover {
        color: $pd-day-hover-color;
        background: $pd-day-hover-bg;
        box-shadow: none;
        border-radius: 3px;
    }

    .is-selection-disabled {
        pointer-events: none;
        cursor: default;
    }
}

  .pika-week {
      font-size: 11px;
      color: $pd-week-color;
  }

  .is-inrange .pika-button {
      color: $pd-inrange-color;
      background: $pd-inrange-bg;
  }

  .is-startrange .pika-button {
      color: $pd-startrange-color;
      background: $pd-startrange-bg;
      box-shadow: none;
      border-radius: 3px;
  }

  .is-endrange .pika-button {
      color: $pd-endrange-color;
      background: $pd-endrange-bg;
      box-shadow: none;
      border-radius: 3px;
  }
  
</style>

<div class="component-wrapper">
  <div class="input-wrapper">
      <div class="left-icon" on:click={ () => { show() }}>
        <Icon bind:this={ calendarIcon } name="calendar"/>
      </div>
      <input class:error={ error }
        class:hasIcon={ !!calendarIcon }
        bind:this={ input }
        readonly
      />
      <div class="right-icon" on:click={ () => { clear() }}>
        <Icon name="x"/>
      </div>
  </div>
  {#if error}
    <div class="error-msg">{ errorMsg }</div>
  {/if}
</div>