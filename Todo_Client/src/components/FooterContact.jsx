import assets from "../assets/assets";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
const FooterContact = () => {
  return (
    <>
      <div className="px-5 py-3 flex bg-gray-200 flex-col sm:flex-row justify-around">
        <div className="flex flex-row items-center gap-2 ">
          <div className="rounded-full border overflow-hidden max-w-10">
            <img className="" src={assets.dev_logo} alt="" />
          </div>
        </div>

        <div className="flex flex-row items-center gap-3">
          <MdOutlineMail />
          <span>Minhtuit@gmail.com</span>
        </div>
        <div className="flex flex-row items-center gap-3">
          <FaPhoneFlip />

          <span>+84 386 659 641</span>
        </div>
      </div>
    </>
  );
};

export default FooterContact;
