// based on pos-mamba-sdk that is based on vue-mask
// https://github.com/stone-payments/pos-mamba-sdk/blob/develop/packages/components/Input/libs/masker.js
import maskit from './maskit.js';
import dynamicMask from './dynamic-mask.js';

export default function(value, mask, masked = true, tokens) {
  return (Array.isArray(mask) ? dynamicMask(mask) : maskit)(
    value,
    mask,
    masked,
    tokens,
  );
}

