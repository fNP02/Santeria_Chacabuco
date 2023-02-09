import useScrollPosition from "./UseScrollPosition";

function ParallaxTitle() {
  const pos = useScrollPosition(-0.3);

  return (
    <main className="mainIndex" style={{ backgroundPositionY: pos }}>
      <div id="title">
        <h1>Santería Chacabuco</h1>
      </div>
    </main>
  );
}

export default ParallaxTitle;
