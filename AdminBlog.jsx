import "../css/dashboard.css";
import BlogAdmin from "../components/adminblog/BlogAdmin";
import styled from "@emotion/styled";
import PlusIcon from '@mui/icons-material/Add';
import { CircularProgress, IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";

const FilterContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
${({ box, theme }) => box && `
background-color: ${theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`}
`;

const Favorite = styled(IconButton)`
  color:white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  border: 1px solid;
  background: ${({ theme }) => theme.text_secondary + 95} !important;
  color: ${({ theme }) => theme.text_primary} !important;
`;

const AdminBlog = () => {
  const navigate = useNavigate();
  return (
    
    <div className="home">
      <div className="homeContainer">
      <div className="listTitle">Blog Management Dashboard </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', width: '50%' }}>
          <Favorite style={{ marginLeft: '16px' }} onClick={() => {
            navigate(`/upload-admin`,{replace: true})
      }}>
            <PlusIcon style={{ width: '16px', height: '16px' }}></PlusIcon>
            </Favorite>
      </div>
        <div className="listContainer">
          
          <BlogAdmin />
        </div>
      </div>
    </div>
   
  );
};

export default AdminBlog;
