import React, { useEffect, useState } from 'react'
import '../../src/css/details.css'
import {blog} from "../utils/Data"
import { useParams } from 'react-router-dom'
import {LiaEditSolid} from 'react-icons/lia'
import {BsFillTrash3Fill} from 'react-icons/bs'
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {AiFillClockCircle} from "react-icons/ai";
import {AiOutlineComment} from "react-icons/ai"
import {AiOutlineShareAlt} from "react-icons/ai"

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

export const Details = () => {
    const {id} = useParams()
    const [blogs, setBlogs] = useState(null)

    useEffect(() => {
        let blogs = blog.find((blogs) => blogs.id === parseInt(id))

        if(blogs) {
            setBlogs(blogs)
        }
    },[])

  return (
    <DashboardMain> 
        <FilterContainer>
  {blogs ? (
        <section className='singlePage'>
            <div className="container">
                <div className="left">
                    <img src={blogs.cover} alt="" />
                </div>
                <div className="right">
                <div className="date">
                                    <AiFillClockCircle className='icon'/> <label htmlFor="">{blogs.date}</label>
                                    <AiOutlineComment className='icon'/> <label htmlFor="">{blogs.comment}</label>
                                    <AiOutlineShareAlt className='icon'/> <label htmlFor="">Share</label>
                                </div>
                    <div className="buttons">
                        <button className='button'>
                            <LiaEditSolid/>
                        </button>
                        <button className='button'>
                            <BsFillTrash3Fill/>
                        </button>
                    </div>
                    <h1>{blogs.title}</h1>
                    <p>{blogs.desc}</p>
                    
                </div>
            </div>
        </section>) :null}
        </FilterContainer>
    </DashboardMain>
  )
}

export default Details
