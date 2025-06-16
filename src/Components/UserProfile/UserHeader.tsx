import { IUser } from '../../interfaces/iUser';
import UserHederStyle from './UserHeader.module.css';

export default function Header(user:any) {
  const userr:IUser =user?.UserData;
  const api =`${process.env.REACT_APP_UPLOAD_URL}/`;
  
  return (
    <>
      <section className={ UserHederStyle.userprofile}>
        <div className={"container"}>
            <div className={ UserHederStyle.user_header_section}>
              <div className={ UserHederStyle.profile_pic}>
                  <img className={ UserHederStyle.imagepro} src={`${userr?.img}`}  alt="avater"/>
              </div>
            </div>
        </div>
      </section>
    </>
  )
}
