import React, {
  PropsWithChildren,
  useRef,
  ReactElement,
  createContext,
  useContext,
} from "react"
import cn from "classnames"
import { useOverlay, useModal, OverlayContainer } from "@react-aria/overlays"
import { useDialog } from "@react-aria/dialog"
import { FocusScope } from "@react-aria/focus"
import {
  OverlayTriggerState,
  useOverlayTriggerState,
} from "@react-stately/overlays"

import { Button } from "../../components/button/Button"
import { TitleGroup } from "../../typography/title-group/TitleGroup"
import { Icon } from "../../components/icon/Icon"

interface DialogState {
  title: string
  subtitle: string
  icon: string
  dimensions?: DOMRect
  close: OverlayTriggerState["close"]
}

const defaultFn = (): void | Promise<void> => {
  console.warn(`Context not ready!`)
}

const initialDialogState: DialogState = {
  title: "",
  subtitle: "",
  icon: "user",
  close: defaultFn,
}

const DialogContext = createContext(initialDialogState)

/**
 * Dialog Container
 */
export type DialogContainerProps = PropsWithChildren<{
  /** Dialog title -> TitleGroup */
  title: string
  /** Subtitle -> TitleGroup */
  subtitle: string
  /** Icon -> TitleGroup */
  icon: string
  /** Parent container reference to contain modal within parent dimmension */
  parentContainerRef?: React.RefObject<HTMLDivElement>
  /** The dialog's inner body content */
  children: ReactElement
}>

export const DialogContainer = ({
  title,
  subtitle,
  icon,
  parentContainerRef,
  children,
}: DialogContainerProps) => {
  const state = useOverlayTriggerState({})

  const value = {
    title,
    subtitle,
    icon,
    dimensions: parentContainerRef?.current?.getBoundingClientRect(),
    close: state.close,
  }

  return (
    <DialogContext.Provider value={value}>
      <Button onPress={() => state.open()}>{title}</Button>
      {state.isOpen && children}
    </DialogContext.Provider>
  )
}

/**
 * Dialog Body
 */
export type DialogBodyProps = PropsWithChildren<{
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** The dialog's inner body content */
  children: ReactElement
}>

export const DialogBody = ({ id, children }: DialogBodyProps) => {
  const { title, subtitle, icon, dimensions, close } = useContext(DialogContext)
  const ref = useRef<HTMLDivElement>(null)
  const { overlayProps } = useOverlay({ onClose: close }, ref)
  const { modalProps } = useModal()
  const { dialogProps, titleProps } = useDialog({ id, role: "dialog" }, ref)

  return (
    <OverlayContainer>
      <FocusScope>
        <div
          className={cn("absolute", "px-6 py-4", "bg-white")}
          style={{
            left: dimensions?.left ? dimensions.left : 0,
            top: dimensions?.top ? dimensions.top : 0,
            width: dimensions?.width ? dimensions.width : "100%",
            height: dimensions?.height ? dimensions.height : "100%",
          }}
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          ref={ref}
        >
          <header className={cn("flex justify-between items-center mb-6")}>
            <TitleGroup
              title={title}
              subtitle={subtitle}
              icon={icon}
              titleProps={titleProps}
            />
            <Button variant="quiet" onPress={() => close()} icon="x"></Button>
          </header>
          <article>{children}</article>
        </div>
      </FocusScope>
    </OverlayContainer>
  )
}

export const Dialog = {
  Container: DialogContainer,
  Body: DialogBody,
}
