import LiveBlocksProvider from "@/components/LiveBlocksProvider"
import React, { ReactNode } from "react"

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <LiveBlocksProvider>{children}</LiveBlocksProvider >
  )
}
export default layout