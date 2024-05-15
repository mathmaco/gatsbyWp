import React, { useContext, useEffect } from "react"

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

const handleCopyEmail = (event) => {
  const email = "contact@mathi.jp";
  navigator.clipboard.writeText(email).then(() => {
    alert(`メールアドレスがコピーされました` + email);
  }).catch(err => {
    alert(`コピーに失敗しました`,err);
  });
}
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
        <div className={header.logo}><Link to="/"><Logo/></Link></div>
        <nav className={header.nav}>
              <ul className={header.menu}>
                <li><Link to="/">Projects<i className={header.mark}><Star/></i><i className={header.count}>({posts.length})</i></Link></li>
                <li><Link to="/about/">About</Link></li>
                <li><span onClick={handleCopyEmail} id="email-link">Contact</span></li>
              </ul>
              <div className={header.time}>
                <div className="current-time">{currentTime}</div>
             </div>
            </nav>
            <div className={header.layout}>
        <div className={header.layoutNav}>
          <ul className={header.layoutNavList}>
            <li><button type="button" data-value="list1" onClick={() => handleClick("list1")}onKeyDown={(event) => {if (event.key === 'Enter' || event.key === ' ') {handleClick("list1");}}} className={selectedValue === "list1" ? "selected" : ""}><List1 /><span style={{ visibility:'hidden',display:'none' }}>レイアウト</span></button></li>
            <li><button type="button" data-value="list2" onClick={() => handleClick("list2")}onKeyDown={(event) => {if (event.key === 'Enter' || event.key === ' ') {handleClick("list2");}}} className={selectedValue === "list2" ? "selected" : ""}><List2/><span style={{ visibility: 'hidden',display:'none' }}>レイアウト</span></button></li>
            <li><button type="button" data-value="list3" onClick={() => handleClick("list3")}onKeyDown={(event) => {if (event.key === 'Enter' || event.key === ' ') {handleClick("list3");}}} className={selectedValue === "list3" ? "selected" : ""}><List3/><span style={{ visibility: 'hidden',display:'none' }}>レイアウト</span></button></li>
          </ul>
          <div className={header.layoutNavPaa}><Paa/></div>
            </div>
            <ul className={`sns-list ${header.snsList}`}>
                          <li><a href="" target="_blank">Instagram</a></li>
                          <li><a href="" target="_blank">Vimeo</a></li>
                          <li><a href="" target="_blank">X</a></li>
              </ul>
              </div>
    </div>
    </div>
      </header>
      <div className={header.spNav}>
        <nav className={header.nav}>
              <ul className={header.menu}>
                <li><Link to="/">Projects<i className={header.mark}><Star/></i><i className={header.count}>({posts.length})</i></Link></li>
                <li><Link to="/about/">About</Link></li>
                <li><Link to="/">Contact</Link></li>
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
