const Logo = () => {
  return (
    <div
      style={{
        height: "4rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <img
        src="/src/assets/letter-p.png"
        alt="PH University"
        style={{
          marginRight: "10px",
          width: "1.5rem",
          borderRadius: "50%",
          border: "2px solid #FFFFFF",
        }}
      />
      <img
        src="/src/assets/letter-h.png"
        alt="PH University"
        style={{
          marginRight: "10px",
          width: "1.5rem",
          borderRadius: "50%",
          border: "2px solid #FFFFFF",
        }}
      />
      <img
        src="/src/assets/letter-u.png"
        alt="PH University"
        style={{
          marginRight: "10px",
          width: "1.5rem",
          borderRadius: "50%",
          border: "2px solid #FFFFFF",
        }}
      />
    </div>
  );
};

export default Logo;
