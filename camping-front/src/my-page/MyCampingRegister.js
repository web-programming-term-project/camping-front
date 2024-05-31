import Site from "./component/Site";
import "./css/my_camping_register.css";
import React, { useState } from "react";
import axios from "axios";

export default function MyCampingRegister() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [siteList, setSiteList] = useState([]);
  const [facilities, setFacilities] = useState({
    publicShowerroom: false,
    publicRestroom: false,
    counter: false,
    publicParkingLot: false,
    store: false,
    fishing: false,
    valley: false,
    mountain: false,
  });
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [checkinTime, setCheckinTime] = useState("");
  const [checkoutTime, setCheckoutTime] = useState("");
  const [mannerTimeStart, setmannerTimeStart] = useState("");
  const [mannerTimeEnd, setmannerTimeEnd] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addSite = (site) => {
    setSiteList((prevSites) => [...prevSites, site]);
    closeModal(); // Close the modal
  };

  const handleFacilityChange = (e) => {
    const { name, checked } = e.target;
    setFacilities((prevFacilities) => ({
      ...prevFacilities,
      [name]: checked,
    }));
  };

  return (
    <div className="myCampingRegisterContainer">
      <InputContainer text={"이름"} onChange={handleNameChange} value={name} />
      <InputContainer
        text={"주소"}
        onChange={(e) => setAddress(e.target.value)}
        value={address}
      />
      <InputContainer
        text={"연락처"}
        onChange={(e) => setContact(e.target.value)}
        value={contact}
      />
      <div className="textarea">
        숙소 소개
        <div>
          <textarea
            className="textareaContainer"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
      </div>
      <div className="checkin-out-time">
        입실시간
        <TimeSelect
          onChange={(e) => setCheckinTime(e.target.value)}
          value={checkinTime}
        />
        <div className="timeMargin"></div>
        퇴실시간
        <TimeSelect
          onChange={(e) => setCheckoutTime(e.target.value)}
          value={checkoutTime}
        />
      </div>
      <button onClick={openModal} className="openModalButton">
        사이트 등록
      </button>
      {isModalOpen && <Modal closeModal={closeModal} addSite={addSite} />}
      <div className="sites">
        {siteList.map((item) => (
          <Site key={item.id}></Site>
        ))}
      </div>
      <div className="checkin-out-time">
        매너타임 시작
        <TimeSelect
          value={mannerTimeStart}
          onChange={(e) => setmannerTimeStart(e.target.value)}
        />
        <div className="timeMargin"></div>
        매너타임 종료
        <TimeSelect
          value={mannerTimeEnd}
          onChange={(e) => setmannerTimeEnd(e.target.value)}
        />
      </div>
      <div className="facilities">
        <h3>시설 정보</h3>
        <h4>부대시설</h4>
        <label>
          공용 샤워실
          <input
            type="checkbox"
            name="publicShowerroom"
            checked={facilities.publicShowerroom}
            onChange={handleFacilityChange}
          />
        </label>
        <label>
          공용 화장실
          <input
            type="checkbox"
            name="publicRestroom"
            checked={facilities.publicRestroom}
            onChange={handleFacilityChange}
          />
        </label>
        <label>
          계수대
          <input
            type="checkbox"
            name="counter"
            checked={facilities.counter}
            onChange={handleFacilityChange}
          />
        </label>
        <label>
          공용 주차장
          <input
            type="checkbox"
            name="publicParkingLot"
            checked={facilities.publicParkingLot}
            onChange={handleFacilityChange}
          />
        </label>
        <label>
          편의점/매점
          <input
            type="checkbox"
            name="store"
            checked={facilities.store}
            onChange={handleFacilityChange}
          />
        </label>
        <h4>놀거리</h4>
        <label>
          낚시
          <input
            type="checkbox"
            name="fishing"
            checked={facilities.fishing}
            onChange={handleFacilityChange}
          />
        </label>
        <label>
          계곡
          <input
            type="checkbox"
            name="valley"
            checked={facilities.valley}
            onChange={handleFacilityChange}
          />
        </label>
        <h4>주변 환경</h4>
        <label>
          산
          <input
            type="checkbox"
            name="mountain"
            checked={facilities.mountain}
            onChange={handleFacilityChange}
          />
        </label>
      </div>

      <button
        onClick={() => {
          const dataToSend = {
            userNum: 1,
            name: name,
            address: address,
            telephone: contact,
            content: description,
            enterTime: `${checkinTime}:00`,
            exitTime: `${checkoutTime}:00`,
            mannerTimeStart: `${mannerTimeStart}:00`,
            mannerTimeEnd: `${mannerTimeEnd}:00`,
            photoUrl: "test", // 임시 데이터, 실제 데이터로 대체 필요
            facilities: Object.keys(facilities)
              .filter((key) => facilities[key])
              .map((key) => ({ facility: key })),
            sites: siteList.map((site) => ({
              siteName: site.siteName,
              charge: site.charge,
              pCapacity: site.pCapacity,
              sitePhotoUrl: "testurl", // 임시 데이터, 실제 데이터로 대체 필요
              category: site.category,
            })),
          };
          console.log(dataToSend);
          axios
            .post("http://172.30.68.228:3000/campsite", dataToSend)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        확인
      </button>
    </div>
  );
}

function InputContainer({ text, value, onChange }) {
  return (
    <div className="inputContainer">
      {text || "null"}{" "}
      <input className="input" onChange={onChange} value={value} />
    </div>
  );
}

function TimeSelect({ onChange, value }) {
  const times = Array.from({ length: 48 }, (_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hours < 10 ? `0${hours}` : hours}:${minutes}`;
  });

  return (
    <select className="timeSelect" onChange={onChange} value={value}>
      {times.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
}
function Modal({ closeModal, addSite }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [peopleCount, setPeopleCount] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handlePeopleCountChange = (e) => {
    setPeopleCount(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    const newSite = {
      sitePhotoUrl: "testurl",
      siteName: name,
      category: selectedOption || "캠핑",
      pCapacity: parseInt(peopleCount),
      charge: parseInt(price),
    };
    addSite(newSite);
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <div className="image-container"></div>
        <div className="inputContainer">
          사이트 이름{" "}
          <input className="input" value={name} onChange={handleNameChange} />
        </div>
        <select
          value={selectedOption}
          onChange={handleSelectChange}
          className="selectMenu"
        >
          <option value="캠핑">캠핑</option>
          <option value="글램핑">글램핑</option>
          <option value="카라반">카라반</option>
          <option value="펜션">펜션</option>
        </select>
        <div className="inputContainer">
          인원수{" "}
          <input
            className="input"
            value={peopleCount}
            onChange={handlePeopleCountChange}
          />
        </div>
        <div className="inputContainer">
          요금{" "}
          <input className="input" value={price} onChange={handlePriceChange} />
        </div>
        <div className="modalOverlay-btn">
          <button onClick={closeModal}>닫기</button>
          <button onClick={handleSubmit}>확인</button>
        </div>
      </div>
    </div>
  );
}
