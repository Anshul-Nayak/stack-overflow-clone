import React, { useState } from 'react'
import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import copy from 'copy-to-clipboard'
import moment from 'moment'
// import { useParams, Link } from 'react-router-dom';
// import { useSelector } from "react-redux";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    postAnswer,
    deleteQuestion,
    voteQuestion,
} from "../../actions/question";
import Avatar from '../../components/Avatar/Avatar'
import './Questions.css'
import DisplayAnswer from './DisplayAnswer';
const QuestionsDetails = () => {
    const { id } = useParams()
    const questionsList = useSelector((state) => state.questionsReducer);
    const [Answer, setAnswer] = useState("");
    const User = useSelector((state) => state.currentUserReducer);
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const url = "http://localhost:3000";




    const handlePostAns = (e, answerLength) => {
        e.preventDefault();
        if (User === null) {
            alert("Login or Signup to answer a question");
            Navigate("/Auth");
        } else {
            if (Answer === "") {
                alert("Enter an answer before submitting");
            } else {
                dispatch(
                    postAnswer({
                        id,
                        noOfAnswers: answerLength + 1,
                        answerBody: Answer,
                        userAnswered: User.result.name,
                    })
                );
                setAnswer("");
            }
        }
    };
    // var questionsList = [
    //     {
    //         _id: '1',
    //         votes: 3,
    //         upVotes: 3,
    //         downVotes: 2,
    //         noOfAnswers: 2,
    //         questionTitle: "who are u",
    //         questionBody: "why are u",
    //         questionTags: ["java", "cpp"],
    //         userPosted: "manoj",
    //         userId: 1,
    //         askedOn: "jan1",
    //         answer: [
    //             {
    //                 answerBody: "Answer",
    //                 userAnswered: 'kumar',
    //                 userId: 2,
    //             }
    //         ]
    //     },
    //     {
    //         _id: '2',
    //         votes: 3,
    //         noOfAnswers: 2,
    //         upVotes: 3,
    //         downVotes: 2,
    //         questionTitle: "who are u",
    //         questionBody: "why are u",
    //         questionTags: ["java", "cpp"],

    //         userPosted: "manoj",
    //         userId: 1,
    //         askedOn: "jan1",
    //         answer: [
    //             {
    //                 answerBody: "Answer",
    //                 userAnswered: 'kumar',
    //                 userId: 2,
    //             }
    //         ]
    //     },
    //     {
    //         _id: '3',
    //         votes: 3,
    //         noOfAnswers: 2,
    //         upVotes: 3,
    //         downVotes: 2,
    //         questionTitle: "who are u",
    //         questionBody: "why are u",
    //         questionTags: ["java", "cpp"],
    //         userPosted: "manoj",
    //         userId: 1,
    //         askedOn: "jan1",
    //         answer: [
    //             {
    //                 answerBody: "Answer",
    //                 userAnswered: 'kumar',
    //                 userId: 2,
    //             }
    //         ]
    //     }
    // ]
    const handleDelete = () => {
        dispatch(deleteQuestion(id, Navigate));
      };
    const handleShare = () => {
        copy(url + location.pathname);
        alert("Copied url : " + url + location.pathname);
      };
    return (
        <div className='question-details-page'>
            {
                questionsList.data === null ?
                    <h1>loading.....</h1> :
                    <>
                        {
                            questionsList.data.filter(question => question._id === id).map(question => (
                                <div key={question._id}>

                                    <section className='question-details-container'>
                                        <h1>{question.questionTitle}</h1>
                                        <div className='question-details-container-2'>
                                            <div className='question-votes'>
                                                <img src={upvote} alt='' width='18' />
                                                <p>{question.upVotes - question.downVotes}</p>
                                                <img src={downvote} alt='' width='18' />

                                            </div>
                                            <div style={{ width: "100%" }}>
                                                <p className='question-body'> {question.questionBody}</p>
                                                <div className="question-details-tags">
                                                    {
                                                        question.questionTags.map((tag) => (
                                                            <p key={tag}>{tag}</p>
                                                        ))
                                                    }
                                                </div>
                                                <div className='question-action-user'>
                                                    <div>
                                                        <button type="button" onClick={handleShare}>
                                                            share
                                                        </button>
                                                        {User?.result?._id === question?.userId && (
                                                    <button type="button" onClick={handleDelete}>
                                                   Delete
                                                 </button>
                          )}
                                                    </div>
                                                    <div >
                                                        <p>asked {moment(question.askedOn).fromNow()}</p>
                                                        <link to={`/User/${question.userId}`} className='user-link' style={{ color: '#0086d8' }}></link>
                                                        <Avatar backgroundColor="orange" px='8px' py='5px' borderRadius="4px">{question.userPosted.charAt(0).toUpperCase()}
                                                        </Avatar>
                                                        <div>
                                                            {question.userPosted}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section>
                                        {
                                            question.noOfAnswers !== 0 && (


                                                <section>
                                                    <h3>{question.noOfAnswers} answers</h3>
                                                    <DisplayAnswer key={question._id} question={question} handleShare={handleShare} />
                                                </section>

                                            )
                                        }
                                    </section>
                                    <section className='post-ans-container'>
                                        <h3 >your answer</h3>
                                        <form onSubmit={(e) => {
                                            handlePostAns(e, question.answer.length);
                                        }}>
                                            <textarea name=" " id=" " cols="30" rows="10" onChange={(e) => setAnswer(e.target.value)}
                                            ></textarea><br />
                                            <input type="Submit" className='post-ans-btn' value='post your answer' />
                                        </form>
                                        <p>
                                            Browse other question tagged

                                        </p>

                                    </section>
                                </div>

                            ))
                        }
                    </>

            }

        </div>
    )
}

export default QuestionsDetails
