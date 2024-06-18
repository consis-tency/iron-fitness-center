import { useEffect, useState } from "react";
import useAuth from "../../../hook/useAuth";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import useAxiosSecure from "../../../hook/axiosSecure/useAxiosSecure";
import toast from "react-hot-toast";
import useRole from "../../../hook/useRole";
import { useNavigate } from "react-router-dom";


const Activity = () => {
    const { loading } = useAuth();
    const [trainers, setTrainers] = useState([]);
    const axios = useAxiosSecure();
    let navigate = useNavigate()
    let role = useRole();
    if (role == 'trainer') {
        navigate('/')
    }
    let fetchTrainer = () => {
        fetch('http://localhost:5000/users/trainer')
            .then(res => res.json())
            .then(data => setTrainers(data))
            .catch(error => console.error('Error fetching trainers:', error));
    }
    useEffect(() => {
        fetchTrainer()
    }, []);
    const handleDelete = async (email) => {
        let res = await axios.post(`http://localhost:5000/users/trainer/demote/${email}`)
        console.log(res.data)
        if (res.status == 200) {
            fetchTrainer()
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message || "Something Went Wrong")
        }


    }

    if (loading) {
        return <div className="flex justify-center my-40 text-purple-700 mt-44 items-center"><span className="loading loading-spinner loading-lg "></span></div>
    }
    return (
        <div className="mb-20">
            <SectionTitle heading="Activity Log" />
            <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full bg-white dark:bg-gray-800">
                    <thead className="bg-black text-lg font-bold text-white">
                        <tr className="text-left">
                            <th className="w-1/3 px-4 py-4">Sl</th>
                            <th className="w-1/3 px-4 py-4">Name</th>
                            <th className="w-1/3 px-4 py-4">Email</th>
                            <th className="w-1/3 px-4 py-4">Role</th>
                            <th className="w-1/3 px-4 py-4">Status</th>
                            <th className="w-1/3 px-4 py-4">Action</th>
                            {/* <th className="w-1/3 px-4 py-2">Subscription Date</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {trainers.map((subscriber, index) => (
                            <tr key={subscriber._id} className="font-bold text-black">
                                <td className="border px-4 py-4">{index + 1}</td>
                                <td className="border px-4 py-4">{subscriber?.name}</td>
                                <td className="border px-4 py-4">{subscriber?.email}</td>
                                <td className="border px-4 py-4">{subscriber?.role}</td>
                                <td className="border px-4 py-4">{subscriber?.status}</td>
                                <td className="border px-4 py-4">
                                    {
                                        subscriber?.status == 'rejected' ? <button

                                            onClick={() => {

                                            }}
                                            className="btn btn-sm btn-success text-white">
                                            <i className="fa fa-eye" aria-hidden="true"></i>

                                        </button> : null
                                    }
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Activity;