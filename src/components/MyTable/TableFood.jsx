import { Icon } from "@iconify/react";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFoodRequest,
  getCategoryRequest,
} from "../../pages/FoodManager/foodManageSlice";
import ConfirmPopup from "../Confirm/ConfirmPopup";
import FoodEdit from "../Food/FoodEditPopup";
import "./table.scss";
import { stringLimit } from "../../ultil/string";
import { formatToVND } from "../../ultil/numberUltil";
import FoodView from "../Food/FoodViewPopup";
import { getRegionRequest } from "../../pages/RegionManage/RegionManageSlice";

const TableFood = (props) => {
  const dispatch = useDispatch();

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

  const [popupView, setPopupView] = useState(false);
  const [popupEdit, setPopupEdit] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [newData, setNewData] = useState("");

  const showView = (props) => {
    setNewData(props);
    setPopupView(!popupEdit);
  };

  const showEdit = (props) => {
    setNewData(props);
    setPopupEdit(!popupEdit);
  };
  const showDelete = (props) => {
    setNewData(props);
    setPopupDelete(!popupDelete);
  };

  if (confirm) {
    setConfirm(false);
    dispatch(deleteFoodRequest(newData));
    setPopupDelete(!popupDelete);
  }
  const cateData = useSelector((state) => state.foodManage.listCategory);
  const regionData = useSelector((state) => state.regionManage.listRegion);

  useEffect(() => {
    dispatch(getCategoryRequest());
    dispatch(getRegionRequest());
  }, [dispatch]);

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

  const getCateId = (food) => {
    let result;
    const item = cateData.find((cate) =>
      cate.foodList.some((foodItem) => foodItem.id === food)
    );
    if (item) result = item.id;
    return result;
  };

  const getRegionId = (food) => {
    let result;
    const item = regionData.find((region) =>
      region.foodList.some((foodItem) => foodItem.id === food)
    );
    if (item) result = item.id;
    return result;
  };

  return (
    <div>
      {popupView ? (
        <FoodView
          closeModel={setPopupView}
          data={newData}
          listCate={cateData}
          cateId={getCateId(newData.id)}
          listRegion={regionData}
          regionId={getRegionId(newData.id)}
        />
      ) : (
        Fragment
      )}
      {popupEdit ? (
        <FoodEdit
          closeModel={setPopupEdit}
          data={newData}
          listCate={cateData}
          cateId={getCateId(newData.id)}
          listRegion={regionData}
          regionId={getRegionId(newData.id)}
        />
      ) : (
        Fragment
      )}
      {popupDelete ? (
        <ConfirmPopup
          closeModel={setPopupDelete}
          title={"Bạn có muốn huỷ kích hoạt món ăn này không?"}
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
          {currentItems ? (
            <>
              {currentItems.map((item, index) => (
                <tbody key={index}>
                  <tr>
                    <td>#{item.id}</td>
                    <td>
                      {item.foodName === null
                        ? "null"
                        : stringLimit(item.foodName)}
                    </td>
                    <td>
                      {item.price === null ? "null" : formatToVND(item.price)}
                    </td>
                    <td>{getCateName(item)}</td>
                    {item.status ? (
                      <td className="status green">Hoạt động</td>
                    ) : (
                      <td className="status red">Không hoạt động</td>
                    )}
                    <td>
                      <Icon
                        className="icon"
                        icon="bx:show-alt"
                        onClick={() => {
                          showView(item);
                        }}
                      />
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
                        onClick={() => showDelete(item.id)}
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
