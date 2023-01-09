import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import "../Modals/Modal.css";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { BsTelephonePlus } from "react-icons/bs";
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";

const Modal = (props) => {
  const { open, close, header } = props;
  const baseUrl = "http://localhost:8080";
  const [deptNameList, setDeptNameList] = useState([]);
  const [deptList, setDeptList] = useState([]);
  const [deptDetail, setDeptDetail] = useState([]);
  const [companySeq, setCompanySeq] = useState("2");
  const [workplaceSeq, setWorkplaceSeq] = useState();
  const [departmentSeq, setDepartmentSeq] = useState();
  const [page, setPage] = useState(1);
  const [deptCheck, setDeptCheck] = useState();

  //페이지 처리
  useEffect(() => {
    // console.log(ListPage(workplaceSeq, departmentSeq));
    if (workplaceSeq == null) {
      return;
    } else {
      return ListPage(workplaceSeq, departmentSeq);
    }
  }, [page]);
  // console.log(page);

  // 부서별 페이지 저장 deptNameList.departmentSeq
  useEffect(() => {
    if (page === 1) {
      return console.log("작동안함");
    } else {
      return console.log("작동함"); //deptcheck값 바뀔때로
    }
  }, [page]);

  //부서 전체 출력
  useEffect(() => {
    const url = baseUrl + "/department/list/" + companySeq;
    axios({
      method: "get",
      url: url,
    }).then((res) => {
      setDeptNameList(res.data);
    });
  }, []);

  // useCallback(() => {}, [page]);
  // console.log(page + "값 입니다!!");

  //부서값에 해당되는 직원 list로 출력하는 함수
  function ListPage(workplaceSeq, departmentSeq) {
    // setDeptCheck(departmentSeq);
    // setWorkplaceSeq(deptNameList.workplaceSeq);
    // setDepartmentSeq(deptNameList.departmentSeq);
    // console.log(deptNameList.workplaceSeq);
    // console.log("List page:" + page);
    // console.log("workplaceSeq:" + workplaceSeq);
    // console.log("check");
    // console.log(deptNameList.departmentSeq);
    // console.log("departmentSeq:" + departmentSeq);
    // console.log("workplaceSeq:" + departmentSeq);

    const url = `${baseUrl}/department-employee/page/${page}?companySeq=${companySeq}&workplaceSeq=${workplaceSeq}&departmentSeq=${departmentSeq}`;
    setWorkplaceSeq(workplaceSeq);
    setDepartmentSeq(departmentSeq);

    axios({
      type: "get",
      url: url,
      Page: page,
    })
      .then((res) => {
        // console.log(res.data)
        setDeptList(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // console.log(deptList);
  //리스트값에 해당되는 직원의 상세페이지
  function DetailPage(employeeSeq) {
    // console.log(employeeSeq);
    const url = baseUrl + "/employee/emplist/" + employeeSeq;
    axios({
      method: "get",
      url: url,
    }).then((res) => {
      // console.log(res.data)
      setDeptDetail(res.data);
      // console.log(deptDetail);
    });
  }
  // useEffect( ()=> {
  //     const url = baseUrl + "/department/deptnamelist";
  //     axios({
  //         method: "get",
  //         url: url,
  //       }).then((res) => {
  //         setDeptList(res.data);
  //         console.log(res.data);
  //       });
  //     },[]);

  return (
    //open 누르면 openModal 클래스 생성
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              X
            </button>
          </header>
          <main>
            <div className="br">
              <span className="hover"> 전체그룹 </span> |{" "}
              <span className="hover">마이그룹</span>
            </div>

            <hr />

            <Container>
              <Row>
                {/* <Button variant="primary" onClick={DeptNameList}>DeptNameList</Button>{' '} */}
                <Col className="deptList">
                  {/* {props.children} */}

                  {deptNameList.map((deptNameList, i) => {
                    return (
                      deptNameList && (
                        <div key={i}>
                          -{" "}
                          <span
                            onClick={() =>
                              ListPage(
                                deptNameList.workplaceSeq,
                                deptNameList.departmentSeq
                              )
                            }>
                            {deptNameList.departmentName}

                            {/* {console.log(deptNameList.departmentSeq)} */}
                          </span>
                        </div>
                        // <div key={i}>- {deptNameList.departmentName}</div>
                      )
                    );
                  })}
                  {/* {JSON.stringify(deptNameList.deptName)} */}
                  {/* {JSON.stringify(deptNameList)} */}
                </Col>

                <Col sm={5} className="employeeList">
                  <br />
                  {/* {JSON.stringify(deptList)} */}
                  {deptList.map((deptList, i) => {
                    return (
                      deptList && (
                        <div key={i}>
                          <Container>
                            <Row
                              onClick={() => DetailPage(deptList.employeeSeq)}>
                              <Col sm={3} classname="image">
                                {" "}
                                <div style={{ padding: "25px" }}>
                                  {" "}
                                  <BsFillFileEarmarkPersonFill size="70" />
                                </div>
                              </Col>
                              <Col sm={9}>
                                <Row className="name">
                                  {deptList.employeeName} |{" "}
                                  {deptList.employeeId}
                                </Row>
                                <Row className="stage">
                                  부서번호 : {deptList.workplaceSeq}
                                </Row>
                                <Row className="phnum">
                                  <div style={{ width: "35px" }}>
                                    <BsTelephonePlus />
                                  </div>
                                  {deptList.employeePh}{" "}
                                </Row>
                              </Col>
                            </Row>
                            <hr />
                          </Container>
                        </div>
                      )
                    );
                  })}

                  <div>
                    <button
                      className="btn"
                      onClick={() => {
                        // console.log("바뀐값" + page);
                        setPage(page + 1);
                        // console.log("함수실행후" + page);
                      }}>
                      ˅
                    </button>
                    <br />
                  </div>
                </Col>

                {deptDetail && (
                  <Col sm={3} className="employeeDetail">
                    <div>
                      <Row>
                        <Col sm={9}>
                          {" "}
                          <div style={{ padding: "50px" }}>
                            <BsFillFileEarmarkPersonFill size="60" />
                          </div>
                        </Col>
                        <Col sm={3}>logo</Col>

                        <Row>
                          <span className="center">
                            {deptDetail.employeeName}
                          </span>
                        </Row>
                        <hr />
                        <Row>
                          <span className="center">
                            {deptDetail.employeeId}{" "}
                          </span>
                        </Row>
                        <Row>
                          <span className="center">
                            {deptDetail.employeeBirth}{" "}
                          </span>
                        </Row>
                      </Row>
                    </div>

                    <div>
                      <br />
                      <ul class="list-group">
                        <li class="list-group-item">
                          부서번호 : {deptList.workplaceSeq}
                        </li>
                        <li class="list-group-item">{deptDetail.employeePh}</li>
                        <li class="list-group-item">
                          {deptDetail.employeeCmail}
                        </li>
                        <li class="list-group-item">
                          {deptDetail.employeePmail}
                        </li>
                      </ul>
                    </div>
                  </Col>
                )}
              </Row>
            </Container>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
