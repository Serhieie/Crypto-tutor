import { Field, ErrorMessage } from "formik";
import { InputProps } from "../Registration.types";

export const NameAndEmail: React.FC<InputProps> = ({
  widthClass,
  withInputClass,
  fieldsStyle,
}) => {
  return (
    <>
      <label
        className={`
        ${widthClass}
        mt-6 text-xl text-darkFontDark font-montserrat flex items-center gap-2 md:ml-2 md:w-10/12
      md2:text-sm font-medium sm:mt-1`}
        htmlFor="user-name"
      >
        Name
      </label>

      <Field
        className={fieldsStyle}
        type="text"
        name="name"
        id="name"
        max={16}
        placeholder="Antonio Balambino"
      />
      <div className="text-sm h-4 w-full text-center -mt-2">
        <ErrorMessage className=" text-errorMsg" name="name" component="p" />
      </div>
      <label
        className={`
         ${withInputClass}
        mt-2 text-xl flex text-darkFontDark items-center gap-2 md:ml-2 
      md2:text-sm font-medium sm:mt-1 font-montserrat `}
        htmlFor="user-email"
      >
        Email
      </label>
      <Field
        className={fieldsStyle}
        type="email"
        name="email"
        id="email"
        placeholder="Balambino@mail.com"
        required
      />
      <div className="text-sm h-4 w-full text-center -mt-2">
        <ErrorMessage
          className="font-montserrat text-errorMsg"
          name="email"
          component="p"
        />
      </div>
    </>
  );
};
