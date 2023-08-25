'use client'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import debounce from '@utils/debounce'
import Image from 'next/image'
import PromptCardList from './PromptCardList'
import PromptSkeletonList from './PromptSkeletonList'
const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchedPost, setSearchedPost] = useState([]);
  const [showCommand, setShowCommand] = useState(false);
  const [searchResult, setSearchResult] = useState('');



  const goodSearch = useCallback(debounce((searchParam) => {
    if (searchParam.length <= 1) return;
    const query = searchParam[0];
    let result = [];
    let searchResultInfo = ''
    switch (query) {
      case '#':
        searchParam = searchParam.replace('#', '');
        result = posts.filter(post => post.tag.includes(searchParam));
        searchResultInfo = `Found ${result.length} prompts with tag  ${searchParam}`;
        break;
      case '@':
        searchParam = searchParam.replace('@', '');
        result = posts.filter(post => post.creator.username.includes(searchParam));
        searchResultInfo = `Found ${result.length} prompts with ${searchParam} username`
        break;
      case '$':
        searchParam = searchParam.replace('$', '');
        result = posts.filter(post => post.creator.email.includes(searchParam));
        searchResultInfo = `Found ${result.length} prompts with ${searchParam} email`
        break;
      default:
        result = posts.filter(post => post.prompt.includes(searchParam));
        searchResultInfo = `Found ${result.length} prompts with ${searchParam} content`
        break;

    }
    setSearchedPost(result);
    if (result.length === 0)
      searchResultInfo = `0 result found :(`
    setSearchResult(searchResultInfo);
  }, 1000), [posts]);

  const handleTagClick = (tag) => {
    setSearchText(tag);
    goodSearch(tag);
    setSearchResult('');
  }
  const handleSearchChange = e => {
    const searchParam = e.target.value;
    setSearchText(searchParam);
    goodSearch(searchParam);
    setSearchResult('');
    if (searchParam.length <= 1) setSearchedPost([]);
  }


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get('/api/prompt');
        const data = await res.data;
        setPosts(data);
      } catch (error) {
        console.log(error);
      }

    };
    fetchPost();
  }, []);
  return (
    <section className="feed relative">
      <div className="flex w-full flex-center flex-col relative mb-10">
        <form className='w-full flex-center mb-10'>
          <input
            type="text"
            list='commands'
            placeholder='search for a tag or a username'
            value={searchText}
            onChange={e => handleSearchChange(e)}
            required
            className='search_input peer '
            onFocus={() => setShowCommand(true)}
            onBlur={() => setShowCommand(false)}
          />
        </form>
        {showCommand && <div
          className="flex justify-between items-center absolute shadow glassmorphism top-10 w-full bg-white  rounded mt-2 font-normal font-stoshi text-sm text-gray-700">
          <div>
            {searchResult.length > 0
              ? <span>{searchResult}</span>
              :
              <>
                <span >use @ for username</span>
                <br></br>
                <span className=''>use # for tag</span>
                <br></br>
                <span className=''>use $ for email</span>
              </>

            }
          </div>
          <Image
            src={'/assets/siri_loader.gif'}
            alt='loader'
            width={40}
            height={40}
            className="rounded-full object-contain w-10"
          />
        </div>
        }
      </div>
      {posts.length === 0
        ? <PromptSkeletonList />
        :<PromptCardList
          data={searchedPost.length ? searchedPost : posts}
          handleTagClick={handleTagClick}
        />}
    </section>
  )
}

export default Feed


