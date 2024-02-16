import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomer, getCustomer, resetCustomerField, } from '../reducers/customerSlice';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    width: '500px',
  },
};

export default function ModalForm({ modalIsOpen, setModalIsOpen, customerId, setCustomerId, handleRegisterCustomer, handleUpdateCustomer }) {
  const dispatch = useDispatch();
  const { customer } = useSelector(getCustomer);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  function closeModal() {
    setCustomerId(null);
    setModalIsOpen(false);
    dispatch(resetCustomerField());
    setProfilePicture({});

    const fileInput = document.getElementById("file");
    if (fileInput) {
      fileInput.value = "";
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {

      setProfilePicture(file);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (name === "" || username === "" || email === "") {
      alert("Please fill all the fields");
      return;
    }

    if (customerId && customer) {
      handleUpdateCustomer({ name, username, email, profilePicture, id: customerId });
    } else {
      handleRegisterCustomer({ name, username, email, profilePicture });
    }

    setName("");
    setUsername("");
    setEmail("");
    closeModal();
  }

  useEffect(() => {
    if (customerId) {
      dispatch(fetchCustomer(customerId));
    }
  }, [customerId]);

  useEffect(() => {
    if (customer && customer.id) {

      const { email, name, username, profilePicture } = customer;
      const imageUrl = 'http://localhost:8000' + profilePicture;

      // Fetch the image as a Blob
      fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
          const file = new File([blob], profilePicture.slice(9), { type: 'image/jpeg' });

          setProfilePicture(file);
          setUsername(username);
          setEmail(email);
          setName(name);

        })
        .catch(error => console.error('Error fetching image:', error));
    }
  }, [customer]);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-content border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="modal-header flex items-start flex-col justify-between p-5 rounded-t">
            <div className="modal-header-close-btn flex items-center justify-end w-full">
              <button onClick={closeModal} className="text-white text-2xl">🗙</button>
            </div>
            <h2 className="text-xl sm:text-3xl mt-3 text-center w-full uppercase font-semibold text-white">{customerId ? "Update Customer" : "Add New Customer"}</h2>
          </div>

          <div className="modal-body relative p-6 flex-auto">
            <form className="mt-3 mb-7" onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-7">
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border py-3 px-4 text-sm rounded-lg outline-none"
                  placeholder="Username"
                />
              </div>
              <div className="mb-7">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border py-3 px-4 text-sm rounded-lg outline-none"
                  placeholder="Customer Name"
                />
              </div>
              <div className="mb-7">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border py-3 px-4 text-sm rounded-lg outline-none"
                  placeholder="Email"
                />
              </div>

              <div className="flex items-center space-x-2">
                <label htmlFor="file" className="text-[#57BC90] text-[16px] cursor-pointer underline">
                  Upload Photo
                </label>
                <input
                  type="file"
                  id="file"
                  name="profilePicture"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <span>{profilePicture?.name ? profilePicture?.name : ''}</span>
              </div>

              <div className="mt-12 modal-action-btn">
                <button type="submit" className="text-white text-[16px] w-full py-3 rounded-md uppercase font-semibold">
                  {!customerId ? 'Add Customer' : 'Update Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}


ModalForm.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  setModalIsOpen: PropTypes.func.isRequired,
  customerId: PropTypes.string, // Adjust the type accordingly
  setCustomerId: PropTypes.func.isRequired,
  handleRegisterCustomer: PropTypes.func.isRequired,
  handleUpdateCustomer: PropTypes.func.isRequired,
};