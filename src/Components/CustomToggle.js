import { useAccordionButton } from 'react-bootstrap';
import { IoIosStarOutline } from 'react-icons/all';

const CustomToggle = ({ children, eventKey }) => {
  const decoratedOnClick = useAccordionButton(eventKey, () => console.log('totally custom!'));

  return (
    <IoIosStarOutline size={20} onClick={decoratedOnClick}>
      {children}
    </IoIosStarOutline>
  );
};

export default CustomToggle;
