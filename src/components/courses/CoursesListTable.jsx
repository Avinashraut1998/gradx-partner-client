import { useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, getCourses } from "../../features/course/courseAction";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import ConfirmationDialog from "../ConfirmationDialog";

const CoursesListTable = () => {
  const dispatch = useDispatch();

  const { isLoading, courseList, error } = useSelector((state) => state.course);

  const handleDelete = (id) => {
    dispatch(deleteCourse(id));
  };

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-2 pb-1.5 pt-1 shadow-default dark:border-strokedark dark:bg-boxdark ">
      <div className="px-1 py-1.5 md:px-1.5 xl:px-2.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Courses
        </h4>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray   text-left text-sm dark:bg-meta-4 md:text-base">
              <th className="min-w-25 px-2 py-2 font-normal text-black dark:text-white md:min-w-[220px] md:font-medium xl:pl-11">
                Course Name
              </th>
              <th className="min-w-25 px-2 py-2 font-normal text-black dark:text-white md:min-w-[150px] md:font-medium">
                Description
              </th>
              <th className="min-w-25 px-2 py-2 font-normal text-black dark:text-white md:min-w-[150px] md:font-medium">
                duration
              </th>

              <th className=" min-w-15 px-2 py-2 font-normal text-black dark:text-white md:font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {courseList &&
              courseList.map((course) => (
                <tr key={course._id}>
                  <td className="border-b  border-t  border-stroke px-2 py-2.5 pl-3 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {course.name}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-1 py-1.5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {course.details}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-1 py-1.5 dark:border-strokedark">
                    <p className="pl-4 text-black dark:text-white">
                      {course.duration}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] px-1 py-1.5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <div className="flex justify-center gap-2">
                        <Link to={`${course._id}`}>
                          <FaEye />
                        </Link>
                        <span>
                          <ConfirmationDialog
                            title={"Are you sure want to delete"}
                            onConfirm={() => handleDelete(course._id)}
                          />
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CoursesListTable;
