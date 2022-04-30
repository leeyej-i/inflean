import React from "react";
import List from "./List.js"
import Store from "../Store.js"

export default class KeywordList extends React.Component {
    constructor() {
        super()

        this.state = {
            keywordList: [],
        };

    }

    componentDidMount() {
        const keywordList = Store.getKeywordList();
        this.setState({ keywordList });
    }

    render() {
        return (
            <List
                data={this.state.keywordList}
                onClick={this.props.onClick}
                hasIndex={true}
            />
        )
    }
}