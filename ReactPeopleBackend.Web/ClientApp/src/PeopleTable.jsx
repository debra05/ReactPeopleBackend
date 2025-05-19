
import React from 'react';
import axios from 'axios';
import PersonForm from './PersonForm';
import PersonRow from './PersonRow';

class PeopleTable extends React.Component {
    state = {
        person: {
            id: 0,
            firstName: '',
            lastName: '',
            age: ''

        },
        people: [],
        checkedPeople: [],
        isUpdating:false
    }

    componentDidMount() {
        this.loadPeople();
    }

    loadPeople = () => {
        axios.get('/api/people/getall').then(({ data }) => {
            this.setState({ people: data });
        });
    }

    onAddClick = () => {
        axios.post('/api/people/add', this.state.person).then(() => {
            this.setState({ person: { id: 0, firstName: '', lastName: '', age: '' } });
            this.loadPeople();
        })
    }

    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }

    onDeleteClick = (id) => {
        axios.post('/api/people/delete', { id: id }).then(() => {
            this.loadPeople();
        })
    }

    onDeleteAllClick = () => {
        axios.post('/api/people/deleteall', { ids: this.state.checkedPeople }).then(() => {
            this.loadPeople();
        })
    }

    onCheckboxClick = (id) => {
        const { checkedPeople } = this.state;
        if (checkedPeople.includes(id)) {
            this.setState({ checkedPeople: checkedPeople.filter(p => p !== id) });
        } else {
            this.setState({ checkedPeople: [...checkedPeople, id] });
        }
    }

    onEditClick = (p) => {
        this.setState({ person: p, isUpdating: true });
    }

    onUpdateClick = () => {
        axios.post('/api/people/update', this.state.person).then(() => {
            this.setState({
                person: { id: 0, firstName: '', lastName: '', age: '' },
                isUpdating: false
            }); 
            this.loadPeople();
        })
    }

    onCancelClick = () => {
        this.setState({
            person: { id: 0, firstName: '', lastName: '', age: '' },
            isUpdating: false
        });

    }

    render() {
        const { people, person, checkedPeople } = this.state;

        return (
            <div className="container" style={{ marginTop: 60 }}>
                <PersonForm
                    isUpdating={this.state.isUpdating}
                    person={person}
                    onAddClick={this.onAddClick}
                    onCancelClick={this.onCancelClick}
                    onTextChange={this.onTextChange}
                    onUpdateClick={this.onUpdateClick}
                />
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th style={{ width: '15%' }}>
                                <button className="btn btn-danger w-100" onClick={this.onDeleteAllClick} disabled= {checkedPeople.length === 0} >Delete All</button>
                                <button className="btn btn-outline-danger w-100 mt-2" onClick={() => this.setState({ checkedPeople: people.map(p => p.id) })}>Check All</button>
                                <button className="btn btn-outline-danger w-100 mt-2" onClick={() => this.setState({ checkedPeople: [] })}>Uncheck All</button>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map(p => <PersonRow
                            key={p.id} person={p} 
                            onEditClick={() => this.onEditClick(p)}
                            isChecked={checkedPeople.includes(p.id)}
                            onCheckboxClick={() => this.onCheckboxClick(p.id)}
                            onDeleteClick={() => this.onDeleteClick(p.id)}

                        />)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PeopleTable;
