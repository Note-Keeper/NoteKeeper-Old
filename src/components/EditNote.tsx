import React, {useState} from 'react'
import styled from 'styled-components'

import SaveIcon from '../assets/icons/save.svg'
import CancelIcon from '../assets/icons/cancel.svg'

function EditNote(props: any) {
    const [title, setTitle] = useState(props.title)
    const [desc, setDesc] = useState(props.body)
    const changeTitleHandler = (event:any) => {
        const value = event.target.value
        setTitle(value)
    }
    const changeDescHandler = (event:any) => {
        const value = event.target.value
        setDesc(value)
    }

    const editNote = () => {
        const note = {
            _id: props._id,
            title: title,
            body: desc
        }
        props.onEdit(note);
    }
    
    const cancelNote = () => {
        props.onCancel();
    }

    return (
        <Container>
            <Content>
                <Input type="text" value={title} onChange={changeTitleHandler}/>
                <Textarea defaultValue={desc} onChange={changeDescHandler}></Textarea>
            </Content>
            <Id>ID: {props._id}</Id>
            <ButtonCancel onClick={() => cancelNote()}><img src={CancelIcon}/></ButtonCancel>
            <Button onClick={() => editNote()}><img src={SaveIcon}/></Button>
        </Container>
    )
}

const Id = styled.div`
display:inline-block;
color:gray;
margin:10px;
@media (max-width: 768px) {
    display:none;
}
`

const Container = styled.div`
margin:3px auto;
max-width:100%;
width:900px;
`

const Content = styled.div`
background-color:#fff;
border-radius:10px;
text-align: left;
width:100%;
box-sizing:border-box;
position:relative;
text-align:center;
border:none;
@media (max-width: 768px) {
    background-color:transparent !important;
}`

const Input = styled.input`
display:block;
padding: 20px;
font-size:20px;
color: #262626;
background:transparent;
background-clip: padding-box;
border:none;
border-radius: .25rem;
width:100%;
box-sizing:border-box;
font-family:rubik;
outline:none;
font-weight:bold;
`

const Textarea = styled.textarea`
display:block;
padding: 20px;
font-size:18px;
color: #262626;
background:transparent;
background-color: padding-box;
border:none;
border-radius: .25rem;
font-family:rubik;
width:100%;
height:300px;
resize: none;
box-sizing:border-box;
outline:none;
`

const Button = styled.button`
margin:10px;
float:right;
display:block;
background:#00647d;
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
    background:#137c96;        
}`

const ButtonCancel = styled.button`
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

export default EditNote