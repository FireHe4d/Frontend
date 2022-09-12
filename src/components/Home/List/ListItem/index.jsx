import React from 'react';
import './styles.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';
import ShuffleIcon from "@mui/icons-material/Shuffle";
import {Link} from "react-router-dom";
const ListItem = ({

  item: { recept_id,recept_name,ratinglvl, level_id, recept_view, type_id, nation_id,ingredient ,photo,isvegan,isvegetarian},
                      type_receipts, nations, ingList,
}) => (
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
  </div>
);

export default ListItem;
