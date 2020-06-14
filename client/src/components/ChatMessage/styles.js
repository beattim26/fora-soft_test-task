import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  box: {
    display: 'flex',
    alignItems: 'flex-end',
    padding: '10px',
  },
  selfBox: {
    justifyContent: 'flex-end',
  },
  paper: {
    padding: '5px 8px',
    margin: '0 5px',
    maxWidth: '440px',
    wordWrap: 'break-word',
  },
  textDate: {
    color: '#A9A9A9',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));
