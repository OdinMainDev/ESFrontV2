import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/base/Button';

const FaqCta = () => {
  return (
    <div>
      <div className="text-center py-11">
        <h3 className="text-black">Still can’t find your answer?</h3>
        <p className="text-900">We are happy to help</p>
        <Button
          onClick={() => alert("clicked")}
          variant="outline-primary"
          size="sm"
          startIcon={<FontAwesomeIcon icon={faComment} className="me-2" />}
        >
          Chat with us
        </Button>
      </div>
    </div>
  );
};

export default FaqCta;
