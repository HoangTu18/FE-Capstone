import React, { Fragment, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "./table.scss";
import UserEdit from "../User/useredit.component";
import ConfirmPopup from "../Confirm/ConfirmPopup";
import * as deleteStaffs from "../../api/Staff/deleteStaff";
import * as getRole from "../../api/Role/getRole";

const TableStaff = (props) => {
  const [dataShow, setDataShow] = useState([]);

  useEffect(() => {
    const initDataShow =
      props.limit && props.bodyData
        ? props.bodyData.slice(0, Number(props.limit))
        : props.bodyData;
    setDataShow(initDataShow);
  }, [props.bodyData, props.limit]);

  let pages = 1;

  let range = [];

  let page = Math.floor(props.bodyData.length / Number(props.limit));
  pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1;

  range = [...Array(pages).keys()];

  const [currPage, setCurrPage] = useState(0);
  const [popupEdit, setPopupEdit] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);
  const [newId, setNewId] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [dataRole, setDataRole] = useState([]);

  const selectPage = (page) => {
    const start = Number(props.limit) * page;

    const end = start + Number(props.limit);
    setDataShow(props.bodyData.slice(start, end));
    setCurrPage(page);
  };

  useEffect(() => {
    const fetchApi = async () => {
      //loading = true
      const result = await getRole.view();
      setDataRole(result);

      console.log("Staffs API: ", result);
      //loading = false
    };
    fetchApi();
  }, []);

  function getRoleName(id) {
    return dataRole.find((item) => item.roleId === id)["roleName"];
  }

  const showEdit = (props) => {
    setNewId(props);
    setPopupEdit(!popupEdit);
  };

  const showDelete = (props) => {
    setNewId(props);
    setPopupDelete(!popupDelete);
  };

  if (confirm) {
    const fetchApi = async (staffId) => {
      setConfirm(false);
      //loading = true
      const result = await deleteStaffs.remove(staffId);
      if (result.status === 200) {
        setPopupDelete(false);
        window.location.reload();
      }
      console.log("Staffs API: ", result.status);
      //loading = false
    };
    fetchApi(newId);
  }
  return (
    <div>
      {popupEdit ? (
        <UserEdit closeModel={setPopupEdit} data={newId} />
      ) : (
        Fragment
      )}
      {popupDelete ? (
        <ConfirmPopup
          closeModel={setPopupDelete}
          title={"Bạn có muốn xoá nhân viên này không?"}
          btnYes={"Có"}
          btnNo={"Không"}
          confirm={setConfirm}
        />
      ) : (
        Fragment
      )}
      <div className="table-wrapper">
        <table>
          {props.headData && props.renderHead ? (
            <thead>
              <tr>
                {props.headData.map((item, index) =>
                  props.renderHead(item, index)
                )}
              </tr>
            </thead>
          ) : null}
          {props.bodyData && props.renderBody ? (
            <>
              {dataShow.map((item, index) => (
                <tbody key={index}>
                  <tr>
                    <td>#{item.staffId}</td>
                    <td>{item.staffFullName}</td>
                    <td>{getRoleName(item.theAccountForStaff.roleId)}</td>
                    {item.staffStatus ? (
                      <td className="status green">Hoạt động</td>
                    ) : (
                      <td className="status red">Không hoạt động</td>
                    )}
                    <td>{item.theAccountForStaff.phoneNumber}</td>
                    <td>
                      <Icon className="icon" icon="bx:show-alt" />
                      <Icon
                        className="icon"
                        icon="bx:bx-edit-alt"
                        onClick={() => {
                          showEdit(item);
                        }}
                      />
                      <Icon
                        className="icon"
                        icon="material-symbols:delete-outline-rounded"
                        onClick={() => showDelete(item.staffId)}
                      />
                    </td>
                  </tr>
                </tbody>
              ))}
            </>
          ) : null}
        </table>
      </div>
      {pages > 1 ? (
        <div className="table__pagination">
          {range.map((item, index) => (
            <div
              key={index}
              className={`table__pagination-item ${
                currPage === index ? "active" : ""
              }`}
              onClick={() => selectPage(index)}
            >
              {item + 1}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default TableStaff;
