import React from 'react';

class PersonRow extends React.Component {
    render() {
        const { firstName, lastName, age } = this.props.person;
        const { onEditClick, onDeleteClick, handleDeleteChange, selectedToDelete } = this.props;
        return (
            <tr>
                <td>
                    <input
                        checked={selectedToDelete}
                        onChange={handleDeleteChange}
                        type="checkbox"
                        className="form-control" />
                </td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{age}</td>
                <td><button className='btn btn-success btn-block' onClick={onEditClick}>Edit</button></td>
                <td><button className='btn btn-danger btn-block' onClick={onDeleteClick}>Delete</button></td>
            </tr>)
    }
}
export default PersonRow;