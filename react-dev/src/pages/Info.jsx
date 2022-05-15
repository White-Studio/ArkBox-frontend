import React from "react";
import axios from "axios";

export default class Info extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "html": `<h1>test</h1>`
        }
    }


    testConnection = async () => {
        let res = await axios.get("http://localhost:3001/api/login", {
            headers: {
                databaseaccess: JSON.stringify({
                    id: process.env.REACT_APP_DATABASE_ACCESS_ID,
                    password: process.env.REACT_APP_DATABASE_ACCESS_PASSWORDD
                })
            }
        });
        console.log(res.data);
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
