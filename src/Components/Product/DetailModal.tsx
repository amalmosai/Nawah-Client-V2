import React from "react";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import Fade from "@mui/material/Fade";
import styles from "./Product.module.css";
import { FaEye } from "react-icons/fa6";
import Rating from "@mui/material/Rating";
import { Height } from "@mui/icons-material";

export default function DetailModal(details: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const api = `${process.env.REACT_APP_UPLOAD_URL}/`;

  return (
    <div>
      <button
        className={`${styles.btn_cart} `}
        type="button"
        title=" الاطلاع على المنتج"
        onClick={handleOpen}
      >
        <FaEye />
      </button>
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
            <div className="row d-flex">
              <div
                className="col-lg-6 col-md-12"
                style={{ direction: "rtl", textAlign: "right" }}
              >
                <div className={`${"pr-30 pl-30"} ${styles.detail_info} `}>
                  <span
                    className={`${styles.stock_status}  ${styles.out_stock} `}
                  >
                    {" "}
                    available{" "}
                  </span>
                  <h3 className="title-detail">
                    {details?.details?.description}
                  </h3>
                  {/* <div className={styles['product-detail-rating']}>
                                    <Rating name="read-only" value={details?.details?.rates} readOnly
                                        style={{ direction: "ltr" }}
                                    />
                                </div> */}
                  <div className={styles.product_price_cover}>
                    <div
                      className={` ${
                        styles.product_price
                      } ${"primary-color float-left"}`}
                    >
                      <span>
                        <span
                          className={` ${
                            styles.save_price
                          } ${"font-md color3 ml-15"}`}
                        >
                          26% Off
                        </span>
                        <span
                          className={` ${styles.old_price} ${"font-md ml-15"}`}
                        >
                          {details?.details?.price + 10}
                        </span>
                      </span>
                    </div>
                    <div
                      className={` ${
                        styles.product_price
                      } ${"primary-color float-left"}`}
                    >
                      <span className={styles.current_price}>
                        ${details?.details?.price}
                      </span>
                    </div>
                  </div>

                  <div className={styles.font_xs}>
                    <ul>
                      <li>
                        اسـم الـمـنـتـج:
                        <span className={styles.text_brand}>
                          {" "}
                          {details?.details?.name}
                        </span>
                      </li>
                      <li>
                        نوع المنتج :
                        <span className={styles.text_brand}>
                          {" "}
                          {details?.details?.category}
                        </span>
                      </li>
                      <li>
                        الوصف :
                        <span className={styles.text_brand}>
                          {" "}
                          {details?.details?.description}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Detail Info */}
              </div>
              <div
                className={` ${["col-lg-6 col-md-12 mb-md-0 mb-sm-5"]} ${
                  styles.immg
                }`}
              >
                <div className={styles.detail_gallery}>
                  {/* MAIN SLIDES */}
                  <div className={styles.product_image_slider}>
                    <figure className="border-radius-10">
                      <img
                        src={`${details?.details?.imageUrl}`}
                        alt="product_image"
                      />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
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
  }
);

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
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
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,

  "@media (max-width:  992px)": {
    width: "80%",
    maxWidth: "80%",
    maxHeight: "95vh",
  },
};

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }

    @media (max-width: 992px) {
      width: 90%;
      max-height: 90vh;
    }
  `
);
