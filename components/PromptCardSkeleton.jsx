
const PromptCardSkeleton = () => {
  return (
    <div className="prompt_card animate-pulse">
      <div className="flex w-full justify-between gap-5">
        <div className="flex gap-2">

        <div className="h-10 w-10 bg-gray-200 rounded-full dark:bg-gray-700  mb-4"></div>
        <div className="h-10 w-48 bg-gray-200 rounded-md dark:bg-gray-700  mb-4"></div>

        </div>
        <div className="h-10 w-10 bg-gray-200 rounded-full dark:bg-gray-700  mb-4">
        </div>
      </div>
      <div className="h-2.5 w-full bg-gray-200 rounded-full dark:bg-gray-700  mb-4"></div>
      <div className="h-2.5 w-full bg-gray-200 rounded-full dark:bg-gray-700  mb-4"></div>
      <div className="h-2.5 w-full bg-gray-200 rounded-full dark:bg-gray-700  mb-4"></div>
      <div className="h-2.5 w-48 bg-gray-200 rounded-full dark:bg-gray-700  mb-4"></div>
      <div className="h-5 w-20 bg-gray-200 rounded-md dark:bg-gray-700  mb-4"></div>

    </div>
  )
}

export default PromptCardSkeleton