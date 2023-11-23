import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { getListUser } from "../api";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 0 auto; /* Center the table horizontally */
  font-family: Arial, sans-serif; /* Choose a suitable font */
  border: 1px solid #ddd;
  text-align: left;
  background-color: #bcbcbc;
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }


  tr:hover {
    background-color: #ddd;
  }
`;
const Container = styled.div`
padding: 20px 30px;
padding-bottom: 200px;
height: 100%;
overflow-y: scroll;
display: flex;
flex-direction: column;
gap: 20px;
`;

const AdminUser = () => {
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        new Promise(async () => {
            await fetchingList();
        })
    },[])

    const fetchingList = async() => {
        await getListUser().then((res) => {
            if (res.status === 200) {
                setListUser(res.data);
            }
        }).catch((error) => {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        })
    }

  return (
    <Container>
    <div className="">
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Country</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
                  {
                      listUser.map((item) => (
                        <tr key={item._id}>
                              <td>{ item.name}</td>
                              <td>{ item.email}</td>
                              <td>{ item.phone}</td>
                              <td>{ item.county}</td>
                              <td>{ item.role}</td>
                      </tr>
                      ))
          }
        </tbody>
      </Table>
    </div>
    </Container>
  );
};

export default AdminUser;
