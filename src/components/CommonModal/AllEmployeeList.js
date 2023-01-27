import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const AllEmployeeList = (props) => {
  const [departmentSeq, setDepartmentSeq] = useState(0);
  const baseUrl = "http://localhost:8080";
  const [deptList, setDeptList] = useState([]);
  const [page, setPage] = useState(1);
  const [countEmployee, setCountEmployee] = useState(0);
  const [checkedList, setCheckedLists] = useState([]);
  const [employeeName, setEmployeeName] = useState();
  const [companySeq, setCompanySeq] = useState();
  const [authSeq, setAuthSeq] = useState("");
  const [pointCompanySeq, setPointCompanySeq] = useState("");

  //값 받아서 departmentSeq 설정
  useEffect(() => {
    async function getDeptSeq() {
      const result = await props.departmentSeq;
      setDepartmentSeq(result);
    }
    getDeptSeq();
  }, [props]);

  useEffect(() => {
    async function getEmplName() {
      const result = await props.employeeName;
      setEmployeeName(result);
    }
    getEmplName();
  }, [props]);

  useEffect(() => {
    async function getAuthSeq() {
      const result = await props.authSeq;
      setAuthSeq(result);
    }
    getAuthSeq();
  }, [props]);

  useEffect(() => {
    async function getPointCompanySeq() {
      const result = await props.pointCompanySeq;
      setPointCompanySeq(result);
    }
    getPointCompanySeq();
  }, [props]);

  useEffect(() => {
    initLoad();
  }, [authSeq, pointCompanySeq]);

  const initLoad = async () => {
    if (authSeq != "" && pointCompanySeq != "") {
      let data = {
        authSeq: authSeq,
        companySeq: pointCompanySeq,
      };
      try {
        const dataResult = await axios.get(
          `${baseUrl}/department-employee/auth`,
          {
            params: data,
          }
        );
        setCheckedLists(dataResult.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {}, [checkedList]);

  //값 저장할 함수
  async function sendCheckedElement(a) {
    setCheckedLists(a);
  }

  //checkedList가 바뀔때마다 modal로 값 전송
  const sendInfo = () => {
    const result = JSON.stringify(checkedList);
    props.sendCheckedElement(result);
  };

  useEffect(() => {
    sendInfo();
  }, [checkedList]);

  //List, Count 가져오기
  const getDeptList = useCallback(async () => {
    if (departmentSeq != null) {
      let data = {
        departmentSeq,
      };
      try {
        const dataResult = await axios.get(
          `${baseUrl}/department-employee/department`,
          {
            params: data,
          }
        );
        setDeptList(dataResult.data);

        const dataResult2 = await axios.get(
          `${baseUrl}/department-employee/count/${departmentSeq}`
        );
        setCountEmployee(dataResult2.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [departmentSeq]);

  useEffect(() => {
    getDeptList();
    setPage(1);
  }, [departmentSeq]);

  //전체 클릭시 발생하는 함수
  const onCheckedAll = useCallback(
    (checked) => {
      if (checked) {
        const temp = [];

        deptList.forEach((list) => temp.push(list));
        let merged = checkedList.concat(temp);
        let unique = merged.filter((item, pos) => merged.indexOf(item) === pos);
        setCheckedLists(unique);
      } else {
        setCheckedLists([]);
      }
    },
    [deptList]
  );

  //개별 클릭시 발생하는 함수
  const onCheckedElement = useCallback(
    async (checked, list) => {
      try {
        if (checked) {
          setCheckedLists([...checkedList, list]);
        } else {
          setCheckedLists(
            checkedList.filter((el) => el.employeeSeq !== list.employeeSeq)
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    [checkedList]
  );

  //input값 바뀔때마다 값 받아오는 axios
  const getEmplElement = useCallback(async () => {
    if (employeeName == null) {
    } else {
      let getEmplData = {
        companySeq: companySeq,
        employeeName: employeeName,
      };
      try {
        const getEmplElementResult = await axios.get(
          `${baseUrl}/department-employee/search`,
          {
            params: getEmplData,
            headers: {
              Authorization: window.sessionStorage.getItem("empInfo"),
            },
          }
        );
        setDeptList(getEmplElementResult.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [employeeName]);

  useEffect(() => {
    getEmplElement();
  }, [employeeName]);

  //check된 값 저장 배열
  useEffect(() => {}, [checkedList]);
  useEffect(() => {}, [onCheckedAll]);
  useEffect(() => {}, [onCheckedElement]);

  return (
    <div>
      <div className="container">
        <div className="row" style={{ overflow: "auto", maxHeight: "250px" }}>
          <div className="col-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">
                    {" "}
                    <input
                      key={0}
                      type="checkbox"
                      readOnly
                      onClick={(e) => onCheckedAll(e.target.checked)}
                      checked={(() => {})()}
                      className="custom-control-input"
                      id="customCheck2"></input>
                  </th>
                  <th scope="col">사업장</th>
                  <th scope="col">부서명</th>
                  <th scope="col">직급</th>
                  <th scope="col">성명</th>
                  <th scope="col">이메일</th>
                </tr>
              </thead>
              <tbody>
                {deptList.map((dept) => (
                  <tr key={dept.employeeSeq}>
                    <td>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            onCheckedElement(e.target.checked, dept)
                          }
                          checked={(() => {
                            let tempList = checkedList.filter(
                              (data) => data.employeeSeq === dept.employeeSeq
                            );
                            if (tempList.length > 0) {
                              return true;
                            } else {
                              return false;
                            }
                          })()}
                          id="customCheck2"></input>
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1"></label>
                      </div>
                    </td>
                    <td>{dept.companyName}</td>
                    <td>{dept.workplaceName}</td>
                    <td>{dept.title}</td>
                    <td>{dept.employeeName}</td>
                    <td>{dept.employeePmail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllEmployeeList;
