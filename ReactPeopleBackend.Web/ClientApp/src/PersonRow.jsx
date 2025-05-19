
export default function PersonRow({ person, onDeleteClick, isChecked, onCheckboxClick, onEditClick }) {
    const { firstName, lastName, age } = person;
    return (
        <tr>
            <td>
                <div className="d-flex justify-content-center align-items-center">
                    <input type="checkbox" checked={isChecked} onChange={onCheckboxClick} className="form-check-input mt-2" style={{ transform: "scale(1.5)" }}></input>
                </div>
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button className="btn btn-warning" onClick={onEditClick}>Edit</button>
                <button className="btn btn-danger" style={{ marginLeft: 10 }} onClick={onDeleteClick}>Delete</button>
            </td>
        </tr>
    )
}
