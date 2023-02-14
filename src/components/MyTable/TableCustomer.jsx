import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import CustomerEdit from "../Customer/customeredit.component";

import "./table.scss";

const TableCustomer = (props) => {
  const [dataShow, setDataShow] = useState([]);
  //Handle paging
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(props.bodyData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.bodyData.length / itemsPerPage));
  }, [props.bodyData, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % props.bodyData.length;
    setItemOffset(newOffset);
  };
  
  const [showModelEdit, setModelEdit] = useState(false);
  const [dataCustomer, setDataCustomer] = useState();

  const showEdit = (props) => {
    console.log(props);
    setDataCustomer(props);
    setModelEdit(!showModelEdit);
  };

  return (
    <div>
      {showModelEdit ? (
        <CustomerEdit closeModel={setModelEdit} data={dataCustomer} />
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
          {currentItems? (
            <>
              {currentItems.map((item, index) => (
                <tbody key={index} onClick={() => showEdit(item)}>
                  <tr>
                    <td>#{item.customerId}</td>
                    <td>
                      {item.customerName === null ? "null" : item.customerName}
                    </td>
                    <td>
                      {item.theAccount === null
                        ? "null"
                        : item.theAccount.phoneNumber}
                    </td>
                    <td>{item.address === null ? "null" : item.address}</td>
                    <td>{item.email === null ? "null" : item.email}</td>
                    <td>
                      {item.theAccount === null || !item.theAccount.status ? (
                        <td className="status red">Không hoạt động</td>
                      ) : (
                        <td className="status green">Hoạt động</td>
                      )}
                    </td>
                  </tr>
                </tbody>
              ))}
            </>
          ) : null}
        </table>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
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

export default TableCustomer;
