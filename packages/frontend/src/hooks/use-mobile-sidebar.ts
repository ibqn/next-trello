import { create } from "zustand"

type MobileSidebarStore = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export const useMobileSideBar = create<MobileSidebarStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))
