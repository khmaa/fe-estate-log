import { Button } from "@shared-ui/core";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <Button onClick={() => alert("clicked")}>Shared Button</Button>
    </div>
  );
}

export default App;
