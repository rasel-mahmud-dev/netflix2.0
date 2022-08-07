import React from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setAuthProfile } from "src/store/slices/authSlice"
import { fetchAuthProfile } from "src/store/actions/authActions"
import Avatar from 'src/components/Avatar';

import Profile from 'src/pages/dashboard/Profile';
import FavoriteMovies from 'src/pages/dashboard/FavoriteMovies';



function Dashboard() {

    const params = useParams();
    const dispatch = useDispatch();

    const { auth } = useSelector(state => state)
    const { authProfile } = auth

    const { id } = params

    React.useEffect(() => {

        fetchAuthProfile(id, (user) => {
            dispatch(setAuthProfile(user))
        })

    }, [id])


    const [sideBarContent, setSideBarContent] = React.useState("Profile")

    const sideBarData = [
        { name: "Profile" },
        { name: "Favorites" },
        { name: "Playlist" }
    ]

    function selectSideBarSection(sideBarItem) {
        setSideBarContent(sideBarItem.name)
    }


    return (
        <div className='my_container'>
            {authProfile && (
                <div className="grid grid-cols-4 gap-x-5">

                    <div className='col-span-1 bg-dark-700 h-screen'>

                        <div className="flex flex-col items-center mt-8">
                            <Avatar firstLetter={authProfile.firstName[0]} />
                            <span className="font-medium text-gray-100 text-lg mt-2">
                                {authProfile.firstName} {" "}
                                {authProfile.lastName}
                            </span>
                        </div>

                        <ul className="p-5">
                            {sideBarData.map(item => (
                                <li 
                                    onClick={() => selectSideBarSection(item)}
                                    className={["py-4 font-medium text-md text-gray-100 cursor-pointer", item.name === sideBarContent ? "active" : ""].join(" ")}>
                                    {item.name}
                                </li>
                            ))}
                        </ul>

                    </div>

                    <div className="col-span-3">
                        {sideBarContent === "Profile" && <Profile />}
                        {sideBarContent === "Favorites" && <FavoriteMovies />}
                    </div>


                </div>
            )}

        </div>
    )
}

export default Dashboard