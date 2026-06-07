'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface MasjidContextValue {
  activeMasjid: string
  setActiveMasjid: (id: string) => void
}

const MasjidContext = createContext<MasjidContextValue>({
  activeMasjid: 'ipswich',
  setActiveMasjid: () => {},
})

export function MasjidProvider({ children }: { children: ReactNode }) {
  const [activeMasjid, setActiveMasjid] = useState('ipswich')
  return (
    <MasjidContext.Provider value={{ activeMasjid, setActiveMasjid }}>
      {children}
    </MasjidContext.Provider>
  )
}

export function useMasjid() {
  return useContext(MasjidContext)
}
