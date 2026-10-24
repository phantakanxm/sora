"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { useEffect, type FormEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { formatPrice } from "@/lib/format";
import {
  checkoutSchema,
  countries,
  demoReference,
  shippingMethods,
  type CheckoutData,
  type CheckoutValues,
  type ShippingMethod,
} from "@/lib/checkout";
import { FormField } from "./FormField";

export interface SubmittedOrder {
  reference: string;
  firstName: string;
  email: string;
  shipping: ShippingMethod;
  city: string;
  country: string;
}

type CheckoutFormProps = {
  shipping: ShippingMethod;
  onShippingChange: (method: ShippingMethod) => void;
  onSubmitted: (order: SubmittedOrder) => void;
};

const defaults: CheckoutValues = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  apartment: "",
  city: "",
  postalCode: "",
  country: "United States",
  shipping: "standard",
  acknowledge: false,
};

export function CheckoutForm({ shipping, onShippingChange, onSubmitted }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, submitCount, isValid },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { ...defaults, shipping },
    mode: "onTouched",
    shouldFocusError: false,
  });

  const watchedShipping = useWatch({ control, name: "shipping" });
  useEffect(() => {
    if (watchedShipping && watchedShipping !== shipping) onShippingChange(watchedShipping);
  }, [watchedShipping, shipping, onShippingChange]);

  const onValid = async (values: CheckoutData) => {
    // Simulated processing: nothing leaves the browser.
    await new Promise((r) => setTimeout(r, 1100));
    onSubmitted({
      reference: demoReference(),
      firstName: values.firstName,
      email: values.email,
      shipping: values.shipping,
      city: values.city,
      country: values.country,
    });
  };

  // On invalid submit, move focus to the first invalid field in reading order.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const focusFirstError = () =>
      requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
    return handleSubmit(onValid, focusFirstError)(event);
  };

  const errorCount = Object.keys(errors).length;
  const text = (name: keyof CheckoutValues) => ({
    id: `checkout-${name}`,
    "aria-invalid": errors[name] ? ("true" as const) : ("false" as const),
    className: "field",
  });

  return (
    <form onSubmit={onSubmit} noValidate className="mt-12 space-y-16" aria-describedby="checkout-disclosure">
      <DemoNotice className="max-w-xl text-ink-soft">
        <span id="checkout-disclosure">
          This checkout is a portfolio demonstration. No order is placed, no payment is requested, and nothing you type
          is stored or sent.
        </span>
      </DemoNotice>

      {submitCount > 0 && errorCount > 0 && (
        <div role="alert" className="border-l border-[#8c3b2a] pl-4 text-ui text-[#8c3b2a]">
          Please review {errorCount} {errorCount === 1 ? "field" : "fields"} below.
        </div>
      )}

      <fieldset className="space-y-8">
        <legend className="eyebrow mb-8 flex items-center gap-3">
          <span className="text-amber-deep">01</span> Contact
        </legend>
        <FormField id="checkout-email" label="Email" error={errors.email?.message}>
          {(describedBy) => (
            <input type="email" autoComplete="email" aria-describedby={describedBy} {...text("email")} {...register("email")} />
          )}
        </FormField>
        <FormField id="checkout-phone" label="Phone" optional error={errors.phone?.message}>
          {(describedBy) => (
            <input type="tel" autoComplete="tel" aria-describedby={describedBy} {...text("phone")} {...register("phone")} />
          )}
        </FormField>
      </fieldset>

      <fieldset className="space-y-8">
        <legend className="eyebrow mb-8 flex items-center gap-3">
          <span className="text-amber-deep">02</span> Shipping address
        </legend>
        <div className="grid gap-8 sm:grid-cols-2">
          <FormField id="checkout-firstName" label="First name" error={errors.firstName?.message}>
            {(describedBy) => (
              <input autoComplete="given-name" aria-describedby={describedBy} {...text("firstName")} {...register("firstName")} />
            )}
          </FormField>
          <FormField id="checkout-lastName" label="Last name" error={errors.lastName?.message}>
            {(describedBy) => (
              <input autoComplete="family-name" aria-describedby={describedBy} {...text("lastName")} {...register("lastName")} />
            )}
          </FormField>
        </div>
        <FormField id="checkout-address" label="Street address" error={errors.address?.message}>
          {(describedBy) => (
            <input autoComplete="address-line1" aria-describedby={describedBy} {...text("address")} {...register("address")} />
          )}
        </FormField>
        <FormField id="checkout-apartment" label="Apartment, suite" optional error={errors.apartment?.message}>
          {(describedBy) => (
            <input autoComplete="address-line2" aria-describedby={describedBy} {...text("apartment")} {...register("apartment")} />
          )}
        </FormField>
        <div className="grid gap-8 sm:grid-cols-3">
          <FormField id="checkout-city" label="City" error={errors.city?.message}>
            {(describedBy) => (
              <input autoComplete="address-level2" aria-describedby={describedBy} {...text("city")} {...register("city")} />
            )}
          </FormField>
          <FormField id="checkout-postalCode" label="Postal code" error={errors.postalCode?.message}>
            {(describedBy) => (
              <input autoComplete="postal-code" aria-describedby={describedBy} {...text("postalCode")} {...register("postalCode")} />
            )}
          </FormField>
          <FormField id="checkout-country" label="Country" error={errors.country?.message}>
            {(describedBy) => (
              <select autoComplete="country-name" aria-describedby={describedBy} {...text("country")} {...register("country")}>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            )}
          </FormField>
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow mb-8 flex items-center gap-3">
          <span className="text-amber-deep">03</span> Delivery
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {(Object.keys(shippingMethods) as ShippingMethod[]).map((key) => {
            const method = shippingMethods[key];
            const checked = watchedShipping === key;
            return (
              <label
                key={key}
                className={`flex cursor-pointer items-start justify-between gap-4 border p-5 transition-colors duration-500 has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-4 ${
                  checked ? "border-espresso" : "border-line hover:border-espresso/40"
                }`}
              >
                <span className="flex gap-3">
                  <input type="radio" value={key} className="mt-1.5 accent-espresso" {...register("shipping")} />
                  <span>
                    <span className="block">{method.label}</span>
                    <span className="mt-1 block text-ui text-ink-soft">{method.detail}</span>
                  </span>
                </span>
                <span className="text-ui tabular-nums">{method.price === 0 ? "Complimentary" : formatPrice(method.price)}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow mb-8 flex items-center gap-3">
          <span className="text-amber-deep">04</span> Payment
        </legend>
        <div className="flex gap-4 border border-dashed border-line p-6">
          <Lock size={16} strokeWidth={1.25} aria-hidden className="mt-1 shrink-0" />
          <p className="text-ui text-ink-soft">
            No payment details are requested in this demonstration. In a real store, this step would be handled by a
            secure payment provider. Placing the demo order simply shows the confirmation experience.
          </p>
        </div>
        <label className="mt-8 flex cursor-pointer items-start gap-4">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 accent-espresso"
            aria-invalid={errors.acknowledge ? "true" : "false"}
            aria-describedby={errors.acknowledge ? "checkout-acknowledge-error" : undefined}
            {...register("acknowledge")}
          />
          <span className="text-ui">
            I understand SORA is fictional and that no real order will be placed.
          </span>
        </label>
        {errors.acknowledge && (
          <p id="checkout-acknowledge-error" className="mt-2 pl-8 text-ui text-[#8c3b2a]">
            {errors.acknowledge.message}
          </p>
        )}
      </fieldset>

      <div className="border-t border-line pt-10">
        <button type="submit" className="btn btn-solid w-full sm:w-auto" disabled={isSubmitting} aria-disabled={isSubmitting}>
          {isSubmitting ? "Placing demo order…" : "Place demo order"}
        </button>
        <p className="mt-4 text-ui text-ink-soft" aria-live="polite">
          {isSubmitting ? "Simulating confirmation. Nothing is being charged." : !isValid && submitCount === 0 ? "All fields except those marked optional are required." : ""}
        </p>
      </div>
    </form>
  );
}
