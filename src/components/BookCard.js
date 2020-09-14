import React from "react";
import '../styles/BookCard.css'
import {Button} from "react-bootstrap";

const ViewButton = (
    <>
        <button className="button1">View</button>
    </>
)

export class BookCard extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div className="product-item">
                <img src="../../img/book1.jpg"/>
                    <div className="product-list">
                        <h3>let me in</h3>
                        <span className="author">Jon Lindqvist</span>
                        {ViewButton}
                    </div>

            </div>
        )
    }
}