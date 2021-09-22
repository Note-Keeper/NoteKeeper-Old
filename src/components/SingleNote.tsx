import React from 'react'
import styled from "styled-components";
import DeleteIcon from '../assets/icons/cancel.svg'

function Note (props: any) {

  const editHandler = () => {
    props.onEdit({
      title:props.title,
      body: props.body,
      _id:props._id
    })
  }

    return (
      <Container>
        <Content onClick={editHandler}>
          <NoteTitle>{props.title}</NoteTitle>
          <NoteDescription>{props.body}</NoteDescription>
        </Content>
        <DeleteButton onClick={() => props.onDelete(props._id)}><img src={DeleteIcon}/></DeleteButton>
      </Container>
    );
  }

  const Container = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  `

    const Content = styled.div`
    background-color:#fff;
    border-radius:6px;
    padding:12px 20px;
    text-align: left;
    margin:10px;
    max-width:90vw;
    box-sizing:border-box;
    width:800px;
    position:relative;
    cursor: pointer;`

  const NoteTitle = styled.p`
    color:#000;
    font-weight:bold;`

  const NoteDescription = styled.p`    
    color: #282c34;
    margin-bottom: 20px;
    white-space: pre-line`

  const DeleteButton = styled.button`
    margin:10px;
    float:right;
    display:block;
    background:#6d455e;
    border:0;
    color:#fff;
    border-radius:4px;
    width:50px;
    height:50px;
    cursor:pointer;
    transition: .2s all;
    >img {
        width:100%;
        height:100%;
    }
    &:hover {
        background:#90597b;        
    }`
  
  export default Note