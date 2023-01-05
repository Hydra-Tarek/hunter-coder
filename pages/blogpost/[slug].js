import React from 'react';
import styles from '../../styles/BlogPost.module.css';
import {useState } from 'react';
import * as fs from 'fs';

 
const Slug = (props) => {
    function createMarkup(c) {
        return { __html: c };
    }
    const [blog, setblog] = useState(props.myBlog)
    
    
    return <div className={styles.container}>
        <main className={styles.main}>
        <h1>{blog && blog.title}</h1>
            <hr />
            <div>
            {blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>}
            </div>  
        </main>
    </div>;
};

export async function getStaticPaths() {
    return {
        paths: [
            { params: { slug: 'How-to-learn-CSS' } },
            { params: { slug: 'How-to-learn-JavaScript' } },
            { params: { slug: 'How-to-learn-React' } },
        ],
        fallback: true // false or 'blocking'
    };
}

export async function getStaticProps(context) {
    const { slug } = context.params;


    let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, 'utf-8')

    return {
        props: { myBlog: JSON.parse(myBlog) }, // will be passed to the page component as props
    }
}
  

// export async function getServerSideProps(context) {
//     // console.log(context.query)
//     // const router = useRouter();
//     const { slug } = context.query;

//     let data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`)
//     let myBlog = await data.json()
//     return {
//         props: { myBlog }, // will be passed to the page component as props
//     }
// }
 
export default Slug;