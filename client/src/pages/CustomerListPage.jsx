import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllCustomers, getCustomer, registerCustomer, resetCustomerField, updateCustomer } from "../reducers/customerSlice"

import Sidebar from "../components/Sidebar";
import CustomerItems from "../components/CustomerItems";
import ModalForm from "../components/ModalForm";
import ConfirmationModal from "../components/ConfirmationModal";
import ARROW_UP from "../assets/images/arrow-up.png";
import ARROW_DOWN from "../assets/images/arrow-down.png";
import HAMBURGER_ICON from "../assets/images/hamburger.png";
import { LOADING_STATUS } from "../utilities/constants";





const CustomerListPage = () => {
    const dispatch = useDispatch();
    const { customers, status } = useSelector(getCustomer);

    const [isModalOpen, setIsModalOpen] = useState(false); // Modal Show Control
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // Modal Show Control


    // Setting Customer ID for Deletion
    const [customerId, setCustomerId] = useState(null);

    useEffect(() => {
        dispatch(fetchAllCustomers({ _order: "", _sort: "" }));
    }, [dispatch]);

    function handleSort(_order, _sort) {
        dispatch(fetchAllCustomers({ _order, _sort }))
    }

    const handleRegisterCustomer = (customerData) => {
        const formData = new FormData();
        formData.append("name", customerData.name);
        formData.append("username", customerData.username);
        formData.append("email", customerData.email);
        formData.append("profilePicture", customerData.profilePicture);

        dispatch(registerCustomer(formData));
    }

    const handleUpdateCustomer = (customerData) => {
        const formData = new FormData();
        formData.append("name", customerData.name);
        formData.append("username", customerData.username);
        formData.append("email", customerData.email);
        formData.append("profilePicture", customerData.profilePicture);
        
        dispatch(updateCustomer({ id: customerId, formData }));
        setCustomerId(null);
        dispatch(resetCustomerField());
    }

    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <>
            <div className="position-relative top-0 flex h-screen">
                <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                <main className="body-wrapper relative z-10">
                    <section className="top-header bg-white fixed top-0 flex items-center gap-3">
                        <div className="hamburger-icon-wrapper" onClick={() => setOpenSidebar(true)}><img src={HAMBURGER_ICON} alt="" /></div>
                        <h1 className="text-2xl md:text-4xl leading-none text-left text-black uppercase font-extrabold">Customers</h1>
                    </section>


                    <section className="content-wrapper w-full">
                        <div className="content-header-action-btn-wrapper flex justify-start">
                            <button
                                className="action-btn rounded-[10px] text-[13px] sm:text-[14px] md:text-[17px] leading-none flex justify-between items-center font-normal text-white"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <span className="text-3xl leading-none">+</span>
                                <span>ADD NEW CUSTOMER</span>
                            </button>
                        </div>




                        {
                            customers.length === 0
                                ?
                                status === LOADING_STATUS.SUCCEEDED &&

                                (
                                    <div className="w-full h-full flex justify-center items-center  mt-6 md:mt-16">
                                        <h1 className="text-2xl md:text-3xl leading-none text-black uppercase font-extrabold py-4 md:py-6 lg:py-8 bg-white rounded-lg w-full text-center">No Customer Added</h1>
                                    </div>
                                )
                                :


                                (
                                    <div className="customer-main-table-wrapper w-full overflow-auto mt-6 md:mt-16">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="">
                                                    <td>
                                                        <div className="bg-[#57bc904d] flex justify-between items-stretch"></div>
                                                    </td>
                                                    <td>
                                                        <div className="bg-[#57bc904d] text-[#015249] font-bold text-nowrap text-[17px] flex items-center gap-3">
                                                            Username
                                                            <div className="flex flex-col items-center gap-1">
                                                                <span onClick={() => { handleSort("asc", "username") }}><img src={ARROW_UP} alt="" /></span>
                                                                <span onClick={() => { handleSort("desc", "username") }}><img src={ARROW_DOWN} alt="" /></span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="bg-[#57bc904d] text-[#015249] font-bold text-nowrap text-[17px] flex items-center gap-3">Customer Name
                                                            <div className="flex flex-col items-center gap-1">
                                                                <span onClick={() => { handleSort("asc", "name") }}><img src={ARROW_UP} alt="" /></span>
                                                                <span onClick={() => { handleSort("desc", "name") }}><img src={ARROW_DOWN} alt="" /></span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="bg-[#57bc904d] text-[#015249] font-bold text-nowrap text-[17px] flex items-center gap-3">Email
                                                            <div className="flex flex-col items-center gap-1">
                                                                <span onClick={() => { handleSort("asc", "email") }}><img src={ARROW_UP} alt="" /></span>
                                                                <span onClick={() => { handleSort("desc", "email") }}><img src={ARROW_DOWN} alt="" /></span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="bg-[#57bc904d] "></div>
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {customers && customers?.map((customer) => (
                                                    <CustomerItems
                                                        key={customer?.id}
                                                        customer={customer}
                                                        setCustomerId={setCustomerId} // For Edit and Delete
                                                        setIsModalOpen={setIsModalOpen} // For Edit
                                                        setIsConfirmationModalOpen={setIsConfirmationModalOpen} // For Delete
                                                    />
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )
                        }
                    </section>
                </main>


            </div>

            {
                isModalOpen && <ModalForm
                    modalIsOpen={isModalOpen}
                    setModalIsOpen={setIsModalOpen}
                    customerId={customerId} // For Edit and Delete
                    setCustomerId={setCustomerId} // For Edit
                    handleRegisterCustomer={handleRegisterCustomer}
                    handleUpdateCustomer={handleUpdateCustomer}
                />
            }



            {
                isConfirmationModalOpen && <ConfirmationModal
                    isConfirmationModalOpen={isConfirmationModalOpen}
                    setConfirmationModalOpen={setIsConfirmationModalOpen}
                    customerId={customerId}
                    setCustomerId={setCustomerId}
                    onConfirm={() => {
                        // Handle confirmation logic
                    }}
                />
            }

        </>
    )
}

export default CustomerListPage


