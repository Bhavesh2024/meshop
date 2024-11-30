import React, { useEffect, useRef, useState,useContext } from 'react'
// import SearchProductCard from './SearchProductCard';
import axios from 'axios';
import { ThemeContext } from '../../context/ThemeContext';
import LazyComponent from '../../routes/LazyComponent';
import ProductCardFallback from '../Fallback/ProductCardFallback';

const SearchProductCard = LazyComponent(() => import('./SearchProductCard'),<ProductCardFallback/>)
const SearchContainer = () => {
  const [searchResult,setSearchResult] = useState([]);
  const searchRef = useRef(0);
  const [searchValue,setSearchValue] = useState('');
  const {theme} = useContext(ThemeContext)
  const searchProduct = async(e) =>{
      const {name,value} = e.target;

      setSearchValue(value);
      try{
        const response = await axios.get(`https://meshop-r6ed.onrender.com/api/products/search/${value}`);
        if(response.status == 200){
            // console.log(response.data.result)
            setSearchResult(response.data.result);
            if(searchResult){
                console.log(searchResult)
            }
        }
      }catch(e){
        setSearchResult([]);
      }
      // console.log(name + value)
  }

  useEffect(() =>{
      searchRef.current.value = '';
  },[])
  return (
    <>
      <div className={`p-2 py-10 md:p-20 bg-slate-800 relative`}>
        <div className='relative'>
           <div className='bg-white p-3 w-full flex items-center rounded-full gap-2'>
           <input type="text" className='w-full h-full focus:outline-none bg-transparent' ref={searchRef} value={searchValue} name='search' id='search' onChange={searchProduct} placeholder='Search Product...' />
            <i className="fa-solid fa-magnifying-glass">
            </i>
           </div>
           <div className={`p-3 md:p-10 mt-2 ${theme == 'light' ? 'bg-white' : 'bg-slate-700'} rounded-md absolute w-full border z-10 ${searchValue == '' ? 'hidden' : 'flex flex-col gap-5'}`}>
                {
                  searchResult.length !== 0 ? searchResult.map(value =>(
                    <>
                      <SearchProductCard productId={value} />
                    </>
                  )) : 
                <div className={`text-center text-slate-400 text-2xl `}>
                No Product Found
                </div>
              }
           </div>
            
        </div>
      </div>  
    </>
  )
}

export default SearchContainer
