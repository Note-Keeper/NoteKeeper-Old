import React from 'react'
import styled from "styled-components";
import Note from './SingleNote'
import NewNote from './NewNote'
import Modal from 'react-modal'
import EditNote from './EditNote'
import AddIcon from '../assets/icons/add.svg'
import Logo from '../assets/notekeeper.png'
import axios from '../axios'

const editModal = {
    overlay: {
        backgroundColor:'#26262650'
    },
    content: {
        backgroundColor:'#f3f3f3f2',
        paddingLeft:'0',
        paddingRight:'0',
        border: 'none',
        width:'1200px',
        margin:'auto',
        maxWidth:'95vw',
        inset:'0',
        height:'700px',
        maxHeight:'70vh',
        borderRadius:'20px'
    },
};

type MyProps = { };
type MyState = { notes:any, showEditModal:boolean, showAddModal:boolean, editNote:any };
class Notes extends React.Component<MyProps, MyState> {
    
    constructor(props: any) {
        super(props)
        this.state = {
            notes: [],
            showAddModal: false,
            showEditModal: false,
            editNote: {}
        }
    }

    componentDidMount() {
        this.fechNotes();
        Modal.setAppElement('body');

    }

    async fechNotes() {
        const res = await axios.get('/notes')
        const notes = res.data
        this.setState({ notes })
    }

    async addNote(note:typeof notes) {
        let notes = this.state.notes
        // add to backend
        try {
            const res = await axios.post('/notes', note)
        const newNote = res.data
        // add to frontend
        notes.push(newNote)
        this.setState({ notes })
        } catch (err) {
            console.log(err)
        }
        this.toggleAddModal();
    }

    async deleteNote(id:any) {
        let notes = this.state.notes.filter((note: { _id: any; }) => note._id !== id)
        await axios.delete('/notes/' + id)
        this.setState({ notes })
    }

    async editNote(note: { _id: any; }) {
        // edit backend
        await axios.put('/notes/' + note._id, note);
    
        // edit frontend
        const notes = [...this.state.notes];
        const index = notes.findIndex(x => x._id === note._id);
        if (index >= 0) {
          notes[index] = note;
          this.setState({ notes });
        }
        this.toggleEditModal();
      }

    toggleEditModal() {
        this.setState({showEditModal: !this.state.showEditModal})
    }

    toggleAddModal() {
        this.setState({showAddModal: !this.state.showAddModal})
    }

    editNoteHandler(note:any) {
        this.toggleEditModal();
        this.setState({ editNote: note })
    }
    render() {

        return (
            <div>
            <Title>
                <LogoImage src={Logo} alt="NoteKeeper"/>
            </Title>

            <NewNoteCont>
                <NewNoteButton onClick={() => this.toggleAddModal()}><img src={AddIcon}/></NewNoteButton>
                <span>Dodaj notatkę</span>
                <Modal isOpen={this.state.showAddModal} style={editModal} contentLabel="Dodaj Notatkę">
                    <NewNote onAdd ={(note:any) => this.addNote(note)} onCancel={() => this.toggleAddModal()}/>
                </Modal>
            </NewNoteCont>

            <Modal isOpen={this.state.showEditModal} style={editModal} contentLabel="Edytuj Notatkę">
                <EditNote title={this.state.editNote.title} body={this.state.editNote.body} _id={this.state.editNote._id} onEdit={(note: any) => this.editNote(note)} onCancel={() => this.toggleEditModal()}/>
            </Modal>

                {this.state.notes.map((note: { _id: any; title: any; body: any; }) => (
                        <Note
                        key={note._id}
                        _id={note._id}
                        title={note.title}
                        body={note.body}
                        onEdit={(note: any) => this.editNoteHandler(note)}
                        onDelete ={() => this.deleteNote(note._id)}
                        />
                    )
                )}
            </div>
        )
    }
} 

const Title = styled.div`
    margin:10px;
    padding:10px;
    text-align:center;
    color:#fff;
    font-size:48px;`

const LogoImage = styled.img`
    margin:0 auto;
    max-width:90vw;
`
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

const NewNoteCont = styled.div`
display:flex;
justify-content:center;
align-items:center;
font-size:20px;
color:#e3e3e3;
font-weight:bold;
`



export default Notes
