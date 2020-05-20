import React from 'react';

class PersonForm extends React.Component {

    render() {
        const { firstName, lastName, age } = this.props.person
        const { handleTextChange, Edit, onAddClick, onUpdateClick } = this.props;
        return (
            <div className="row" style={{ marginBottom: 30 }}>

                <div className="col-md-2">
                    <input
                        className='form-control'
                        type='text'
                        value={firstName}
                        placeholder='First Name'
                        onChange={handleTextChange}
                        name='firstName' />
                </div>
                <div className="col-md-2">
                    <input
                        className='form-control'
                        type='text'
                        value={lastName}
                        placeholder='Last Name'
                        onChange={handleTextChange}
                        name='lastName' />
                </div>
                <div className="col-md-2">
                    <input
                        className='form-control'
                        type='text'
                        value={age}
                        placeholder='Age'
                        onChange={handleTextChange}
                        name='age' />
                </div>
                <div className="col-md-2">
                    {Edit && <button className='btn btn-success btn-block' onClick={onUpdateClick}>Update</button>}
                    {!Edit && <button className='btn btn-primary btn-block' onClick={onAddClick}>Add</button>}

                </div>
            </div>

        )
    }
}
export default PersonForm;