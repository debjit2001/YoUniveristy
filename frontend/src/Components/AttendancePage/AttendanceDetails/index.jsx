import React, { Component } from "react";
import { Spinner } from "reactstrap";
import axios from "axios";
import { IP } from "../../../IPDetails";

class AttendancePage extends Component {
  state = {
    student: [],
    subjects: [],
  };

  getSubject = () => {
    const subject = Object.keys(this.state.student[0]).slice(
      3,
      Object.keys(this.state.student[0]).length - 2
    );
    this.setState({
      subjects: subject,
    });
  };

  componentDidMount() {
    axios.get(`${IP}/api/attendance`).then((res) =>
      this.setState(
        {
          student: res.data,
        },
        () => {
          this.getSubject();
        }
      )
    );
  }

  getAverageAttendance = (id) => {
    const students = this.state.student[id];
    const { subjects } = this.state;
    let total = 0;
    let average = 0;
    if (subjects && subjects.length) {
      subjects.forEach((sub) => {
        total += students[sub];
      });
      average = total / subjects.length;
      average = average.toFixed(2);
      return <td>{average}</td>;
    }
  };

  displayList = () => {
    return (
      <div>
        {this.state.student && this.state.student.length ? (
          <table className="table  table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Roll</th>
                <th scope="col">Semester</th>
                {this.state.subjects.map((sub, index) => (
                  <th scope="col" key={index}>
                    {sub}
                  </th>
                ))}
                <th scope="col">Average</th>
              </tr>
            </thead>
            <tbody>
              {this.state.student.map((stud, index) => (
                <tr key={index}>
                  <td>{stud.name}</td>
                  <td>{stud.roll}</td>
                  <td>{stud.semester}</td>
                  <td>{stud[this.state.subjects[0]]}</td>
                  <td>{stud[this.state.subjects[1]]}</td>
                  <td>{stud[this.state.subjects[2]]}</td>
                  {this.getAverageAttendance(index)}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Spinner role="grow" />
        )}
      </div>
    );
  };

  render() {
    return this.displayList();
  }
}

export default AttendancePage;
