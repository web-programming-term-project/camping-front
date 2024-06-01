import "../css/my_camping_register.css";
import React, { useState } from "react";
export default function Modal({ closeModal, addSite, siteData }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [peopleCount, setPeopleCount] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  useState(() => {
    if (siteData != null) {
      const { sitePhotoUrl, siteName, category, pCapacity, charge } = siteData;

      setSelectedOption(category);
      setPeopleCount(pCapacity);
      setPrice(charge);
      setName(siteName);
    }
  }, []);

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
