import type { Validation, ValidationArgs } from '@vuelidate/core';
import type { MaybeRef } from '@vueuse/core';

export function useValidation<V extends ValidationArgs>(v$: MaybeRef<Validation<V>>) {
  const hasError = () => {
    const validator = get(v$);
    return validator.$error;
  };

  const callIfValid = <T = unknown>(value: T, method: (e: T) => void, invalid: () => boolean = hasError) => {
    if (!invalid())
      method(value);
  };

  return {
    callIfValid,
  };
}
