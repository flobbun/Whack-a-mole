import { useAppContext } from "../Context";

const Main = () => {
  const { name, setName } = useAppContext();
  return (
    <div className="flex bg-white-100 font-sans items-center flex-col justify-between h-screen">
      Boilerplate
    </div>
  );
};

export default Main;
