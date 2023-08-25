import { useState } from 'react'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, userRouter } from 'next/navigation';
import Link from 'next/link';
const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
  isCopied,
  setIsCopied,
}) => {
  const handleCopy = () => {
    setIsCopied(post._id);
    navigator.clipboard.writeText(post.prompt);
  }
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <Link href={session.user.id === post.creator._id ? '/profile': `/profile/${post.creator._id}`}>
          <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
            <Image
              src={post.creator.image}
              alt='user image'
              width={40}
              height={40}
              className='rounded-full object-contain'
            />
            <div className="flex flex-col">
              <h3 className='font-stoshi font-semibold text-gray-900'>
                {post.creator.username}
              </h3>
              <p className='font-stoshi font-semibold text-gray-500' >{post.creator.email}</p>
            </div>
          </div>
        </Link>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              isCopied === post._id
                ? '/assets/icons/tick.svg' :
                '/assets/icons/copy.svg'
            }
            width={12}
            alt='copy image'
            height={12}
          />
        </div>
      </div>
      <p className='my-4 font-stoshi text-sm text-gray-700'>
        {post.prompt}
      </p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {session?.user.id === post.creator._id && pathname === '/profile' &&
        (
          <div className='flex w-full justify-end gap-2 mt-5 border-t border-gray-200 pt-3'>
            <p className='font-inter text-sm green_gradient cursor-pointer' onClick={() => handleEdit(post._id)}>
              Edit
            </p>
            <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={() => handleDelete(post._id)}>
              Delete
            </p>
          </div>
        )
      }
    </div>
  )
}

export default PromptCard