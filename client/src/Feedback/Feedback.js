import React from 'react';
import './Feedback.css'
const Feedback = ({ avatar, userName, comment, date, timeRental }) => {
    return (
        <div className={'container'}>
            <div className={'avatar'}>
                <div className={'boxAvatar'}>
                    <img className={'avatarLink'} src={avatar ?? ''} alt='AvaratDefault' />
                </div>
            </div>

            <div className={'comment'}>
                <div className={'row1'}>
                    <span className={'textUsername'}>
                        {userName}
                    </span>
                    <div className={'textDate'}>
                        {date}
                    </div>
                </div>
                <div className={'row3'}>
                    <span>
                        {comment}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Feedback;