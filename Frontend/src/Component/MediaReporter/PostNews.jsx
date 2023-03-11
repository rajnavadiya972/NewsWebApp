import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    ImEye,
    ImFilePicture,
    ImSpinner11,
    ImFilesEmpty,
    ImSpinner3,
} from "react-icons/im";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
// import { uploadImage } from "../api/post";
// import { useNotification } from "../context/NotificationProvider";
// import MarkdownHint from "./MarkdownHint";
// import DeviceView from "./DeviceView";



export const defaultPost = {
    title: "",
    image: "",
    description: "",
    catagory: "",
};

const PostNews = () => {
    const [postInfo, setPostInfo] = useState({ defaultPost });
    const [image, setImage] = useState("");
    const baseUrl = "https://api.cloudinary.com/v1_1/dhq2fxiej/image/upload/";
    const preset = "newsApp";

    const imageupload = async (e) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", preset);
        data.append("cloud_name", "dhq2fxiej");
        try {
            // setLoading(true);
            await axios.post(baseUrl, data)
                .then(res => {
                    // setUrl(res.data.secure_url)
                    setPostInfo({ ...postInfo, image: res.data.secure_url })
                });
        } catch (err) {
            //   toast.error("image not uploaded");
            console.error(err);
            return;
        }
    }

    useEffect(() => {
        if (postInfo.image) {
            postANews();
        }
    }, [postInfo.image]);
    // useEffect(()=>{
    //     console.log(postInfo);
    //     postANews();
    // },[postInfo.image])
    //   const [selectedThumbnailURL, setSelectedThumbnailURL] = useState("");
    //   const [imageUrlToCopy, setImageUrlToCopy] = useState("");
    //   const [imageUploading, setImageUploading] = useState(false);
    // //   const [displayMarkdownHint, setDisplayMarkdownHint] = useState(false);
    // //   const [showDeviceView, setShowDeviceView] = useState(false);

    //   const { title, content, featured, tags, meta } = postInfo;

    //   const { updateNotification } = useNotification();

    //   useEffect(() => {
    //     if (initialPost) {
    //       setPostInfo({ ...initialPost });
    //       setSelectedThumbnailURL(initialPost?.thumbnail);
    //     }
    //     return () => {
    //       if (resetAfterSubmit) resetForm();
    //     };
    //   }, [initialPost, resetAfterSubmit]);

    // const handleChange = ({ target }) => {
    //     const { name } = target;
    //     if (name === "newsImg") {
    //         const file = target.files[0];
    //         if (!file.type?.includes("image")) {
    //             return alert("This is not an image!");
    //         }
    //         console.log("Raj file " + file);
    //         // setPostInfo({ ...postInfo, image: file });
    //         console.log(postInfo);
    //     }
    // }

    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        // console.log(e.target.value)
        setPostInfo({ ...postInfo, [name]: value });
        // console.log(postInfo);
    }

    //     if (name === "featured") {
    //       //   localStorage.setItem({ ...postInfo, featured: checked });
    //       return setPostInfo({ ...postInfo, [name]: checked });
    //     }
    //     if (name === "tags") {
    //       const newTags = tags.split(",");
    //       if (newTags.length > 4) {
    //         // updateNotification("warning", "Only first four tags will be Selected");
    //       }
    //     }
    //     if (name === "meta" && meta.length >= 150) {
    //       return setPostInfo({ ...postInfo, meta: value.substring(0, 149) });
    //     }

    //     const newPost = { ...postInfo, [name]: value };

    //     setPostInfo({ ...newPost });

    //     localStorage.setItem("blogPost", JSON.stringify(newPost));
    //   };

    //   const handleImageUpload = async ({ target }) => {
    // if (imageUploading) return;
    // const file = target.files[0];

    // if (!file.type?.includes("image")) {
    //   return updateNotification("error", "This is not an image!");
    // }
    // setImageUploading(true);
    // const formData = new FormData();
    // formData.append("image", file);

    // const { error, image } = await uploadImage(formData);
    // setImageUploading(false);
    // if (error) return updateNotification("error", error);
    // setImageUrlToCopy(image);
    //   };
    //   const handleOnCopy = () => {
    // const textToCopy = `![Add image description](${imageUrlToCopy})`;
    // navigator.clipboard.writeText(textToCopy);
    //   };

    //   const handleSubmit = (e) => {
    //     e.preventDefault();
    // const { title, content, tags, meta } = postInfo;

    // if (!title.trim()) return updateNotification("error", "Title is required");
    // if (!content.trim())
    //   return updateNotification("error", "Content is required");
    // if (!tags.trim()) return updateNotification("error", "Tags is required");
    // if (!meta.trim())
    //   return updateNotification("error", "Meta description is required");

    //     const slug = title
    //       .toLowerCase()
    //       .replace(/[^a-zA-Z ]/g, " ")
    //       .split(" ")
    //       .filter((item) => item.trim())
    //       .join("-");

    //     const newTags = tags
    //       .split(",")
    //       .map((item) => item.trim())
    //       .splice(0, 4);

    //     const formData = new FormData();
    //     const finalPost = { ...postInfo, tags: JSON.stringify(newTags), slug };

    //     for (let key in finalPost) {
    //       formData.append(key, finalPost[key]);
    //     }

    //     onSubmit(formData);
    //   };

    //   const resetForm = () => {
    //     setPostInfo({ ...defaultPost });
    //     localStorage.removeItem("blogPost");
    //   };
    const navigate = useNavigate()
    const postANews = async () => {
        console.log("hello");
        console.log(postInfo);
        try {
            const res = await axios.post('/uploadNews', postInfo);
            console.log(res.data);
            if (res.data.success === false) {
                navigate('/')
            }
            resetForm();
        } catch (err) {
            console.log(err);
            navigate('/')
        }
    }

    const resetForm = () => {
        setPostInfo(defaultPost);
    }

    // const getMediaReporter = async () => {
    //     try {
    //         const res = await axios.post('/createPost');
    //         console.log(res.data);
    //         if (res.data.success === false) {
    //             navigate('/')
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         navigate('/')
    //     }
    // }


    return (
        <>
            <Navbar />
            <div className="p-2 flex justify-center">
                <div className="w-9/12 h-screen space-y-3  flex  flex-col">
                    <div className="flex items-center justify-between max-md:flex-col">
                        <h1 className="text-xl font-semibold text-blue-700 max-md:m-2">
                            Create News
                        </h1>
                        <div className="flex items-center space-x-5 ">
                            {/* <button className="cursor-pointer">hello</button> */}
                            <button
                                onClick={resetForm}
                                className="z-10 cursor-pointer flex items-center space-x-2 px-3 ring-1 ring-blue-500 h-10 rounded text-blue-500 hover:text-white hover:bg-blue-500 transition">
                                <ImSpinner11 />
                                <span>Reset</span>
                            </button>
                            <button
                                onClick={imageupload}
                                className="z-10 cursor-pointer ring-blue-500 w-36 h-10 rounded text-white hover:text-blue-500 hover:bg-white bg-blue-500"
                            >
                                POST
                            </button>
                        </div>
                    </div>

                    {/* News Image */}
                    <div className="mb-3 ">
                        <h1 className="text-xl font-semibold mb-2 text-white">
                            News Image
                        </h1>
                        <div className="">
                            <input
                                onChange={(e) => {
                                    setImage(e.target.files[0])
                                }}
                                name="newsImg"
                                id="thumbnail"
                                type="file"
                                hidden
                            />
                            <label htmlFor="thumbnail" className="cursor-pointer">
                                <div className="border h-1/3 border-dashed border-gray-500 text-gray-500 flex p-20 justify-center items-center ">
                                    <span>Select Image</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Title input */}
                    <div>
                        <label className="text-white" htmlFor="tags">
                            News Title
                        </label>
                        <input
                            type="text"
                            // onFocus={() => setDisplayMarkdownHint(false)}
                            value={postInfo.title}
                            name="title"
                            onChange={handleInput}
                            className="text-xl outline-none focus:ring-1 rounded p-2 w-full font-semibold my-2"
                            placeholder="News title"
                        />
                    </div>

                    {/* Post Content */}
                    <div>
                        <label className="text-white" htmlFor="tags">
                            Description
                        </label>
                        <textarea
                            // onFocus={() => setDisplayMarkdownHint(true)}
                            value={postInfo.description}
                            name="description"
                            onChange={handleInput}
                            // className="resize-none outline-none focus:ring-1 flex-1 h-full rounded p-2 w-full font-semibold font-mono tracking-wide text-lg "
                            className="resize-none text-xl outline-none focus:ring-1 rounded p-2 pb-12 w-full font-semibold my-2"
                            placeholder="Description"
                        ></textarea>
                    </div>

                    {/* Tags input */}
                    <div>
                        <label className="text-white" htmlFor="tags">
                            Category
                        </label>
                        <input
                            value={postInfo.catagory}
                            name="catagory"
                            id="catagory"
                            type="text"
                            onChange={handleInput}
                            className=" text-xl outline-none focus:ring-1 rounded p-2 w-full font-semibold my-2"
                            placeholder="Category"
                        />
                    </div>
                </div>


            </div>

            {/* <DeviceView
        title={title}
        content={content}
        thumbnail={selectedThumbnailURL}
         visible={showDeviceView}
        onClose={() => setShowDeviceView(false)}
      /> */}
        </>
    );
}
export default PostNews;