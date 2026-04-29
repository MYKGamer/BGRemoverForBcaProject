'use client'

import { UploadZone } from '../upload-zone'

export function EditorView() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center max-w-2xl w-full space-y-4 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          BG <span className="text-[#2563eb]">Editor</span>
        </h1>
        <p className="text-lg text-[#a1a1aa]">
          Select a photo to get started. We'll handle the tricky parts for you.
        </p>
      </div>
      <UploadZone />
    </div>
  )
}
