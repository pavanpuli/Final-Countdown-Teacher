import axios from 'axios';
import '../App.css';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TableRow } from './Teachers';
import { Sort } from './Sort';
export const Home = () => {
  const [teachers, setTeachers] = useState([]);
  function handleSort(term) {
    if (term === 'ti') {
      let x = teachers.sort((a, b) => a.id - b.id);
      console.log(x);
      setTeachers([...x]);
    }
    if (term === 'tg') {
      let x = teachers.sort((a, b) => b.id - a.id);
      console.log(x);
      setTeachers([...x]);
    }
    if (term === 'pa') {
      let x = teachers.sort((a, b) => a.age - b.age);
      console.log(x);
      setTeachers([...x]);
    }
    if (term === 'pd') {
      let x = teachers.sort((a, b) => b.age - a.age);
      console.log(x);
      setTeachers([...x]);
    }
    if (term === 'td') {
      let x = teachers.sort((a, b) => {
        if (a.gender > b.gender) return -1;
        if (a.gender < b.gender) return 1;
        return 0;
      });
      console.log(x);
      setTeachers([...x]);
    }
    if (term === 'ta') {
      let x = teachers.sort((a, b) => {
        if (a.gender > b.gender) return 1;
        if (a.gender < b.gender) return -1;

        return 0;
      });
      console.log(x);
      setTeachers([...x]);
    }
  }
  useEffect(() => getData(), []);

  const getData = () => {
    axios.get(`http://localhost:5000/teacher?_limit=4&_page=${page}`).then((res) => {
      console.log('res data', res.data);
      setTeachers(res.data.teachersData);
    });
  };

  const MainDiv = styled.div`
    margin: auto;
    text-align: center;
    border: 1px solid green;
    background-color: rgb(14, 157, 50);
    width: 80%;
    .subDiv {
      border: 1px solid black;
      width: 80%;
      justify-content: center;
      margin: auto;
    }
    table {
      border: 1px solid black;
      margin: auto;
    }
    th {
      border: 1px solid black;
      padding: 10px;
    }
    td {
      border: 1px solid black;
    }
  `;
  return (
    <div className="homeContainer">
      <h2 style={{ textAlign: 'center', backgroundColor: '#cecece' }}>Home</h2>
      <div id="btns">
        {' '}
        <Sort handleSort={handleSort} />
      </div>
      <MainDiv>
        <h2 style={{ color: 'white' }}>List of Teachers</h2>
        <div className="subDiv">
          <table>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
            {teachers.map((el) => (
              <TableRow key={el.id} data={el} />
            ))}
          </table>
        </div>
      </MainDiv>
    </div>
  );
};