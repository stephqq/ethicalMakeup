// a couple of functions from the React library
import React, { Component, Fragment } from "react";
import ReviewForm from "./ReviewForm";
import firebase from "./../firebase";
import ReviewReadPanel from "./ReviewReadPanel";


class ReviewParent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        reviews: [],
        userImg: "", //need to figure out how to keep an image url in the database. and find image storage
        userInput: "",
        userReview: "",
        userId: "000",
        userRepurchase: '',
        uniqueKey: ''
        };
    }

    componentDidMount() {
        // create a variable that holds a reference to  database
        const dbRef = firebase.database().ref();
    
        // 🧠 event listener that takes a callback function used to get data from the database and call it response.
        dbRef.on("value", response => {
            const dataFromDb = response.val();
            // see the information and parse the way we want it.
            // console.log('dataFromDb', dataFromDb);
    
            // create a variable to store the new state.
            const newState = [];
    
            // loop over each value in the array and push them to a new array (newState).
            for (let key in dataFromDb) {
                const reviewInfo = {
                key: key,
                review: dataFromDb[key]
                };
                newState.push(reviewInfo);

                this.setState({
                    uniqueKey: reviewInfo.key
                })
            }
            // call this.setState to update the component state using the local array newState.
            this.setState({
                    reviews: newState
            });
        }
        )}

    // 🧮 function to handle inputs for review form:
    handleChange = e => {
        this.setState({
        userInput: e.target.value
        })
    };

    handleChangeTxtArea = e => {
        this.setState({
        userReview: e.target.value
        })
    };

    radioChange = (changeEvent) => {
        this.setState({
            userRepurchase: changeEvent.target.value
        });
    }

    // 🧠 on submit, push user input into firebase
    handleFormSubmit = e => {
        e.preventDefault();
        const dbRef = firebase.database().ref();
        dbRef.push({
            userInput: this.state.userInput,
            userReview: this.state.userReview,
            userRepurchase: this.state.userRepurchase,
            userId: "000",
            uniqueKey: this.state.uniqueKey
        })
        // console.log('dbRef',dbRef));

        // return input to empty.
        // eslint-disable-next-line
        this.setState({
            userInput: "",
            userReview: "",
            userRepurchase: ''
        }
        )
    };

    
    render(){
        if(this.state.reviews.length === 0 ) return <p> Loading...</p> 
        // console.log('this.state.reviews', this.state.reviews)
        return (
            <Fragment>
                <div className="mainGrid wrapper">
                    {this.state.reviews.map(reviewList =>(
                        <ReviewReadPanel review={reviewList.review}/>
                        ))}
                        
                    <ReviewForm
                        handleFormSubmit={this.handleFormSubmit}
                        handleChangeTxtArea={this.handleChangeTxtArea}
                        handleChange={this.handleChange}
                        radioChange={this.radioChange}
                        userInputProp={this.state.userInput}
                        userReviewProp={this.state.userReview}
                        userStarProp={this.onStarClick}
                    />
                </div>
            </Fragment>
        );
    }
}



export default ReviewParent;