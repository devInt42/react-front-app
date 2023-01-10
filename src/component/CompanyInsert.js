import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { BsFillOctagonFill } from "react-icons/bs";
import { TfiClose } from 'react-icons/tfi'
import lodash from "lodash";
// import { IoMdArrowDropdown } from "react-icons/io";
import "../css/CompanyInsert.css";

import ZippopupDom from "./zipcode/ZippopupDom";
import ZippopupPostCode from './zipcode/ZippopupZipCode';

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
const CompanyInsert = ((props) => {

    let [companyCode, setCompanyCode] = useState("");
    let [companyName, setCompanyName] = useState("");
    let [companyBusiness, setCompanyBusiness] = useState("");
    let [companyItem, setCompanyItem] = useState("");
    let [companyCall, setCompanyCall] = useState("");
    let [companyRegist, setCompanyRegist] = useState("");
    let [companyCorporate, setCompanyCorporate] = useState("");
    let [companyPresident, setCompanyPresident] = useState("");
    let [companyHomepage, setCompanyHomepage] = useState("");
    let [companyAddr, setCompanyAddr] = useState("");
    let [companyEstablish, setCompanyEstablish] = useState("");
    let [companyClosingDay, setCompanyClosingday] = useState("");
    let [flag, setFlag] = useState(0);
    let [areaCode, setAreaCode] = useState("");
    let [companyFax, setCompanyFax] = useState("");
    let [companyZipCode, setCompanyZipCode] = useState("");
    let [companyForeigner, setCompanyForeigner] = useState("내국인");
    let [address, setAddress] = useState("");
    let [zipcodeIsOpen, setZipcodeIsOpen] = useState(false);

    const data = {  // 서버로 보낼 데이터
        "companyCode": companyCode,
        "companyName": companyName,
        "companyBusiness": companyBusiness,
        "companyItem": companyItem,
        "companyCall": companyCall,
        "companyRegist": companyRegist,
        "companyCorporate": companyCorporate,
        "companyPresident": companyPresident,
        "companyHomepage": companyHomepage,
        "companyAddr": companyAddr,
        "companyEstablish": companyEstablish,
        "companyClosingDay": companyClosingDay,
        "flag": flag,
        "companyFax": companyFax,
        "companyZipCode": companyZipCode,
        "companyForeigner": companyForeigner
    }
    const baseUrl = "http://localhost:8080";

    async function insertCompany() {  //회사 추가
        await axios.post(
            `${baseUrl}/company/insert`
            , JSON.stringify(data)
            ,
            {
                headers: {
                    "Content-Type": 'application/json'
                },
            })
            .then(res => console.log(res.data))
            .catch(error => console.log(error));
    }

    //클래스 이름을 바꾸기 위함(css 동적으로 변경)
    let [callStyle, setCallStyle] = useState(false);
    let [faxStyle, setFaxStyle] = useState(false);
    let [registStyle, setRegistStyle] = useState(false);
    let [corporateStyle, setCorporateStyle] = useState(false);

    //모든 필수 값이 제대로 들어갔을 때 추가 버튼 활성화
    let [allCheck, setAllCheck] = useState(false);

    //값이 바뀔때마다 유효성 검사를 하기 위함
    useEffect(() => {

        companyCall < 0 ? companyCall = '' : PhoneNumberCheck(companyCall) ? setCallStyle(true) : setCallStyle(false);

    }, [companyCall])

    useEffect(() => {

        companyFax < 0 ? companyFax = '' : FaxNumberCheck(companyFax) ? setFaxStyle(true) : setFaxStyle(false);

    }, [companyFax])

    useEffect(() => {

        companyRegist < 0 ? companyRegist = '' : registNumberCheck(companyRegist) ? setRegistStyle(true) : setRegistStyle(false);

    }, [companyRegist])

    useEffect(() => {

        companyCorporate < 0 ? companyCorporate = '' : corporateNumberCheck(companyCorporate) ?
            setCorporateStyle(true) : setCorporateStyle(false);

    }, [companyCorporate])

    //모든 필수 사항이 제대로 입력되었을 때, 추가 버튼 활성화 구현
    useEffect(() => {
        if(registStyle && corporateStyle && codeNumberCheck(companyCode) 
        && companyBusiness !== "" && companyItem !== "" && companyPresident !== "") {
            setAllCheck(true);
        }
    }, [registStyle, corporateStyle, companyCode, companyBusiness, companyItem, companyAddr, companyPresident])

    return (
        <div>
            <div className="infoheader">
                <b className="littletitle"> <BsFillOctagonFill /> 기본정보</b>
                <div>
                    <button className = "insertbutton" 
                    type="button" onClick={() => {if(allCheck) {insertCompany(); props.setAddflag(false)};}} 
                    disabled = {allCheck}>추가</button>
                    <button className="infoclosebutton" onClick={() => props.setAddflag(false)}> <TfiClose /></button>
                </div>
            </div>

            <div id="companyinfo">
                <div className="info-row">
                    <div className="infoform">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">회사 코드</InputGroup.Text>
                            <Form.Control
                                placeholder="회사 코드를 입력해 주십시오."
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={e => setCompanyCode(codeNumber(e.target.value))}
                                value = {companyCode}
                                Style = "background-color:#ffe9e9" 
                            />
                        </InputGroup>
                    </div>
                    <div className="infoform">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">사용 여부</InputGroup.Text>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                onChange={() => { flag === 0 ? setFlag(1) : setFlag(0); }}
                            />
                            {flag === 1 ? (<b>사    용</b>) : (<b>미사용</b>)}
                        </InputGroup>
                    </div>
                </div>
                <div className="info-row">
                    <div className="oneinfoform">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">회사 이름</InputGroup.Text>
                            <Form.Control
                                placeholder="회사 이름을 입력해 주십시오."
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={e => setCompanyName(e.target.value)}
                            />
                        </InputGroup>
                    </div>
                </div>
                <div className="info-row">
                    <div className="infoform">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">업태</InputGroup.Text>
                            <Form.Control
                                placeholder="회사 업태를 입력해 주십시오."
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={e => setCompanyBusiness(e.target.value)}
                                Style = "background-color:#ffe9e9"
                            />
                        </InputGroup>
                    </div>
                    <div className="infoform">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">종목</InputGroup.Text>
                            <Form.Control
                                placeholder="회사 종목을 입력해 주십시오."
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={e => setCompanyItem(e.target.value)}
                                Style = "background-color:#ffe9e9" 
                            />
                        </InputGroup>
                    </div>
                </div>
                <div className="info-row">
                    <div className="infoform">
                        <InputGroup className="mb-3 callbox" id="callinput">
                            <InputGroup.Text id="basic-addon1">대표 전화</InputGroup.Text>
                            <div className="area-code-box">
                                <select name="area-code" className="area-code" onChange={(e) => setAreaCode(e.target.value)}>
                                    <option value="" selected>직접 입력</option>
                                    <option value="010-">010</option>
                                    <option value="02-">02</option>
                                    <option value="031-">031</option>
                                    <option value="032-">032</option>
                                    <option value="033-">033</option>
                                    <option value="041-">041</option>
                                    <option value="042-">042</option>
                                    <option value="043-">043</option>
                                    <option value="044-">044</option>
                                    <option value="051-">051</option>
                                    <option value="052-">052</option>
                                    <option value="053-">053</option>
                                    <option value="054-">054</option>
                                    <option value="055-">055</option>
                                    <option value="061-">061</option>
                                    <option value="062-">062</option>
                                    <option value="063-">063</option>
                                    <option value="064-">064</option>
                                </select>
                            </div>
                            <Form.Control
                                placeholder="대표 전화를 입력해 주십시오."
                                aria-describedby="basic-addon1"
                                onChange={e => { setCompanyCall(PhoneNumber(areaCode + e.target.value)) }}
                                value={companyCall.substring(areaCode.length)}
                                isValid = {callStyle}
                                isInvalid = {companyCall.length < 1 ? '' : callStyle ? false: true}
                                Style = "z-index:0;"
                            />
                        </InputGroup>
                    </div>
                    <div className="infoform">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">대표 팩스</InputGroup.Text>
                            <Form.Control
                                placeholder="대표 팩스를 입력해 주십시오."
                                aria-describedby="basic-addon1"
                                onChange={e => { setCompanyFax(FaxNumber(e.target.value)); }}
                                value={companyFax}
                                isValid = {faxStyle}
                                isInvalid = {companyFax.length < 1 ? '' : faxStyle ? false: true}
                                Style = "z-index:0"
                            />
                        </InputGroup>
                    </div>
                </div>
                <div className="info-row">
                    <div className="infoform">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">사업자 등록번호</InputGroup.Text>
                            <Form.Control
                                placeholder="사업자 등록번호를 입력해 주십시오."
                                aria-describedby="basic-addon1"
                                onChange={e => setCompanyRegist(registNumber(e.target.value))}
                                value={companyRegist}
                                isValid = {registStyle}
                                isInvalid = {companyRegist.length < 1 ? '' : registStyle ? false: true}
                                Style = "z-index:0;  background-color:#ffe9e9"
                            />
                        </InputGroup>
                    </div>
                    <div className="infoform">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">법인 번호</InputGroup.Text>
                            <Form.Control
                                placeholder="법인 번호를 입력해 주십시오."
                                aria-describedby="basic-addon1"
                                onChange={e => setCompanyCorporate(corporateNumber(e.target.value))}
                                value={companyCorporate}
                                isValid = {corporateStyle}
                                isInvalid = {companyCorporate.length < 1 ? '' : corporateStyle ? false: true}
                                Style = "z-index:0;  background-color:#ffe9e9"
                            />
                        </InputGroup>
                    </div>
                </div>
                <div className="info-row">
                    <div className="infoform">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">대표자명</InputGroup.Text>
                            <Form.Control
                                placeholder="대표자명을 입력해 주십시오."
                                aria-describedby="basic-addon1"
                                onChange={e => setCompanyPresident(e.target.value)}
                                Style = "background-color:#ffe9e9"
                            />
                        </InputGroup>
                    </div>
                    <div className="infoform">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">외국인 여부</InputGroup.Text>
                            <select name="area-code" className="" onChange={(e) => setCompanyForeigner(e.target.value)}>
                                <option value="내국인" selected>내국인</option>
                                <option value="외국인" >외국인</option>
                            </select>
                            <Form.Control
                                aria-describedby="basic-addon1"
                                value={companyForeigner}
                                readOnly
                            />
                        </InputGroup>
                    </div>
                </div>
                <div></div>
                <div className="info-row">
                    <div className="oneinfoform addressform">
                        <InputGroup.Text id="basic-addon1">회사 주소</InputGroup.Text>
                        <div className="addressinfo">
                            <div className="infoform addressinfoform">
                                <Form.Control
                                    aria-describedby="basic-addon1"
                                    value={companyZipCode}
                                    onFocus={() => {
                                        companyZipCode.length > 0 ? setZipcodeIsOpen(false) : setZipcodeIsOpen(true);
                                    }}
                                    Style = "background-color:#ffe9e9; width: 200px"
                                />
                                <button className="addressnumbtn" type="button" onClick={() => setZipcodeIsOpen(true)}>우편번호 검색
                                </button>
                            </div>
                            <div id="zippopupdom">
                                {
                                    zipcodeIsOpen && (
                                        <ZippopupDom>
                                            <ZippopupPostCode
                                                onClose={setZipcodeIsOpen}
                                                setCompanyZipCode={setCompanyZipCode}
                                                setAddress={setAddress}
                                            />
                                        </ZippopupDom>
                                    )
                                }
                            </div>
                            <div className="address">
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        aria-describedby="basic-addon1"
                                        onFocus={() =>
                                            address.length === 0 && setZipcodeIsOpen(true)
                                        }
                                        value={address}
                                        onChange = {() => setCompanyAddr(address)}
                                        Style = "background-color:#ffe9e9"
                                        readOnly
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="상세 주소를 입력해 주십시오."
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        onChange={e => { setCompanyAddr(address + " " + e.target.value) }}
                                    />
                                </InputGroup>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="info-row">
                    <div className="oneinfoform">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">홈페이지 주소</InputGroup.Text>
                            <Form.Control
                                placeholder="홈페이지 주소를 입력해 주십시오."
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={e => setCompanyHomepage(e.target.value)}
                            />
                        </InputGroup>
                    </div>
                </div>
                <div className="info-row">
                    <div className="infoform">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">설립일</InputGroup.Text>
                            <input type="date" onChange={e => setCompanyEstablish(e.target.value)} />
                        </InputGroup>
                    </div>
                    <div className="infoform">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">폐업일</InputGroup.Text>
                            <input type="date" onChange={e => setCompanyClosingday(e.target.value)} />
                        </InputGroup>
                    </div>
                </div>


            </div>
        </div>
    )

})

