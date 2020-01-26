import React, { Component } from 'react';
import { AwesomeButton } from "react-awesome-button";
import InputFiles from 'react-input-files';
import 'react-awesome-button/dist/themes/theme-c137.css';

async function postFile(file) {
    const formData = new FormData()
    formData.append("csv_file", file[0])
    const response = await fetch("/upload", {
        method: "POST",
        body: formData,
    });
    if (response.ok) {
        alert("File Uploaded Successfully!")
    } else {
      alert("HTTP-Error: " + response.status);
    }
}

async function getFiles() {
    const response = await fetch("/my-bank", {
        method: "GET"
    });
    alert("Pulling files...")

    if (response.ok) {
        let json = await response.json();
        console.log(json);
        return json;
    } else {
      alert("HTTP-Error: " + response.status);
    }
}

class App extends Component {
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
                                for (var key in getFiles()) {
                                    alert(key)
                                }
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
                    <div className="files-list">

                    </div>
                </div>
            </div>
        );
    }
}
export default App;
