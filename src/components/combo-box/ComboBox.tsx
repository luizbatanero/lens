import React, { useRef, useState } from "react"
import cn from "classnames"
import { useComboBox } from "@react-aria/combobox"
import { useComboBoxState } from "@react-stately/combobox"
import { useFilter } from "@react-aria/i18n"
import { useButton } from "@react-aria/button"
import {
  Item as ReactAriaItem,
  Section as ReactAriaSection,
} from "@react-stately/collections"
import { CollectionChildren } from "@react-types/shared"
import { useId, mergeProps, chain } from "@react-aria/utils"
import { useFocus } from "@react-aria/interactions"

import { useAsyncOptions } from "../../hooks/useAsyncOptions"
import { useCollectionComponents } from "../../hooks/useCollectionComponents"
import {
  ListBoxOption,
  ListBoxFooter,
  ListBoxOverlay,
} from "../internal/ListBox"
import { Label } from "../label/Label"
import { Icon } from "../icon/Icon"
import { FocusRing } from "../focus-ring/FocusRing"
import { Hint } from "../internal/Hint"

export type ComboBoxOption<Key extends string> = ListBoxOption<Key>

export type ComboBoxContainerProps<OptionKey extends string> = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** Controls if this ComboBox should steal focus when first rendered */
  autoFocus?: boolean
  /** A list of Options to render inside this ComboBox */
  children?: CollectionChildren<ListBoxOption<OptionKey>>
  /** Value to be pre-populated in the input when this ComboBox is first rendered */
  defaultInputValue?: string
  /** Controls if this ComboBox will be open by default */
  defaultOpen?: boolean
  /** Key of the Option that is selected when this ComboBox is first rendered */
  defaultSelectedKey?: OptionKey
  /** An optional hint to show next to the ComboBox that describes what this ComboBox expects */
  hint?: string
  /** An optional error to show next to the ComboBox. If a `validator` is also supplied, the `validator` takes precendence */
  errorText?: string
  /** Controls if this ComboBox is disabled */
  isDisabled?: boolean
  /** A string describing what this ComboBox represents */
  label: string
  /** A (dynamic) list of options to render within this ComboBox.
   * This may be provided upfront instead of providing static children.
   */
  options?: ListBoxOption<OptionKey>[] | Promise<ListBoxOption<OptionKey>[]>
  /** Name of the value held by this ComboBox when placed inside a form */
  name?: string
  /** A value to display in the TextField when it is empty */
  placeholder?: string
  /** The current selection */
  selectedKey?: OptionKey
  /** Callback invoked when the ComboBox's selection changes */
  onSelectionChange?: (key: OptionKey) => void
  /** An custom function that runs for every change to validate the value. Return `undefined` if the value is valid, and a string describing the error otherwise */
  validator?: (v: OptionKey) => string | undefined
}

/**
 * A ComboBox is a specialized text field that only allows you its value to be one of the pre-provided options.
 * It displays a list of options below the text field. This list keeps getting shorter as you type, since fewer options match the text field's value.
 */
