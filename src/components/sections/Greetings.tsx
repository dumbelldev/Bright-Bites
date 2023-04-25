import { useContext, useEffect, useRef, useState } from 'react';
import data from '../../data/data.json';
import { AppContext } from '../../context/MainContext';
import img from '../../assets/images/chef-hands.jpg';
import interiorImg from '../../assets/images/interior.jpg';
import Reservation from '../features/Reservation';
import { useParallax } from 'react-scroll-parallax';
import { Link } from 'react-scroll';

const Greetings = () => {
  const greetings: string = data['greeting'];
  const [intSecPos, setIntSecPos] = useState<number>(4000);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    const section = document.querySelector('.greetings') as HTMLElement;
    const textWrapper = section.querySelector('.text-wrapper') as HTMLElement;
    const btnContainer = textWrapper.querySelector('.buttons') as HTMLElement;
    const imgContainer = document.querySelector(
      '.greetings-img'
    ) as HTMLElement;
    const imgDivs = imgContainer?.querySelectorAll(
      'div'
    ) as NodeListOf<HTMLDivElement>;

    const showSectionText = () => {
      textWrapper.style.transform = 'translateX(0%)';
      setTimeout(() => {
        btnContainer.style.transform = 'translateY(0%)';
        btnContainer.style.opacity = '1';
      }, 800);
    };
    const showSectionImgs = () => {
      imgContainer.style.opacity = '1';
      imgDivs.forEach((el: HTMLDivElement, i) => {
        el.classList.add(`reveal-${i === 0 ? 'vertically' : 'horizontally'}`);
        const img = el.querySelector('img') as HTMLImageElement;
        setTimeout(() => {
          img.style.transform = 'scale(1)';
        }, 700);
        // el.classList.add('reveal-zoom');
      });
    };

    const handleSectionIntersection = (
      entries: IntersectionObserverEntry[]
    ) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          showSectionText();
          showSectionImgs();
          setIntSecPos(window.scrollY);
          sectionObserver.unobserve(section);
        } else {
        }
      });
    };

    const sectionObserver = new IntersectionObserver(
      handleSectionIntersection,
      { threshold: 0.3 }
    );

    sectionObserver.observe(section);
  }, []);

  const textScroll = useParallax<HTMLDivElement>({
    startScroll: intSecPos + 100,
    endScroll: intSecPos + 800,
    translateY: [0, 20],
    // translateX: [0, 20],
  });
  const imgDivScroll = useParallax<HTMLImageElement>({
    startScroll: intSecPos + 100,
    endScroll: intSecPos + 800,
    translateY: [0, 90],
    // translateX: [0, 100],
  });
  // const imgScroll = useParallax<HTMLImageElement>({
  //   startScroll: intSecPos + 100,
  //   endScroll: intSecPos + 600,
  //   translateY: [0, 20],
  //   // translateX: [0, 100],
  // });

  return (
    <section className="greetings section-wrapper" id="reservation">
      {isModalOpen && <Reservation isOpen={isModalOpen} setIsOpen={setIsModalOpen} />}
      <div className="text-wrapper">
        <article className="greetings-text section-text" ref={textScroll.ref}>
          {greetings}
        </article>
        <section className="buttons">
          <button className="cs btn-hover-effect" onClick={() => setIsModalOpen(true)}>
            Book A Table
          </button>
          <button className="cs btn-hover-effect">
            <Link activeClass="active" smooth spy to="menu" duration={500}>
              Menu
            </Link>
          </button>
        </section>
      </div>
      <div className="greetings-img">
        <div className="large-img-wrapper">
          <img src={interiorImg} alt="" />
        </div>
        <div className="small-img-wrapper" ref={imgDivScroll.ref}>
          <img src={img} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Greetings;
