import { useDispatch } from "react-redux";
import { changeFilterValue, getFilterValue } from "../redux/dashboardSlice";
import { BsFilterRight } from "react-icons/bs";
import { useSelector } from "react-redux";

export const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilterValue);

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    dispatch(changeFilterValue(inputValue));
  };

  return (
    <div className="flex w-full justify-center  items-center md3:mr-10   ">
      <label
        className=" text-slate-500 sm:text-sm text-xl mr-0.5 font-montserrat font-medium "
        htmlFor="filterInput"
      >
        <BsFilterRight size={40} />
      </label>
      <input
        className="h-9 outline-none border-none ssm2:w-52  md:w-80  w-52
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
