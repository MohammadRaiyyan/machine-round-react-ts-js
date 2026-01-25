import { useCallback } from "react";
import type {
  FieldComponent,
  SubscribeComponent,
  UseFormProps,
  UseFormReturn,
} from "./types";
import useFormStore from "./useFormStore";

export default function useForm<T extends Record<string, unknown>>(
  props: UseFormProps<T>,
): UseFormReturn<T> {
  const {
    setState,
    subscribe,
    getState,
    reset: resetToInitial,
  } = useFormStore(props.defaultValues);

  const Field: FieldComponent<T> = ({ name, children }) => {
    const value = subscribe((s) => s.values[name]);
    const error = subscribe((s) => s.errors[name]);

    const onChange = useCallback(
      (value: T[keyof T]) => {
        setState((prev) => ({
          ...prev,
          values: {
            ...prev.values,
            [name]: value,
          },
        }));
      },
      [name],
    );

    return <>{children({ value, onChange, error })}</>;
  };

  const Subscribe: SubscribeComponent<T> = ({ selector, children }) => {
    const slice = subscribe(selector);
    return <>{children(slice)}</>;
  };

  const handleSubmit = useCallback(async () => {
    const { values } = getState();

    if (props.validators) {
      const result = props.validators(values);

      if (result !== true) {
        setState((prev) => ({
          ...prev,
          errors: result,
        }));
        return;
      }
    }

    setState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      await props.onSubmit(values);
    } finally {
      setState((prev) => ({ ...prev, isSubmitting: false }));
    }
  }, []);

  const reset = useCallback(() => {
    resetToInitial();
  }, []);

  return {
    Field,
    Subscribe,
    handleSubmit,
    reset,
  };
}
