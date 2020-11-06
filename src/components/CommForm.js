import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles, formatMs } from "@material-ui/core/styles";
import { lightBlue, green, blue, red } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import Avatar from "@material-ui/core/Avatar";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import NavigationIcon from "@material-ui/icons/Navigation";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { numberWithCommas } from "../utils/utils";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Badge from "@material-ui/core/Badge";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function CommForm({ match }) {
  useEffect(() => {
    getCommForm();
    console.log(match);
  }, []);
  const [form, setForm] = useState({});
  const [dataError, setDataError] = useState({});
  const [editLoanAmount, setEditLoanAmount] = useState(0);
  const [editAmountCheck, setEditAmountCheck] = useState(0);
  const [editPaymentAmount, setEditPaymentAmount] = useState(0);
  const [addCharges, setAddCharges] = useState([]);
  const [loanAmount, setLoanAmount] = useState(0); // when calling the commas func-
  const [amountCheck, setAmountCheck] = useState(0); //``                                                this results to NoType so we use-
  const [paymentAmount, setPaymentAmount] = useState(0); //                                                  this state to set it to 0 while-
  const [paymentAmount2, setPaymentAmount2] = useState(0); //                                                   the data gets fetched.  //
  const [comments, setComments] = useState("");

  const getCommForm = async () => {
    const url_ = process.env.REACT_APP_URL_GET + "/" + match.params.id;
    console.log(url_);
    //getting form
    const getCommForm = await fetch(url_);
    const item = await getCommForm.json();
    setForm(item);
    // set editLoanAmount Amount of Check
    setEditLoanAmount(item.edit_loanAmount); // these
    setEditAmountCheck(item.edit_amountCheck); //  will
    setEditPaymentAmount(item.edit_paymentAmount); //  be blank by default
    setAddCharges(item.additionalCharge); // couldn't display charges can only map on non null object

    console.log(item);
    // setting the loan amount, amount check to state to use with "commas func"
    setLoanAmount(item.loanAmount);
    setAmountCheck(item.amountCheck);
    setPaymentAmount(item.paymentAmount);
    setPaymentAmount2(item.paymentAmount2);

    setComments(item.comments);
  };
  const [open, setOpen] = React.useState(true);

  const callVerify = (id, verified) => (e) => {
    handleVerifyClick(id, verified);
    getCommForm();
    console.log("after verify click" + form.verified);
  };
  const handleVerifyClick = async (id, veri) => {
    try {
      const url_ = process.env.REACT_APP_URL_GET + "/" + id;
      console.log(url_);
      console.log("before verify click" + veri);
      axios.patch(url_, { verified: !veri });

      //console.log(item);
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = () => {
    getCommForm();
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const useStyles = makeStyles((theme) => ({
    avatar_blue: {
      color: theme.palette.getContrastText(blue[500]),
      backgroundColor: blue[500],
    },
    container: {
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
    },
    container_box: {
      display: "flex",
      background: "#dfe6e9",
      minWidth: 1200,
      minHeight: 700,
      margin: "auto",
      borderRadius: 10,
      justifyContent: "center",
    },
    sub_title: {
      color: "#ea8685",
      padding: ".25rem",
    },
    sub_title_: {
      color: "#a1c4fd",
      padding: ".25rem",
    },
    title: {
      color: "#c23616",
      padding: ".25rem",
    },
    title_: {
      color: "#192a56",
      padding: ".25rem",
    },
    form: {
      //blue
      margin: "2rem .5rem",
      position: "sticky",
      top: 0,
      position: "-webkit-sticky",
      flexWrap: "wrap",
      backgroundColor: "#a1c4fd",
      borderRadius: "10px",
      padding: "2rem",
      minWidth: 550 /* Safari */,
    },
    card: {
      width: "100%",
      position: "sticky",
      top: 0,
      overflow: "auto",
    },
    card_: {
      width: "100%",
      position: "relative",
      overflow: "auto",
      maxHeight: 800,
    },
    form_: {
      // red
      flexWrap: "wrap",
      backgroundColor: "#ea8685",
      borderRadius: "10px",
      padding: "2rem ",
      minWidth: 550,
      margin: "2rem .5rem",
    },
    avatar_title: {
      display: "flex",
      justifyContent: "space-evenly",
    },
    link: {
      textDecoration: "none",
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: 1,
    },
    button: {
      width: "25%",
      margin: theme.spacing(1),
      padding: 10,
    },
    editInput_button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      padding: ".5rem",
    },
    form_data_labels: {
      display: "flex",
      justifyContent: "center",
      padding: "0 0 0 0",
    },
    comments: {
      padding: "1rem",
      width: "100%",
      borderRadius: "10px",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexShrink: 0,
    },
    mark: {
      background: "#a1c4fd",
      padding: ".25rem",
      borderRadius: "2px",
    },
  }));
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.container}>
      <Link className={classes.link} to={`/`}>
        <Fab variant='extended' className={classes.fab} color='primary'>
          <NavigationIcon />
          Navigate home
        </Fab>{" "}
      </Link>
      <div className={classes.container_box}>
        <div className={classes.form}>
          <Typography
            className={classes.title_}
            variant='h5'
            component='h5'
            align='center'
          >
            Commission Form Submitted by:
          </Typography>
          <div className={classes.avatar_title}>
            <Typography
              className={classes.title_}
              variant='h4'
              component='h5'
              align='center'
            >
              {form.firstName} {form.lastName}{" "}
            </Typography>
            <Avatar className={classes.avatar_blue}>
              {String(form.firstName).charAt(0)}
              {String(form.lastName).charAt(0)}
            </Avatar>
          </div>

          <br></br>
          <Card className={classes.card_}>
            <CardContent>
              {" "}
              <Typography align='center' variant='h6'>
                Loan Number: {form.loanNumber}
              </Typography>
              <Divider variant='middle' pad />
              <br />
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Full Name:
                </Typography>
                <Typography
                  className={classes.title_}
                  color='textPrimary'
                  gutterBottom
                >
                  {form.firstName} {form.lastName}
                </Typography>
              </div>
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Phone Number:
                </Typography>
                <Typography className={classes.title_} color='textPrimary'>
                  {form.phoneNumber}
                </Typography>
              </div>
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Loan Officer:
                </Typography>
                <Typography className={classes.title_} color='textPrimary'>
                  {form.loanOfficer}
                </Typography>
              </div>
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Email:
                </Typography>
                <Typography className={classes.title_} color='textPrimary'>
                  {form.email}
                </Typography>
              </div>
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Company Branch
                </Typography>
                <Typography className={classes.title_} color='textPrimary'>
                  {form.companyBranch}
                </Typography>
              </div>{" "}
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Escrow Number
                </Typography>
                <Typography className={classes.title_} color='textPrimary'>
                  {form.escrowNumber}
                </Typography>
              </div>{" "}
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Loan Amount:
                </Typography>
                <Badge color='primary' variant='dot'>
                  <Typography className={classes.title_} color='textPrimary'>
                    <mark className={classes.mark}>
                      {numberWithCommas(loanAmount)}
                    </mark>
                  </Typography>
                </Badge>
              </div>{" "}
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Funded Date:
                </Typography>
                <Typography className={classes.title_} color='textPrimary'>
                  {form.fundedDate}
                </Typography>
              </div>{" "}
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Processor:
                </Typography>
                <Typography className={classes.title_} color='textPrimary'>
                  {form.processor}
                </Typography>
              </div>{" "}
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Escrow Company:
                </Typography>
                <Typography className={classes.title_} color='textPrimary'>
                  {form.escrowCompany}
                </Typography>
              </div>{" "}
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Lender Name:
                </Typography>
                <Typography className={classes.title_} color='textPrimary'>
                  {form.lenderName}
                </Typography>
              </div>{" "}
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Borrowers:
                </Typography>
                <Typography className={classes.title_} color='textPrimary'>
                  {form.borrowers}
                </Typography>
              </div>{" "}
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Property Address:
                </Typography>
                <Typography className={classes.title_} color='textPrimary'>
                  {form.propertyAddress}
                </Typography>
              </div>{" "}
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Amount of Check:
                </Typography>
                <Badge color='primary' variant='dot'>
                  <Typography className={classes.title_} color='textPrimary'>
                    <mark className={classes.mark}>
                      {numberWithCommas(amountCheck)}
                    </mark>
                  </Typography>
                </Badge>
              </div>
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Amount of Check Mailed or Wired:
                </Typography>
                <Typography className={classes.title_} color='textPrimary'>
                  {form.AmountOfCheckWired ? "Wired" : "Mailed"}
                </Typography>
              </div>{" "}
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Type of Loan
                </Typography>
                <Typography className={classes.title_} color='textPrimary'>
                  {form.typeOfLoan}
                </Typography>
              </div>{" "}
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Transaction:
                </Typography>
                <Typography className={classes.title_} color='textPrimary'>
                  {form.transaction}
                </Typography>
              </div>{" "}
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Correspondent:
                </Typography>
                <Typography className={classes.title_} color='textPrimary'>
                  {form.correspondent ? "Yes" : "No"}
                </Typography>
              </div>{" "}
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Correspondent Company:
                </Typography>
                <Typography className={classes.title_} color='textPrimary'>
                  {form.correspondentCompany}
                </Typography>
              </div>{" "}
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  State:
                </Typography>
                <Typography className={classes.title_} color='textPrimary'>
                  {form.state}
                </Typography>
              </div>
              <div className={classes.comments}>
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1-ac-content'
                    id='panel1-add-charges'
                  >
                    <Typography
                      className={classes.heading}
                      component='h6'
                      variant='h6'
                      align='center'
                    >
                      Additional Charges
                    </Typography>
                  </AccordionSummary>
                  <div className={classes.form_data_labels}>
                    <AccordionDetails>
                      <List component='nav'>
                        {addCharges.map((item) => (
                          <ListItem alignItems='center' key={item.id}>
                            <ListItemIcon key={item} button='true'>
                              <AttachMoneyIcon color='primary' />
                            </ListItemIcon>
                            <ListItemText
                              primary={item.itemName}
                              secondary={item.amount}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </div>
                </Accordion>
              </div>
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Loan Officer:
                </Typography>
                <Typography className={classes.title_} color='textPrimary'>
                  {form.loanOfficer}
                </Typography>
              </div>
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Flat Fee or Percent:
                </Typography>
                <Typography className={classes.title_} color='textPrimary'>
                  {form.flatFeeOrPercent === "percent" ? "percent" : "Flat Fee"}
                </Typography>
              </div>
              <div className={classes.form_data_labels}>
                {form.flatFeeOrPercent === "percent" ? ( //if percent show percent if not show flat fee
                  <React.Fragment>
                    <Typography
                      className={classes.sub_title_}
                      color='textSecondary'
                      gutterBottom
                    >
                      Percent:
                    </Typography>
                    <Typography className={classes.title_} color='textPrimary'>
                      {form.percent}
                    </Typography>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Typography
                      className={classes.sub_title_}
                      color='textSecondary'
                      gutterBottom
                    >
                      Flat Fee:
                    </Typography>
                    <Typography className={classes.title_} color='textPrimary'>
                      {form.flatFee}
                    </Typography>
                  </React.Fragment>
                )}
              </div>
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Business Name:
                </Typography>
                <Typography className={classes.title_} color='textPrimary'>
                  {form.businessName}
                </Typography>
              </div>
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Payment type Mail/Wired:
                </Typography>
                <Typography className={classes.title_} color='textPrimary'>
                  {form.paymentTypeWired ? "Wired" : "Mail"}
                </Typography>
              </div>
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title_}
                  color='textSecondary'
                  gutterBottom
                >
                  Payment Amount:
                </Typography>
                <Badge color='primary' variant='dot'>
                  <Typography className={classes.title_} color='textPrimary'>
                    <mark className={classes.mark}>
                      {numberWithCommas(paymentAmount)}
                    </mark>
                  </Typography>
                </Badge>
              </div>
              {/*  
              
              if Two los------->> 

              */}
              {form.twoLOs ? (
                <React.Fragment>
                  {" "}
                  <Divider variant='middle' pad />
                  <Typography align='center' variant='h6'>
                    Second LO
                  </Typography>
                  <br />
                  <div className={classes.form_data_labels}>
                    <Typography
                      className={classes.sub_title_}
                      color='textSecondary'
                      gutterBottom
                    >
                      Loan Officer #2:
                    </Typography>
                    <Typography className={classes.title_} color='textPrimary'>
                      {form.loanOfficer2}
                    </Typography>
                  </div>
                  <div className={classes.form_data_labels}>
                    <Typography
                      className={classes.sub_title_}
                      color='textSecondary'
                      gutterBottom
                    >
                      Flat Fee or Percent:
                    </Typography>
                    <Typography className={classes.title_} color='textPrimary'>
                      {form.flatFeeOrPercent2 === "percent"
                        ? "percent"
                        : "Flat Fee"}
                    </Typography>
                  </div>
                  <div className={classes.form_data_labels}>
                    {form.flatFeeOrPercent2 === "percent" ? ( //if percent show percent if not show flat fee
                      <React.Fragment>
                        <Typography
                          className={classes.sub_title_}
                          color='textSecondary'
                          gutterBottom
                        >
                          Percent:
                        </Typography>
                        <Typography
                          className={classes.title_}
                          color='textPrimary'
                        >
                          {form.percent2}
                        </Typography>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Typography
                          className={classes.sub_title_}
                          color='textSecondary'
                          gutterBottom
                        >
                          Flat Fee:
                        </Typography>
                        <Typography
                          className={classes.title_}
                          color='textPrimary'
                        >
                          {form.flatFee2}
                        </Typography>
                      </React.Fragment>
                    )}
                  </div>
                  <div className={classes.form_data_labels}>
                    <Typography
                      className={classes.sub_title_}
                      color='textSecondary'
                      gutterBottom
                    >
                      Business Name:
                    </Typography>
                    <Typography className={classes.title_} color='textPrimary'>
                      {form.businessName2}
                    </Typography>
                  </div>
                  <div className={classes.form_data_labels}>
                    <Typography
                      className={classes.sub_title_}
                      color='textSecondary'
                      gutterBottom
                    >
                      Payment type Mail/Wired:
                    </Typography>
                    <Typography className={classes.title_} color='textPrimary'>
                      {form.paymentTypeWired2 ? "Wired" : "Mail"}
                    </Typography>
                  </div>
                  <div className={classes.form_data_labels}>
                    <Typography
                      className={classes.sub_title_}
                      color='textSecondary'
                      gutterBottom
                    >
                      Payment Amount:
                    </Typography>
                    <Badge color='primary' variant='dot'>
                      <Typography
                        className={classes.title_}
                        color='textPrimary'
                      >
                        <mark className={classes.mark}>
                          {numberWithCommas(paymentAmount2)}
                        </mark>
                      </Typography>
                    </Badge>
                  </div>
                </React.Fragment>
              ) : (
                <Typography
                  className={classes.heading}
                  align='center'
                  variant='h6'
                >
                  {" "}
                  <mark className={classes.mark}>
                    Only One Loan Officer on this loan.
                  </mark>
                </Typography>
              )}
            </CardContent>
          </Card>
        </div>

        <div className={classes.form_}>
          <Typography
            className={classes.title}
            variant='h5'
            component='h5'
            align='center'
          >
            This is the edited verified version:
          </Typography>
          <Typography
            className={classes.title}
            variant='h4'
            component='h5'
            align='center'
          >
            Equity Smart Staff{" "}
          </Typography>

          <br></br>
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.form_data_labels}>
                {" "}
                <Typography
                  className={classes.sub_title}
                  color='textSecondary'
                  gutterBottom
                >
                  Full Name:
                </Typography>
                <Typography
                  className={classes.title}
                  color='textPrimary'
                  gutterBottom
                >
                  {form.firstName} {form.lastName}
                </Typography>
              </div>{" "}
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title}
                  color='textSecondary'
                  gutterBottom
                >
                  Loan Officer:
                </Typography>
                <Typography className={classes.title} color='textPrimary'>
                  {form.loanOfficer}
                </Typography>
              </div>{" "}
              <div className={classes.form_data_labels}>
                <Typography
                  className={classes.sub_title}
                  color='textSecondary'
                  gutterBottom
                >
                  Email:
                </Typography>
                <Typography className={classes.title} color='textPrimary'>
                  {form.email}
                </Typography>
              </div>
              <br />
              <div className={classes.editInput_button}>
                <FormControl className={classes.margin}>
                  <InputLabel
                    htmlFor='input-with-icon-adornment'
                    color='secondary'
                  >
                    Edit Loan Amount{" "}
                  </InputLabel>
                  <Input
                    color='secondary'
                    value={editLoanAmount}
                    id='input-with-icon-adornment'
                    startAdornment={
                      <InputAdornment position='start'>
                        <AccountCircle />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Button
                  variant='contained'
                  color='secondary'
                  size='small'
                  className={classes.button}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              </div>
              <div className={classes.editInput_button}>
                <FormControl className={classes.margin}>
                  <InputLabel
                    htmlFor='input-with-icon-adornment'
                    color='secondary'
                  >
                    Edit Amount of Check{" "}
                  </InputLabel>
                  <Input
                    color='secondary'
                    value={editAmountCheck}
                    id='input-with-icon-adornment'
                    startAdornment={
                      <InputAdornment position='start'>
                        <AccountCircle />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Button
                  width='50%'
                  variant='contained'
                  color='secondary'
                  size='small'
                  className={classes.button}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              </div>
              <div className={classes.editInput_button}>
                <FormControl className={classes.margin}>
                  <InputLabel
                    htmlFor='input-with-icon-adornment'
                    color='secondary'
                  >
                    Edit Payment Amount{" "}
                  </InputLabel>
                  <Input
                    color='secondary'
                    value={editPaymentAmount}
                    id='input-with-icon-adornment'
                    startAdornment={
                      <InputAdornment position='start'>
                        <AccountCircle />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Button
                  variant='contained'
                  color='secondary'
                  size='small'
                  className={classes.button}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              </div>
              <br />
              <Divider variant='middle' />
              <br />
              <div className={classes.comments}>
                <TextField
                  label
                  id='comments-multiline-'
                  label='Comments'
                  multiline
                  rows={4}
                  defaultValue={form.comments}
                  variant='outlined'
                  fullWidth
                  color='secondary'
                  placeholder='Comments about this loan go here ☺️'
                />
              </div>
            </CardContent>
            <Divider variant='middle' pad />

            <CardActions>
              <Button
                onClick={callVerify(form._id, form.verified)}
                style={{ color: green[500] }}
                startIcon={<CheckIcon />}
              >
                Verified
              </Button>

              <Button
                onClick={handleClick}
                style={{ color: green[200] }}
                size='small'
              >
                Reviewed?
              </Button>
            </CardActions>
          </Card>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={form.verified ? "success" : "error"}
            >
              {!form.verified
                ? "This person has not been verified"
                : "This person has been reviewed"}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
}
export default CommForm;
