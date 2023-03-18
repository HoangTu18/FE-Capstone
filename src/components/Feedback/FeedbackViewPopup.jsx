import moment from "moment/moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedbackRequest } from "../../pages/FeedbackManager/feedbackSlice";
import "./feedback.style.scss";
function FeedbackView({ closeModel, data }) {
  const dispatch = useDispatch();
  const feedbackList = useSelector(
    (state) => state.feedbackManage.listFeedback
  );
  useEffect(() => {
    dispatch(getFeedbackRequest());
  }, [dispatch]);

  const commentList = feedbackList.filter((item) => item.food.id === +data.id);
  return (
    <div className="popup">
      <form
        className="form-up"
        style={{ width: "1100px" }}
        noValidate
        autoComplete="off"
      >
        <div className="feedback__title unselectable">Danh sách đánh giá</div>

        <ul className="listFeedback">
          {commentList.map((item, index) => {
            return (
              <li className="box" key={index}>
                <div className="left" style={{ margin: "10px 30px 0 0" }}>
                  <img
                    className="imageFeedback"
                    src={
                      "https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/320881319_1206837483523963_2616536678702255853_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=DQZnJQoda8gAX_JOZgj&_nc_ht=scontent.fsgn5-8.fna&oh=00_AfDVyOMrf3syzMSKMPXPc-UbjNwrexS4uSMJeskFWOIw0g&oe=641A0D3E"
                    }
                    alt=""
                  />
                </div>
                <div className="right">
                  <span className="name">{item.accountId}</span>
                  <div className="rate">
                    <i
                      className={
                        "fa fa-star" + (item.rate >= 1 ? " checked" : "")
                      }
                      aria-hidden="true"
                    />

                    <i
                      className={
                        "fa fa-star" + (item.rate >= 2 ? " checked" : "")
                      }
                      aria-hidden="true"
                    />
                    <i
                      className={
                        "fa fa-star" + (item.rate >= 3 ? " checked" : "")
                      }
                      aria-hidden="true"
                    />
                    <i
                      className={
                        "fa fa-star" + (item.rate >= 4 ? " checked" : "")
                      }
                      aria-hidden="true"
                    />
                    <i
                      className={
                        "fa fa-star" + (item.rate === 5 ? " checked" : "")
                      }
                      aria-hidden="true"
                    />
                  </div>
                  <span className="date">
                    {moment(item.createdAt).format("DD/MM/yyyy HH:mm:ss")}
                  </span>
                  <span className="comment">{item.comment}</span>
                </div>
                <hr className="horizonalLine" />
              </li>
            );
          })}
        </ul>
        <div className="feedback__button">
          <button
            type="button"
            className="btn cancel"
            onClick={() => closeModel(false)}
          >
            Đóng
          </button>
        </div>
      </form>
    </div>
  );
}
export default FeedbackView;
