import React, {useState} from 'react'
import styled from 'styled-components'


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

    return (
        <Container>
            <Label>Tytuł</Label>
            <Input type="text" value={title} onChange={changeTitleHandler}/>
            <Label>Opis</Label>
            <Textarea defaultValue={desc} onChange={changeDescHandler}></Textarea>
            <Id>ID: {props._id}</Id>
            <Button onClick={() => editNote()}>Zapisz Notatkę</Button>
        </Container>
    )
}

const Id = styled.div`
color:gray;
margin:10px;`

const Label = styled.label`
font-size:20px;
font-weight:bold`

const Container = styled.div`
background-color:#fff;
border-radius:6px;
padding:4px 20px;
text-align: left;
margin:3px auto;
max-width:90vw;
width:800px;
position:relative;
text-align:center;`

const Input = styled.input`
display:block;
margin:10px auto;
padding: .375rem .75rem;
font-size:20px;
color: #262626;
background-color:#fff;
background-clip: padding-box;
border: 1px solid #e3e3e3 !important;
border-radius: .25rem;
font-family:rubik;
width:400px;
text-align:center;`

const Textarea = styled.textarea`
display:block;
margin:10px auto;
padding: 20px;
font-size:18px;
color: #262626;
background-color:#fff;
background-clip: padding-box;
border: 1px solid #e3e3e3 !important;
border-radius: .25rem;
font-family:rubik;
width:500px;
height:200px;
resize: none;`

const Button = styled.button`
margin:10px auto 0 auto;
display:block;
background-color:#00647d;
border:0;
color:#fff;
border-radius:4px;
padding:10px 25px;
cursor:pointer;
transition: .2s all;
font-size:20px;
&:hover {
    background-color:#137c96;        
}`

export default EditNote