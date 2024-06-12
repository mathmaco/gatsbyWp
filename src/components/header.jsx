import React, { useContext, useEffect, useState } from "react"


import { Link } from "gatsby";
//import { StaticImage } from "gatsby-plugin-image"
import { Helmet } from 'react-helmet'

import { useSelectedValue } from '../contexts/SelectedValueContext';
import { ProjectsContext } from "../contexts/ProjectsContext";

import Logo from "./logo";
import Paa from "./paa";
import Star from "./star";

import List1 from "./icon_viewlist1";
import List2 from "./icon_viewlist2";
import List3 from "./icon_viewlist3";

import * as header from "../css/components/header.module.scss"

import { TimeContext } from '../contexts/TimeContext';

const Header = () => {

  const [PaaMessage, setPaaMessage] = useState(false);
  const [Tooltip, setTooltip] = useState(false);
  //const marqueeRef = useRef(null);

  const handleTooltipClick = () => {
    setTooltip(!Tooltip);
  }
  const handleMessageClick = () => {
    setPaaMessage(!PaaMessage);
  }

  const handleCopyEmail = (event) => {
    const email = "paa@paa.ac";
    navigator.clipboard.writeText(email).then(() => {
    }).catch(err => {
    });
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the Tooltip or PaaMessage
      if (!event.target.closest('.js-Tooltip')) {
        setTooltip(false);
        setPaaMessage(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);



  const currentTime = useContext(TimeContext);
  const { selectedValue, setSelectedValue } = useSelectedValue();
  const posts = useContext(ProjectsContext);

  useEffect(() => {
    const savedValue = localStorage.getItem('selectedValue');
    if (savedValue) {
      setSelectedValue(savedValue);
    }
  }, []);

  const handleClick = (value) => {
    setSelectedValue(value);
    localStorage.setItem('selectedValue', value);

  };


  return (
    <>
      <header id="mashhead" className={header.header}>
        <div className={`inner ${header.inner}`}>
          <div className={header.content}>
            <div className={header.logo}><Link to="/" className="play-sound"><Logo /></Link></div>
            <nav id="js-nav" className={header.nav}>
              <ul className={header.menu}>
                <li>
                  <Link to="/" className="play-sound">Projects<i className={header.mark}><Star /></i><i className={header.count}>({posts.length})</i></Link>
                </li>
                <li><Link to="/about/" className="play-sound">About</Link></li>
                <li className="js-Tooltip">
                  <span onClick={handleTooltipClick} id="email-link" className="play-sound">Contact</span>
                  <div className={`${header.Tooltip} ${Tooltip ? 'visible' : ''}`}>
                    <div className={header.TooltipMail}>paa(at)paa.ac</div>
                    <div onClick={handleCopyEmail} className={header.TooltipClipbord}>Copy this e-mail address</div>
                  </div>
                </li>
              </ul>
              <div className={header.time}>
                <div className="current-time">{currentTime}</div>
              </div>
            </nav>
            <div className={header.layout}>
              <div className={header.layoutNav}>
                <ul className={header.layoutNavList}>
                  <li className="play-sound nav-item"><div data-value="list1" onClick={() => handleClick("list1")} className={`${selectedValue === "list1" ? "selected" : ""} ${header.layoutItem}`}><List1 /></div></li>
                  <li className="play-sound nav-item"><div data-value="list2" onClick={() => handleClick("list2")} className={`${selectedValue === "list2" ? "selected" : ""}  ${header.layoutItem}`}><List2 /></div></li>
                  <li className="play-sound nav-item"><div data-value="list3" onClick={() => handleClick("list3")} className={`${selectedValue === "list3" ? "selected" : ""}  ${header.layoutItem}`}><List3 /></div></li>
                </ul>
                <div className={`${header.layoutNavPaa} play-sound js-Tooltip`} id="icon-paa" onClick={handleMessageClick}><Paa /></div>
                <div className={`${header.PaaMessage} ${PaaMessage ? 'visible' : ''}`}>
                  もうちょっと待ってね！
                </div>
              </div>
              <ul className={`sns-list ${header.snsList}`}>
                <li><a href="" target="_blank" className="play-sound">Instagram</a></li>
                <li><a href="" target="_blank" className="play-sound">Vimeo</a></li>
                <li><a href="" target="_blank" className="play-sound">X</a></li>
              </ul>
            </div>
          </div>
        </div>
      </header >
      <div className={header.spNav}>
        <nav className={header.nav}>
          <ul className={header.menu}>
            <li><Link to="/">Projects<i className={header.mark}><Star /></i><i className={header.count}>({posts.length})</i></Link></li>
            <li><Link to="/about/">About</Link></li>
            <li className="js-Tooltip">
              <span onClick={handleTooltipClick}>Contact</span>
              <div className={`${header.Tooltip} ${Tooltip ? 'visible' : ''}`}>
                <div className={header.TooltipMail}>paa(at)paa.ac</div>
                <div onClick={handleCopyEmail} className={header.TooltipClipbord}>Copy this e-mail address</div>
              </div>
            </li>
          </ul>
          <div className={header.time}>
            <div className="current-time">{currentTime}</div>
          </div>
        </nav>

      </div>

    </>

  );
};

export default Header;
