import type { ReactElement } from 'react'
import { IoLinkOutline } from 'react-icons/io5'
import { MdDelete, MdModeEdit, MdOutlineContentCopy } from 'react-icons/md'
import { FiUpload } from 'react-icons/fi'
import { defaultTheme } from '../../theme'
import type { CardMenuItem } from './Card'

export interface DashboardCardAction {
  onClick: () => void
  label?: string
}

export interface DashboardCardActions {
  edit?: DashboardCardAction
  duplicate?: DashboardCardAction
  copyUrl?: DashboardCardAction
  submitAsTemplate?: DashboardCardAction
  delete?: DashboardCardAction
}

interface GetDashboardCardMenuItemsOptions {
  actions?: DashboardCardActions
  canDuplicate?: boolean
  isPublic?: boolean
}

const iconColor = defaultTheme.colors.dark.darkGrey

const DEFAULT_LABELS: Record<keyof DashboardCardActions, string> = {
  edit: 'Edit',
  duplicate: 'Duplicate',
  copyUrl: 'Copy link',
  submitAsTemplate: 'Submit as template',
  delete: 'Delete',
}

const ICONS: Record<keyof DashboardCardActions, ReactElement> = {
  edit: <MdModeEdit color={iconColor} />,
  duplicate: <MdOutlineContentCopy color={iconColor} />,
  copyUrl: <IoLinkOutline color={iconColor} />,
  submitAsTemplate: <FiUpload color={iconColor} />,
  delete: <MdDelete color={iconColor} />,
}

export function getDashboardCardMenuItems({
  actions = {},
  canDuplicate = true,
  isPublic = false,
}: GetDashboardCardMenuItemsOptions): CardMenuItem[] {
  const items: (CardMenuItem | false)[] = [
    actions.edit && {
      text: actions.edit.label ?? DEFAULT_LABELS.edit,
      onClick: actions.edit.onClick,
      icon: ICONS.edit,
    },
    canDuplicate && actions.duplicate && {
      text: actions.duplicate.label ?? DEFAULT_LABELS.duplicate,
      onClick: actions.duplicate.onClick,
      icon: ICONS.duplicate,
    },
    isPublic && actions.copyUrl && {
      text: actions.copyUrl.label ?? DEFAULT_LABELS.copyUrl,
      onClick: actions.copyUrl.onClick,
      icon: ICONS.copyUrl,
    },
    actions.submitAsTemplate && {
      text: actions.submitAsTemplate.label ?? DEFAULT_LABELS.submitAsTemplate,
      onClick: actions.submitAsTemplate.onClick,
      icon: ICONS.submitAsTemplate,
    },
    actions.delete && {
      text: actions.delete.label ?? DEFAULT_LABELS.delete,
      onClick: actions.delete.onClick,
      icon: ICONS.delete,
    },
  ]

  return items.filter((item): item is CardMenuItem => Boolean(item))
}
