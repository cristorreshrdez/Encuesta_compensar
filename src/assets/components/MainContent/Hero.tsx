interface Props {
  titulo: string;
  subtitulo: string;
  mensaje: string;
  mensaje2: string;
  linkText: string;
  onLinkClick: ()=> void
}

export const Hero: React.FC<Props> = ({
  titulo,
  subtitulo,
  mensaje,
  linkText,
  mensaje2,
  onLinkClick
}) => {
  return (
    <>
      <div className="lg:text-left max-w-md">
        <h1 className="text-4xl font-bold ">
          {titulo} <br />{" "}
          <span className="font-semibold mt-4 inline-block">{subtitulo}</span>
        </h1>
        <p className="inline-block mt-10 text-lg">
          {mensaje} <br />
          {mensaje2}{" "}
          <span
            onClick={onLinkClick}
            className=" text-orange-500 font-bold cursor-pointer "
          >
            {" "}
            {linkText}{" "}
          </span>
        </p>
      </div>

      <div>
        <img
          className="hidden md:block w-30 h-auto md:w-30 absolute top-[45%] left-[40%] z-0 "
          src="/img/login_image.png"
          alt="login_image"
          
        />
    
      </div>
    </>
  );
};