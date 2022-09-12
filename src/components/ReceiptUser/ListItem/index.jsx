import React from 'react';
import './styles.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';
import ShuffleIcon from "@mui/icons-material/Shuffle";
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import {useParams} from "react-router-dom";
import { DeleteWithAuthBody } from '../../../service/HttpService';
const ListItem = ({

  item: { recept_id,recept_name,ratinglvl, level_id, recept_view, type_id, nation_id,ingredient ,photo,isvegan,isvegetarian},
                      type_receipts, nations, ingList,
}) => {
  const userId = localStorage.getItem("currentUser");
        function deleteLiking(name) {
          DeleteWithAuthBody("/"+name+"/" + userId,
          {login_id:userId,
          recept_id:recept_id,}
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
      <img src={photo} alt='' />
      <header>
          <Link to={`/receipt/${recept_id}`}>
           {recept_name}
          </Link>

      <span><StarIcon/>{ratinglvl}</span>
    </header>
      <p>

          <b>{type_receipts?.find(x => x.type_id === type_id)?.type_name}, {nations?.find(x => x.nation_id === nation_id)?.nation_name}</b>

      </p>
      <p>
          <b>{!isvegan ? "" : "/ Vegan"}</b>
          <b>{!isvegetarian ? "" : "/ Vegetarian"}</b>
      </p>
      <p>
          <b> {ingredient?.map((element) => {
             return ingList?.find(x => x.id === element)?.name+ " "
          })
          }
          </b>

      </p>
    <footer>


      <p>
        <b>Level of Difficulty: {level_id} </b>
          <b> <VisibilityIcon/> {recept_view}</b>
      </p>

    </footer>
    {(userId && window.location.pathname=="/favorite")?     <Button variant="outlined" onClick={() => deleteLiking("favorite")}>Favorite</Button>
 : "" }
  {(userId && window.location.pathname=="/remember")?            <Button variant="outlined" onClick={() => deleteLiking("remember")}>Remember</Button>
 : "" }
   {(userId && window.location.pathname=="/tried")?     <Button variant="outlined" onClick={() => deleteLiking("tried")}>Tried</Button>
 : "" }
  </div>
)};

export default ListItem;
