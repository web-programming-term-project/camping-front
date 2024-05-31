import CustomContainer from "./component/CustomContainer";
import "./css/my_page.css";
import { useNavigate } from "react-router-dom";
export default function MyPage() {
  const navigate = useNavigate();

  const goToMyCampingList = () => {
    navigate("/my-camping-list");
  };
  const goToMyCampingReservationList = () => {
    navigate("/my-camping-reservation-list");
  };
  return (
    <div className="myPageContainer">
      관리자 페이지
      <CustomContainer
        name={"내 숙소 보기"}
        onClick={goToMyCampingList}
      ></CustomContainer>
      <CustomContainer
        name={"내 숙소 예약 내역"}
        onClick={goToMyCampingReservationList}
      ></CustomContainer>
      {/* <CustomContainer name={"예약 현황"}></CustomContainer> */}
    </div>
  );
}
