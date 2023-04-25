import React, { useEffect, useState } from 'react';
import logo from '../../assets/icons/Bright Bites.png';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    const section = document.querySelector('.contact-us') as HTMLElement;
    const form = section.querySelector('form') as HTMLFormElement
    const formElements = form
      ?.querySelectorAll('div') as NodeListOf<HTMLDivElement>;
    const formBtn = form.querySelector('button') as HTMLButtonElement;
    const logoImg = section
      .querySelector('.logo-wrapper')
      ?.querySelector('img') as HTMLImageElement;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          section.style.top = '0px';
          section.style.opacity = '1';
          setTimeout(() => {
            formElements.forEach((el, i) => {
              setTimeout(() => {
                el.style.top = '0px';
                el.style.opacity = '1';
              }, i * 300);
            });
            setTimeout(() => {
              formBtn.style.top = '0px'
              formBtn.style.opacity = '1'
            }, 900)
            setTimeout(() => {
              logoImg.style.transform = 'scale(1)'
            }, 1200);
          }, 600);
        }
      });
    };

    const sectionObserver = new IntersectionObserver(handleIntersection, {
      threshold: 0.4,
    });

    sectionObserver.observe(section)
  }, []);

  return (
    <section className="contact-us section-wrapper" id="contact-us">
      <h2 className="section-heading cs cs-text">Contact us</h2>

      <section className="section-content">
        <form
          action="mailto:sagarmavai2002@gmail.com?subject=Message from Restaurant website"
          method="post"
          encType="text/plain"
        >
          <div>
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="message">Message : </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="cs">
            Send
          </button>
        </form>
        <div className="logo-wrapper">
          <img src={logo} alt="" />
        </div>
      </section>
    </section>
  );
};

export default ContactForm;
