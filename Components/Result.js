import React, { useRef, useState } from 'react'
import { StyleSheet, View, Text, Button, ActivityIndicator } from 'react-native'
import { Link, useNavigate } from 'react-router-native';
import Header from './Header';
import useData from './Hooks/useData';


export default function Result() {
  const navigate = useNavigate();

  const { batch, info, loading, setLoading, final, setFinal } = useData();
  const [cgpa, setCGPA] = useState(0);
  const cgpaRef = useRef();

  const results = [];
  var points = 0;
  var credits = 0;
  var CGPA = 0;
  var Final;

  if (info.studentId) {
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    let month = date.getMonth();
    let semester;

    if (month < 4) {
      semester = 1;
    } else if (month < 8) {
      semester = 2;
    } else {
      semester = 3;
    }

    const currentSemester = parseInt(year + semester);

    let mySemester = parseInt(batch);
    const semesters = [mySemester];


    while (currentSemester != mySemester) {
      mySemester++;

      if (mySemester.toString().split('').pop() > 3) {
        mySemester += 7;
      } else if (currentSemester < mySemester) {
        break;
      }

      semesters.push(mySemester)
    }




    for (let i = 0; i < semesters.length; i++) {
      const url = `http://software.diu.edu.bd:8189/result?semesterId=${semesters[i]}&studentId=${info.studentId}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.length !== 0)
            addResult(data, semesters[i])
        })
        .catch(error => console.log(error));

    }

    function addResult(result, semester) {
      Final = semester;
      for (let i = 0; i < result.length; i++) {
        points += result[i].cgpa * result[i].totalCredit;
        credits += result[i].totalCredit;
      }
      CGPA = (points / credits).toFixed(2);
    }
  }


  return (
    <View>
      <Header></Header>
      <View style={styles.box}>
        <Text style={styles.info}>
          <Text style={styles.bold}>Student ID:</Text> {info.studentId}
        </Text>

        <Text style={styles.info}>
          <Text style={styles.bold}>Name:</Text> {info.studentName}
        </Text>

        <Text style={styles.info}>
          <Text style={styles.bold}>Batch:</Text> {info.batchNo}
        </Text>

        <Text style={styles.info}>
          <Text style={styles.bold}>Origin:</Text> {info.semesterName}
        </Text>

        <Text style={styles.info}>
          <Text style={styles.bold}>Program:</Text> {info.programType}
        </Text>

        <Text style={styles.info}>
          <Text style={styles.bold}>Department:</Text> {info.deptShortName}
        </Text>

        <Text style={styles.info}>
          <Text style={styles.bold}>Shift:</Text> {info.shift}
        </Text>


        {
          loading
            ?
            <Button
              color='black'
              onPress={() => {
                setCGPA(CGPA);
                setFinal(Final);
                setLoading(false);
              }}
              title="Calculate CGPA" />

            :
            <View>
              <View style={{ marginBottom: 25 }}>
                <Text style={styles.output}>Your CGPA is: <Text style={styles.result}>{cgpa}</Text>
                </Text>
                <Text style={{ textAlign: 'center' }}>till {final} Semester</Text>
              </View>

              <Button
                color='black'
                onPress={() => {
                  navigate('/');
                  setLoading(false);
                }}
                title="Try Again" />
            </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  info: {
    margin: 3,

    fontSize: 18,
  },
  output: {
    textAlign: 'center',
    fontSize: 30,
    margin: 10
  },
  result: {
    fontSize: 50
  },
  box: {
    textAlign: 'left',
    padding: 10,
  }

});