function ComboBoxContainer<OptionKey extends string>({
  id,
  autoFocus,
  children,
  defaultOpen = false,
  defaultInputValue,
  defaultSelectedKey,
  errorText: _errorText,
  hint,
  isDisabled = false,
  options: propOptions,
  label,
  name,
  placeholder = "Select an option",
  selectedKey,
  onSelectionChange,
  validator,
}: ComboBoxContainerProps<OptionKey>) {
  const { body, footer } = useCollectionComponents({
    children,
    footerType: ListBoxFooter,
  })
  const { loading, error, options } =
    useAsyncOptions<ListBoxOption<OptionKey>>(propOptions)

  const hintId = useId()

  const { contains } = useFilter({ sensitivity: "base" })
  const state = useComboBoxState({
    id,
    autoFocus,
    children: body,
    allowsEmptyCollection: true,
    menuTrigger: "focus",
    defaultInputValue,
    defaultSelectedKey,
    isDisabled,
    isReadOnly: isDisabled,
    defaultItems: options, // `defaultFilter` only works when `items` is undefined
    defaultFilter: contains,
    placeholder,
    selectedKey,
    onSelectionChange: chain(
      onSelectionChange as (k: React.Key) => void,
      (v: OptionKey) => setInvalidText(validator?.(v) || undefined)
    ),
  })

  const [invalidText, setInvalidText] = useState<string | undefined>()
  const { focusProps } = useFocus({
    onBlur: () => {
      // disable validation until the user touches/ focuses the field at least once
      setInvalidText(validator?.(state.selectedKey as OptionKey))
    },
  })

  // We want to make it so that if an `errorText` is supplied, it will always show up, even if `isValidatorEnabled` is false
  const errorText = invalidText || _errorText

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const listBoxRef = useRef<HTMLUListElement>(null)
  const {
    inputProps,
    buttonProps: triggerProps,
    labelProps,
    listBoxProps,
  } = useComboBox(
    {
      id,
      autoFocus,
      children: body,
      menuTrigger: "focus",
      defaultOpen,
      defaultInputValue,
      defaultSelectedKey,
      isDisabled,
      isReadOnly: isDisabled,
      defaultItems: options,
      placeholder,
      shouldFlip: true,
      selectedKey,
      label,
      onSelectionChange: onSelectionChange as (k: React.Key) => void,
      inputRef,
      buttonRef,
      popoverRef: overlayRef,
      listBoxRef,
    } as any, // need `as any` because types do not allow `label` to be passed on, which causes warnings to show up about missing labels
    state
  )
  const { buttonProps } = useButton({ ...triggerProps, isDisabled }, buttonRef)

  return (
    <div id={id} className="table-row">
      <Label labelProps={labelProps}>{label}</Label>
      <section className="table-cell w-full relative">
        <FocusRing autoFocus={autoFocus} within>
          <div
            ref={containerRef}
            className={cn(
              "flex items-center w-full relative space-x-2",
              "rounded-md shadow-sm border border-gray-300 dark:border-gray-700",
              "px-3 py-1.5",
              "text-sm",
              {
                "text-gray-400 dark:text-gray-400": isDisabled,
                "bg-gray-100 dark:bg-gray-800": isDisabled,
                "bg-white dark:bg-gray-900": !isDisabled,
                "cursor-not-allowed": isDisabled,
              }
            )}
          >
            {state.selectedItem && state.selectedItem.props.leadingIcon && (
              <Icon name={state.selectedItem.props.leadingIcon} size="sm" />
            )}
            <input
              ref={inputRef}
              type="text"
              lens-role="input"
              {...mergeProps(inputProps, focusProps)}
              aria-describedby={hintId}
              name={name}
              className={cn("flex-grow", "mr-4", {
                "bg-white dark:bg-gray-900": !isDisabled,
                "bg-gray-100 dark:bg-gray-800": isDisabled,
                "text-gray-800 dark:text-gray-100": !isDisabled,
                "text-gray-400 dark:text-gray-400": isDisabled,
                "cursor-not-allowed": isDisabled,
              })}
            />
            <button lens-role="chevron" ref={buttonRef} {...buttonProps}>
              <Icon
                name="chevron-down"
                size="xs"
                className="text-gray-400 dark:text-gray-300"
              />
            </button>
          </div>
        </FocusRing>

        <Hint id={hintId} text={hint} errorText={errorText} />

        {state.isOpen && (
          <ListBoxOverlay
            listBoxProps={listBoxProps}
            id={id}
            label={label}
            containerRef={containerRef}
            listBoxRef={listBoxRef}
            overlayRef={overlayRef}
            state={state}
            footer={footer}
            loading={loading}
            error={error}
          />
        )}
      </section>
    </div>
  )
}

export const ComboBox = {
  Container: ComboBoxContainer,
  Section: ReactAriaSection,
  Option: ReactAriaItem as <Key extends string>(props: {
    key: Key
    children: string
    leadingIcon?: string
    trailingIcon?: string
    description?: string
  }) => JSX.Element,
  Footer: ListBoxFooter,
}
