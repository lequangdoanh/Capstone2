import React from 'react';

import '../css/blog.css'
import { blog } from "../utils/Data";
import { AiFillTags } from 'react-icons/ai';
import {AiFillClockCircle} from 'react-icons/ai'
import {AiOutlineComment} from 'react-icons/ai'
import {AiOutlineShareAlt} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import PlusIcon from '@mui/icons-material/Add';
import { CircularProgress, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllBlogs } from '../api';
import { useEffect } from 'react';
import { useState } from 'react';

const Favorite = styled(IconButton)`
  color:white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.text_secondary + 95} !important;
  color: ${({ theme }) => theme.text_primary} !important;
`

const DashboardMain = styled.div`
padding: 20px 30px;
padding-bottom: 200px;
height: 100%;
overflow-y: scroll;
display: flex;
flex-direction: column;
gap: 20px;
@media (max-width: 768px){
  padding: 6px 10px;
}
`;

const FilterContainer = styled.div`
display: flex;
flex-direction: column;
${({ box, theme }) => box && `
background-color: ${theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`}
background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`;

const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @maedia (max-width: 768px){
    font-size: 18px;
  }
`;

const Podcasts = styled.div`
color: ${({ theme }) => theme.text_primary};
display: flex;
flex-wrap: wrap;
gap: 14px;
padding: 18px 6px;
//center the items if only one item present
@media (max-width: 550px){
  justify-content: center;
}
`;

const ItemBlog = styled.div`
color: ${({ theme }) => theme.text_primary};
display: flex;
flex-wrap: wrap;
gap: 10px;
padding: 10px 4px;
//center the items if only one item present
@media (max-width: 550px){
  justify-content: center;
}
`;


export const Blog = () => {
  
  const navigate = useNavigate();
  const { name } = useParams();
  const [listBlog, setListBlog] = useState([]);

  useEffect(() => {
    if (name) {
      new Promise(async () => {
        await fetching(name);
     })
    }
  },[name])

  const fetching = async (name) => {
    await getAllBlogs(name).then((res) => {
      if (res.status === 200) {
        setListBlog(res.data)
      }
    }).catch((error) => {
      
    })
  }

  console.log(listBlog);

    return(
        <DashboardMain> 
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Favorite style={{ marginLeft: '16px' }} onClick={() => {
            navigate(`/blog/add`,{replace: true})
      }}>
            <PlusIcon style={{ width: '16px', height: '16px' }}></PlusIcon>
            </Favorite>
      </div>
            <Topic>Bloger</Topic>
            <section className='blog'>
                <div className="container grid2">
                    {listBlog.map((item)=>(
                
                
                        <div className='box boxItems ' key={item._id}>
                          
                          <FilterContainer>
                          
                            <div className='img-title'>
                              <div className="img">
                                <img src={item.thumbnail} alt="" />
                              </div>
                            </div>
                            
                          
                            <div className="details">
                                <div className="tag">
                                    <AiFillTags className='icon' />
                                    <a href='/'>#{item.category}</a>
                                </div>
                                <Link to={`/details/blog/${item._id}`} className="link">
                                    <h3>{item.name.slice(0,40)}...</h3>
                                </Link>
                                <p>{item.desc.slice(0,50)} ... </p>
                                <div className="date">
                                    <AiFillClockCircle className='icon'/> <label htmlFor="">{item.createdAt}</label>
                                    
                                </div>
                            </div>
                            </FilterContainer>
                
                        </div>
                        
                    ))}
                </div>
            </section>
            
            
        </DashboardMain>
    )
}

export default Blog

