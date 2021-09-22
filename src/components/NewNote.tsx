import React, {useState} from 'react'
import styled from 'styled-components'

function NewNote(props: any) {

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [showForm, setShowForm] = useState(false)
    const changeTitleHandler = (event:any) => {
        const value = event.target.value
        setTitle(value)
    }
    const changeDescHandler = (event:any) => {
        const value = event.target.value
        setDesc(value)
    }
    const addNote = () => {
        const note = {
            title: title,
            body: desc
        }
        props.onAdd(note)
        setTitle('')
        setDesc('')
        setShowForm(false)
    }

    return (
        showForm ? (
        <Container>
            <label>Tytuł:</label>
            <Input type="text" value={title} onChange={changeTitleHandler}/>
            <label>Opis:</label>
            <Input type="text" value={desc} onChange={changeDescHandler}/>

            <Button onClick={() => addNote()}>Dodaj Notatkę</Button>
        </Container>
        ) : (
            <NewNoteButton onClick={() => setShowForm(true)}>Nowa Notatka</NewNoteButton>
        )
    )
}

const Container = styled.div`
background-color:#fff;
border-radius:6px;
padding:12px 20px;
text-align: left;
margin:10px auto;
max-width:90vw;
box-sizing:border-box;
width:800px;
position:relative;`

const Input = styled.input`
display:block;
padding: .375rem .75rem;
font-size:0.9rem;
color: #262626;
background-color:#fff;
background-clip: padding-box;
border: 1px solid #e3e3e3 !important;
border-radius: .25rem;
font-family:rubik;`

const Button = styled.button`
margin:10px 0;
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

const NewNoteButton = styled.button`
display:block;
margin:18px auto;
background-color:#00647d;
border:0;
color:#fff;
border-radius:8px;
padding:8px 12px;
cursor:pointer;
transition: .2s all;
font-size: 20px;
&:hover {
    background-color:#137c96;        
}`

export default NewNote