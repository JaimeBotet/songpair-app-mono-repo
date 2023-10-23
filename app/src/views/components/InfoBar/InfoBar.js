import React from 'react';

import onlineIcon from '../../../assets/icons/onlineIcon.png';
import closeIcon from '../../../assets/icons/closeIcon.png';

import './InfoBar.scss';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>Room {room}</h3>
    </div>
  </div>
);

export default InfoBar;