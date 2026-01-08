import Title from "../_components/Title";
import Paragraph from "../_components/Paragraph";
import Image from "next/image";

export const metadata = {
  title: "BPM",
};

export default function Page() {
  return (
    <div className="mx-4 md:mx-12 lg:mx-20 my-12 md:my-20 flex flex-col items-center justify-center p-4 tracking-wide">
      <div className="flex flex-col items-center justify-center max-w-5xl w-full">
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

        <div className="my-10 text-center">
          <h2 className="font-typewriter text-lg md:text-xl text-warmGray-800 dark:text-cream tracking-wide mb-3">
            Tech Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {["Vue.js", "PHP", "Laravel", "MySQL"].map((tech) => (
              <span
                key={tech}
                className="font-typewriter px-3 py-1 text-sm bg-sepia-100 dark:bg-sepia-900/50 text-sepia-700 dark:text-sepia-300 border border-sepia-200 dark:border-sepia-700"
              >
                {tech}
              </span>
            ))}
          </div>
          </div>

          <Paragraph>
            BELS staff can log in with admin credentials to create new packages
            when they arrive and edit package details. They can also add and
            remove users from research groups. School faculties can log in as
            standard users to view all packages that belong to the research
            groups they are a part of.
          </Paragraph>

        <div className="relative h-[400px] md:h-[500px] w-full my-8 img-vintage vintage-border rounded-sm overflow-hidden">
            <Image
            alt="BPM Flow Chart"
              fill
            sizes="(max-width: 768px) 100vw, 1200px"
              src="https://yltbxotlxxqixuyxsrxm.supabase.co/storage/v1/object/public/photos/flow_chart.png"
            className="object-contain"
            />
          </div>
        </div>
      </div>
  );
}
