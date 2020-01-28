import React from 'react'
import { AwesomeButton, AwesomeButtonProgress } from "react-awesome-button";
import './db-rows.css';
import { CSVLink } from "react-csv";
import Swal from 'sweetalert2';
import { CsvToHtmlTable } from 'react-csv-to-table';


const DbRows = (props) => {
    const [data, setData] = React.useState([]);
    const[csv_file, setCsv] = React.useState([]);

    async function get_data(file_id, work_type) {
        if (work_type === "stats") {
            const response = await fetch("/stats/" + file_id, {method: "GET"});

            if (response.ok) {
                const rdata = await response.json();

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: "|| year: count ||",
                    customClass: "swal-wide",
                    html: rdata,
                    showConfirmButton: true,
                    backdrop: false
                })

                return rdata
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "HTTP-Error: " + response.status,
                    showConfirmButton: false,
                    timer: 3000,
                    backdrop: false
                })
            }
        }

        if (work_type === "view" || work_type === "download") {
            const response = await fetch("/my-bank/" + file_id, {method: "GET"});
            const rdata = await response.json();

            if (response.ok) {
                if (work_type === "download") {
                    setData(rdata)
                }
                if (work_type === "view") {
                    setCsv(rdata)
                }

            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "HTTP-Error: " + response.status,
                    showConfirmButton: false,
                    timer: 3000,
                    backdrop: false
                })
            }
        }
    }

    return (
        <center>
            <div className="animated bounceInUp file-list-bg">
                {props.rows.map((row) => (
                    <div className="card" key={row.file_id}>
                        <div className="card-body">

                            <div className="file-list-title">
                                <h3><strong>FILENAME:</strong></h3> <br></br> <p>{row.filename}</p>
                                <h3><strong>UPLOAD DATE:</strong></h3><br></br> <p>{row.created_at}</p>
                            </div>

                            <br></br>

                            <div className="file-buttons">
                                <AwesomeButton
                                    size="small"
                                    type="primary"
                                    ripple
                                    onPress={() => {
                                        get_data(row.file_id, "view")
                                    }}
                                > <p>View</p>
                                </AwesomeButton>
                            </div>

                            <div className="file-buttons">
                                {data.length < 1 ? (
                                    <AwesomeButtonProgress
                                        size="medium"
                                        type="secondary"
                                        ripple
                                        onPress={() => {
                                            get_data(row.file_id, "download")
                                        }}
                                    > Download
                                    </AwesomeButtonProgress>
                                ): null}
                                {data.length > 0 && typeof data.csv_file !== "undefined" ? (
                                    <CSVLink data={data.csv_file} filename={row.filename}>
                                        <AwesomeButton
                                            size="medium"
                                            type="secondary"
                                            ripple
                                        >
                                            <p>Download Ready!</p>
                                        </AwesomeButton>
                                    </CSVLink>
                                ): null}
                            </div>

                            <div className="file-buttons">
                                <AwesomeButton
                                    size="small"
                                    type="primary"
                                    ripple
                                    onPress={() => {
                                        get_data(row.file_id, "stats")
                                    }}
                                > <p>Statistics</p>
                                </AwesomeButton>
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        </center>
    )
};

export default DbRows
