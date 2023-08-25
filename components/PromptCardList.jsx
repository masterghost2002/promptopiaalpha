"use client"
import { useState } from "react";
import PromptCard from "./PromptCard";
const PromptCardList = ({ data, handleTagClick, handleEdit, handleDelete }) => {
    const [isCopied, setIsCopied] = useState('');
    return (
      <div className='mt-4 prompt_layout'>
        {data.map(post => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick && handleTagClick}
            isCopied = {isCopied}
            setIsCopied = {setIsCopied}
            handleEdit={handleEdit && handleEdit}
            handleDelete={handleDelete && handleDelete}
          />
        ))}
      </div>
    )
  }
export default PromptCardList;