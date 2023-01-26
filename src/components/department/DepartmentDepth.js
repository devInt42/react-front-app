import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiFillFolder, AiFillFolderOpen } from 'react-icons/ai';

const DepartmentDepth = (props) => {

    const baseUrl = "http://localhost:8080";
    const [depthIsOpen, setDepthIsOpen] = useState(false);
    const [department, setDepartment] = useState([]);
    const [depth, setDepth] = useState(0);
    const [seq, setSeq] = useState(0);
    const [count, setCount] = useState(0);
    const [index, setIndex] = useState([]);
    useEffect(() => {
        setDepth(props.depth + 1);
        setSeq(props.seq);
    }, [props])
    const getChildCount = async () => {
        let sendChild = {
            departmentDepth: depth,
            departmentParent: seq
        };
        try {
            let childRes = await axios.get(`${baseUrl}/department/count`, {
                params: sendChild
            });
            setCount(childRes);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getChildCount();
    }, [seq, depth])
    const getData = async () => {
        let sendChild = {
            departmentDepth: depth,
            departmentParent: seq,
        };
        try {
            if (count != 0) {
                let childRes = await axios.get(`${baseUrl}/department/list`, {
                    params: sendChild
                });
                setDepartment(childRes.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, [count])
    return (
        <div>
            {
                department && department.map((child, idx) => {
                    return (
                        <div key={child.departmentSeq}>
                            {child.departmentParent == seq &&
                                <div style={{ paddingLeft: depth * 20 + 20 }}
                                    >
                                     <div onClick={() => {
                                        index.includes(child.departmentSeq) ?
                                        setIndex(index.filter(department => department !=child.departmentSeq)) :
                                        setIndex([...index, child.departmentSeq]);
                                        props.setDepartmentSeq(child.departmentSeq);
                                    }}>
                                        {index.includes(child.departmentSeq) ? <AiFillFolderOpen className="departmentlist-icon" /> :
                                            <AiFillFolder className="departmentlist-icon" />}
                                        {child.departmentCode}.{child.departmentName}
                                        
                                    </div>
                                </div>
                            }
                            {index.includes(child.departmentSeq) && <DepartmentDepth depth={child.departmentDepth} key={idx} seq={child.departmentSeq} setDepartmentSeq = {props.setDepartmentSeq}
                            depthIsOpen = {depthIsOpen} />}
                        </div>
                    )

                })
            }
        </div>
    )
}

export default DepartmentDepth;