import React from "react";
import Header from "./components/Header.js";
import SearchForm from "./components/SearchForm.js";
import store from "./Store.js";
import SearchResult from "./components/SearchResult.js";
import Tab, { TabType } from "./components/Tab.js";

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            searchKeyword: "",
            searchResult: [],
            submitted: false,
            selectedTab: TabType.KEYWORD,
        };
    }

    handleChangeInput(searchKeyword) {
        if (searchKeyword.length <= 0) {
            this.handleReset()
        }
        this.setState({ searchKeyword });
    }

    search(searchKeyword) {
        console.log(searchKeyword)
        const searchResult = store.search(searchKeyword)
        this.setState({ searchResult, submitted: true })
    }

    handleReset() {
        this.setState({
            searchKeyword: "",
            submitted: false
        })
    }

    render() {
        const { searchKeyword, submitted, searchResult, selectedTab } = this.state;
        return (
            <>
                <Header title="검색" />
                <div className="container">
                    <SearchForm
                        value={searchKeyword}
                        onChange={(value) => this.handleChangeInput(value)}
                        onSubmit={() => this.search(searchKeyword)}
                        onReset={() => this.handleReset()} />

                    <div className="content">
                        {submitted ? (
                            <SearchResult data={searchResult} />) : (
                            <>
                                <Tab selectedTab={selectedTab}
                                    onChange={(selectedTab) => this.setState({ selectedTab })}
                                />
                                {selectedTab === TabType.KEYWORD && <>추천검색어</>}
                                {selectedTab === TabType.HISTORY && <>최근검색어</>}
                            </>
                        )}
                    </div>
                </div>

            </>
        )
    }
}