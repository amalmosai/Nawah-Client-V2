import IEngineer from '../../interfaces/iEngineer';
import FarmarHederStyle from '../FarmerProfile/FarmHeader.module.css';

function Header(engineer:any) {
  const engineerr:IEngineer =engineer?.data;
  const api =`${process.env.REACT_APP_UPLOAD_URL}/`;

  return (
    <>
          <section className={FarmarHederStyle.userprofile}>
            <div className={"container"}>
                <div className={FarmarHederStyle.user_header_section}>
                  <div className={FarmarHederStyle.profile_pic}>
                      <img className={FarmarHederStyle.imagepro}src={`${engineerr?.img}`} alt="avatar"/> 
                  </div>
                </div>
            </div>
      </section>
      </>
  )
}

export default Header;