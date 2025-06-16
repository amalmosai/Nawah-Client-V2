import React, { useEffect, useState } from 'react'
import styles from './Engineer.module.css';
import { Button } from '@mui/material';
import IFarmer from '../../interfaces/iFarmer';
import { FaClipboard  ,FaFacebookMessenger ,FaSeedling} from "react-icons/fa";
import AddNotesModal from './AddNotesModal';

function EngineerFarmer(engineer:any) {
    const farmers =engineer?.data?.farmers;
    const api =`${process.env.REACT_APP_UPLOAD_URL}/`;

    return (
        <div className='d-flex justify-content-around gap-3'>
            {
                farmers?.map((item:IFarmer, index:number) => {
                    return <div className={styles.card}>
                        <div className={styles.ds_top} />
                        <div className={styles.avatar_holder}>
                            <img src={`${item?.img}`} alt='avater'/>
                        </div>
                        <div className={styles.name}>
                            <h3>{item?.fname} {item?.lname}</h3>
                        </div>
                        <div className={styles.ds_info}>

                            <div className={styles.projects}>
                                <h6 title="Number of projects created by the user">نـوع المحصول
                                    <br></br>
                                    <FaSeedling />
                                </h6>
                                <p>{item?.croptype}</p>
                            </div>
                            <div className={styles.posts}>
                                <h6 title="Number of posts">كمية المحصول
                                    <br></br>
                                    <FaSeedling />
                                </h6>
                                <p>{item?.cropamount}</p>
                            </div>
                        </div>
                        <div className={styles.ds_info}>
                            <button  className={styles.butt} >
                                <span>ابدأ المحادثة</span>
                                <FaFacebookMessenger  style={{fontSize:"18px", marginRight:"6px"}}/>
                            </button>
                            <AddNotesModal id={item}/>
                        </div>
                    </div>
                })
            }

        </div >
    )
}

export default EngineerFarmer;