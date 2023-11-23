import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getPodcastByCategory, getMostPopularPodcast } from '../api/index.js';
import styled from 'styled-components';
import { PodcastCard } from '../components/PodcastCard.jsx';
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackbarSlice";
import { displayPodcastFailure } from '../redux/userSlice.jsx';
import { CircularProgress } from '@mui/material';
import useFetch from "../hooks/useFetch.js";

const DisplayMain = styled.div`
display: flex;
padding: 30px 30px;
flex-direction: column;
height: 100%;
overflow-y: scroll;
`
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
`;
const Podcasts = styled.div`
display: flex;
flex-wrap: wrap;
height: 100%;
gap: 10px;
padding: 30px 0px;
`
const Container = styled.div`
background-color: ${({ theme }) => theme.bg};
padding: 20px;
border-radius: 6px;
min-height: 400px;
`

const Loader = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
`
const DisplayNo = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
color: ${({ theme }) => theme.text_primary};
`




const Analyst = () => {
    const { type } = useParams();
    const [podcasts, setPodcasts] = useState([]);
    const [string, setString] = useState("");
    const dispatch = useDispatch();
    const [Loading, setLoading] = useState(false);
    const { data } = useFetch("/podcasts");

    const images = [
        "https://i.pinimg.com/564x/84/ce/50/84ce50f71dfd4a4b3db86b04eb810177.jpg",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
        "https://i.pinimg.com/236x/5e/69/ba/5e69ba26282a2a2ee53d5257d56cf3d1.jpg",
        "https://i.pinimg.com/236x/02/f0/8d/02f08d0014fc0d505bff6e861653af95.jpg",
        "https://i.pinimg.com/564x/fc/50/df/fc50df38c060b706b32dd2aff1f54415.jpg",
      ];

    const mostPopular = async () => {
        await getMostPopularPodcast()
            .then((res) => {
                setPodcasts(res.data)
            })
            .catch((err) => {
                dispatch(
                    openSnackbar({
                        message: err.message,
                        severity: "error",
                    })
                );
            });
    }
    const getCategory = async () => {
        await getPodcastByCategory(type)
            .then((res) => {
                setPodcasts(res.data)
            })
            .catch((err) => {
                dispatch(
                    openSnackbar({
                        message: err.message,
                        severity: "error",
                    })
                );
            });

    }

    const getallpodcasts = async () => {
        if (type === 'mostpopular') {
            setLoading(true);
            let arr = type.split("");
            arr[0] = arr[0].toUpperCase();
            arr.splice(4, 0, " ");
            setString(arr.join(""));
            console.log(string);
            await mostPopular();
            setLoading(false);
        }
        else {
            setLoading(true);
            let arr = type.split("");
            arr[0] = arr[0].toUpperCase();
            setString(arr);
            await getCategory();
            setLoading(false);
        }
    }

    useEffect(() => {
        getallpodcasts();

    }, [])
    return (
        <DisplayMain>
            <FilterContainer>
            <Container>
                <Topic>{string}</Topic>
                {Loading ? 
                <Loader>
                    <CircularProgress />
                </Loader>
                 :
                    <FilterContainer>
                        {podcasts.length === 0 && <DisplayNo>No Podcasts</DisplayNo>}
                        {data && images.map((img,i) => (
                            <div className="pListItem" key={i}>
                            <img
                              src={img}
                              alt=""
                              className="pListImg"
                            />
                            <div className="pListTitles">
                              <h1>{data[i]?.type}</h1>
                              <h2>{data[i]?.count} {data[i]?.type}</h2>
                            </div>
                          </div>
                        ))}
                        
                    </FilterContainer>
                }
            </Container>
            </FilterContainer>
        </DisplayMain>
    )
}

export default Analyst