import { Row, Col, Button } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import "../modals/OrganizationChart";
import AllCompanyList from "./AllCompanyList";
import AllSelectList from "./AllSelectList";
import AllEmployeeList from "./AllEmployeeList";
import "../modals/SearchModal.css";

const CommonModal = (props) => {
  const { open, close, header, getInfoCaLLback } = props;
  const [departmentSeq, setDepartmentSeq] = useState();
  const [checkItem, setCheckItem] = useState([]); //자식에서 받아올 값
  const [text, setText] = useState();
  const [employeeName, setEmployeeName] = useState();

  //함수 보냄
  const sendDepartmentSeq = (i) => {
    setDepartmentSeq(i);
  };
  const sendCheckedElement = (i) => {
    setCheckItem(i);
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  //버튼 누르면 값 이동
  const sendInputText = () => {
    setEmployeeName(text);
  };

  function SelelctEmplList() {
    getInfoCaLLback(checkItem);
  }

  //처음에 실행하고 바뀔때만 렌더링
  const changeDeptSeq = useCallback(() => {}, [departmentSeq]);
  const changeCheckedList = useCallback(() => {}, [checkItem]);
  const changeComSeq = useCallback(() => {}, [departmentSeq]);

  //부서Seq가 바뀔때마다 실행
  useEffect(() => {
    changeDeptSeq();
    changeCheckedList();
  }, [departmentSeq]);

  useEffect(() => {
    changeComSeq();
  }, [departmentSeq]);

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <Button className="close" onClick={close}>
              X
            </Button>
          </header>
          <main>
            <div>
              <Row>
                <Col sm={3}>
                  <select
                    className="form-select"
                    aria-label="Default select example">
                    <option>사원명</option>
                  </select>
                </Col>
                <Col sm={8}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="검색어를 입력하세요."
                      onChange={onChange}
                      value={text || ""}></input>
                  </div>
                </Col>
                <Col sm={1}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={sendInputText}>
                    검색
                  </button>
                </Col>
              </Row>

              <Row>
                <Col sm={5} className="AllCompanyList">
                  <AllCompanyList sendDepartmentSeq={sendDepartmentSeq} />
                </Col>
                <Col sm={7}>
                  <Row sm={7} className="AllCheckbox">
                    <AllEmployeeList
                      departmentSeq={departmentSeq}
                      sendCheckedElement={sendCheckedElement}
                      employeeName={employeeName}
                    />
                  </Row>
                  <Row>
                    <div>
                      <span className="CommonBtn">• 선택목록</span>
                      <button onClick={SelelctEmplList}>확인 </button>
                    </div>
                  </Row>
                  <Row sm={4} className="AllChoiceEmp">
                    <AllSelectList checkItem={checkItem} />
                  </Row>
                </Col>
              </Row>
            </div>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default CommonModal;
