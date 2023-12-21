import "../css/dashboard.css";
import UserAdmin from "../components/adminuser/UserAdmin";
import styled from "@emotion/styled";

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

const AdminUser = () => {
  return (
    <div className="home">
      <div className="homeContainer">
      <div className="listTitle">User Management Dashboard</div>
        <div className="listContainer">
          <UserAdmin />
        </div>
      </div>
    </div>
   
  );
};

export default AdminUser;