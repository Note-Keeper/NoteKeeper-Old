import React, {useState} from 'react'
import styled from "styled-components";

function Note (props: any) {
  
  const [showDesc, setShowDesc] = useState(true)

  const toggleDesc = () => {
    setShowDesc(!showDesc)
  }
  const editHandler = () => {
    props.onEdit({
      title:props.title,
      body: props.body,
      _id:props._id
    })
  }

    return (
      <Container>
        <NoteTitle onClick={toggleDesc}>{props.title}</NoteTitle>
        {showDesc && ( <NoteDescription>{props.body}</NoteDescription> )}
        <EditButton onClick={editHandler}>Edytuj</EditButton>
        <DeleteButton onClick={() => props.onDelete(props._id)}>Usuń</DeleteButton>
      </Container>
    );
  }

    const Container = styled.div`
    background-color:#fff;
    border-radius:6px;
    padding:12px 20px;
    text-align: left;
    margin:10px auto;
    max-width:90vw;
    width:800px;
    position:relative;`

  const NoteTitle = styled.p`
    color:#000;
    font-weight:bold;
    cursor:pointer;`

  const NoteDescription = styled.p`    
    color: #282c34;
    margin-bottom: 20px;
    white-space: pre-line`

  const EditButton = styled.button`
    margin:2px;
    background-color:#00647d;
    border:0;
    color:#fff;
    border-radius:4px;
    padding:4px 8px;
    cursor:pointer;
    transition: .2s all;
    &:hover {
        background-color:#137c96;        
    }`

  const DeleteButton = styled.button`
    margin:2px;
    background-color:#6d455e;
    border:0;
    color:#fff;
    border-radius:4px;
    padding:4px 8px;
    cursor:pointer;
    transition: .2s all;
    &:hover {
        background-color:#90597b;        
    }`
  
  export default Note