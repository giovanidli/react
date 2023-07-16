import { useEffect, useState } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/load-posts'
import { Posts } from '../../components/Posts/index'
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {

  const [ posts, setPosts] = useState([]);
  const [ allPosts, setAllPosts] = useState([]);
  const [ page, setPage ] = useState(0);
  const [ postsPerPage] = useState(10);
  const [ searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPost = !!searchValue ?
  allPosts.filter(post => {
    return post.title.toLowerCase().includes(searchValue.toLowerCase());
  })
  : posts;


  const handleLoadPosts = async () => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);  
    };

    useEffect(() => {
      handleLoadPosts();
    }, []);
    
    const loadMorePosts = () => {
      const nextPage = page + postsPerPage;
      const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
      posts.push(...nextPosts);
      setPosts(posts);
      setPage(nextPage)
    }
  
    const handleChange = (e) => {
      const { value } = e.target;
      setSearchValue(value);
    }
  
    return (
      <section className='container'>
        <div className="search-container">
        {!!searchValue && (
          <h1>Search Value: {searchValue} </h1>
        )}
        <TextInput searchValue={searchValue} handleChange={handleChange} />
  
        </div>
        {filteredPost.length > 0 && (
          <Posts posts={filteredPost} />
        )}
  
        {filteredPost.length === 0 && (
          <p>Nao existem posts</p>
        )}
        <div className='button-container'>
          {!searchValue && (
            <Button text="Load more posts" onClick={loadMorePosts} disabled={noMorePosts} />
          )}
        </div>
      </section>
    );
}
export default Home;