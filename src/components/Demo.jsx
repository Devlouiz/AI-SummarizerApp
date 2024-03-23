import React from 'react';
import { useState, useEffect } from 'react';
import { copy,loader,linkIcon,tick } from '../assets';
import { useLazyGetSummaryQuery } from '../state/article';
import { InfinitySpin } from 'react-loader-spinner';

const Demo = () => {
  const [article,setArticle] = useState({
    url:"",
    summary:""
  })
  const [allArticles, setAllArticles] = useState([])

  const [getSummary,{error,isFetching}] = useLazyGetSummaryQuery()

  useEffect(() => {
    const articleFromlocalstorage = JSON.parse(
      localStorage.getItem('article')
    )
    if (articleFromlocalstorage){
      setAllArticles(articleFromlocalstorage)
    }
  },[])

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const {data} = await getSummary({articleUrl: article.url})

    if (data?.summary){
      const newArticle = {...article, summary: data.summary}
      const updateAllarticle = [newArticle,...allArticles]

      setArticle(newArticle)
      setAllArticles(updateAllarticle)

      //console.log(newArticle)
      localStorage.setItem('article', JSON.stringify(updateAllarticle))
    }
  }
  //const con = (e) =>{
    //e.preventDefault()
    //console.log("submit")
  //}
  return (
    <section
    className='mt-16 w-full max-w-xl'>
        <div className='flex flex-col w-full
        gap-2'>
            <form action=""
            className='relative flex justify-center
            items-center'
            onSubmit={handleSubmit}>
                <img src={linkIcon} alt="link_icon"
                className='absolute left-0 my-2
                ml-3 w-5' />
                <input 
                type="url"
                placeholder='Enter url'
                value={article.url}
                onChange={(e) =>{setArticle({...article,
                  url:e.target.value})}}
                required 
                className='url_input peer'/>
                <button 
                className="submit_btn
                peer-focus:border-gray-700
                peer-focus:text-gray-700"
                type='submit'>
                    &#x21B5;
                </button>
            </form>
            <div className='flex flex-col gap-1 max-h-60
            overflow-y-auto'>
              {allArticles.map((item, index) => (
                <div
                key={`link-${index}`}
                onClick={() => setArticle(item)}
                className='link_card'>
                  <div className='copy_btn'>
                    <img src={copy} alt="copy_icon"
                    className='w-[40%] h-[40%] object-contain' />
                  </div>
                  <p className='flex-1 font-satoshi
                  text-blue-700 font-medium text-sm
                  truncate'>
                    {item.url}
                  </p>
                </div>
              ))}
            </div>
        </div>
        <div className='my-10 max-w-full flex justify-center
        items-center'>
          {isFetching ? (
            <div className='w-20 h-20 object-contain'>
              <InfinitySpin
              visible={true}
              width="200"
              color="#4fa94d"
              ariaLabel="infinity-spin-loading"
              />
            </div>
          ): error ? (
            <p className='font-inter font-bold text-black
            text-center'>
              Oop's Something went wrong please try again...
              <br />
              <span className='font-satoshi font-normal
              text-gray-700'>
                {error?.data?.error}
              </span> 
            </p>
          ): (
            article.summary && (
            <div className='flex flex-col
            gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600
              text-xl'>
                Article
                <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p>{article.summary}</p>
              </div>
            </div>
            ) 
          )}
        </div>
    </section>
  )
}

export default Demo