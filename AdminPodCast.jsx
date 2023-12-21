import "../css/dashboard.css";
import PodcastAdmin from "../components/adminpodcast/PodcastAdmin";
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

const AdminPodcast = () => {
  return (
    <div className="home">
      <div className="homeContainer">
      <div className="listTitle">Podcast Management Dashboard</div>
        <div className="listContainer">
          <PodcastAdmin />
        </div>
      </div>
    </div>
   
  );
};

export default AdminPodcast;
