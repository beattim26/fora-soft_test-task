import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  box: {
    display: 'flex',
    alignItems: 'flex-end',
    padding: '10px',
  },
  selfBox: {
    justifyContent: 'flex-end'
  },
  paper: {
    padding: '5px 8px',
    margin: '0 5px',
  },
  textDate: {
    marginLeft: '15px',
    color: '#A9A9A9',
  }
}));
