import React from 'react'
import styled from "styled-components";
import Note from './SingleNote'
import NewNote from './NewNote'
import Modal from 'react-modal'
import EditNote from './EditNote'
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
type MyState = { notes:any, showEditModal:boolean, editNote:any };
class Notes extends React.Component<MyProps, MyState> {
    
    constructor(props: any) {
        super(props)
        this.state = {
            notes: [],
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
        this.toggleModal();
      }

    toggleModal() {
        this.setState({showEditModal: !this.state.showEditModal})
    }

    editNoteHandler(note:any) {
        this.toggleModal();
        this.setState({ editNote: note })
    }
    render() {

        return (
            <div>
            <Title>
            <LogoImage src={Logo} alt="NoteKeeper"/>
            </Title>
            <NewNote onAdd ={(note:any) => this.addNote(note)}/>

            <Modal isOpen={this.state.showEditModal} style={editModal} contentLabel="Edytuj Notatkę">
                <EditNote title={this.state.editNote.title} body={this.state.editNote.body} _id={this.state.editNote._id} onEdit={(note: any) => this.editNote(note)} onCancel={() => this.toggleModal()}/>
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
    max-width:90vw;`

export default Notes
