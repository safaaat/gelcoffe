import React from 'react'

const AlertPersonData = ({ alertValTglLahir }) => {
    return (
        <>
            <div className="relative">
                <div className={"fixed z-[1000] top-[0rem] left-0 w-full transition-all duration-300"}>
                    <p className={!alertValTglLahir ? "alert_person-data" : "alert_person-data-aktif"}>Date of birth is required</p>
                </div>
            </div>
        </>
    )
}

export default AlertPersonData