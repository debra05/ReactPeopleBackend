export default function PersonForm({ person, onTextChange, onAddClick, onUpdateClick, onCancelClick,isUpdating}) {
    const { firstName, lastName, age } = person;
    return (
        <div className="row" style={{ marginBottom: 20 }}>
            <div className="col-md-3">
                <input type="text" className="form-control" value={firstName} placeholder="First Name" name="firstName" onChange={onTextChange}></input>
            </div>
            <div className="col-md-3">
                <input type="text" className="form-control" value={lastName} placeholder="Last Name" name="lastName" onChange={onTextChange}></input>
            </div>
            <div className="col-md-3">
                <input type="text" className="form-control" value={age} placeholder="Age" name="age" onChange={onTextChange}></input>
            </div>
            <div className="col-md-3">
                { !isUpdating ?<button className="btn btn-primary w-100" onClick={onAddClick}>Add</button>
                    : <div>
                        <button className="btn btn-warning w-100" onClick={onUpdateClick}>Update</button>
                        <button className="btn btn-dark w-100 mt-2" onClick={onCancelClick}>Cancel</button>
                    </div>}
            </div>
        </div>
    )
}