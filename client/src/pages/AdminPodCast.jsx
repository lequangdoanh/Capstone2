import React from "react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { getPodcasts, deletePostCard } from "../api";
import { LiaEditSolid } from "react-icons/lia";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackbarSlice";
import PlusIcon from '@mui/icons-material/Add';
import { CircularProgress, IconButton } from '@mui/material';


const Container = styled.div`
padding: 20px 30px;
padding-bottom: 200px;
height: 100%;
overflow-y: scroll;
display: flex;
flex-direction: column;
gap: 20px;
`;

const Elements = styled.div`
  padding: 4px 16px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.text_secondary};
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.text_secondary + 50};
  }
`;
const NavText = styled.div`
  padding: 12px 0px;
`;
const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 0 auto; /* Center the table horizontally */
  font-family: Arial, sans-serif; /* Choose a suitable font */
  border: 1px solid #ddd;
  text-align: left;
  background-color: white;
  box-shadow: 
    2vh 2vh 4vh 3vh rgba(51,95,208,0.2),
    -2vh -2vh 4vh 3vh rgba(255,180,0,0.2);
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #dbd7d7;
    font-weight: bold;
  }

  tr:hover {
    background-color: #ddd;
  }
`;

const Image = styled.img`
  height: 100px;
  width: 100px;
  object-fit: cover;
`;


const Favorite = styled(IconButton)`
  color:white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  border: 1px solid;
  background: ${({ theme }) => theme.text_secondary + 95} !important;
  color: ${({ theme }) => theme.text_primary} !important;
`

const AdminPodCast = () => {
  const [listPod, setListPod] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    new Promise(async () => {
      await fetchingList();
    });
   
  },
  
  []);

  const fetchingList = async () => {
    await getPodcasts()
      .then((res) => {
        if (res.status === 200) {
          setListPod(res.data);
        }
      })
      .catch((error) => {});
  };

  const deletePostcard = async (idPostcard) => {
    await deletePostCard(idPostcard)
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
    <Container>
    <div className="">
      <div style={{ display: 'flex', justifyContent: 'flex-start', width: '50%' }}>
          <Favorite style={{ marginLeft: '16px' }} onClick={() => {
            navigate(`/pod/add`,{replace: true})
      }}>
        
            <PlusIcon style={{ width: '16px', height: '16px' }}></PlusIcon>
            </Favorite>
            {/* <Favorite style={{ marginLeft: '16px' }} onClick={() => deletePostcard(item._id)}>
                  <DeleteIcon style={{ width: '16px', height: '16px' }}></DeleteIcon>
                  </Favorite> */}
                  
      </div>
      {/* <div>
        <Link to='/pod/add'>upload</Link>
      </div> */}
      

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Type</th>
            <th>Episodes</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listPod.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>
                <Image src={item.thumbnail} alt="" />
              </td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.type}</td>
              <td>{item?.episodes.length}</td>
              <td>{item.createdAt}</td>
              <td>
                <div className="buttons">
                  <button
                    className="button"
                    onClick={() => {
                      navigate(`/blog/update/${item.category}/${item._id}`, {
                        replace: true,
                      });
                    }}
                  >
                    <LiaEditSolid />
                  </button>
                  <button
                    className="button"
                    onClick={() => deletePostcard(item._id)}
                  >
                    <BsFillTrash3Fill />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </Container>
  );
};

export default AdminPodCast;
