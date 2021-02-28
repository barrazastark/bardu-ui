import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Icon.scss';

const Icon = ({ icon, className, onClick }) => (
  <FontAwesomeIcon icon={icon} className={className} onClick={onClick} />
);

export default Icon;
