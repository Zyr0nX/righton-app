import React from 'react'
import { makeStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const QuestionCard = () => {
    const classes = useStyles()
        return (
            <Grid container item xs={12}>
                <Card className={classes.questionCard}>
                    <CardContent>
                        <Grid container>
                            <Grid container  >
                                <Grid item xs={12}>
                                    <Typography className={classes.question}>
                                        Question Here
                                    </Typography>
                                </Grid>
                                <br/>
                                <br/>
                                <Grid item xs={12}>
                                    <Typography className={classes.expandCard} gutterBottom>
                                        + Show More 
                                    </Typography>
                                </Grid>        
                            </Grid>       
                        </Grid>
                    </CardContent>
                </Card>
          </Grid>
        )
}

const useStyles = makeStyles(theme => ({

    questionCard: {
      height: "95px",
      width: "311px",
      borderRadius: "18px",
      margin: "auto"
    },

    question: {
        textAlign: "center",
        margin: "auto"
    },

    expandCard: {
        textAlign: "center",
        justify: "center"
    }

  }))

export default QuestionCard