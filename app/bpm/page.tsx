import Title from "../_components/Title";
import Paragraph from "../_components/Paragraph";
import Image from "next/image";

export const metadata = {
  title: "BPM",
};

export default function Page() {
  return (
    <>
      <div className="m-20 p-4 flex flex-col justify-center items-center tracking-wide">
        <div className="flex flex-col items-center justify-center max-w-7xl">
          <Title
            title={"UCSC BSOE Package Management"}
            sub={"Senior Capstone Project"}
            img={
              "https://yltbxotlxxqixuyxsrxm.supabase.co/storage/v1/object/public/photos/cse115bc.png"
            }
          />

          <Paragraph>
            This project is designed to provide additional accessibility to
            Baskin Engineering Lab Support (BELS) staff and School of
            Engineering faculties. BELS receives packages like lab equipment
            from various shippers and notifies researchers and School faculties
            when they have new packages. Currently, BELS has a spreadsheet to
            manage all packages, but it is not practical to share it with
            package recipients because it contains other packages not relevant
            to the user. This web app keeps the current functionalities but also
            allows users to log in and track their packages. This reduces
            potential errors when editing and managing packages compared to a
            spreadsheet.
          </Paragraph>

          <div className="my-4 text-center">
            <h2 className="font-light text-2xl">Tech Stack</h2>
            <p className="font-thin text-base">Vue.js, PHP, Laravel, MySQL</p>
          </div>

          <Paragraph>
            BELS staff can log in with admin credentials to create new packages
            when they arrive and edit package details. They can also add and
            remove users from research groups. School faculties can log in as
            standard users to view all packages that belong to the research
            groups they are a part of.
          </Paragraph>

          <div className="relative h-[500px] aspect-video">
            <Image
              alt="BPM"
              fill
              sizes="1600x844"
              src="https://yltbxotlxxqixuyxsrxm.supabase.co/storage/v1/object/public/photos/flow_chart.png"
              className="object-fit rounded-xl"
            />
          </div>
        </div>
      </div>
    </>
  );
}
