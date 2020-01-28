import React, { Component } from 'react';
import { AwesomeButton } from "react-awesome-button";
import InputFiles from 'react-input-files';
import 'react-awesome-button/dist/themes/theme-c137.css';
import DbRows from './components/db-rows';
import Swal from 'sweetalert2';


async function postFile(file) {
    const formData = new FormData()
    formData.append("csv_file", file[0])
    const response = await fetch("/upload", {
        method: "POST",
        body: formData,
    });
    if (response.ok) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'File has been saved!',
            showConfirmButton: false,
            timer: 2000,
            backdrop: false
        })
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: "HTTP-Error: " + response.status,
            showConfirmButton: false,
            timer: 4000,
            backdrop: false
        })
    }
}

async function getFiles(that) {
    const response = await fetch("/my-bank", {
        method: "GET"
    });

    if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Database queried successfully!',
                showConfirmButton: false,
                timer: 2000,
                backdrop: false
            })
        } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'No saved files!',
                showConfirmButton: false,
                timer: 2000,
                backdrop: false
            })
        }
        that.setState({ rows: data })
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: "HTTP-Error: " + response.status,
            showConfirmButton: false,
            timer: 5000,
            backdrop: false
        })
    }
}

class App extends Component {

    state = {
        rows: []
    }

    render() {
        return (
            <div>
                <div className="animated bounceInDown main-title">
                    <h1>CSV BANK</h1>
                </div>
                <div className="animated bounceInUp button-container">
                    <div className="button">
                        <AwesomeButton
                            size="medium"
                            type="primary"
                            ripple
                            onPress={() => {
                                const that = this
                                getFiles(that)
                            }}
                        >
                            <h2>My Files</h2>
                        </AwesomeButton>
                    </div>
                    <div className="button">
                        <InputFiles onChange={files => postFile(files)} accept=".csv">
                            <AwesomeButton
                                size="medium"
                                type="primary"
                                ripple
                            >
                                <h2>Upload</h2>
                            </AwesomeButton>
                        </InputFiles>
                    </div>
                    <div className="files-list" style={{overflow: 'auto', maxHeight: 400}}>
                         <DbRows rows={this.state.rows} />
                    </div>
                </div>
            </div>
        );
    }
}
export default App;
