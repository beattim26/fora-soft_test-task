import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  card: {
    padding: '25px',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardHeader: {
    padding: '0',
  },
  closeIcon: {
    padding: '0',
  },
  moreIcon: {
    padding: '0',
    marginTop: '-8px',
    marginRight: '-8px',
  },
}));
