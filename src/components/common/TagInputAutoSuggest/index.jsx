import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
//{ changeCheckedType, typeofDish }
export default function CheckboxesTags({ ing1, changeIngre, ingredient }) {
  return (
      <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={ingredient}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name}
          ing1={ing1}

          renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                />
                {option.name}
              </li>
          )}
          style={{ width: '100%' }}
          onChange={changeIngre}
          renderInput={(params) => (
              <TextField {...params} label="Filter with ingredients?" placeholder="Ex: Potato" />
          )}

      />
  );
}

