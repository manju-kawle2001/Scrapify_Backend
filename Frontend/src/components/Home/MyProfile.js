import SlTab from '@shoelace-style/shoelace/dist/react/tab';
import SlTabGroup from '@shoelace-style/shoelace/dist/react/tab-group';
import SlTabPanel from '@shoelace-style/shoelace/dist/react/tab-panel';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import MyOrders from "../ui/MyOrders";
import Notifications from './Notifications';
import SellScrap from "./SellScrap";
import UserMessages from './UserMessages';
import UserProfile from "./UserProfile";

export default function MyProfile() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate()
    const { state } = useLocation();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <>
            <div className='bg-[#FAF7EF]'>
                <SlTabGroup>
                    <SlTab slot="nav" panel="profile">
                        My Profile
                    </SlTab>
                    <SlTab slot="nav" panel="order">
                        My Order
                    </SlTab>
                    <SlTab slot="nav" panel="scrap" active={state}>
                        My Scrap
                    </SlTab>
                    <SlTab slot="nav" panel="message">
                        Message
                    </SlTab>
                    <SlTab slot="nav" panel="notification" active={state}>
                        Notifications
                    </SlTab>
                    <SlTabPanel name="profile"><UserProfile /></SlTabPanel>
                    <SlTabPanel name="scrap"><SellScrap /></SlTabPanel>
                    <SlTabPanel name="message"><UserMessages /></SlTabPanel>
                    <SlTabPanel name="order"><MyOrders /></SlTabPanel>
                    <SlTabPanel name="notification"><Notifications /></SlTabPanel>
                </SlTabGroup>
            </div>
        </>
    );
}
