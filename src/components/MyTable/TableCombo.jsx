import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import "./table.scss";
import ComboEdit from "../Combo/comboedit.component";
import { Icon } from "@iconify/react";

const TableCombo = (props) => {
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

  const selectPage = (page) => {
    const start = Number(props.limit) * page;
    const end = start + Number(props.limit);
    setDataShow(props.bodyData.slice(start, end));
    setCurrPage(page);
  };
  const [popupEdit, setPopupEdit] = useState(false);

  const showEdit = (props) => {
    setPopupEdit(!popupEdit);
  };

  return (
    <div>
      {popupEdit ? <ComboEdit closeModel={setPopupEdit} data={""} /> : Fragment}
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
                <tbody
                  key={index}
                  onClick={() => {
                    showEdit(item);
                  }}
                >
                  <tr>
                    <td>#{"item.id"}</td>
                    <td>
                      {/* {item.customerName === null ? "null" : item.customerName} */}
                    </td>
                    <td>
                      {/* {item.theAccount === null
                        ? "null"
                        : item.theAccount.phoneNumber} */}
                    </td>
                    <td>
                      {/* {item.address === null ? "null" : item.address} */}
                    </td>
                    <td>{/* {item.email === null ? "null" : item.email} */}</td>
                    <td>
                      {/* {item.theAccount === null || !item.theAccount.status ? (
                        <td className="status red">Không hoạt động</td>
                      ) : (
                        <td className="status green">Hoạt động</td>
                      )} */}
                    </td>
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

export default TableCombo;
