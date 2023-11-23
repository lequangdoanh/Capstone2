import styled from "styled-components";
import ImageSelector from "../components/ImageSelector";
import React from "react";
import { useState, useEffect } from "react";
import { addBlog } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackbarSlice"; 
import { getDetailBlog,updateBlog } from "../api";
import { CategoryBlog } from '../utils/Data';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 500px;
  width: 100%;
  border-radius: 16px;
  margin: 50px 20px;
  height: min-content;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  margin: 12px 20px;
  text-align: center;
`;

const OutlinedBox = styled.div`
  min-height: 48px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  color: ${({ theme }) => theme.text_secondary};
  ${({ googleButton, theme }) =>
    googleButton &&
    `
    user-select: none; 
  gap: 16px;`}
  ${({ button, theme }) =>
    button &&
    `
    user-select: none; 
  border: none;
    font-weight: 600;
    font-size: 16px;
    background: ${theme.button};
    color:'${theme.bg}';`}
    ${({ activeButton, theme }) =>
    activeButton &&
    `
    user-select: none; 
  border: none;
    background: ${theme.primary};
    color: white;`}
  margin: 3px 20px;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 14px;
`;

const TextInput = styled.input`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text_secondary};
`;

const Select = styled.select`
    width: 100%;
    border: none;
    font-size: 14px;
    border-radius: 3px;
    background-color: transparent;
    outline: none;
    color: ${({ theme }) => theme.text_secondary};
`;

const Desc = styled.textarea`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  padding: 10px 0px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Option = styled.option`
    width: 100%;
    border: none;
    font-size: 14px;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.card};
    outline: none;
    color: ${({ theme }) => theme.text_secondary};
`;

const UpdateBlog = () => {
  const [blog, setBlog] = React.useState({
    name: "",
    desc: "",
    thumbnail: "",
    category: ""
  });
  const [disabled, setDisabled] = React.useState(true)
  const {name:  nameCategory, id} = useParams();
  const { currentUser } = useSelector(state => state.user);
  // const [userType, setUserType] = useState('user');
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // useEffect(() => {
  //   if (userType === 'isUser') {
  //     // Load current page
  //     window.location.reload();
  //   } else if (userType === 'isAdmin') {
  //     // Redirect to the blog page
  //     window.location.href = '/admin-blog'; // Adjust the URL as needed
  //   }
  // }, [userType]);

  useEffect(() => {
    if (id) {
      new Promise(async () => {
        await fillData(id);
      })
    }
  },[id])

  useEffect(() => {
    if (blog === null) {
        setDisabled(true);
        setBlog({
            name: "",
            desc: "",
          thumbnail: "",
          category: ""
        })
    } else {
        if (blog.name === "" && blog.desc === "") {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }
  }, [blog]);
  
  const fillData = async(id) => {
    await getDetailBlog(id).then((res) => {
      if (res.status === 200) {
        setBlog({
          name: res.data.name,
          desc: res.data.desc,
          thumbnail: res.data.thumbnail,
          category: res.data.category
        });
      }
    }).catch((error) => {
      
    })
  }
    
  const createBlog = async () => {
    const bodyForm = {
      ...blog,
      idUser: currentUser._id
    }

    if (!bodyForm) {
      return;
    }
    await updateBlog(id,bodyForm).then((res) => {
      if (res.status === 200) {
        dispatch(
          openSnackbar({
            open: true,
            message: "Blog update successfully",
            severity: "success",
          })
      )
        setBlog({
          name: "",
          desc: "",
          thumbnail: ""
        });
        navigate(`/blog/add`,{replace: true})
        
        }
      }).catch((error) => {
        openSnackbar({
          open: true,
          message: "Blog created fails",
          severity: "error",
        });
    })
        
    }

    console.log(blog);
    
  return (
    <Container>
      <Wrapper>
        <Title>Upload Blog</Title>
        <ImageSelector podcast={blog} setPodcast={setBlog} />
        <OutlinedBox style={{ marginTop: "12px" }}>
          <TextInput
            placeholder="Podcast Name*"
            type="text"
            name="name"
            value={blog?.name}
            onChange={(e) => setBlog({ ...blog, name: e.target.value })}
          />
        </OutlinedBox>
        <OutlinedBox style={{ marginTop: "6px" }}>
          <Desc
            placeholder="Blog Description* "
            name="desc"
            rows={5}
            value={blog?.desc}
            onChange={(e) => setBlog({ ...blog, desc: e.target.value })}
          />
        </OutlinedBox>
        <OutlinedBox>
          <Select
            value={blog?.category}
                                        onChange={
                                            (e) => setBlog({ ...blog, category: e.target.value })
                                        }
                                    >
                                        <Option value={CategoryBlog[0].name} selected disabled hidden>Select Category</Option>
                                        {CategoryBlog.map((category) => (
                                            <Option value={category.name}>{category.name}</Option>
                                        ))}
                                    </Select>
                                </OutlinedBox>
        <OutlinedBox
          button={true}
          activeButton={!disabled}
          style={{ marginTop: "22px", marginBottom: "18px" }}
          onClick={() => {
              !disabled && createBlog()
              window.location.reload();
          }}
        >
          Update
        </OutlinedBox>
      </Wrapper>
    </Container>
  );
};

export default UpdateBlog;
