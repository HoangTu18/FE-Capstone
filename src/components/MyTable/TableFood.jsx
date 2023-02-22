import { Icon } from "@iconify/react";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryRequest } from "../../pages/FoodManager/foodManageSlice";
import DishEdit from "../Dish/dishedit.component";
import "./table.scss";

const TableFood = (props) => {
  //Handle paging
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 7;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(props.bodyData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.bodyData.length / itemsPerPage));
  }, [props.bodyData, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % props.bodyData.length;
    setItemOffset(newOffset);
  };

  const [popupEdit, setPopupEdit] = useState(false);
  const [newData, setNewData] = useState("");

  const showEdit = (props) => {
    setNewData(props);
    setPopupEdit(!popupEdit);
  };

  const dispath = useDispatch();
  const cateData = useSelector((state) => state.foodManage.listCategory);

  useEffect(() => {
    dispath(getCategoryRequest());
  }, [dispath]);

  const getCateName = (food) => {
    let result = "";
    cateData.forEach((item) => {
      item.foodList.forEach((foodItem) => {
        if (foodItem.id === food.id) {
          result = item.categoryName;
        }
      });
    });
    return result;
  };

  return (
    <div>
      {popupEdit ? (
        <DishEdit closeModel={setPopupEdit} data={newData} />
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
          {currentItems ? (
            <>
              {currentItems.map((item, index) => (
                <tbody key={index}>
                  <tr>
                    <td>#{item.id}</td>
                    <td>{item.foodName === null ? "null" : item.foodName}</td>
                    <td>{item.price === null ? "null" : item.price}</td>
                    <td>{getCateName(item)}</td>
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
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
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

export default TableFood;
