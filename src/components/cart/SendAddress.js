import { React, useState, useCallback, useEffect } from "react";
import { BiMap, IoMdArrowDropdown } from "../../utils/icon";
import { updateSendAddress } from "../../utils/totalSemuaBag";

const SendAddress = ({ dataAddress, onOffAddress }) => {
    const [lengthAddress, setLengthAddress] = useState(false);

    // Check apakah Data Address Ada Atau Tidak
    const cekAddress = useCallback((value) => {
        // JIka Tidak Ada Kirim False
        if (value.length === 0) return setLengthAddress(false);
        // JIka Ada Kirim True
        return setLengthAddress(true);
    }, [])

    useEffect(() => {
        // Function Check Data Address
        cekAddress(dataAddress);
    }, [cekAddress, dataAddress])

    return (
        <div className="flex items-center gap-2 360:gap-[1.5rem] sm:gap-[3.5rem] cursor-pointer" onClick={() => onOffAddress({ daftarAddress: true })}>
            <div className="flex gap-1">
                <BiMap />
                {!lengthAddress
                    ? <div className="text-xs capitalize flex items-center gap-1 font-medium">
                        <p className="text-color-primary ">add address</p>
                        <span className="normal-case">let shopping be more fun</span>
                    </div>
                    : <div className="text-xs flex items-center gap-1">
                        <p className="text-color-primary">Send to:</p>
                        <span className="capitalize font-medium flex items-center gap-1">
                            <p>{updateSendAddress(dataAddress[0].nama, 8)},</p>
                            <p>{updateSendAddress(dataAddress[0].kota, 14)}</p>
                        </span>
                    </div>
                }
            </div>
            <IoMdArrowDropdown className="text-[1.5rem]" />
        </div>
    )
}

export default SendAddress