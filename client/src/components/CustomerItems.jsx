import { IMAGE_URL } from "../utilities/constants";
import PropTypes from 'prop-types';

const CustomerItems = ({ customer, setCustomerId, setIsModalOpen, setIsConfirmationModalOpen }) => {
    function handleEdit(id) {
        setCustomerId(id);
        setIsModalOpen(true);
    }

    function handleDelete(id) {
        setCustomerId(id);
        setIsConfirmationModalOpen(true);
    }

    return (
        <tr>
            <td className="flex justify-between items-stretch">
                <div className="px-3 ">
                    <img src={IMAGE_URL + customer?.profilePicture} alt="" className="h-full rounded-md w-auto" />
                </div>
            </td>
            <td>
                <div className=" text-[18px]">
                    {customer?.username}
                </div>
            </td>
            <td>
                <div className=" text-[18px] underline text-[#57BC90]">
                    {customer?.name}
                </div>
            </td>
            <td>
                <div className=" text-[18px]">
                    {customer?.email}
                </div>
            </td>
            <td>
                <div className="table-action-btns px-3 flex items-center justify-center gap-5">
                    <button className="edit-btn rounded-md" onClick={() => handleEdit(customer?.id)}>
                        Edit
                    </button>
                    <button className="delete-btn rounded-md" onClick={() => handleDelete(customer?.id)}>
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
};

CustomerItems.propTypes = {
    customer: PropTypes.object.isRequired,
    setCustomerId: PropTypes.func.isRequired,
    setIsModalOpen: PropTypes.func.isRequired,
    setIsConfirmationModalOpen: PropTypes.func.isRequired,
};

export default CustomerItems;
