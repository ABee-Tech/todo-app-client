const Buttons = ({ buttons }) => {
  return (
    <div className="flex justify-start">
      {buttons.map((button, index) => {
        return (
          <button
            key={index}
            onClick={button.onClick}
            className="text-white bg-blue-300 px-4 py-2 rounded-lg mr-2"
          >
            {button.name}
          </button>
        );
      })}
    </div>
  );
};

export default Buttons;
