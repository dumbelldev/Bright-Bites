import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import { Link  } from 'react-scroll'
import reservationIcon from '../../assets/icons/table.svg'
import menuIcon from '../../assets/icons/menu.svg'
import aboutIcon from '../../assets/icons/about.svg'
import contactIcon from '../../assets/icons/contact.svg'

const Navbar = () => {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(window.outerWidth > 800 ? true : false)
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
  const initialRendered = useRef<boolean>(false)

  const toggleNav = (action: string) => {
    const nav = document.querySelector('nav') as HTMLElement
    const items = nav.querySelectorAll('div') as NodeListOf<HTMLDivElement>;
    if(action === 'show') {
      const translateValue: number = isLargeScreen ? 0 : -50
      items?.forEach((item, i) => {
        setTimeout(() => {
          item.classList.add('btn-hover-effect');
          item.style.transform = `translateX(${translateValue}%)`
        }, i * 200);
      });
    }
    if(action === 'hide') {
      items?.forEach((item, i) => {
        setTimeout(() => {
            item.style.transform = 'translateX(100%)'
        }, i * 200);
      });
    }
  }
  const handleWindowResize = () => {
    setIsLargeScreen(window.outerWidth > 800 ? true : false);
  }
  const handleNavClick = (e: MouseEvent) => {
    if(isLargeScreen) return;
    const btn = document.querySelector('.btn-nav') as HTMLButtonElement
    btn.classList.toggle('opened');
    if(btn.classList.contains('opened')) setIsNavOpen(true)
    else setIsNavOpen(false);
  }

  useEffect(() => {
    const nav = document.querySelector('nav') as HTMLElement;
    const items = nav.querySelectorAll('div') as NodeListOf<HTMLDivElement>;

    const initialNavRender =  setTimeout(() => {
      initialRendered.current = true;
      if(isLargeScreen) toggleNav('show')
    }, 8000)

    window.addEventListener('resize', handleWindowResize)
    items.forEach(item => item.addEventListener("click", handleNavClick))
    
    return () => {
      window.removeEventListener('resize', handleWindowResize)
      items.forEach(item => item.removeEventListener('click', handleNavClick))
      clearTimeout(initialNavRender)
    }
  }, [])
  useEffect(() => {
    if(isLargeScreen && initialRendered.current) toggleNav('show')
    else toggleNav('hide')
  }, [isLargeScreen])
  useEffect(() => {
    if(isLargeScreen) return;
    if(isNavOpen) {
      toggleNav('show')
      window.onscroll = () => {
        const btn = document.querySelector('.btn-nav') as HTMLButtonElement;
        btn.classList.toggle('opened');
        setIsNavOpen(false)
      }
    }
    else {
      toggleNav('hide')
      window.onscroll = () => {}
    }
  }, [isNavOpen])

  return (
    <div className="navbar">
      {!isLargeScreen && <BtnToggleNav setIsNavOpen={setIsNavOpen} />}
      <nav>
        <ul>
          <li>
            <Link activeClass='active' smooth spy to='reservation' duration={500} ><div data-content='Reservation' className='cs nav-item'><img src={reservationIcon} alt="" /></div></Link>
          </li>
          <li>
            <Link activeClass='active' smooth spy to='menu' duration={500} ><div data-content='Menu' className='cs nav-item'><img src={menuIcon} alt="" /></div></Link>
          </li>
          <li>
            <Link activeClass='active' smooth spy to='about' duration={500} ><div data-content='About Us' className='cs nav-item'><img src={aboutIcon} alt="" /></div></Link>
          </li>
          <li>
            <Link activeClass='active' smooth spy to='contact-us' duration={500} ><div data-content='Contact Us' className='cs nav-item'><img src={contactIcon} alt="" /></div></Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar

const BtnToggleNav = ({ setIsNavOpen }: any) => {

  const handleClick: MouseEventHandler<HTMLDivElement> = () => {
    const btn = document.querySelector('.btn-nav') as HTMLButtonElement
    btn.classList.toggle('opened');
    if(btn.classList.contains('opened')) setIsNavOpen(true)
    else setIsNavOpen(false);
  }

  return (
    <div className="btn-toggle-nav cs" onClick={handleClick}>
      <button className="btn-nav" aria-label="Main Menu">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <path
            className="line line1"
            d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
          />
          <path className="line line2" d="M 20,50 H 80" />
          <path
            className="line line3"
            d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
          />
        </svg>
      </button>
    </div>
  );
}