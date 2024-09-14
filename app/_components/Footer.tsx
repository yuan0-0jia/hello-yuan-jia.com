import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import Icon from "./Icon";

export function Footer() {
  return (
    <div className="bg-[#f7f7f7] dark:bg-zinc-900 flex flex-col justify-center items-center text-center  px-4 py-3 sm:px-6">
      <section id="footer" className="">
        <div className="py-8">
          <section>
            <p className="align-center py-4 font-light">
              Feel free to reach out to me.
            </p>
            <ul className="flex flex-row justify-center items-center space-x-5 text-stone-200">
              <li>
                <Icon to={"https://www.linkedin.com/in/yuanjia1/"}>
                  <FaLinkedin />
                </Icon>
              </li>
              <li>
                <Icon to={"https://github.com/yuan0-0jia"}>
                  <FaGithub />
                </Icon>
              </li>
              <li>
                <Icon to={"mailto:hello.yuanjia@gmail.com"}>
                  <FaEnvelope />
                </Icon>
              </li>
            </ul>
          </section>
        </div>
        <div className="font-thin text-xs my-8">
          <p className="before:mx-auto before:my-6 before:block before:w-16 before:h-1px before:border-t before:border-slate-500 dark:before:border-slate-400 before:opacity-35 text-stone-400 dark:text-stone-300">
            &copy; {new Date().getFullYear()} Yuan Jia. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
}
