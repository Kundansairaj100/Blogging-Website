import { Appbar } from "../compoents/Appbar";
import { BlogCard } from "../compoents/BlogCard";
import { useBlogs } from "../hooks";


export function Blogs() {
    const {loading,blogs} = useBlogs();

    if(loading)
    {
        return <div>
            loading...
        </div>
    }
    return <div className="flex flex-col gap-y-2">
        <Appbar/>
        <div className="flex justify-center"><div className="flex flex-col gap-y-2 max-w-xl">
        <BlogCard authorName="N Kundan" title="Building a website" content="
Welcome to [Your Website Name], where innovation meets simplicity. We’re dedicated to providing cutting-edge solutions tailored to your needs, ensuring a seamless experience from start to finish. Explore our offerings and discover how we can help you achieve your goals effortlessly." publishedDate="30th November 2024" />
        <BlogCard authorName="N Kundan" title="Building a website" content="
Welcome to [Your Website Name], where innovation meets simplicity. We’re dedicated to providing cutting-edge solutions tailored to your needs, ensuring a seamless experience from start to finish. Explore our offerings and discover how we can help you achieve your goals effortlessly." publishedDate="30th November 2024" />
<BlogCard authorName="N Kundan" title="Building a website" content="
Welcome to [Your Website Name], where innovation meets simplicity. We’re dedicated to providing cutting-edge solutions tailored to your needs, ensuring a seamless experience from start to finish. Explore our offerings and discover how we can help you achieve your goals effortlessly." publishedDate="30th November 2024" />
    </div>
    </div>
    </div>
}