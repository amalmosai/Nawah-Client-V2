import IFarmer from "../../interfaces/iFarmer";
import FarmarHederStyle from "./FarmHeader.module.css";

export default function Header(farmer: any) {
  const farmerr: IFarmer = farmer?.Data;
  const api = `${process.env.REACT_APP_UPLOAD_URL}/`;
  return (
    <>
      <section className={FarmarHederStyle.userprofile}>
        <div className={"container"}>
          <div className={FarmarHederStyle.user_header_section}>
            <div className={FarmarHederStyle.profile_pic}>
              <img
                className={FarmarHederStyle.imagepro}
                src={`${farmerr?.img}`}
                alt="farmerImage"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
