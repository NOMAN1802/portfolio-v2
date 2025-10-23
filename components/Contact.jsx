"use client"
import {useState, useEffect} from "react";
import {useForm, ValidationError} from "@formspree/react";
import AnimatedText from "./AnimatedText ";
import Image from "next/image";
import {FaCheckCircle} from "react-icons/fa"



const Contact = () => {

  const [state, handleSubmit] = useForm("mbljgebr");
  // state for form input
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email:"",
    phone: "",
    message: "",
  });
  const [showIcon, setShowIcon] = useState(false);

  // handle input change
  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };
  
  // crear form after submission
  useEffect(() => {
    if (state.succeeded) {
      setShowIcon(true);
  
      // Clear form input
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        message: "",
      });
  
      // Handle icon revert after 3 seconds
      const timer = setTimeout(() => {
        setShowIcon(false);
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);
  

  // handle form submission
  const handleFormSubmit = (e) =>{
    e.preventDefault();
    handleSubmit(formData);
  }
  return (
    <section className='pt-8 xl:pt-12 pb-32' id='contact'>
        <div className="container mx-auto">
          <div className="flex flex-col items-center xl:flex-row gap-16">
            <div className="flex-1 mx-auto xl:mx-0 flex flex-col">
              <AnimatedText text="Let's Work Together" 
              textStyles="h2 mb-12 text-center xl:text-left"/>

              {/* form */}
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-6 w-full max-w-[480]">
                {/* firstname and lastname */}
                <div className="flex gap-8">
                <div className="flex-1">
                  <label htmlFor="firstname"
                  className=" block mb-2 text-sm font-medium text-primary"
                  >
                 First Name <span className="text-accent">*</span>
                  </label>
                  <input
                   onChange={handleChange}
                   type="text"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    className="input" 
                    placeholder="First Name"
                    required/>
                </div>

                <div className="flex-1">
                  <label htmlFor="lastname"
                  className=" block mb-2 text-sm font-medium text-primary"
                  >
                 Last Name <span className="text-accent">*</span>
                  </label>
                  <input
                   onChange={handleChange}
                   type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    className="input" 
                    placeholder="Last Name"
                    required/>
                </div>
                </div>
                {/* email */}

                <div>
                  <label htmlFor="email"
                  className=" block mb-2 text-sm font-medium text-primary"
                  >
                 Email <span className="text-accent">*</span>
                  </label>
                  <input
                   onChange={handleChange}
                   type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    className="input" 
                    placeholder="Youremail@mail.com"
                    required/>

                    <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    />
                </div>

                {/* phone */}
                <div>
                  <label htmlFor="email"
                  className=" block mb-2 text-sm font-medium text-primary"
                  >
                 Phone <span className="text-accent">*</span>
                  </label>
                  <input
                   onChange={handleChange}
                   type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    className="input" 
                    placeholder="+880 1980931802"
                    required/>
                
                </div>

                {/* message */}
                <div>
                  <label htmlFor="message"
                  className=" block mb-2 text-sm font-medium text-primary"
                  >
                 Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                   onChange={handleChange}
                   type="text"
                    id="message"
                    name="message"
                    value={formData.message}
                    className="textarea" 
                    placeholder="Leav a message..."
                    rows={5}
                    required/>
                    <ValidationError 
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                    />
                
                </div>
                {/* submit button */}
                <button type="submit" disabled= {state.submitting}
                 className="btn btn-accent flex items-center justify-center gap-2" >
                   {
                    state.submitting ? (
                      <span> sending</span>
                    ) : (
                      <>
                      <FaCheckCircle
                       className={`absolute text text-white text-lg transition-opacity
                       duration-500 ease-in-out ${showIcon ? "opacity-100" : "opacity-0"}`}/>
                      <span className={`transition-opacity duration-500 ease-in-out 
                       ${showIcon ? "opacity-0" : "opacity-100"} `}>Send message</span>
                      </>
                    )
                   }
                </button>
              </form>
            </div>
            {/* Image */}
            <div className="hidden xl:flex relative w-[577px] h-[664px] rounded-lg
            overflow-hidden ">
              <Image src="/assets/contact/img.png" 
              className="object-cover"
              fill
              quality={100}
              alt=""
              />
            </div>
          </div>
        </div>
    </section>
  )
}

export default Contact