import React from "react";
import axios from "axios";


export default class Info extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "html": "<h1>Loading</h1>"
        }
    }


    testConnection = async () => {
        let res = await axios.get("/api")
        console.log(res);
        this.setState({html: res.data})
    }

    componentDidMount = async () =>  {
        await this.testConnection()
    }

    render() {
        return (
            <div dangerouslySetInnerHTML={{ __html: this.state.html}}></div>
        );
    }
}
