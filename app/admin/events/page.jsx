import AllArtistOverview from "@/components/AllArtistOverview";
import AllEventOverview from "@/components/AllEventOverview";

function Events() {
  return (
    <>
      <div className="p-2 w-full flex flex-col gap-2 md:w-10/12">
        <h1 className="text-xl ">Artists & Events</h1>
        <div className="min-h-72">
          <div className="w-full p-2 flex border border-gray-100 rounded-se rounded-ss">
            <div className="w-7/12">
              <h1 className={` text-xs`}>Artist</h1>
            </div>
            <h1 className={` w-3/12 text-xs`}>Date</h1>

            <h1 className={` w-2/12 text-xs`}>Action</h1>
          </div>

          {/* <AllArtistOverview /> */}
        </div>

        <div>
          <div className="w-full p-2  border border-gray-100 rounded-se rounded-ss">
            <div className="w-full flex">
              <div className="w-7/12">
                <h1 className={` text-xs`}>Events</h1>
              </div>
              <h1 className={` w-3/12 text-xs`}>Date</h1>
              <h1 className={` w-2/12 text-xs`}>Action</h1>
            </div>
          </div>
          {/* <AllEventOverview /> */}
        </div>
      </div>
    </>
  );
}

export default Events;
