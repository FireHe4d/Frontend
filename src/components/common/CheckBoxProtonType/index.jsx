import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles({
  root: {
    '&$checked': {
      color: '#000',
    },
  },
  checked: {},
  wrap: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 0,
  },
  label: {
    fontSize: '.8rem',
    fontFamily: `'Raleway', sans-serif`,
  },
});

export const CheckboxProtonType = ({ changeCheckedType, typeofDish }) => {
  const classes = useStyles();
  const { type_id, type_name, description,checked } = typeofDish;
  return (
    <div>
      <FormControlLabel
        classes={{
          label: classes.label,
          root: classes.wrap,
        }}
        control={
          <Checkbox
            classes={{
              checked: classes.checked,
              root: classes.root,
            }}
            size='small'
            checked={checked}
            onChange={() => changeCheckedType(type_id)}
            inputProps={{ 'aria-label': 'checkbox with small size' }}
          />
        }
        label={type_name}
      />
    </div>
  );
};
export const CheckboxProtonNation = ({ changeCheckedNation, nation }) => {
    const classes = useStyles();
    const { checked, nation_name, nation_id } = nation;
    return (
        <div>
            <FormControlLabel
                classes={{
                    label: classes.label,
                    root: classes.wrap,
                }}
                control={
                    <Checkbox
                        classes={{
                            checked: classes.checked,
                            root: classes.root,
                        }}
                        size='small'
                        checked={checked}
                        onChange={() => changeCheckedNation(nation_id)}
                        inputProps={{ 'aria-label': 'checkbox with small size' }}
                    />
                }
                label={nation_name}
            />
        </div>
    );
};

