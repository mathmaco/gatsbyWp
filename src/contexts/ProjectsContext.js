// ProjectsContext.js
import React, { createContext, useState, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

export const ProjectsContext = createContext([]);

export const ProjectsProvider = ({ children }) => {
    const data = useStaticQuery(graphql`
        query {
            allWpPost(sort: { fields: [date], order: DESC }, limit: 1000) {
                nodes {
                    excerpt
                    uri
                    date(formatString: "MMMM DD, YYYY")
                    title
                    categories {
                        nodes {
                            name
                            slug
                            id
                        }
                    }
                    tags {
                        nodes {
                            name
                            id
                            slug
                        }
                    }
                    projects {
                        projectsGallerySpeed
                        projectsCredit
                        projectsMediaCount
                        projectsMediaPower
                        projectsSubtitleEn
                        projectsSubtitleJa
                        projectsTitleEn
                        projectsUrl
                        projectsMedia {
                            viewCheck
                            mediaCheck
                            shortVideo
                            shortVideoMp4Pic {
                            node {
                            localFile {
                                childImageSharp {
                                original {
                                    src
                                    width
                                    height
                                }
                                }
                            }
                            }
                        }
                            shortVideoMp4 {
                                node {
                                mediaItemUrl
                                publicUrl
                                }
                            }
                            fullVideo
                            aspectRatio
                            photo {
                                node {
                                    altText
                                    localFile {
                                        childImageSharp {
                                            gatsbyImageData(placeholder: DOMINANT_COLOR, quality: 100, layout: CONSTRAINED,outputPixelDensities: [1, 1.5, 2, 3,20])
                                            original {
                                                src
                                                width
                                                height
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (data.allWpPost && data.allWpPost.nodes) {
            setPosts(data.allWpPost.nodes);
        }
    }, [data]);

    return (
        <ProjectsContext.Provider value={posts}>
            {children}
        </ProjectsContext.Provider>
    );
};
