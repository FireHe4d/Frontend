import React from 'react';
import { veganList } from '../../../constants';
import {CheckboxProtonType,CheckboxProtonNation} from '../../common/CheckBoxProtonType';
import FilterListToggle from '../../common/FilterListToggle';
import {SliderProtonDiff, SliderProtonRat, SliderProtonView} from '../../common/SliderProtonView';
import CheckboxesTags from '../../common/TagInputAutoSuggest';

import './styles.css';
import Divider from "@material-ui/core/Divider";

const FilterPanel = ({
  selectedVegan,
  selectVegan,
  type_receipts,
  changeCheckedType,
  nations,
  changeCheckedNation,
  selectedDiff,
  changeDiff,
  selectedView,
  changeView,
  selectedRating1,
  changeRating1,
  nulifyVegan,
                         ingList,
                         changeIngre,
                         ing1List,
}) => (
  <div>

    {/*Type*/}
    <div className='input-group'>

        <p className='label'>Type</p>
      {type_receipts.map((typeofDish) => (
        <CheckboxProtonType
          key={typeofDish.type_id}
          typeofDish={typeofDish}
          changeCheckedType={changeCheckedType}
        />
      ))}
    </div>
    {/*Nation*/}
    <div className='input-group'>
      <p className='label'>Nation</p>
      {nations.map((nation) => (
        <CheckboxProtonNation
          key={nation.nation_id}
          nation={nation}
          changeCheckedNation={changeCheckedNation}
        />
      ))}
    </div>
    {/*Vegan And vegat*/}
    <div className='input-group'>
      <p className='label'>Category</p>
      <FilterListToggle
        options={veganList}
        value={selectedVegan}
        selectToggle={selectVegan}
      />
      <button className="glow-on-hover" type="button" onClick={nulifyVegan}>Clear</button>


    </div>

    {/*diff*/}
    <div className='input-group'>
      <p className='label-range'>Difficulty</p>
      <SliderProtonDiff value={selectedDiff} changeDiff={changeDiff} />
    </div>
    {/*rat1*/}
    <div className='input-group'>
      <p className='label-range'>Rating</p>
      <SliderProtonRat value={selectedRating1} changeRat={changeRating1} />
    </div>
    {/*View*/}
    <div className='input-group'>
      <p className='label-range'>View</p>
      <SliderProtonView value={selectedView} changeView={changeView} />
    </div>

    {/*Ingredient*/}
      <div className='input-group'>
          <p className='label'>Ingredient</p>
          <CheckboxesTags
              ing1={ing1List}
    ingredient={ingList}
                changeIngre={changeIngre} ></CheckboxesTags>

      </div>


  </div>

);

export default FilterPanel;
