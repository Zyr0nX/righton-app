import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import QuestionCardDetails from "../components/QuestionCardDetails";
import FooterGameInProgress from "../components/FooterGameInProgress";
import HeaderGameInProgress from "../components/HeaderGameInProgress";
import AnswersInProgressDetails from "../components/AnswersInProgressDetails";
import CheckMark from "../../images/Union.png";

export default function GameInProgress({
  teams,
  questions,
  currentState,
  currentQuestionId,
  handleChangeGameStatus,
  phaseOneTime,
  phaseTwoTime
}) {

  const classes = useStyles();
  const questionDetails = questions.items
  console.log(questionDetails);
  const numAnswers = teams => {
    let count = 0;
    {
      teams && teams.items.map(team =>
        team.teamMembers.items.map(teamMember =>
          teamMember.answers.items.map(answer => answer.isChosen && count++)
        )
      )
    };

    return count;
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
          totalQuestions={questions.items.length}
          currentState={currentState}
          currentQuestion={currentQuestionId}
          phaseOneTime={phaseOneTime}
          phaseTwoTime={phaseTwoTime}
        />
        <QuestionCardDetails questions={questions.items} />
        <AnswersInProgressDetails questions={questions.items} />
      </div>
      <FooterGameInProgress
        currentState={currentState}
        numPlayers={teams.length}
        numAnswers={numAnswers(teams)}
        handleChangeGameStatus={handleChangeGameStatus}
      />
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  background: {
    height: "100%",
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
