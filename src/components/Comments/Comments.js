import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import avatar from '../../img/anonym.png';
import Style from './comments.module.scss';
import {getComments, addComment} from "../../redux/actions/comments";
import {notify} from "../../redux/actions/notification";

function Comments({comments, getComments, addComment, type, coinid, authorised, notify}) {
    const userid = localStorage.getItem('id');
    const user = localStorage.getItem('login');
    const [comment, typeComment] = useState('');
    const onSubmit = () => {
        if (comment.length <= 3) {
            return notify('The text must contain more than 3 characters');
        }
        addComment({userid, user, comment, type, coinid})
        typeComment('');
    }

    useEffect(() => {
        getComments(coinid);
    }, []);

    return <div className={Style.commentsBlock}>
        <h3>Comments</h3>
        {authorised ? <>
            <div className={Style.comments}>
                {comments.length ? comments.map(({user, id, comment}) =>
                    <div key={id} className={Style.comment}>
                        <img src={avatar} alt="avatar"/>
                        <div className={Style.content}>
                            <div className={Style.userName}>{user}</div>
                            <span>{comment}</span>
                        </div>
                    </div>) : <span>No comments have been written here yet. Be the first...</span>}
            </div>
            <div className={Style.addComment}>
                <input type="text" value={comment} onChange={e => typeComment(e.target.value)}/>
                <button type="button" onClick={onSubmit}>
                    {type === 'coin' ? <>Add comment</> : <>Give feedback</>}
                </button>
            </div>
        </> : <span>This part is for authorized users. Please sign in.</span>}
    </div>
}

const mapStateToProps = state => ({
    comments: state.comments.comments,
    authorised: state.auth.authorised
})

export default connect(mapStateToProps, {getComments, addComment, notify})(Comments);