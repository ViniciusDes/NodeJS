import React, { useState, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import api from '../services/api';
import { makeStyles } from '@material-ui/core/styles';
import { FiPlus } from 'react-icons/fi';
// import { FiPlus } from 'react-icons/fi';
import Checkbox from '@material-ui/core/Checkbox';
import CalendarMUI from '../components/Calendar/index';
// import apiAudit from '../services/apiAudit';AiOutlineLoading3Quarters
import axios from 'axios';
// import { DataUsage } from '@material-ui/icons';
import swal from 'sweetalert';
import GifLoading from '../components/GifLoading/index';
import AlertDialog from '../components/Alert/index';
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const stylesApp = makeStyles({
  contentDialog: {
    width: '80%',
    height: '80%',
  },
  select: {
    width: '35%',
    // margin: 5,
    margin: '15px',
  },
  contentSelectFiles: {
    display: 'flex',
    // margin: '5px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
    width: '35%',
    alignItems: 'center',
    margin: '15px',
  },
  contentDialod: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  inboxSelect: {
    display: 'flex',
    alignItems: 'center',
  },
  headerDialog: {
    background: '#F59D3A',
    color: '#fff',
  },
  contentCalendar: {
    marginLeft: '10px',
  },
  Alert: {
    width: '20%',
    heigth: '10%',
  },
  buttonAlert: {
    background: '#207eb8',
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const FormValidation = ({ open, close }) => {
  const styles = stylesApp();
  const [openSelect, setOpenSelect] = useState(false);
  const [openSelectSubs, setOpenSelectSubs] = useState(false);
  const [openAlertLoading, setOpenAlertLoading] = useState(false);
  const [startHandleSubsidiarys, setStartHandleSubsidiarys] = useState(false);
  const [subsidiarys, setSubsidiarys] = useState(['1', '2']);
  const [descSubsidiary, setDescSubsidiary] = useState('');
  const [
    descriptionInputFileMensality,
    setDescriptionInputFileMensality,
  ] = useState('Arquivo(s) mensalidade');
  const [
    descriptionInputFileCoparticipation,
    setDescriptionInputFileCoparticipation,
  ] = useState('Arquivo(s) coparticipação');
  const formikRef = useRef(null);

  const [initialValues] = useState({
    descCompany: '',
    descSubsidiary: '',
    // subsidiarys: [''],
    companys: [''],
    filesMensality: [{}],
    filesCoparticipation: [{}],
    period: '',
    allCodSubsidiarys: [''],
    checkedAllSubsidiarys: false,
  });

  // };

  const handleClose = () => {
    setOpenSelect(false);
  };

  const handleOpen = () => {
    setOpenSelect(true);
  };

  const handleCloseSubs = () => {
    setOpenSelectSubs(false);
  };

  const handleOpenSubs = () => {
    initialValues.checkedAllSubsidiarys === false && setOpenSelectSubs(true);
  };

  const handleChangeCalendar = ev => {
    initialValues.period = ev.target.value.substr(0, 7).replace('-', '');
  };

  function handleFilesMensality(ev) {
    if (!ev.target.files) {
      return;
    }

    const filesSelected = ev.target.files;
    initialValues.filesMensality = filesSelected;
    setDescriptionInputFileMensality(
      `${filesSelected.length} arquivos foram selecionados`,
    );
    console.log(filesSelected);
  }

  function handleFilesCoparticipation(ev) {
    if (!ev.target.files) {
      return;
    }

    const filesSelected = ev.target.files;
    initialValues.filesCoparticipation = filesSelected;
    setDescriptionInputFileCoparticipation(
      `${filesSelected.length} arquivos foram selecionados`,
    );
    // console.log(filesSelected);
  }

  async function handleSubsidiarys(values) {
    api
      .get(
        `/Subsidiarys?nameCompany=${values.descCompany.substr(
          6,
          values.descCompany.length,
        )}`,
      )
      .then(dt => {
        setSubsidiarys(dt.data.message[0]);
        // console.log(dt);s;
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function handleChangeSelectCompany(values, e) {
    setDescSubsidiary('');
    values.descCompany = e.target.value.trimRight();
    await handleSubsidiarys(values);
  }

  async function handleChangeSubsidiary(values, e) {
    setDescSubsidiary(e.target.value);
    initialValues.descSubsidiary = e.target.value;
  }

  async function checkTaskCompleted(idTask) {
    const res = await api
      .get(`/Task/${idTask}`)
      .then(dt => {
        const taskStatus = dt.data.message[0].TASK_STATUS;
        // console.log(taskStatus);
        return taskStatus;
      })
      .catch(err => {
        console.log(err);
        return -1;
      });

    return res;
  }

  useEffect(() => {
    api
      .get('/Index')
      .then(dt => {
        var uniqueNames = [];
        for (var i = 0; i < dt.data.message[0].length; i++) {
          if (
            uniqueNames.indexOf(
              `${dt.data.message[0][i].APS_COD_EMPRESA.trimRight()} - ${
                dt.data.message[0][i].APS_DESC_EMPRESA
              }`,
            ) === -1
          ) {
            uniqueNames.push(
              `${dt.data.message[0][i].APS_COD_EMPRESA.trimRight()} - ${
                dt.data.message[0][i].APS_DESC_EMPRESA
              }`,
            );
          }
        }
        initialValues.companys = uniqueNames;
      })
      .catch(err => console.log(err));
  }, []);

  async function onSubmit(values, actions) {
    // console.log(values);
    // console.log(actions);

    var data = new FormData();
    for (var i = 0; i < values.filesMensality.length; i++) {
      data.append('Files', values.filesMensality[i]);
    }
    for (var j = 0; j < values.filesCoparticipation.length; j++) {
      data.append('FileCoparticipation', values.filesCoparticipation[j]);
    }
    data.append('CompanyID', values.descCompany.substr(0, 3));
    data.append('SubsidiaryID', values.descSubsidiary.substr(0, 4));
    data.append('OperatorID', 0);
    data.append('LayoutID', 1);
    data.append('Period', '202101');

    // console.log(values.filesMensality[0]);
    axios({
      method: 'post',
      url: 'http://192.168.1.60:8080/api/PAB/AuditPlansRoutine',
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(async function (response) {
        var idTask = await checkTaskCompleted(response.data.id);

        while (idTask == 0) {
          console.log('in process');
          <AlertDialog
            open={openAlertLoading}
            close={async () => {
              setOpenAlertLoading(false);
              // await cleanInputs(values);
            }}
            title={
              <p className={styles.titleAlertSucess}>CADASTRO DE API_SIGAMAT</p>
            }
            body={
              <div className={styles.contentAlertLoading}>
                <GifLoading />
              </div>
            }
          />;

          idTask = checkTaskCompleted(response.data.id);
        }
        response.data.message.indexOf('Error') !== -1 ? (
          swal({
            title: 'Validação',
            text: 'Ocorreu um erro na validação, verifique!',
            icon: 'error',
            className: styles.Alert,
            buttons: {
              confirm: { text: 'OK', className: styles.buttonAlert },
            },
          })
        ) : (
          <p>t</p>
        );
      })
      .catch(function (response) {
        swal({
          title: 'Validação',
          text: 'Ocorreu um erro na validação, verifique!',
          icon: 'error',
          className: styles.Alert,
          buttons: {
            confirm: { text: 'OK', className: styles.buttonAlert },
          },
        });
        console.log(response);
      });

    // console.log(data);
  }
  // alert('');

  return (
    <div>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        enableReinitialize={true}
        dirty={true}
      >
        {({ values, submitForm, setFieldValue, handleChange }) => (
          <Form id="testsse">
            <Dialog
              onClose={close}
              aria-labelledby="customized-dialog-title"
              open={open}
              fullWidth
            >
              <DialogTitle
                id="customized-dialog-title"
                onClose={handleClose}
                className={styles.headerDialog}
              >
                Validação
              </DialogTitle>

              <DialogContent dividers className={styles.contentDialod}>
                <Select
                  label="Empresa"
                  // open={openSelect}
                  // onClose={handleClose}
                  // onOpen={handleOpen}
                  value={values.descCompany}
                  defaultValue=""
                  onChange={e => handleChangeSelectCompany(values, e)}
                  className={styles.select}
                  name="descCompany"
                >
                  {values.companys.map((company, index) => {
                    return (
                      <MenuItem key={index} value={company.trimRight()}>
                        {company}
                      </MenuItem>
                    );
                  })}
                </Select>
                <Field
                  component={Select}
                  className={styles.select}
                  onChange={e => handleChangeSubsidiary(values, e)}
                  value={descSubsidiary}
                  name="descSubsidiary"
                >
                  {subsidiarys.map((subsidiary, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={`${subsidiary.APS_COD_FILIAL} - ${subsidiary.APS_DESC_FILIAL}`}
                      >
                        {`${subsidiary.APS_COD_FILIAL} - ${subsidiary.APS_DESC_FILIAL}`}
                      </MenuItem>
                    );
                  })}
                </Field>

                <div className={styles.inboxSelect}>
                  <Field
                    component={Checkbox}
                    style={{ color: '#207eb8', padding: '2px' }}
                    type="checkbox"
                    name="checkedAllSubsidiarys"
                  />
                  <p>Todas filiais</p>
                </div>

                <div className={styles.contentSelectFiles}>
                  <FiPlus
                    size={24}
                    color="#F59D3A"
                    style={{ marginRight: '3px' }}
                  />
                  <label
                    htmlFor="fileMensality[]"
                    className={styles.selectImage}
                  >
                    <p>{descriptionInputFileMensality}</p>
                  </label>
                  <input
                    type="file"
                    id="fileMensality[]"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleFilesMensality}
                  />
                </div>

                <div className={styles.contentSelectFiles}>
                  <FiPlus
                    size={24}
                    color="#F59D3A"
                    style={{ marginRight: '3px' }}
                  />
                  <label
                    htmlFor="fileCoparticipation[]"
                    className={styles.selectImage}
                  >
                    <p>{descriptionInputFileCoparticipation}</p>
                  </label>
                  <input
                    type="file"
                    id="fileCoparticipation[]"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleFilesCoparticipation}
                  />
                </div>
                <div className={styles.contentCalendar}>
                  <CalendarMUI onChange={handleChangeCalendar} />
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={submitForm}
                  type="submit"
                  color="primary"
                >
                  Validar
                </Button>
              </DialogActions>
            </Dialog>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormValidation;
