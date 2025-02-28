import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import OnboardAppRouter from '../screens/OnboardAppRouter'
// import OnboardTeacherRouter from '../screens/OnboardTeacherRouter';
import StudentFirst from '../Student/screens/StudentFirst'
import StudentName from '../Student/screens/StudentName'
import StudentChooseTeam from '../Student/screens/StudentChooseTeam'
import StudentGameIntro from '../Student/screens/StudentGameIntro'
import PregameCountDown from '../Student/screens/PregameCountDown'
import GamePreview from '../Student/screens/Game/GamePreview'
import TeamInfo from '../Student/screens/Game/GamePlay/TeamInfo'
import GamePlay from '../Student/screens/Game/GamePlay'
import GameAnswerPopular from '../Student/screens/Game/GameAnswer/Popular'
import Leadership from '../Student/screens/Game/Leadership'
import TeacherApp from '../Teacher'
import GameDetailsScreen from '../Teacher/screens/Explore/GameDetails'
import SignIn from '../Auth/screens/SignIn'
import SignUp from '../Auth/screens/SignUp'
import PersonalDetails from '../Auth/screens/PersonalDetails'
import ConfirmAccount from '../Auth/screens/ConfirmAccount'
import EnterInfo from '../Student/screens/EnterInfo'

const Stack = createStackNavigator()

const AppContainer = (props) => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnboardAppRouter" screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen name="OnboardAppRouter" component={OnboardAppRouter} />
        <Stack.Screen name="StudentFirst" component={StudentFirst} />
        <Stack.Screen name="StudentName" component={StudentName} />
        
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="EnterInfo" component={EnterInfo} />
        <Stack.Screen name="ConfirmAccount" component={ConfirmAccount} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
        <Stack.Screen name="StudentChooseTeam" component={StudentChooseTeam} />
        <Stack.Screen name="GameDetails" component={GameDetailsScreen} />
        <Stack.Screen name="StudentGameIntro" component={StudentGameIntro} />
        <Stack.Screen name="PregameCountDown" component={PregameCountDown} />
        <Stack.Screen name="GamePreview" component={GamePreview} />
        <Stack.Screen name="GamePlay" component={GamePlay} />
        <Stack.Screen name="TeamInfo" component={TeamInfo} />
        <Stack.Screen name="GameAnswerPopular" component={GameAnswerPopular} />
        <Stack.Screen name="Leadership" component={Leadership} />
        <Stack.Screen name="TeacherApp" component={TeacherApp} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppContainer
