import React, { useState, useRef, useCallback } from "react"
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { scale } from "react-native-size-matters"
import { fontFamilies, fonts, colors } from "../../../../utils/theme"
import QuestionTabBar from "../components/QuestionTabBar"
import Footer from "../components/Footer"
import AnimatedAccordion from "@dev-event/react-native-accordion"
import CollapsableContent from "./CollapsableContent"

// add a prop for second question
const Questions = ({ route, navigation }) => {
  const [allTeamAnswers, setAllTeamAnswers] = useState(false)
  const { questionNum } = route.params
  const accordionRef = useRef(null)

  const teamInfo = [
    {
      points: 20,
      voted: true,
    },
    {
      points: 0,
      voted: false,
    },
    {
      points: 50,
      voted: true,
    },
    {
      points: 0,
      voted: false,
    },
    {
      points: 70,
      voted: false,
    },
    {
      points: 0,
      voted: false,
    },
    {
      points: 70,
      voted: true,
    },
  ]

  const [show, setShow] = useState(false)
  const [expandedIndexes, setExpandedIndexes] = useState([])

  const handleContentTouchable = useCallback((i) => {
    if (i == questionNum) {
      teamDescription = "Tricksters"
    } else if (teamInfo[i - 1].voted) {
      teamDescription = "Voted"
    } else teamDescription = "Not Yet Voted"
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Team {i}</Text>
        <Text style={styles.description}>{teamDescription}</Text>
        <View style={styles.pointsContainer}>
          <Text style={styles.points}>{teamInfo[i - 1].points}</Text>
        </View>
      </View>
    )
  }, [])

  const handleContent = useCallback(() => {
    return <CollapsableContent />
  }, [])

  const handleIcon = useCallback(() => {
    return <Image source={require("../img/arrow.png")} />
  }, [])

  const handleOpen = (isShow, i) => {
    if (!expandedIndexes.includes(i))
      setExpandedIndexes([...expandedIndexes, i])
    else {
      setExpandedIndexes(expandedIndexes.filter((item) => item !== i))
    }
    setShow(isShow)
  }

  setTimeout(() => {
    setAllTeamAnswers(true)
  }, 2000)

  return (
    <SafeAreaView style={styles.mainContainer}>
      <LinearGradient
        colors={["#0D68B1", "#02215F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGradient}
      >
        <QuestionTabBar numQuestions={5} currentQuestion={questionNum} />
        <Text style={styles.phaseName}>Question {questionNum}</Text>
        <Text style={styles.phaseDescription}>Multiple Choice Questions</Text>
        <View style={{ flex: 1 }}>
          <ScrollView
            style={styles.teamInfoContainer}
            showsVerticalScrollIndicator={false}
          >
            {teamInfo.map((info, i) => {
              return (
                <AnimatedAccordion
                  key={i}
                  ref={accordionRef}
                  styleChevron={styles.icon}
                  renderContent={handleContent}
                  onChangeState={(isShow) => handleOpen(isShow, i)}
                  styleTouchable={[
                    styles.touchable,
                    expandedIndexes.indexOf(i) != -1
                      ? {
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                        }
                      : {},
                  ]}
                  activeBackgroundIcon={"transparent"}
                  inactiveBackgroundIcon={"transparent"}
                  handleContentTouchable={() => handleContentTouchable(i + 1)}
                  initialMountedContent={true}
                  handleIcon={handleIcon}
                />
              )
            })}
          </ScrollView>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.scrollDivider} />
          <Footer
            style={styles.footer}
            noPicked={2}
            teams={teamInfo.length}
            navigation={navigation}
            questionNum={questionNum}
            nextPage={"Results"}
            buttonLabel={"Skip to Results"}
            isBlue={allTeamAnswers}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default Questions

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#003668",
  },
  backgroundGradient: {
    flex: 1,
    paddingLeft: scale(12),
    paddingTop: scale(15),
  },
  phaseName: {
    fontSize: fonts.xxLarge,
    fontFamily: fontFamilies.poppinsBold,
    color: colors.white,
    marginTop: scale(12),
  },
  phaseDescription: {
    fontSize: fonts.medium,
    fontFamily: fontFamilies.poppinsRegular,
    color: colors.white,
    marginBottom: scale(12),
  },
  timerContainer: {
    flexDirection: "row",
    alignContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: scale(20),
  },
  timerProgressBar: {
    marginRight: 9,
    marginTop: 5,
    borderWidth: 0,
  },
  timerText: {
    color: "white",
    opacity: 0.8,
    fontSize: fonts.xSmall,
    fontFamily: fontFamilies.latoBold,
    fontWeight: "bold",
  },
  cardsContainer: {
    flex: 1,
  },
  footer: {
    marginTop: scale(10),
  },
  footerContainer: {
    bottom: 0,
    alignItems: "center",
    width: "100%",
    marginTop: scale(10),
  },
  scrollDivider: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    height: scale(2),
    width: "95%",
    alignSelf: "center",
    marginBottom: scale(2),
  },
  numbers: {
    fontFamily: fontFamilies.poppinsBold,
    fontSize: fonts.medium,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignItems: "center",
    marginLeft: scale(10),
  },
  title: {
    fontSize: fonts.xMedium,
    color: "rgba(255,255,255,0.8)",
    fontFamily: fontFamilies.poppinsSemiBold,
  },
  icon: {
    height: scale(35),
    width: scale(35),
    backgroundColor: "rgba(255,255,255,0)",
  },
  touchable: {
    height: scale(70),
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    marginTop: scale(10),
  },
  teamInfoContainer: {
    marginRight: scale(12),
  },
  pointsContainer: {
    backgroundColor: "#159EFA",
    width: scale(70),
    borderRadius: 20,
  },
  points: {
    fontSize: fonts.medium,
    fontFamily: fontFamilies.poppinsBold,
    color: colors.white,
    alignSelf: "center",
  },
  description: {
    fontSize: fonts.xSmall,
    color: colors.white,
    fontFamily: fontFamilies.poppinsRegular,
  },
})