//자동으로 하이픈 삽입
function PhoneNumber(value) {
    if (!value) {
        return "";
    }

    value = value.replace(/[^0-9]/g, "");

    let result = [];
    let restNumber = "";

    if (value.startsWith("02")) {
        //서울 지역번호
        result.push(value.substr(0, 2));
        restNumber = value.substring(2);
    }
    else if (value.startsWith("1")) {
        // 지역 번호가 없는 경우
        // 1xxx-yyyy
        restNumber = value;
    } else {
        // 나머지 3자리 지역번호
        // 0xx-yyyy-zzzz
        result.push(value.substr(0, 3));
        restNumber = value.substring(3);
    }

    if (restNumber.length === 7) {
        // 7자리만 남았을 때는 xxx-yyyy
        result.push(restNumber.substring(0, 3));
        result.push(restNumber.substring(3));
    } else {
        result.push(restNumber.substring(0, 4));
        result.push(restNumber.substring(4));
    }
    return result.filter((val) => val).join("-");
}

function FaxNumber(value) {
    if (!value) { return ""; }

    value = value.replace(/[^0-9]/g, "");
    let result = [];
    let restNumber = "";

    if (value.startsWith("02")) {
        result.push(value.substring(0, 2));
        restNumber = value.substring(2);
    } else if (value.startsWith("0505") || value.startsWith("0504")) {
        result.push(value.substring(0, 4));
        restNumber = value.substring(4);
    }
    else {
        result.push(value.substring(0, 3));
        restNumber = value.substring(3);
    }

    if (restNumber.length === 7) {
        result.push(restNumber.substring(0, 3));
        result.push(restNumber.substring(3));
    } else {
        result.push(restNumber.substring(0, 4));
        result.push(restNumber.substring(4));
    }
    return result.filter((val) => val).join("-");
}

