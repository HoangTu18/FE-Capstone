import React, { Fragment, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "./table.scss";
import ReactPaginate from "react-paginate";
import RestaurantEdit from "../Restaurant/restaurantedit.component";
const TableRestaurant = (props) => {
  const [dataShow, setDataShow] = useState([]);

  //Handle paging
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 7;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(props.bodyData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.bodyData.length / itemsPerPage));
    // const initDataShow =
    //   props.limit && props.bodyData
    //     ? props.bodyData.slice(0, Number(props.limit))
    //     : props.bodyData;
    // setDataShow(initDataShow);
  }, [props.bodyData, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % props.bodyData.length;
    setItemOffset(newOffset);
  };

  // let pages = 1;

  // let range = [];

  // let page = Math.floor(props.bodyData.length / Number(props.limit));
  // pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1;

  // range = [...Array(pages).keys()];

  // const [currPage, setCurrPage] = useState(0);

  // const selectPage = (page) => {
  //   const start = Number(props.limit) * page;

  //   const end = start + Number(props.limit);
  //   setDataShow(props.bodyData.slice(start, end));
  //   setCurrPage(page);
  // };
  const findManager = (resId) => {
    currentItems.map((item) => {
      if (item.restaurantId === resId) {
        return item.staffList.filter(
          (item) => item.theAccountForStaff.roleId === 3
        );
      }
    });
  };

  const [popupEdit, setPopupEdit] = useState(false);
  const [newId, setNewId] = useState("");

  const showEdit = (props) => {
    setNewId(props);
    setPopupEdit(!popupEdit);
  };

  return (
    <div>
      {popupEdit ? (
        <RestaurantEdit closeModel={setPopupEdit} data={newId} />
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
              {currentItems.map((item, index) => (
                <tbody key={index}>
                  <tr>
                    <td>#{item.restaurantId}</td>
                    <td>{item.restaurantName}</td>
                    <td>{item.restaurantNumber}</td>
                    <td>{findManager(item.restaurantId)}</td>
                    <td>{item.restaurantLocation.split(",")[3]}</td>
                    {item.status ? (
                      <td className="status green">Hoạt động</td>
                    ) : (
                      <td className="status red">Không hoạt động</td>
                    )}
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
      {/* {pages > 1 ? (
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
      ) : null} */}
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </div>
  );
};

export default TableRestaurant;
