import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

function blog({post}) {
    const {data} = post;
    return (
        <div>
            <p>email: {data.email}</p>
            <p>name: {data.last_name} {data.first_name}</p>
            <div className={styles.image}>
                <Image layout="fill" objectFit="cover" src={data.avatar} alt={data.first_name}/>
            </div>
            <Link href="/">上一頁</Link>
        </div>
    )
}

export async function getStaticPaths() {
    const res = await fetch('https://reqres.in/api/users')
    const posts = await res.json()

    const paths = posts.data.map((post) => ({
        params: { id: post.id.toString() },
    }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    // params 包含此片博文的 `id` 信息。
    // 如果路由是 /posts/1，那么 params.id 就是 1
    const res = await fetch(`https://reqres.in/api/users/${params.id}`)
    const post = await res.json()

    console.log('post', post)
  
    // 通过 props 参数向页面传递博文的数据
    return { props: { post } }
  }

export default blog;