function registNumber(value) {
    if (!value) { return ""; }

    value = value.replace(/[^0-9]/g, "");
    let result = [];
    let restNumber = "";

    result.push(value.substring(0, 3));
    restNumber = value.substring(3);

    result.push(restNumber.substring(0, 2));
    restNumber = restNumber.substring(2);

    result.push(restNumber.substring(0, 5));
    restNumber = restNumber.substring(5);

    return result.filter((val) => val).join("-");
}
function corporateNumber(value) {
    if (!value) { return ""; }

    value = value.replace(/[^0-9]/g, "");
    let result = [];
    let restNumber = "";

    result.push(value.substring(0, 6));
    restNumber = value.substring(6);

    result.push(restNumber.substring(0, 7));
    restNumber = value.substring(7);

    return result.filter(val => val).join("-");
}

function codeNumber(value) {
    if (!value) { return ""; }

    value = value.replace(/[^0-9]/g, "");
    let result = "";
    result = value.substring(0,4);
    return result;
}

//유효성 검사를 하기 위한 함수
function PhoneNumberCheck(value) { //대표번호 유효성 검사
    const check = /^0[0-9]{1,2}-[0-9]{3,4}-[0-9]{4}$/;
    return check.test(value);
}

function FaxNumberCheck(value) {
    const check = /(^02[0-9]{0}|^01[0-9]{1}|050[0-9]{1}|[0-9]{3})-[0-9]{3,4}-[0-9]{4}$/;
    return check.test(value);
}

function registNumberCheck(value) {
    const check = /^[0-9]{3}-[0-9]{2}-[0-9]{5}$/;
    return check.test(value);
}

function corporateNumberCheck(value) {
    const check = /^[0-9]{6}-[0-9]{7}$/;
    return check.test(value);
}

function codeNumberCheck(value) {
    value = value.replace(/^[0-9]/g, "");
    const check = /^[0-9]{4}$/;
    return check.test(value);
}

export default CompanyInsert;