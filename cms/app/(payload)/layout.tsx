import React from 'react'
import { RootLayout } from '@payloadcms/next/layouts'
import configPromise from '@payload-config'
import { importMap } from './admin/importMap.js'
import '@payloadcms/next/css'

const serverFunction = async function (args: any) {
  'use server'
  const { handleServerFunctions } = await import('@payloadcms/next/layouts')
  return handleServerFunctions({ ...args, config: configPromise, importMap })
}

export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
