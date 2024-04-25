import PropTypes from "prop-types";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import Icon from "./Icon";

function Footer({ home }) {
  return (
    <div
      className={`${home ? "" : "bg-[#f7f7f7]"} flex flex-col justify-center items-center text-center  px-4 py-3 sm:px-6`}
    >
      <section id="footer" className="">
        <div className="py-8">
          <section>
            <p className="align-center py-4 font-light">
              Feel free to reach out to me.
            </p>
            <ul className="flex flex-row justify-center items-center space-x-5">
              <li>
                <Icon
                  icon={<FaLinkedin />}
                  to={"https://www.linkedin.com/in/yuanjia1/"}
                />
              </li>
              <li>
                <Icon
                  icon={<FaGithub />}
                  to={"https://github.com/yuan0-0jia"}
                />
              </li>
              <li>
                <Icon
                  icon={<FaEnvelope />}
                  to={"mailto:hello.yuanjia@gmail.com"}
                />
              </li>
            </ul>
          </section>
        </div>
        <div className="font-thin text-xs my-8">
          <p className="before:mx-auto before:my-6 before:block before:w-16 before:h-1px before:border-t before:border-slate-500 before:opacity-35 text-stone-400">
            &copy; {new Date().getFullYear()} Yuan Jia. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
}

Footer.propTypes = {
  home: PropTypes.bool,
};

export default Footer;
