import { React, useState, useEffect } from "react";
import './styles.css';
import {Link} from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from '@mui/material/Button';
import {useParams} from "react-router-dom";
import { PutWithAuth } from '../../service/HttpService';
const Rece = ({ list, type_receipts,nations, ingList}) => 

{
    const userId = localStorage.getItem("currentUser");
    const {receipt_id} =useParams();

        function submitLiking(name) {
            PutWithAuth("/"+name+"/" + userId,
          {login_id:userId,
          recept_id:receipt_id,}
          )
        .then(res => res.text())
        .then(
            (result) => {
                alert(result);
            },
            (error) => {
                alert(error)
            }
        )
          }
    
return (

    <div className='listItem-wrap'>
        <img src={list.photo} alt='' />

        <header>
            <Link to={`/receipt/${list.recept_id}`}>
                {list.recept_name}
            </Link>

            <span><StarIcon/>{list.ratinglvl}</span>
        </header>
        <p>

        <b>{type_receipts?.find(x => x.type_id === list.type_id)?.type_name},{nations?.find(x => x.nation_id === list.nation_id)?.nation_name}
 </b>
 
        </p>
        <p>
            <b>{!list.isvegan ? "" : "/ Vegan"}</b>
            <b>{!list.isvegetarian ? "" : "/ Vegetarian"}</b>
        </p>
        <p>
            <b> {list.ingredient?.map((element) => {
        return ingList?.find(x => x.id === element)?.name+ " "
    })}
            </b>

        </p>
        <footer>


            <p>
                <b>Level of Difficulty: {list.level_id} </b>
                <b> <VisibilityIcon/> {list.recept_view}</b>
            </p>

        </footer>
        {userId? <Button variant="outlined" onClick={() => submitLiking("favorite")}>Favorite</Button>
 : "" }
  {userId?         <Button variant="outlined" onClick={() => submitLiking("remember")}>Remember</Button>
 : "" }
   {userId? <Button variant="outlined" onClick={() => submitLiking("tried")}>Tried</Button>
 : "" }
        


    </div>
)};

export default Rece;
