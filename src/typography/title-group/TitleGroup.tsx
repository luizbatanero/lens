import React from "react"
import cn from "classnames"
import { Icon } from "../../components/icon/Icon"
import { Title } from "../title/Title"
import { Subtitle } from "../subtitle/Subtitle"

export type TitleGroupProps = {
  /** An identifying icon */
  icon: string
  /** The title of the TitleGroup */
  title: string
  /** Additional description */
  subtitle: string
  /** Additionl props that will be spread over the title */
  titleProps?: React.HTMLAttributes<HTMLElement>
  /** Additional classes that will be spread over the TitleGroup. Avoid using classes that change visuals. */
  className?: string
}

export function TitleGroup({
  icon,
  title,
  subtitle,
  titleProps,
  className,
}: TitleGroupProps) {
  return (
    <section
      lens-role="title-group"
      className={cn("flex items-center", className)}
    >
      <Icon
        name={icon}
        size="lg"
        className="text-gray-400 dark:text-gray-300"
      />
      <div className="flex-column ml-6">
        <Title titleProps={titleProps}>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </div>
    </section>
  )
}
