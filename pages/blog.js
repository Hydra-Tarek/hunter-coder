import React from 'react'
import styles from '../styles/Blog.module.css'
import Link from 'next/link';
import { useState } from 'react';
import * as fs from 'fs';
import InfiniteScroll from 'react-infinite-scroll-component';
 
const Blog = (props) => {
    const [blogs, setBlogs] = useState(props.allBlogs);
   

    return <div className={styles.container}>
        <main className={styles.main}>
            {blogs.map((blogitem) => {
                return <div key={blogitem.slug}>
                    <Link href={`/blogpost/${blogitem.slug}`}>
                        <h3 className={styles.blogItemh3}>{blogitem.title}</h3></Link>
                    <p className={styles.blogItemp}>{blogitem.metaDesc?blogitem.metaDesc.slice(0,140):""}...</p>
                </div>
            })}
        </main>
    </div>  
}

export async function getStaticProps(context) {
        let data = await fs.promises.readdir("blogdata");
        let myfile;
        let allBlogs = [];
        for (let index = 0; index < data.length; index++) {
          const item = data[index];
          myfile = await fs.promises.readFile(('blogdata/' + item), 'utf-8')
          allBlogs.push(JSON.parse(myfile))
        }
    return {
      props: {allBlogs},
    }
  }
  

// export async function getServerSideProps(context) {
//     let data = await fetch('http://localhost:3000/api/blog')
//     let allBlog = await data.json()
//     return {
//         props: { allBlog },
//     }
// }


export default Blog;