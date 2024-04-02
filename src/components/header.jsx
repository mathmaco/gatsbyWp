import React, { useEffect, useState } from "react"

import { Link } from "gatsby";
//import { StaticImage } from "gatsby-plugin-image"

import Projects from "./projects";

import Logo from "./logo";
import Paa from "./paa";
import Star from "./star";

import List1 from "./icon_viewlist1";
import List2 from "./icon_viewlist2";
import List3 from "./icon_viewlist3";

import * as header from "../css/components/header.module.scss"



const Header = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    // ページが読み込まれた際にローカルストレージから値を取得する
    const savedValue = localStorage.getItem('selectedValue');
    if (savedValue) {
      setSelectedValue(savedValue);
    }
  }, []); // 空の配列を渡すことで、このeffectはマウント時にのみ実行されます

  const handleClick = (value) => {
    setSelectedValue(value);
    // 値をローカルストレージに保存する
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
                <li><Link to="/">PROJECTS<i className={header.mark}><Star/></i><i className={header.count}>(23)</i></Link></li>
                <li><Link to="/service/">SERVICE</Link></li>
                <li><Link to="/about/">ABOUT</Link></li>

              </ul>
        </nav>
      <div className={header.layoutNav}>
      <ul className={header.layoutNavList}>
        <li><button type="button" data-value="list1" onClick={() => handleClick("list1")}onKeyDown={(event) => {if (event.key === 'Enter' || event.key === ' ') {handleClick("list1");}}} className={selectedValue === "list1" ? "selected" : ""}><List1 /><span style={{ visibility: 'hidden',display:'none' }}>レイアウト</span></button></li>
        <li><button type="button" data-value="list2" onClick={() => handleClick("list1")}onKeyDown={(event) => {if (event.key === 'Enter' || event.key === ' ') {handleClick("list2");}}} className={selectedValue === "list2" ? "selected" : ""}><List2/><span style={{ visibility: 'hidden',display:'none' }}>レイアウト</span></button></li>
        <li><button type="button" data-value="list3" onClick={() => handleClick("list3")}onKeyDown={(event) => {if (event.key === 'Enter' || event.key === ' ') {handleClick("list3");}}} className={selectedValue === "list3" ? "selected" : ""}><List3/><span style={{ visibility: 'hidden',display:'none' }}>レイアウト</span></button></li>
      </ul>
      <div className={header.layoutNavPaa}><Paa/></div>
        </div>
      </div>
    </div>
    </header>
      <Projects selectedValue={selectedValue} />
    </>

  );
};

export default Header;
