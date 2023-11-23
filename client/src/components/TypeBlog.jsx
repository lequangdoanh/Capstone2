import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
padding: 4px 10px;
align-items: center;
text-align: center;
background: rgb(141, 140, 140);
border-radius: 13px;
color: white;
&:hover{
  cursor: pointer;
  transform: translateY(-8px);
  transition: all 0.4s ease-in-out;
  box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
  filter: brightness(1.3);
}
@media (max-width: 768px) {
  width: 75px;
}
`
const DefaultCardText = styled.div`
display: flex;
font-size:10px;
font-weight:600;

`
// const DefaultCardImg=styled.img`
// height:90px;
// width:80px;
// object-fit: cover;
// clip-path: polygon(0 0, 100% 0, 100% 66%, 0 98%);
// transform:rotate(20deg);
// `
// const FlexContainer = styled.div`
// width: 100%;
// height: 100%;
// display: flex;
// justify-content: flex-end;
// align-items: flex-end;
// `
export const TypeBlog = ({category}) => {
  return (
    <Card >
        <DefaultCardText>
            <div style={{"color":`${category.color}`}}>• </div>{category.name}
        </DefaultCardText>
    </Card>
  )
}
