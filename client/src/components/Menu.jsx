import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHome } from "react-icons/fa"
import AdminIcon from "@mui/icons-material/AdminPanelSettings";
import { BiLogoBlogger } from "react-icons/bi"
import { SiApplepodcasts } from "react-icons/si"
import { BiSupport } from "react-icons/bi"
import { AiFillHeart } from "react-icons/ai"
import { FaCloudUploadAlt } from "react-icons/fa"
import { MdDarkMode } from "react-icons/md"
import { MdOutlineDarkMode } from "react-icons/md"
import { RiLogoutCircleRLine } from "react-icons/ri"
import { RiLogoutCircleLine } from "react-icons/ri"
import CloseRounded from "@mui/icons-material/CloseRounded";
import LogoIcon from "../Images/Logo.png";
import { openSignin } from "../redux/setSigninSlice";
import { MdDashboard } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { Avatar } from '@mui/material';
import { MdVideoLibrary } from "react-icons/md"

const MenuContainer = styled.div`
  flex: 0.6;
  flex-direction: column;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 1100px) {
    position: fixed;
    z-index: 1000;
    width: 100%;
    max-width: 250px;
    left: ${({ setMenuOpen }) => (setMenuOpen ? "0" : "-100%")};
    transition: 0.3s ease-in-out;
  }
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
    background-color: ${({ theme }) => theme.text_secondary + 80};
    color: purple;
  }
`;
const NavText = styled.div`
  padding: 8px 0px;
  font-size: 15px;
`;
const HR = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.text_secondary + 50};
  margin: 10px 0px;
`;
const Flex = styled.div`
  margin: 3px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding: 5.8px 16px;
  width: 86%;
  border-bottom: 1px solid rgb(238, 237, 237);
`;
const FlexSide= styled.div`
  margin-top: 6px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding: 10px 16px;
  width: 86%;
  border-bottom: 1px solid rgb(238, 237, 237);
`;
const Close = styled.div`
  display: none;
  @media (max-width: 1100px) {
    display: block;
  }
`;
const Logo = styled.div`
  color: ${({ theme }) => theme.primary};
  display: flex;
  margin: 15px 2px;
  align-items: center;
  justify-content: center;
  color: gray;  /* fallback for old browsers */
color: -webkit-linear-gradient(to right, #BFE6BA, #D3959B);  /* Chrome 10-25, Safari 5.1-6 */
color: linear-gradient(to right, #BFE6BA, #D3959B); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  gap: 6px;
  font-weight: bold;
  font-size: 16px;
  margin: 10px 0px;
`;
const Image = styled.img`
  height: 25px;
`;
const Welcome = styled.div`
  padding: 4px 2.5rem;
  flex-direction: row;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  
  color: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);
  font-size: 12px;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const PictureLogo = styled.div`
padding: 4px 4.4rem;
flex-direction: row;
box-sizing: border-box;
display: flex;
align-items: center;
justify-content: center;
color: green;
font-weight: 600;
@media (max-width: 768px) {
  font-size: 8px;
}
`;


const Menu = ({ setMenuOpen, darkMode, setDarkMode, setUploadOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const logoutUser = () => {
    dispatch(logout());
    navigate(`/`);
  };

  console.log(currentUser);

  return (
    <MenuContainer setMenuOpen={setMenuOpen}>
      
      {currentUser?.isAdmin && (
        
        <>
        <Flex>
        <Link to="/admin-dashboard" style={{ textDecoration: "none", color: "inherit" }}>
        <Logo>
            <Image src={LogoIcon} />
            Admin Podstream
          </Logo>
        </Link>
        
        
        <Close>
          <CloseRounded
            onClick={() => setMenuOpen(false)}
            style={{ cursor: "pointer" }}
          />
        </Close>
      </Flex>
      {/* <hr style={{ "width": "100%", "color": "rgb(255, 255, 255)"}}/> */}
    
      {/* <PictureLogo>
      <Link to='/profile' style={{ textDecoration: 'none' }}>
           <Avatar src={currentUser?.img} >{currentUser?.name.charAt(0).toUpperCase()}</Avatar>
          </Link>
          </PictureLogo>
          <Welcome>{currentUser?.name}</Welcome> */}

          <Link
            to="/admin-dashboard"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Elements>
              <MdDashboard className="icons"/>
              <NavText>Dashboard</NavText>
            </Elements>
          </Link>
          <Link
            to="/admin-user"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Elements>
              <AdminIcon className="icons"/>
              <NavText>Users</NavText>
            </Elements>
          </Link>

          <Link
            to="/admin-podcast"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Elements>
              <SiApplepodcasts className="icons" />
              <NavText>Podcasts</NavText>
            </Elements>
          </Link>
          
          <Link
            to="/admin-blog"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Elements>
              <BiLogoBlogger className="icons" />
              <NavText>Blogs</NavText>
            </Elements>
          </Link>

          
        </>
      )}
      {!currentUser?.isAdmin && (
        <>
        <FlexSide>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo tyle={{ "padding-top":"30px",color: "inherit" }}>
            <Image src={LogoIcon} />
            PODSTREAM DAILY
          </Logo>
        </Link>
        <Close>
          <CloseRounded
            onClick={() => setMenuOpen(false)}
            style={{ cursor: "pointer" }}
          />
        </Close>
      </FlexSide>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Elements>
              <FaHome className="icons" />
              <NavText>Home</NavText>
            </Elements>
          </Link>
          <Link
            to="/search"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Elements>
              <MdVideoLibrary className="icons"/>
              <NavText>Library</NavText>
            </Elements>
          </Link>
          <Link
            to="/blog"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Elements>
              <BiLogoBlogger className="icons"/>
              <NavText>Blogs</NavText>
            </Elements>
          </Link>
          
          
        </>
      )}
      {currentUser ? (
        <Link
          to="/favourites"
          style={{ textDecoration: "none", color: "inherit", width: "100%" }}
        >
          {/* <Elements>
            <AiFillHeart className="icons"/>
            <NavText>Favourites</NavText>
          </Elements> */}
        </Link>
      ) : (
        <Link
          onClick={() => dispatch(openSignin())}
          style={{ textDecoration: "none", color: "inherit", width: "100%" }}
        >
          {/* <Elements>
            <AiFillHeart className="icons" />
            <NavText>Favourites</NavText>
          </Elements> */}
        </Link>
      )}
      <Link
        onClick={() => {
          if (currentUser) {
            setUploadOpen(true);
          } else {
            dispatch(openSignin());
          }
        }}
        style={{ textDecoration: "none", color: "inherit", width: "100%" }}
      >
        <Elements>
          <FaCloudUploadAlt className="icons"/>
          <NavText>Add New Post</NavText>
        </Elements>
      </Link>

      {darkMode ? (
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
            <NavText>Light Mode</NavText>
          </Elements>
        </>
      )}
      {currentUser ? (
        <Elements onClick={() => logoutUser()}>
          <RiLogoutCircleLine className="icons" />
          <NavText>Log Out</NavText>
        </Elements>
      ) : (
        <Elements onClick={() => dispatch(openSignin())}>
          <RiLogoutCircleRLine className="icons"/>
          <NavText>Log In</NavText>
        </Elements>
      )}
    </MenuContainer>
  );
};

export default Menu;
