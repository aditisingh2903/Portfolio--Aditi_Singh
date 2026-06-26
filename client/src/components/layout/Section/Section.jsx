const Section = ({
  id,
  children,
  className = "",
  background = "",
}) => {
  return (
    <section
      id={id}
      className={`py-24 md:py-32 ${background} ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;