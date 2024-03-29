/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useTransition } from "react";
import English from "../assets/English.png";
import Vietnam from "../assets/Vietnam.png";
import "./Language.css";

const Languages = ({ changeLanguage}) => {
    const {t} = useTransition();

  return (
    <div className="languageStyle">
      <img
        onClick={() => changeLanguage("Vietnam")}
        width={20}
        src={Vietnam}
        className="vietnamese"
        alt="Vietnamese Flag"
      />
      <img
        onClick={() => changeLanguage("English")}
        width={20}
        src={English}
        className="english"
        alt="English Flag"
      />
    </div>
  );
};

export default Languages;
