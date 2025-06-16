import React, { useState } from 'react';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import Fade from '@mui/material/Fade';
import { Button } from '@mui/material';
import { FaEdit } from "react-icons/fa";
import UserStyle from "./UserStyle.module.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IUser } from '../../interfaces/iUser';
import UserHederStyle from './UserHeader.module.css';
import {FaCamera} from 'react-icons/fa';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { useDispatch } from 'react-redux';
import { editProfile } from '../../Redux/Slices/UserSlice';


export default function EditModal(user:any) {
    const userr:IUser =user?.UserData;
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
        phone: Yup.number(),
        address: Yup.string(),
    });

    const formikedit = useFormik({
        initialValues: {
        fname: "",
        lname: "",
        email: "", 
        password: "",
        phone: "",
        address: "",
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
            }else{
                form.append("email", userr?.email);
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

            if (values.img !== null) {
                form.append("img", values.img);
            }

            try {
                await dispatch(editProfile({form,id:userr._id}));
            } catch (error) {
                console.log(error);
            }
        },
    })
    return (
        <div>
            <Button variant="contained" color="success"  className={UserStyle.iconn}
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
                            <div className={`${UserHederStyle.profile_pic}`} style={{margin:"10px auto",width:""}}>
                                <img className={ UserHederStyle.imagepro} src={formikedit.values.img!=null? URL.createObjectURL(formikedit.values.img):(`${userr?.img}`)}  alt="avater"/>
                                <div style={{ position: "absolute", top: "32%", right: "33%" }}>
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
                                <div  className={`col-6 ${UserStyle.single_input}`}>
                                    <input
                                        placeholder={userr?.fname}
                                        id='fname'
                                        name='fname'
                                        onChange={formikedit.handleChange}
                                    />
                                </div>
                                <div className={`col-6 ${UserStyle.single_input}`}>
                                    <input
                                        placeholder={userr?.lname}
                                        id='lname'
                                        name='lname'
                                        onChange={formikedit.handleChange}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className={`col-6 ${UserStyle.single_input}`}>
                                    <input
                                        placeholder={userr?.email}
                                        id='email'
                                        name='email'
                                        type='email'
                                        onChange={formikedit.handleChange}
                                    />
                                    {formikedit.errors.email && <small id="email" style={{ color: "#fa3d3d" }}>  {formikedit.errors.email} </small>}
                                </div>
                                <div className={`col-6 ${UserStyle.single_input}`}>
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
                                <div className={`col-6 ${UserStyle.single_input}`}>
                                    <input
                                        placeholder={(userr?.phone)?userr?.phone:"رقم الهاتف"}
                                        id='phone'
                                        name='phone'
                                        type='number'
                                        onChange={formikedit.handleChange}
                                    />
                                    {formikedit.errors.phone && <small id="phone" style={{ color: "#fa3d3d"}}>  {formikedit.errors.phone} </small>}
                                </div>
                                <div className={`col-6 ${UserStyle.single_input}`}>
                                    <input
                                        placeholder={(userr?.address)?userr?.address : " العنوان"}
                                        id='address'
                                        name='address'
                                        type='text'
                                        onChange={formikedit.handleChange}
                                    />
                                    {formikedit.errors.address && <small id="address" style={{ color: "#fa3d3d" }}>  {formikedit.errors.address} </small>}
                                </div>
                            </div>
                             
                                <button type="submit" className={`${'btn btn-block'} ${UserStyle.formbtn}`} onClick={handleClose}>
                                تعديل
                                </button>
                            
                        </form>
                    </ModalContent>
                </Fade>
            </Modal>
        </div>
    );
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


