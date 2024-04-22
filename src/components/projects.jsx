import React, { useContext, useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';
import * as p from '../css/components/project.module.scss';
import Marquee from 'react-fast-marquee';
import "../css/components/react-marquee-styles.scss"

import { useSelectedValue } from '../contexts/SelectedValueContext';
import { ProjectsContext } from '../contexts/ProjectsContext';
const customStyle = {
  // カスタムスタイルをここで定義

};

const GalleryMarquee = ({ media, speed, postIndex, customStyle }) => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    setContent(media.map((item, index) => (
      <div className={p.item} key={index}>
        {item.mediaCheck === 'photo' && item.photo && (
          <div className={p.photo}>
          <GatsbyImage
            image={item.photo.node.localFile.childImageSharp.gatsbyImageData}
            style={{ width:'100%',height: '100%' }}
            alt=""
            />
            </div>
        )}
{item.mediaCheck === 'video' && item.video && (
          <>
  <div className={p.video}>
              <iframe
                src={`https://player.vimeo.com/video/${item.video}?autoplay=1&loop=1&title=0&byline=0&portrait=0&controls=0&mute=1&autopause=0`}
                width={'100%'}
                height={'100%'}
                title='vimeo'
                loading="lazy"
              />
  </div></>
)}
      </div>
    )));
  }, [media]);

  const marqueeRef = useRef(null);
  const direction = postIndex % 2 === 0 ? 'left' : 'right';
  return (
    <>
      <Marquee ref={marqueeRef} speed={speed} direction={direction} autoFill={true} style={customStyle}>{content}</Marquee>
    </>
  );
};

const Projects = () => {

  const posts = useContext(ProjectsContext);
  const { selectedValue } = useSelectedValue();


  const allNews = useContext(ProjectsContext);
  const [list, setList] = useState([...allNews.slice(0, 1)]);
  const [loadMore, setLoadMore] = useState(false);
  const [hasMore, setHasMore] = useState(allNews.length > 1);
  const loadRef = useRef();

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setLoadMore(true);
    }
  }

 useEffect(() => {
  var options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  }
  const observer = new IntersectionObserver(handleObserver, options)
  if (loadRef.current) {
    observer.observe(loadRef.current)
  }
}, [allNews, loadRef]); // 'allNews'と'loadRef'を依存関係の配列に追加する

useEffect(() => {
  if (loadMore && hasMore) {
    const currentLength = list.length
    const isMore = currentLength < allNews.length
    const nextResults = isMore
      ? allNews.slice(currentLength, currentLength + 1)
      : []
    setList(prevList => [...prevList, ...nextResults]); // 関数形式の更新を使用してlistを更新する
    setLoadMore(false)
  }
}, [loadMore, hasMore, list, allNews]); // 'allNews'を依存関係の配列に追加する

useEffect(() => {
  const isMore = list.length < allNews.length
  setHasMore(isMore)
}, [list, allNews]); // 'allNews'を依存関係の配列に追加する


  return (
    <>
      <ul data-view={selectedValue} className={p.list}>
      {list.map((post, postIndex) => {
        const title = post.title;
        const category = post.categories.nodes;
        const tag = post.tags.nodes;
        //const galleries = post.projects.projectsGallery.nodes;
        const speed = post.projects.projectsGallerySpeed;
        const media = post.projects.projectsMedia;
        //const mediaCheck = post.projects.projectsMedia.mediaCheck;
        ////const photo = post.projects.projectsMedia.photo.node;
        //const video = post.projects.projectsMedia.oembed;

        const credit = post.projects.projectsCredit
        const count = post.projects.projectsMediaCount
        const power = post.projects.projectsMediaPower
        const subTtlEn = post.projects.projectsSubtitleEn
        const subTtlJa = post.projects.projectsSubtitleJa
        const ttlEn = post.projects.projectsTitleEn
        const url = post.projects.projectsUrl

        return (
          <li key={post.uri} className={p.listItem}>
            <article className={p.post} itemScope itemType="http://schema.org/Article">
              <header className={p.meta}>
                <div className={p.metaList}>
                  <div>{ttlEn}</div>
                  <div>{subTtlEn}</div>
                  <div>
                    {category && (
                      <ul className={p.catList}>
                        {category.map((cat, index) => (
                          <li key={index}>{cat.name}</li>
                        ))}
                      </ul>
                    )}
                </div>
                  <div>
                    {tag && (
                      <ul className={p.tagList}>
                        {tag.map((tags, index) => (
                          <li key={index}>{tags.name}</li>
                          ))}
                      </ul>
                    )}
                </div>
                  <div>{post.date}</div>
                </div>
                <h2>
                  <Link to={post.uri} itemProp="url">
                    <span itemProp="headline">{parse(title)}</span>
                  </Link>
                </h2>
              </header>
              <div className={p.gallery}>

                {media && (<GalleryMarquee media={media} speed={speed} postIndex={postIndex + 1}customStyle={customStyle}  />
                )}
              </div>
            </article>
          </li>
        );
      })}
      </ul>
      <div ref={loadRef} >
        {hasMore ? <p>Loading...</p> : <p>No more results</p>}
      </div>
    </>
  );
};

export default Projects;
