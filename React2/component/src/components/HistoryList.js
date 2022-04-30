import React from "react";
import List from "./List.js"
import Store from "../Store.js"
import { formatRelativeDate } from "../helpers.js";

export default class HistoryList extends React.Component {

    constructor() {
        super()

        this.state = {
            historyList: [],
        };

    }

    componentDidMount() {
        const historyList = Store.getHistoryList();
        this.setState({ historyList });
    }

    handleClickRemoveHistory(keyword) {
        Store.removeHistory(keyword);
        const historyList = Store.getHistoryList();
        this.setState({ historyList });
    }


    render() {
        return (
            <List
                data={this.state.historyList}
                onClick={this.props.onClick}
                hasDate
                onRemove={(keyword) => this.handleClickRemoveHistory(keyword)}
            />
        )
    }
}