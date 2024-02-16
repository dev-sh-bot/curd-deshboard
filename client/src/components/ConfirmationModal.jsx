// ConfirmationModal.js
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import DELETE_ICON from '../assets/images/delete.png';
import { useDispatch } from 'react-redux';
import { deleteCustomer } from '../reducers/customerSlice';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    width: '450px', // Adjust the width as needed
  },
};

const ConfirmationModal = ({ isConfirmationModalOpen, setConfirmationModalOpen, customerId, setCustomerId }) => {
  const dispatch = useDispatch();

  function onCancel() {
    setConfirmationModalOpen(false);
    setCustomerId(null);
  }

  function onConfirm() {
    dispatch(deleteCustomer(customerId));
    onCancel();
  }

  return (
    <Modal isOpen={isConfirmationModalOpen} style={customStyles} contentLabel={"Delete Customer"} >
      <div className='new-customer-modal p-5'>
        <div className="new-customer-modal-header flex items-start flex-col justify-between rounded-t">
          <div className="modal-header-close-btn flex items-center justify-end w-full">
            <button onClick={onCancel} className="text-black text-2xl">🗙</button>
          </div>
        </div>

        <div className='flex justify-center items-center mt-5'>
          <img src={DELETE_ICON} alt="" />
        </div>
        <h2 className='text-center mt-5 text-2xl font-bold'>Are you sure?</h2>
        <p className='text-center mt-5 text-xl font-medium'>Do you really want to delete this customer? <br />This process can not be undone.</p>

        <div className='flex justify-center items-center mt-8 mb-4 sm:mb-8 gap-7'>
          <button className='uppercase py-2 rounded-md font-medium text-center w-full bg-gray-600 text-white' onClick={onCancel}>Cancel</button>
          <button className='uppercase py-2 rounded-md font-medium text-center w-full bg-red-600 text-white' onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  isConfirmationModalOpen: PropTypes.bool.isRequired,
  setConfirmationModalOpen: PropTypes.func.isRequired,
  customerId: PropTypes.string, // Adjust the type accordingly
  setCustomerId: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmationModal;
