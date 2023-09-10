import React from 'react';

import '../css/blog.css'
import { blog } from "../utils/Data";
import { AiFillTags } from 'react-icons/ai';
import {AiFillClockCircle} from 'react-icons/ai'
import {AiOutlineComment} from 'react-icons/ai'
import {AiOutlineShareAlt} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

export const Blog = () =>{
    return(
        <DashboardMain> 
            
            <FilterContainer>
            <Topic>Bloger</Topic>
            <Podcasts>
            <section className='blog'>
                <div className="container grid">
                    {blog.map((item)=>(
                        <div className='box boxItems' key={item.id}>
                            <div className="img">
                                <img src={item.cover} alt="" />
                            </div>
                            <div className="details">
                                <div className="tag">
                                    <AiFillTags className='icon' />
                                    <a href='/'>#{item.category}</a>
                                </div>
                                <Link to={`/details/${item.id}`} className="link">
                                    <h3>{item.title}</h3>
                                </Link>
                                <p>{item.desc.slice(0,100)} ... </p>
                                <div className="date">
                                    <AiFillClockCircle className='icon'/> <label htmlFor="">{item.date}</label>
                                    <AiOutlineComment className='icon'/> <label htmlFor="">{item.comment}</label>
                                    <AiOutlineShareAlt className='icon'/> <label htmlFor="">Share</label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            </Podcasts>
            </FilterContainer>
        </DashboardMain>
    )
}

export default Blog

