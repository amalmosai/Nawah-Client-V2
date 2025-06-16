import React, { useState } from 'react';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import Fade from '@mui/material/Fade';
import { Button } from '@mui/material';
import { FaEdit } from "react-icons/fa";
import { useFormik } from 'formik';
import FarmerStyle from "./FarmerStyle.module.css";
import * as Yup from 'yup';
import FarmerHederStyle from './FarmHeader.module.css';
import {FaCamera} from 'react-icons/fa';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { useDispatch } from 'react-redux';
import { editProfile } from '../../Redux/Slices/FarmerSlice';
import IFarmer from '../../interfaces/iFarmer';

export default function EditModal(farmer:any) {
    const farmerr:IFarmer =farmer?.Data;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const api =`${process.env.REACT_APP_UPLOAD_URL}/`;
    const dispatch = useDispatch()<any| object| AsyncThunkConfig>;

    let schema = Yup.object().shape({
        fname: Yup.string(),
        lname: Yup.string(),
        email: Yup.string().email("هذا الايميل غير صحيح"),
        password: Yup.number(),
        phone: Yup.number() ,
        address: Yup.string() ,
        farmaddress: Yup.string() ,
        farmarea: Yup.number() ,
        cropamount: Yup.number() ,
        croptype: Yup.string() ,
        farmingExperience: Yup.number() ,
    });

    const formikedit = useFormik({
        initialValues: {
            fname: "",
            lname: "",
            email: "",
            password: "",
            phone: "",
            address: "",
            farmaddress: "",
            farmarea: "",
            cropamount: "",
            croptype: "",
            farmingExperience: "",
            img: null 
        },

        validationSchema: schema,
        onSubmit: async (values) => {
            console.log(values);

            let form:FormData = new FormData();
            if(values.fname !== ""){
                form.append("fname", values.fname);
            }

            if(values.lname !== ""){
                form.append("lname", values.lname);
            }

            if(values.email !== ""){
                form.append("email", values.email);
            }

            if(values.password !== ""){
                form.append("password", values.password);
            }

            if(values.phone !== ""){
                form.append("phone", values.phone);
            }

            if(values.address !== ""){
                form.append("address", values.address);
            }

            if(values.farmaddress !== ""){
                form.append("farmaddress", values.farmaddress);
            }

            if(values.farmarea !== ""){
                form.append("farmarea", values.farmarea);
            }

            if(values.croptype !== ""){
                form.append("croptype", values.croptype);
            }

            if(values.cropamount !== ""){
                form.append("cropamount", values.cropamount);
            }

            if(values.farmingExperience !== ""){
                form.append("farmingExperience", values.farmingExperience);
            }

            if (values.img !== null) {
                form.append("img", values.img);
            }

            try {
                await dispatch(editProfile(form));
            } catch (error) {
                console.log(error);
            }
        },
    })

    return (
        <div>
            <Button variant="contained" color="success"  className={FarmerStyle.iconn}
                onClick={handleOpen}
            >
                <FaEdit style={{fontSize:"18px" ,marginLeft:"6px"}}/>
                <span style={{fontSize:"20px"}}> تعديل البيانات </span>
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: StyledBackdrop }}
            >
                <Fade in={open}>
                    <ModalContent sx={style}>
                        <form  lang="ar" onSubmit={formikedit.handleSubmit}>
                            <div className={`${FarmerHederStyle.profile_pic}`} style={{margin:"10px auto"}}>
                                <img className={ FarmerHederStyle.imagepro} src={formikedit.values.img!=null? URL.createObjectURL(formikedit.values.img):(`${farmerr?.img}`)}  alt="avater"/>
                                <div style={{ position: "absolute", top: "25%", right: "34%" }}>
                                    <label htmlFor="file">
                                        <FaCamera style={{ color: "#353333", fontSize: "30px", cursor: "pointer" }} />
                                    </label>
                                    <input
                                        id="file"
                                        type="file"
                                        name="img"
                                        style={{display:"none"}}
                                        onChange={(e:any) => { formikedit.setFieldValue('img', e.currentTarget.files[0])}}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div  className={`col-6 ${FarmerStyle.single_input}`}>
                                    <input
                                        placeholder={farmerr?.fname}
                                        id='fname'
                                        name='fname'
                                        onChange={formikedit.handleChange}
                                    />
                                </div>
                                <div className={`col-6 ${FarmerStyle.single_input}`}>
                                    <input
                                        placeholder={farmerr?.lname}
                                        id='lname'
                                        name='lname'
                                        onChange={formikedit.handleChange}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className={`col-6 ${FarmerStyle.single_input}`}>
                                    <input
                                        placeholder={farmerr?.email}
                                        id='email'
                                        name='email'
                                        type='text'
                                        onChange={formikedit.handleChange}
                                    />
                                    {formikedit.errors.email && <small id="email" style={{ color: "#fa3d3d" }}>  {formikedit.errors.email} </small>}
                                </div>
                                <div className={`col-6 ${FarmerStyle.single_input}`}>
                                    <input
                                        placeholder="كلمة المرور"
                                        id='password'
                                        name='password'
                                        type='password'
                                        onChange={formikedit.handleChange}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className={`col-6 ${FarmerStyle.single_input}`}>
                                    <input
                                        placeholder={(farmerr?.phone)?farmerr?.phone:"رقم الهاتف"}
                                        id='phone'
                                        name='phone'
                                        type='number'
                                        onChange={formikedit.handleChange}
                                    />
                                    {formikedit.errors.phone && <small id="phone" style={{ color: "#fa3d3d"}}>  {formikedit.errors.phone} </small>}
                                </div>
                                <div className={`col-6 ${FarmerStyle.single_input}`}>
                                    <input
                                        placeholder={(farmerr?.address)?farmerr?.address : " العنوان"}
                                        id='address'
                                        name='address'
                                        type='text'
                                        onChange={formikedit.handleChange}
                                    />
                                    {formikedit.errors.address && <small id="address" style={{ color: "#fa3d3d" }}>  {formikedit.errors.address} </small>}
                                </div>
                            </div>

                            <div className='row'>
                                <div className={`col-6 ${FarmerStyle.single_input}`}>
                                    <input
                                        placeholder={(farmerr?.farmaddress)?farmerr?.farmaddress : "عنوان المزرعة "}
                                        id='farmaddress'
                                        name='farmaddress'
                                        type='text'
                                        onChange={formikedit.handleChange}
                                    />
                                    {formikedit.errors.farmaddress && <small id="farmaddress" style={{ color: "#fa3d3d" }}>  {formikedit.errors.farmaddress} </small>}
                                </div>
                                <div className={`col-6 ${FarmerStyle.single_input}`}>
                                    <input
                                        placeholder={`${(farmerr?.farmarea)?farmerr.farmarea: "مساحة المزرعة"}`}
                                        id='farmarea'
                                        name='farmarea'
                                        type='number'
                                        onChange={formikedit.handleChange}
                                    />
                                    {formikedit.errors.farmarea && <small id="farmarea" style={{ color: "#fa3d3d" }}>  {formikedit.errors.farmarea} </small>}
                                </div>
                            </div>
                            <div className='row'>
                                <div className={`col-6 ${FarmerStyle.single_input}`}>
                                    <input
                                        placeholder={`${(farmerr?.cropamount)?farmerr.cropamount:" كمية المحصول"}`}
                                        id='cropamount'
                                        name='cropamount'
                                        type='number'
                                        onChange={formikedit.handleChange}
                                    />
                                    {formikedit.errors.cropamount && <small id="cropamount" style={{ color: "#fa3d3d"}}>  {formikedit.errors.cropamount} </small>}
                                </div>
                                <div className={`col-6 ${FarmerStyle.single_input}`}>
                                    <input
                                        placeholder={(farmerr?.croptype)?farmerr?.croptype : " نوع المحصول"}
                                        id='croptype'
                                        name='croptype'
                                        type='text'
                                        onChange={formikedit.handleChange}
                                    />
                                    {formikedit.errors.croptype && <small id="croptype" style={{ color: "#fa3d3d" }}>  {formikedit.errors.croptype} </small>}
                                </div>
                            </div>
                            <div className='row'>
                                <div className={`col-12 ${FarmerStyle.single_input}`}>
                                    <input
                                        placeholder={`${(farmerr?.farmingExperience)?farmerr.farmingExperience:"سنين الخبرة الزراعية"}`}
                                        id='farmingExperience'
                                        name='farmingExperience'
                                        type='number'
                                        onChange={formikedit.handleChange}
                                    />
                                    {formikedit.errors.farmingExperience && <small id="farmingExperience" style={{ color: "#fa3d3d"}}>  {formikedit.errors.farmingExperience} </small>}
                                </div>
                            </div>
                            
                            <div>
                                <button type="submit" className={`${'btn btn-block'} ${FarmerStyle.formbtn}`} onClick={handleClose}>
                                تعديل
                                </button>
                            </div>
                        </form>
                    </ModalContent>
                </Fade>
            </Modal>
        </div>
    )
}

const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean }>(
    (props, ref) => {
        const { open, ...other } = props;
        return (
        <Fade in={open}>
            <div ref={ref} {...other} />
        </Fade>
        );
    },
);



const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
`;

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
};

const ModalContent = styled('div')(
    ({ theme }) => css`
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 500;
        text-align: center;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow: hidden;
        background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border-radius: 8px;
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0 4px 12px
        ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
        padding: 24px;
        color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

        & .modal-title {
        margin: 0;
        line-height: 1.5rem;
        margin-bottom: 8px;
        }

        & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
        margin-bottom: 4px;
        }
    `,
);
