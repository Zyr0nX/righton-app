import React from 'react'
import { makeStyles, MenuItem } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';

const students = ["Ray W.", "Zach T.", "Jared J."]
const x = "X"
const studentCount = 12

const CurrentStudents = () => {
    const classes = useStyles()
  return (
      <div>
          <Grid className={classes.studentCount}>
              {studentCount}
          </Grid>
            <div className={classes.inSessionDiv}>
                <p className={classes.inSession}>
                Students in Session
                </p>
            </div>
          <hr className={classes.hr}/>
          {students.map((student) => (
              <MenuItem  container className={classes.studentCards} >  
              
                <Grid className={classes.name}>
                    {student}
                </Grid>
                <Button className={classes.removeStudent}>
                    {x}
                </Button>
                
              </MenuItem>
          ))}
          
      </div>
    
  )
}
const useStyles = makeStyles(theme => ({

    studentCount: {
        color: "rgba(255, 255, 255, 1)",
        fontWeight: "bold",
        fontSize: "72px",
        textAlign: "center",
        marginTop: "4%"
    },

    inSessionDiv: {
        width: "80px",
        height: "40px",
        margin: "auto"
    },

    inSession: {
        color: "rgba(255, 255, 255, 1)",
        textAlign: "center",
        margin: "auto",
        fontSize: "16px"
        
    },

    studentCards: {
        margin: "auto",
        marginBottom: "15px",
        borderRadius: "14px",
        width: "311px",
        height: "62px",
        background: "rgba(255, 255, 255, 0.25)",
        color: "rgba(255, 255, 255, 1)",
       
    },
    name: {
        fontWeight: "bold",  
    },
    removeStudent: {
        color: "white",
        fontWeight: "bold",
        position: "absolute",
        right: "-10px",
    },
    hr: {
        marginTop: "30px",
        marginBottom: "25px",
        width: "266px",
        height: "1px",
        borderRadius: "1.54px",
        border: "0",
        borderTop: "1px solid rgba(255, 255, 255, 0.25)"
    }
  }))

export default CurrentStudents