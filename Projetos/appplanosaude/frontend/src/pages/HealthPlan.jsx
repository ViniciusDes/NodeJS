import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridMUI from '../components/TableHealthPlan/index';
import ButtonMUI from '../components/Button/index';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import { Link } from 'react-router-dom';
import FormValidation from '../pages/FormValidation';
const useStyles = makeStyles({
  content: {
    width: '100%',
    height: '100%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBody: {
    border: '1px solid #207eb8',
    borderRadius: 5,

    width: '80%',
    height: '80%',

    position: 'relative',
  },
  contentGrid: {
    height: '80%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  header: {
    // marginTop: 5,
    marginLeft: 5,
  },
  button: {
    margin: 5,
    background: '#F59D3A',
    color: '#FFFFFF',
    height: '35px',
    fontSize: '12px',
  },
});

const MainHealthPLan = () => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleReport() {}

  return (
    <div className={styles.content}>
      <div className={styles.contentBody}>
        <div className={styles.header}>
          <ButtonMUI
            text="Nova Validação"
            icon={<AddCircleOutlineIcon />}
            click={() => setOpen(true)}
          />

          <ButtonMUI
            text="Relatorio"
            classe={styles.button}
            click={handleReport}
          />
        </div>
        <div className={styles.contentGrid}>
          <GridMUI />
        </div>
        <FormValidation open={open} close={() => setOpen(false)} />
      </div>
    </div>
  );
};

export default MainHealthPLan;
