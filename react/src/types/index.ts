import type { JSX, ReactNode } from "react";

export interface FormState<T> {
    values: T;
    errors: Partial<Record<keyof T, string>>;
    isSubmitting: boolean;
}
export type ValidatorResult<T> = true | Partial<Record<keyof T, string>>;

export interface UseFormProps<T extends Record<string, unknown>> {
    defaultValues: T;
    onSubmit: (values: T) => Promise<void>;
    validators?: (values: T) => ValidatorResult<T>;
}

export interface UseFormReturn<T> {
    Field: FieldComponent<T>;
    Subscribe: SubscribeComponent<T>;
    handleSubmit: () => Promise<void>;
    reset: VoidFunction;
}

export type FieldProps<T, K extends keyof T> = {
    value: T[K];
    onChange: (value: T[K]) => void;
    error?: string;
};

export type FieldComponent<T> = <K extends keyof T>(props: {
    name: K;
    children: (props: FieldProps<T, K>) => ReactNode;
}) => JSX.Element;

export type SubscribeComponent<T> = <S>(props: {
    selector: (state: FormState<T>) => S;
    children: (slice: S) => ReactNode;
}) => JSX.Element;
