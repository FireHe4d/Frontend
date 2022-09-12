import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  thumb: {
    color: '#000',
  },
  rail: {
    color: `rgba(0, 0, 0, 0.26)`,
  },
  track: {
    color: '#000',
  },
});

export const SliderProtonView = ({ value, changeView }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Slider
        value={value}
        onChange={changeView}
        valueLabelDisplay='on'
        min={0}
        max={30000}
        classes={{
          thumb: classes.thumb,
          rail: classes.rail,
          track: classes.track,
        }}
      />
    </div>
  );
};
export const SliderProtonDiff = ({ value, changeDiff }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Slider
                value={value}
                onChange={changeDiff}
                valueLabelDisplay='on'
                min={0}
                max={10}
                classes={{
                    thumb: classes.thumb,
                    rail: classes.rail,
                    track: classes.track,
                }}
            />
        </div>
    );
};
export const SliderProtonRat = ({ value, changeRat }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Slider
                value={value}
                onChange={changeRat}
                valueLabelDisplay='on'
                min={0}
                max={10}
                classes={{
                    thumb: classes.thumb,
                    rail: classes.rail,
                    track: classes.track,
                }}
            />
        </div>
    );
};