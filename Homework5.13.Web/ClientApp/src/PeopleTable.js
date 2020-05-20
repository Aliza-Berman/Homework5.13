import React from 'react';
import PersonRow from './PersonRow';
import PersonForm from './PersonForm';
import axios from 'axios';
import { produce } from 'immer';
class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        edit: false,
        selectedPeople: []
    }
    componentDidMount = () => {
        axios.get('/api/people/getall').then(response => {
            const people = response.data;
            this.setState({ people });
        });
    }
    handleTextChange = e => {
        const NextState = produce(this.state, draft => {
            draft.person[e.target.name] = e.target.value;
        });
        this.setState(NextState);
    }
    onAddClick = () => {
        axios.post('/api/people/add', { ...this.state.person, age: +this.state.person.age })
            .then(() => {
                axios.get('/api/people/getall').then(response => {
                    const people = response.data;
                    this.setState({ people, person: { firstName: '', lastName: '', age: '' } });
                });
            });
    }
    onEditClick = person => {
        this.setState({ person, edit: true })
    }
    onUpdateClick = person => {
        axios.post('/api/people/update', { ...this.state.person, age: +this.state.person.age, id: +this.state.person.id })
            .then(() => {
                axios.get('/api/people/getall').then(response => {
                    const people = response.data;
                    this.setState({ people, person: { firstName: '', lastName: '', age: '' } });
                });
            });
    }
    onDeleteClick = id => {
        axios.post('/api/people/delete', { id })
            .then(() => {
                axios.get('/api/people/getall').then(response => {
                    const people = response.data;
                    this.setState({ people, person: { firstName: '', lastName: '', age: '' } });
                });
            });
    }

    handleDeleteChange = person => {
        const nextState = produce(this.state, draft => {
            draft.selectedPeople.push(person);
        });
        this.setState(nextState);
    }


    onSelectAllClick = () => {
        this.setState({ selectedPeople: this.state.people.map(p => p) });
    }

    onUnCheckAllClick = () => {
        this.setState({ selectedPeople: [] });
    }
    onDeleteAllClick = () => {
        this.state.selectedPeople.map(p => {
            return axios.post('api/people/delete', p).then(() => {
                axios.get('api/people/getall').then(response => {
                    const people = response.data;
                    this.setState({ people, selectedPeople: [] });
                });
            });
        });
    }
    render() {
        return (
            <div className="container" style={{ marginTop: 40 }}>
                <PersonForm
                    person={this.state.person}
                    onAddClick={this.onAddClick}
                    onUpdateClick={this.onUpdateClick}
                    handleTextChange={this.handleTextChange}
                    Edit={this.state.Edit}
                />
                <div className="container" style={{ marginTop: 25, marginBottom: 25 }}>
                    <button className="btn btn-success" onClick={this.onSelectAllClick}>Select All</button>
                    <button style={{ marginLeft: 10 }} className="btn btn-success " onClick={this.onUnCheckAllClick}>UnCheck All</button>
                    <button style={{ marginLeft: 10 }} className="btn btn-danger" onClick={this.onDeleteAllClick}>Delete All</button>
                </div>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.people.map(person => <PersonRow
                            key={person.id}
                            person={person}
                            onEditClick={() => this.onEditClick(person)}
                            onDeleteClick={() => this.onDeleteClick(person.id)}
                            selectedToDelete={this.state.selectedPeople.includes(person)}
                            handleDeleteChange={() => this.handleDeleteChange(person)} />)}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default PeopleTable;