import React from "react";
import "./Details.css"
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//display data
function Details(props) {
  const { _id, BoatID, FishType, Quantity } = props.user;


//delete data
const history = useNavigate();

const deleteHandler = async() =>{
  await axios.delete(`http://localhost:5005/users/${_id}`)
  .then(res =>res.data)
  .then(()=> history("/"))
  .then(()=> history("/addstock"))

}

  return (
    <div>
      <table className="details-table">
        <tbody>
          <tr>
            <th>Id</th>
            <td>{_id}</td>
          </tr>
          <tr>
            <th>Boat Id</th>
            <td>{BoatID}</td>
          </tr>
          <tr>
            <th>Fish Type</th>
            <td>{FishType}</td>
          </tr>
          <tr>
            <th>Quantity</th>
            <td>{Quantity}</td>
          </tr>
        </tbody>
      </table>
      <div className="button-group">
        <Link to = {`/addstock/${_id}`}>
        <button>Update</button>
        </Link>

        <button onClick ={deleteHandler}>Delete</button>
      </div>
    </div>
  );
}

export default Details;
