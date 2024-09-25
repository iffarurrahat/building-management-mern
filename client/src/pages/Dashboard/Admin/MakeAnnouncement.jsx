import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ImSpinner10 } from "react-icons/im";

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();

  const { mutateAsync, isPending: loading } = useMutation({
    mutationFn: async (announcement) => {
      const { data } = await axiosSecure.post("/notice", announcement);
      return data;
    },
    onSuccess: () => {
      toast.success("Announcement successfully!");
    },
  });

  const handleAnnouncement = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const details = form.details.value;
    const postDate = Date.now();

    const announcement = { title, details, postDate };

    try {
      await mutateAsync(announcement);
      form.reset();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Make Announcement | Admin</title>
      </Helmet>

      <section className="max-w-4xl mx-auto overflow-hidden rounded-lg shadow bg-gray-800  md:h-48">
        <div className="flex items-center md:justify-center md:bg-gray-700 w-full h-full text-center">
          <div className="px-6 py-6 md:px-8 md:py-0">
            <div className="uppercase text-2xl sm:text-3xl font-medium mb-3 md:mb-5 font-mono text-white">
              <p className="text-sm font-medium mb-1 tracking-[10px]">
                Announcement
              </p>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                write to <span className="text-primary">Announcement</span>
              </h3>
            </div>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-gray-400">
              Exciting updates coming soon! Stay tuned for our latest
              announcement.
            </p>
          </div>
        </div>
      </section>

      {/* form announcement */}
      <form
        onSubmit={handleAnnouncement}
        className="max-w-4xl mx-auto overflow-hidden bg-primary/5 p-3 md:p-5 mt-10 rounded"
      >
        <div className="w-full mt-4">
          <input
            className="block w-full px-4 py-2.5 mt-2 border rounded focus:outline-primary"
            type="text"
            name="title"
            placeholder="Announcement Title"
          />
        </div>
        <div className="w-full mt-4">
          <textarea
            className="block w-full px-4 py-2.5 mt-2 border rounded focus:outline-primary"
            name="details"
            placeholder="Write a announcement"
            rows="5"
          ></textarea>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            disabled={loading}
            className="px-10 py-3 text-sm font-medium text-white bg-primary rounded-lg"
          >
            {loading ? (
              <span className="flex items-center gap-1">
                <ImSpinner10 className="animate-spin m-auto" />
                Sending..
              </span>
            ) : (
              "Send a announcement"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default MakeAnnouncement;
