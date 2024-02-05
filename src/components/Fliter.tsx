import { useDispatch } from "react-redux";
import { changeFilterValue, getFilterValue } from "../redux/dashboardSlice";
import { useSelector } from "react-redux";

export const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilterValue);

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    dispatch(changeFilterValue(inputValue));
  };

  return (
    <div className="flex w-full  lg:mx-auto ssm:w-[260px] sm:w-[200px] ">
      <label
        className=" text-slate-400 sm:text-md text-xl mr-4 font-montserrat font-medium "
        htmlFor="filterInput"
      >
        Filter:
      </label>
      <input
        className="h-9 outline-none border-none ssm2:w-72 ssm:w-72 sm:w-28  w-52 
        rounded-md text-slate-300 bg-slate-600 font-montserrat px-2 "
        onChange={onFilterChange}
        type="text"
        id="filterInput"
        name="filterInput"
        value={filterValue}
      />
    </div>
  );
};
