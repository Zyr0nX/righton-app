import React, { useState, useCallback } from "react";
import { Route, Switch, useHistory, useRouteMatch} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from "@material-ui/core";
import ArrowBack from '@material-ui/icons/ArrowBack';
import GameDashboard from './GameDashboard';
import AddQuestion from "./AddQuestion";



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
    width: 'calc(100% + 16px) !important',
  },
  sidebar: {
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px !important`,
    borderRight: '1px #0000003b solid',
    height: 'calc(100vh - 64px)',
    overflowY: 'scroll',
  },
  parent: {
    marginTop:"auto", 
    display:"felx", 
    justifyContent:"space-between",
    textAlign: "center",
  },
  blueButton: {
    background: 'linear-gradient(90deg, #159EFA 0%, #19BCFB 100%);',
    borderRadius: '50px',
    textTransform: 'none',
    fontSize: '17px',
    fontWeight: 500,
    color: 'white',
  },
  greenButton: {
      background: 'linear-gradient(90deg, #4DED66 0%, #5ACD3D 100%)',
      borderRadius: '50px',
      textTransform: 'none',
      fontSize: '17px',
      fontWeight: 500,
      color: 'white',
  },
  redButton: {
    background: 'linear-gradient(90deg, #E2215D 0%, #FC2164 100%)',
      borderRadius: '50px',
      textTransform: 'none',
      fontSize: '17px',
      fontWeight: 500,
      color: 'white',
  },
  back: {
    position: 'absolute',
    top: 100,
    left: 0,
    paddingBottom: 10
  },
  }));

export default function AddQuestionForm({ loading, games, deleteGame, cloneGame, cloneQuestion, submit, gamemakerIndex }) {
    const classes = useStyles();
    const history = useHistory();
    const handleBack = useCallback(() => {
      if(gamemakerIndex != null) {
        history.push(`/gamemaker/${gamemakerIndex}`);
      }
      else {
        history.push(`/gamemaker/0`);
      }
    }, [gamemakerIndex, history]);

    return (
        <Grid container className={classes.root}>
          <Button type="button" className={classes.back} onClick={handleBack}>
            <ArrowBack style={{marginRight: 8}} />Back to Game Maker
          </Button>

          <Grid item xs={5} className={classes.sidebar}>
            <h3>Browse Games</h3>
            <GameDashboard loading={loading} games={games} deleteGame={deleteGame} cloneGame={cloneGame} gamemakerIndex={gamemakerIndex} onClickGame={(index, gamemakerIndex) => history.push(`/gamemaker/${gamemakerIndex}/addquestion/gameSelected/${index + 1}`)}/>
          </Grid>

          <Grid item xs={7} className={classes.content}>
            <Switch>
              <Route exact path="/gamemaker/:gamemakerIndex/addquestion" render={
                ({}) => {
                  return (
                    <Grid style={{height: 'calc(100vh - 64px)'}}>
                      <p style={{color:"#797979", fontWeight:"bold"}}>No Game Selected</p>
                      <h2 style={{width: "60%",color:"#797979", marginLeft:"auto", marginRight:"auto", marginTop:"30%"}}>In order to view questions, you must select a game from the section on the left</h2>
                    </Grid>
                  );
                }
              }/>
              <Route path="/gamemaker/:gamemakerIndex/addquestion/gameSelected/:selectedIndex" render={
                ({ match }) => {
                  const { selectedIndex, gamemakerIndex} = match.params;
                  return <AddQuestion game={games[Number(selectedIndex-1)]}  cloneQuestion={cloneQuestion} submit={submit} selectedIndex={selectedIndex} gamemakerIndex={gamemakerIndex} />;
                }
              } />
            </Switch>           
          </Grid>

        </Grid>
    );
}