import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import NoticeCard from "../../../components/Card/NoticeCard/NoticeCard";

const Announcements = () => {
  const axiosPublic = useAxiosPublic();

  const { data: notices = [] } = useQuery({
    queryKey: ["notice"],
    queryFn: async () => {
      const { data } = await axiosPublic("/notice");
      return data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Announcements | Dashboard</title>
      </Helmet>

      <section className="max-w-4xl mx-auto overflow-hidden rounded-lg shadow bg-gray-800  md:h-48">
        <div className="flex items-center md:justify-center md:bg-gray-700 w-full h-full text-center">
          <div className="px-6 py-6 md:px-8 md:py-0">
            <div className="uppercase text-2xl sm:text-3xl font-medium mb-3 md:mb-5 font-mono text-white">
              <p className="text-sm font-medium mb-1 tracking-[10px]">
                Announcement
              </p>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                show all <span className="text-primary">Announcement</span>
              </h3>
            </div>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-gray-400">
              Exciting ! Here to view the full details of the latest
              announcements.
            </p>
          </div>
        </div>
      </section>
      <div className=" mt-3 md:mt-6 space-y-2">
        {notices.map((notice) => (
          <NoticeCard key={notice._id} notice={notice} />
        ))}
      </div>
    </>
  );
};

export default Announcements;
