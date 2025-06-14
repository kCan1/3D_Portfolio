import React, {useRef, useState} from 'react'
import TitleHeader from "../components/TitleHeader.jsx";
import ContactExperience from "../components/ContactExperience.jsx";
import emailjs from '@emailjs/browser';


const Contacts = () => {
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Handle form submission

        setLoading(true);

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
            );
            setFormData({ name: "", email: "", message: "" });
        }catch (error) {
            console.log('EMAILJS ERROR',error);
        }finally {
            setLoading(false);
        }


    }

    return (


        <section id={"contact"} className={"section-padding flex-center"}>
            <div className={"w-full h-full md:px-10 px-5"}>

                <TitleHeader title={"Get In Touch With Me"}
                sub={"🫙 Contact Information"}
                />


                <div className={"mt-16 grid-12-cols"}>
                    {/*left side contact form*/}
                    <div className={"xl:col-span-5 border-2 border-solid-red"}>
                        <div className={"flex-center card-border rounded-xl p-10"}>
                            <form className={"w-full flex flex-col gap-7"} onSubmit={handleSubmit} ref={formRef}>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Your name"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="Your email"
                                        className={"w-full"}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email">Message</label>
                                    <textarea
                                        type="text"
                                        id="message"
                                        name="message"
                                        rows="5"
                                        placeholder="Your message"
                                        className={"w-full"}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <button type={"submit"} disabled={loading}>
                                    <div className={"cta-button group"}>
                                        <div className={"bg-circle"}/>
                                            <p className={"text"}>{loading? 'Sending...' : 'Send Message'}</p>
                                        <div className={"arrow-wrapper"}>
                                            <img src="/images/arrow-down.svg" alt="arrow" />
                                        </div>
                                    </div>
                                </button>
                            </form>
                        </div>
                    </div>


                    {/*right side*/}
                    <div className={"xl:col-span-7 min-h-96"}>
                        <div className={"w-full h-full bg-[#cd7c2e] hover:cursor-grab rounded-3xl overflow-hidden"}>
                            <ContactExperience/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Contacts
