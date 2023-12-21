import React, { useState } from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { openSignin } from '../redux/setSigninSlice';
import { BsFillBellFill } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md"
import { MdOutlineDarkMode } from "react-icons/md"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const SearchMain = styled.div`
padding: 20px 30px;
padding-bottom: 200px;
height: 100%;
overflow-y: scroll;
overflow-x: hidden;
display: flex;
flex-direction: column;
gap: 20px;
@media (max-width: 768px) {
    padding: 20px 9px;
}

`;

const Search_whole = styled.div`
 max-width: 500px;
 display:flex;
 width: 60%;
 border: 1px solid ${({ theme }) => theme.text_secondary};
 border: none;
 border-radius:30px;
 cursor:pointer;
 padding:3px;
 justify-content: flex-start;
 align-items: center;
 gap: 3px;
 color: ${({ theme }) => theme.text_secondary};
 `;
const NavbarDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 16px 40px;
  align-items: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme.text_primary};
  gap: 30px;
  background: ${({ theme }) => theme.bg}
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(5.7px);
-webkit-backdrop-filter: blur(5.7px);
@media (max-width: 768px) {
    padding: 16px;
  }

`;

const NavbarDivAdmin = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 40px;
  background: rgb(245, 246, 248);
  align-items: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme.text_primary};
  gap: 30px;
  background: ${({ theme }) => theme.bg}
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(5.7px);
-webkit-backdrop-filter: blur(5.7px);
@media (max-width: 768px) {
    padding: 16px;
  }

`;

const Elements = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  color: ${({ theme }) => theme.text_secondary};
  width: 10%;
  &:hover {
    color: ${({ theme }) => theme.text_secondary + 50};
  }
`;

const NavText = styled.div`
  padding: 8px 0px;
  font-size: 15px;
`;
const ButtonDiv = styled.div`
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  width: 100%;
  max-width: 70px;
  padding: 8px 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  &:hover{
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Welcome = styled.div`
  font-size: 26px;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const IcoButton = styled(IconButton)`
  color: ${({ theme }) => theme.text_secondary} !important;
`;


const Navbar = ({  menuOpen, setMenuOpen, darkMode, setDarkMode,setSignInOpen, setSignUpOpen }) => {

  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <>
    {currentUser?.isAdmin && (
      <> 
        <NavbarDivAdmin>
      {/* <IcoButton onClick={() => setMenuOpen(!menuOpen)}>
        <MenuIcon />
      </IcoButton>
      {!currentUser ?
        <Welcome>
          Welcome, {currentUser?.name}
        </Welcome>
        :
        <>&nbsp;</>} */}
        <Search_whole>
                <SearchOutlinedIcon sx={{ "color": "inherit", "font-size": "13px" }} />
                <input type='text' placeholder='Search for something ...'
                    style={{ "border": "none", "outline": "none", "width": "50%", "background": "inherit", "color": "inherit" }}
                     />
            </Search_whole>
      
            {/* {darkMode ? (
        <>
          <Elements onClick={() => setDarkMode(false)}>
            <MdDarkMode className="icons"/>
            <NavText>Dark Mode</NavText>
          </Elements>
        </>
      ) : (
        <>
          <Elements onClick={() => setDarkMode(true)}>
            <MdOutlineDarkMode className="icons" />
            <NavText>Dark Mode</NavText>
          </Elements>
        </>
      )} */}
      
      {
        !currentUser ? 
        <>
          <Link to='/profile' style={{ textDecoration: 'none' }}>
            <Avatar src={currentUser?.img} >{currentUser?.name.charAt(0).toUpperCase()}</Avatar>
          </Link>
        </>
          :
          <Avatar style={{ fontSize: "10px" }} onClick={() => dispatch(openSignin())}></Avatar>
      }

    </NavbarDivAdmin>
      </>
    )}

    
    {!currentUser?.isAdmin && (
      <> 
        <NavbarDiv>
      <IcoButton onClick={() => setMenuOpen(!menuOpen)}>
        <MenuIcon />
      </IcoButton>
      {currentUser ?
        <Welcome>
          Welcome, {currentUser?.name}
        </Welcome>
        :
        <>&nbsp;</>}
      
      
      {
        currentUser ? 
        <>
          <Link to='/profile' style={{ textDecoration: 'none' }}>
            <Avatar src={currentUser?.img} >{currentUser?.name.charAt(0).toUpperCase()}</Avatar>
          </Link>
        </>
          :
          <Avatar style={{ fontSize: "10px" }} onClick={() => dispatch(openSignin())}></Avatar>
      }
    </NavbarDiv>
      </>
    )}
    </>
    
  )
}

export default Navbar