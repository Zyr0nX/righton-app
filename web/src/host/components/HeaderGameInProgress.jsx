import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Timer from "./Timer";

const useStyles = makeStyles(() => ({
  div: {
    paddingLeft: "10px",
    paddingTop: "10px"
    //background: 'linear-gradient(196.21deg, #0D68B1 0%, #02215F 73.62%)',
  },
  title: {
    fontWeight: 700,
    fontSize: "36px",
    lineHeight: "54px",
    color: "white"
  },
  phases: {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
    color: "white"
  },
  roundedItem: {
    background: "red"
  },
  ul: {
    "& .MuiPaginationItem-page.Mui-selected": {
      backgroundColor: "white",
      color: "rgba(56, 68, 102, 1)",
      border: "white solid 3px",
      borderRadius: "3px"
    },
    "& .MuiPaginationItem-root": {
      color: "rgba(255,255,255, 0.5)",
      border: "rgba(255,255,255, 0.5) solid 3px",
      borderRadius: "3px",
      paddingLeft: "15px",
      paddingRight: "15px",
      opacity: "1",
      cursor: "default",
      pointerEvents: "none"
    }
  }
}));

const label = {
  CHOOSE_CORRECT_ANSWER: "Phase 1 of 2",
  PHASE_1_RESULTS: "Phase 1 Results",
  CHOOSE_TRICKIEST_ANSWER: "Phase 2 of 2",
  PHASE_2_RESULTS: "Phase 2 Results"
};

export default function GameInProgressHeader({
  totalQuestions,
  currentQuestion,
  currentState,
  phaseOneTime,
  phaseTwoTime,
}) {
  const classes = useStyles();
  
  let totalRoundTime = () => {
    if (currentState == "CHOOSE_CORRECT_ANSWER" ) {
      return phaseOneTime;
    } else if (currentState == "CHOOSE_TRICKIEST_ANSWER") {
      return phaseTwoTime;
    } return 60;
  }
  //use state to set the current time
  const [currentTime, setCurrentTime] = React.useState(totalRoundTime);

  useEffect(() => {
    if (currentState == "CHOOSE_CORRECT_ANSWER" || currentState == "CHOOSE_TRICKIEST_ANSWER") {
    //pause timer
      setCurrentTime(totalRoundTime());
    }
      
  }, [currentState]);

  return (
    <div className={classes.div}>
      {/* <Pagination
        hideNextButton
        hidePrevButton
        variant="outlined"
        shape="rounded"
        classes={{ ul: classes.ul }}
        count={totalQuestions}
        page={currentQuestion}
      /> */}

      <Typography className={classes.title}>
        Game On!{" "}
        {/* Replace with current question number and total questions info from query */}
      </Typography>

      <Typography className={classes.phases}>
        {label[currentState]} {/* Replace with phase info from query */}
      </Typography>

      <Timer currentTime={currentTime} totalRoundTime={totalRoundTime()} setTime={setCurrentTime} />
    </div>
  );
}
