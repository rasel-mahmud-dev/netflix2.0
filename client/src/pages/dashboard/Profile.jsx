import React from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setAuthProfile } from "src/store/slices/authSlice"
import { fetchAuthProfile } from "src/store/actions/authActions"
import Avatar from 'src/components/Avatar';



function Profile(props) {

    const params = useParams();
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state)
    const { authProfile } = auth

    const { id } = params



    return (
        <div>
            <h1 className="text-6xl text-gray-100 font-medium">WellCame {authProfile.firstName} </h1>

            <table>

                <tbody>
                    {authProfile && Object.keys(authProfile).map(key => (
                        <tr>
                            <td>{key}</td>
                            <td>{authProfile[key]}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )

}

export default Profile