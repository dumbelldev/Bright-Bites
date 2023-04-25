import { useEffect } from 'react';
import ReactDom from 'react-dom'

interface ModalProps {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void
}

const Reservation = ({ isOpen, setIsOpen }: ModalProps) => {

  const handleClosingModal = () => {
    const section = document.querySelector('.reservation') as HTMLElement;
    const overlay = section.querySelector('.overlay') as HTMLElement;
    const modal = section.querySelector('.modal') as HTMLElement;
    overlay.style.opacity = '0';
    modal.style.top = '200%';
    setTimeout(() => {
      setIsOpen(false)
    }, 500)
  }

  useEffect(() => {
    const section  = document.querySelector('.reservation') as HTMLElement
    const overlay = section.querySelector('.overlay') as HTMLElement
    const modal = section.querySelector('.modal') as HTMLElement
    if(isOpen) {
      setTimeout(() => {
        overlay.style.opacity = '1';
        modal.style.top = '50%';
      }, 0)
    }
  }, [isOpen])

  return ReactDom.createPortal(
    <>
      <section className="reservation section-wrapper">
        <div className="overlay" onClick={handleClosingModal}></div>
        <div className="modal">
          <span className="btn-close-modal" onClick={handleClosingModal}>
            &times;
          </span>
          <h2>Book a Table</h2>
          <form id="book-table-htmlForm" method="post">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <br />

            {/* <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <br /> */}

            <label htmlFor="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" required />
            <br />

            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" required />
            <br />

            <label htmlFor="time">Time:</label>
            <input type="time" id="time" name="time" required />
            <br />

            <label htmlFor="guests">Guests:</label>
            <input type="number" id="guests" name="guests" required />
            <br />

            <label htmlFor="message">Special Requests:</label>
            <textarea id="message" name="message"></textarea>
            <br />

            <button type="submit">Book Table</button>
          </form>
        </div>
      </section>
    </>,
    document.getElementById('portal') as HTMLElement
  );
};

export default Reservation;
