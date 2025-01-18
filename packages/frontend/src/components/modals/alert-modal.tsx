"use client"

import { Modal } from "@/components/modals/modal"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

type Props = {
  message: ReactNode
  isDisabled: boolean
  isOpen: boolean
  onClose: () => void
  onDeletion: () => void
}

export const AlertModal = (props: Props) => {
  const { message, isOpen, onClose, onDeletion, isDisabled } = props

  return (
    <Modal title="Confirm deletion" description="This action can not be reverted." isOpen={isOpen} onClose={onClose}>
      <div className="pt-4">{message}</div>

      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button variant="outline" onClick={onClose} disabled={isDisabled}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onDeletion} disabled={isDisabled}>
          Delete
        </Button>
      </div>
    </Modal>
  )
}
