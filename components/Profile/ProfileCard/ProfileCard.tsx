import { useUser } from '@/providers/UserProvider';

const ProfileCard: React.FC = () => {
    const { user } = useUser();

    return (
        <div className="py-10 flex justify-center">
            <div className="w-96">
                <div className="bg-white shadow-xl rounded-lg py-3">
                    <div className="photo-wrapper p-2">
                        <img
                            className="w-32 h-32 rounded-full mx-auto"
                            src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
                        />
                    </div>
                    <div className="p-2">
                        <h3 className="text-center text-xl text-gray-900 font-medium leading-8 text-2xl">
                            {user?.username}
                        </h3>

                        <table className="text-xs my-3">
                            <tbody>
                                <tr>
                                    <td className="px-2 py-2 text-black font-semibold text-lg">
                                        User Name
                                    </td>
                                    <td className="px-2 py-2 text-black text-lg">
                                        {user?.username}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2  text-black font-semibold text-lg">
                                        Age
                                    </td>
                                    <td className="px-2 py-2 text-black text-lg">
                                        ??????
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2  text-black font-semibold text-lg">
                                        Gender
                                    </td>
                                    <td className="px-2 py-2  text-black text-lg">
                                        ??????
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2  text-black font-semibold text-lg">
                                        Native language
                                    </td>
                                    <td className="px-2 py-2  text-black text-lg">
                                        ??????
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
