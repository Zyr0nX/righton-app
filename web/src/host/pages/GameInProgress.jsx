import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import QuestionCardDetails from "../components/QuestionCardDetails";
import FooterGameInProgress from "../components/FooterGameInProgress";
import HeaderGameInProgress from "../components/HeaderGameInProgress";
import AnswersInProgressDetails from "../components/AnswersInProgressDetails";
import CheckMark from "../../images/Union.png";
import { ConstructionOutlined } from "@mui/icons-material";
import { GameSessionState } from "@righton/networking";

export default function GameInProgress({
  teams,
  questions,
  currentState,
  currentQuestionId,
  handleChangeGameStatus,
  phaseOneTime,
  phaseTwoTime,
  handleUpdateGameSessionState
}) {
  
  const classes = useStyles();

  const stateArray = Object.values(GameSessionState);

  const numAnswers = teams => {
    let count = 0;
    teams && teams.items.map(team => 
       team.teamMembers && team.teamMembers.items.map(teamMember => 
        teamMember.answers && teamMember.answers.items.map(answer => answer.isChosen && count++
    )))
    return count;
  };

  const nextState = currentState => {
    return stateArray[stateArray.indexOf(currentState) + 1]; 
  };

  return (
    <div className={classes.background}>
      <div
        style={{
          backgroundImage: `url(${CheckMark})`,
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "10px",
          backgroundPositionY: "-300px"
        }}
      >
        <HeaderGameInProgress
          totalQuestions={questions ? questions.items.length : 0}
          currentState={currentState}
          currentQuestion={currentQuestionId}
          phaseOneTime={phaseOneTime}
          phaseTwoTime={phaseTwoTime}
        />
        <QuestionCardDetails />
        <AnswersInProgressDetails />
      </div>
      <FooterGameInProgress
        currentState={currentState}
        nextState = {nextState(currentState)}
        numPlayers={teams ? teams.items.length : 0}
        numAnswers={numAnswers(teams)}
        phaseOneTime={phaseOneTime}
        phaseTwoTime={phaseTwoTime}
        currentQuestion={currentQuestionId}
        totalQuestions={questions ? questions.items.length : 0}
        handleUpdateGameSessionState={ handleUpdateGameSessionState}        
      />
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  background: {
    height: "100vh",
    width: "100%",
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    justifyContent: "space-between",
    background: "linear-gradient(196.21deg, #0D68B1 0%, #02215F 73.62%)"
  },
  number: {
    color: "white",
    height: "15px",
    width: "15px",
    borderStyle: "solid",
    borderColor: "white"
  },
  title: {
    color: "white"
  },
  timebar: {
    animationDuration: "5"
  },
  timebar1: {
    height: "5px"
  },
  indexcard: {
    display: "center",
    backgroundColor: "white",
    height: "30%",
    width: "80%"
  },
  button: {
    color: "#00A1FF",
    fontWeight: "bold",
    width: "90%",
    height: "45px",
    display: "center",
    background: "none",
    borderRadius: "24px",
    borderColor: "#00A1FF",
    borderStyle: "solid",
    borderWidth: "thick",
    textAlign: "center",
    marginLeft: "5%",
    marginRight: "5%"
  }
}));
