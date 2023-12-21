import styled from "styled-components";
import { useState, useEffect } from "react";
import { getListAllBlogs, deleteBlog } from "../api";
import { LiaEditSolid } from "react-icons/lia";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackbarSlice";
import PlusIcon from '@mui/icons-material/Add';
import { CircularProgress, IconButton } from '@mui/material';
import Favorite from "@mui/icons-material/Favorite";
import { Link } from 'react-router-dom';
import { AiFillTags } from 'react-icons/ai';
import {AiFillClockCircle} from 'react-icons/ai'
import MoreResult from "../components/MoreResult";
import Avatar from '@mui/material/Avatar';
import { format } from "timeago.js";
import { searchPodcast } from '../api/index.js';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { CategoryBlog } from '../utils/Data.js';
import { TypeBlog } from '../components/TypeBlog.jsx';
import TopResult from '../components/TopResult.jsx';
import { useSelector } from 'react-redux';
import { getUsers } from '../api/index';
import TopResultBlog from '../components/TopResultBlog.jsx';
import MoreResultBlog from '../components/MoreResultBlog.jsx';
import { Container, Row, Col} from "reactstrap";

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
color: ${({ theme }) => theme.text_primary};
display: flex;
flex-direction: column;
@media (max-width: 768px){
  padding: 3px 6px;
  display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
}
${({ box, theme }) => box && `
background-color: ${theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`}
background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`;
const BlogAll = () => {
  const [listBlog, setListBlog] = useState([]);
  const [searched, setSearched] = useState("");
  const [user, setUser] = useState();
  const [searchedPodcasts, setSearchedPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    new Promise(async () => {
      await fetchingList();
    });
  }, []);


    const handleChange = async (e) => {
        setSearchedPodcasts([]);
        setLoading(true);
        setSearched(e.target.value);
        await searchPodcast(e.target.value)
            .then((res) => {
                setSearchedPodcasts(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                dispatch(
                    openSnackbar({
                        message: err.message,
                        severity: "error",
                    })
                );
            });
        setLoading(false);
    }

  const fetchingList = async () => {
    await getListAllBlogs()
      .then((res) => {
        if (res.status === 200) {
          setListBlog(res.data);
        }
      })
      .catch((error) => {});
  };

  const removeBlog = async (id) => {
    await deleteBlog(id)
      .then((res) => {
        openSnackbar({
          message: "Delete Success",
          severity: "success",
        });
        fetchingList();
      })
      .catch((err) => {
        dispatch(
          openSnackbar({
            message: "Delete Error",
            severity: "error",
          })
        );
      });
  };

  return (
    <>
       <DashboardMain> 
            
            <FilterContainer>
            {/* <Topic>Bloger</Topic> */}
            {/* <Podcasts> */}
            <Container>
              <Row>
                <Col lg='3' md='3'>
                  <div> hello </div>
                </Col>
                <Col lg='9' md='9'>
                  <div> hello </div>
                </Col>
              </Row>
            <section className='blog'>
                <div className="container grid">
                    {listBlog.map((item)=>(
                        <div className='box boxItems' key={item._id}>
                            <div className="img">
                                <img src={item.thumbnail} alt="" />
                            </div>
                            <div className="details">
                                <div className="tag">
                                    <AiFillTags className='icon' />
                                    <a href='/'>#{item.category}</a>
                                </div>
                                <Link to={`/details/${item.id}`} className="link">
                                    <h3>{item.name}</h3>
                                </Link>
                                <p>{item.desc.slice(0,100)} ... </p>
                                <div className="date">
                                    <AiFillClockCircle className='icon'/> <label htmlFor="">{item.createdAt}</label>
                                    {/* <AiOutlineComment className='icon'/> <label htmlFor="">{item.comment}</label>
                                    <AiOutlineShareAlt className='icon'/> <label htmlFor="">Share</label> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            </Container>
            {/* </Podcasts> */}
            </FilterContainer>
        </DashboardMain>
    </>
  )
    
    
}

export default BlogAll;
