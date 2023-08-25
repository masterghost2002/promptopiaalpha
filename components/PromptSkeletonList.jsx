import React from 'react'
import PromptCardSkeleton from './PromptCardSkeleton'
export default function PromptSkeletonList() {
  return (
    <div className='mt-4 prompt_layout'>
        <PromptCardSkeleton/>
        <PromptCardSkeleton/>
        <PromptCardSkeleton/>
    </div>
  )
}
