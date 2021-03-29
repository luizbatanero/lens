import React, { forwardRef, useRef } from "react"
import cn from "classnames"
import { useButton } from "@react-aria/button"
import { useHover } from "@react-aria/interactions"
import { mergeProps } from "@react-aria/utils"
import { FocusRing } from "../focus-ring/FocusRing"

export type ButtonProps = React.PropsWithChildren<{
  /** Controls if this button should steal focus when mounted */
  autoFocus?: boolean
  /** A ID that will be attached to the rendered button. Useful when targeting the button from tests */
  id?: string
  /** Controls if this button is disabled */
  isDisabled?: boolean
  /** Callback invoked when this button is pressed */
  onPress?: () => void
  /** Controls what kind of button this is */
  variant?: "primary" | "secondary" | "quiet" | "link"
}>

function Button(
  {
    id,
    variant = "primary",
    isDisabled = false,
    autoFocus = false,
    children,
    onPress,
  }: ButtonProps,
  forwardedRef: React.Ref<HTMLButtonElement>
) {
  const _ref = useRef<HTMLButtonElement>(null)
  const ref = (forwardedRef || _ref) as React.RefObject<HTMLButtonElement>
  const { buttonProps, isPressed } = useButton(
    { id, isDisabled, autoFocus, onPress },
    ref
  )
  const { hoverProps, isHovered } = useHover({ isDisabled })

  return (
    <FocusRing autoFocus={autoFocus}>
      <button
        id={id}
        ref={ref}
        {...mergeProps(buttonProps, hoverProps)}
        className={cn(
          "flex justify-center px-3 py-1.5 m-2",
          "rounded-md",
          "text-sm whitespace-nowrap",
          {
            "cursor-not-allowed": isDisabled,
          },
          {
            "font-bold bg-gray-700 text-white": variant === "primary",
            "font-bold text-gray-400": variant === "primary" && isDisabled,
            "bg-gray-800": variant === "primary" && isHovered,
            "bg-gray-900": variant === "primary" && isPressed,
          },
          {
            "font-bold bg-gray-200 text-gray-800": variant === "secondary",
            "font-bold text-gray-500": variant === "secondary" && isDisabled,
            "bg-gray-300": variant === "secondary" && isHovered,
            "bg-gray-400": variant === "secondary" && isPressed,
          },
          {
            "text-gray-800 dark:text-gray-100": variant === "quiet",
            "text-gray-400 dark:text-gray-500":
              variant === "quiet" && isDisabled,
            "text-gray-500": variant === "quiet" && isPressed,
          },
          {
            "underline text-gray-600 dark:text-gray-400": variant === "link",
            "text-gray-200 dark:text-gray-600":
              variant === "link" && isDisabled,
            "text-gray-700 dark:text-gray-500": variant === "link" && isHovered,
            "text-gray-800 dark:text-gray-600": variant === "link" && isPressed,
          }
        )}
      >
        {children}
      </button>
    </FocusRing>
  )
}

const _Button = forwardRef(Button) as (
  props: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }
) => React.ReactElement
export { _Button as Button }