import React from 'react'
import styled from "styled-components";
import Note from './SingleNote'
import NewNote from './NewNote'
import Modal from 'react-modal'
import EditNote from './EditNote'
import axios from '../axios'

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
            Moje Notatki
            <Author>by Mateusz Słotwiński</Author>
            </Title>
            <NewNote onAdd ={(note:any) => this.addNote(note)}/>

            <Modal isOpen={this.state.showEditModal} contentLabel="Edytuj Notatkę">
                <EditNote title={this.state.editNote.title} body={this.state.editNote.body} _id={this.state.editNote._id} onEdit={(note: any) => this.editNote(note)}/>
                <EditCancelButton onClick={ () => this.toggleModal() } >Anuluj</EditCancelButton>
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

const Author = styled.h2`
    margin:0;
    padding:0;
    text-align:center;
    color:#fff;
    font-size:20px;
    font-weight:400;`

const EditCancelButton = styled.button`
    margin:5px auto;
    display:block;
    background-color:#6d455e;
    border:0;
    color:#fff;
    border-radius:4px;
    padding:10px 25px;
    cursor:pointer;
    transition: .2s all;
    &:hover {
        background-color:#90597b;        
    }
    font-size:20px;`

export default Notes
